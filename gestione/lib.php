<?php
/* ==========================================================================
   gestione/lib.php — funzioni comuni del pannello
   Nessun database: i dati stanno in /contenuti (JSON + foto).
   Le funzioni del blog (riempi, img_tag, card, pagina_articolo) sono gemelle di
   design/articoli.mjs: se ne cambi una, cambia anche l'altra.
   ========================================================================== */
if (!defined('OMR')) { http_response_code(404); exit; }

define('ROOT', dirname(__DIR__));
define('DATI', ROOT . '/contenuti');
define('PRIV', DATI . '/privato');
define('MODELLI', __DIR__ . '/modelli');
define('SITO', 'https://www.example.com');
define('MAX_UPLOAD', 15 * 1024 * 1024);

require __DIR__ . '/config.php';

header('X-Robots-Tag: noindex, nofollow');
header('X-Frame-Options: DENY');
header('Referrer-Policy: same-origin');
header('Cache-Control: no-store');
@ini_set('memory_limit', '384M');
date_default_timezone_set('Europe/Rome');

/* /gestione senza barra finale: stessa pagina, ma il cookie deve valere per entrambe */
if (parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH) === '/gestione') { header('Location: /gestione/', true, 301); exit; }
prepara_cartelle();
session_name('omr_pannello');
session_set_cookie_params(['lifetime' => 0, 'path' => '/gestione', 'secure' => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off', 'httponly' => true, 'samesite' => 'Strict']);
session_start();

/* ---------- cartelle e protezioni ---------- */
function prepara_cartelle() {
  foreach ([DATI, PRIV, DATI . '/foto', DATI . '/foto-sito'] as $d) if (!is_dir($d)) @mkdir($d, 0755, true);
  $regole = [
    DATI . '/.htaccess' => "Options -Indexes\n<FilesMatch \"\\.(php|phtml|phar|pl|py|cgi|sh)$\">\n  <IfModule mod_authz_core.c>\n    Require all denied\n  </IfModule>\n  <IfModule !mod_authz_core.c>\n    Deny from all\n  </IfModule>\n</FilesMatch>\n<IfModule mod_headers.c>\n  <FilesMatch \"\\.json$\">\n    Header set Cache-Control \"no-cache\"\n  </FilesMatch>\n</IfModule>\n",
    PRIV . '/.htaccess' => "<IfModule mod_authz_core.c>\n  Require all denied\n</IfModule>\n<IfModule !mod_authz_core.c>\n  Deny from all\n</IfModule>\n",
  ];
  foreach ($regole as $f => $txt) if (!is_file($f)) @file_put_contents($f, $txt);
  foreach (['montature', 'avvisi'] as $n) if (!is_file(DATI . "/$n.json")) @file_put_contents(DATI . "/$n.json", '[]');
}

/* ---------- JSON e file ---------- */
function leggi_json($file, $vuoto = []) {
  if (!is_file($file)) return $vuoto;
  $v = json_decode(file_get_contents($file), true);
  return is_array($v) ? $v : $vuoto;
}
function scrivi_file($file, $testo) {
  $tmp = $file . '.tmp-' . bin2hex(random_bytes(4));
  if (file_put_contents($tmp, $testo) === false) throw new RuntimeException('Impossibile scrivere ' . basename($file) . ': controlla i permessi della cartella.');
  if (@rename($tmp, $file)) return;
  /* Windows non sostituisce un file aperto da un altro processo: si riscrive sul posto */
  $ok = file_put_contents($file, $testo, LOCK_EX) !== false;
  @unlink($tmp);
  if (!$ok) throw new RuntimeException('Impossibile aggiornare ' . basename($file) . '.');
}
function scrivi_json($file, $dati) {
  scrivi_file($file, json_encode($dati, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
}
/* una modifica alla volta: due schede aperte non si sovrascrivono a vicenda */
function con_blocco(callable $fn) {
  $h = fopen(PRIV . '/.blocco', 'c');
  flock($h, LOCK_EX);
  try { return $fn(); } finally { flock($h, LOCK_UN); fclose($h); }
}

/* ---------- accesso ---------- */
function utente() { return leggi_json(PRIV . '/utente.json', null); }
/* la sessione vale solo per la password con cui è stata aperta: cambiandola o reimpostandola si esce ovunque */
function impronta() { $u = utente(); return $u ? hash('sha256', $u['hash']) : ''; }
function connesso() { return !empty($_SESSION['ok']) && ($_SESSION['scade'] ?? 0) > time() && impronta() !== '' && hash_equals(impronta(), (string)($_SESSION['impronta'] ?? '')); }
function richiedi_accesso() {
  if (!connesso()) { header('Location: /gestione/'); exit; }
  $_SESSION['scade'] = time() + 4 * 3600;
}
function token() {
  if (empty($_SESSION['csrf'])) $_SESSION['csrf'] = bin2hex(random_bytes(16));
  return $_SESSION['csrf'];
}
function campo_token() { return '<input type="hidden" name="csrf" value="' . token() . '">'; }
function verifica_token() {
  if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !hash_equals(token(), (string)($_POST['csrf'] ?? ''))) {
    http_response_code(400); exit('Richiesta non valida. Torna indietro e ricarica la pagina.');
  }
}
/* 5 tentativi sbagliati: pausa di 15 minuti */
function bloccato() { $t = leggi_json(PRIV . '/tentativi.json', ['n' => 0, 'fino' => 0]); return $t['fino'] > time() ? $t['fino'] : 0; }
function tentativo($riuscito) {
  $t = leggi_json(PRIV . '/tentativi.json', ['n' => 0, 'fino' => 0]);
  $t = $riuscito ? ['n' => 0, 'fino' => 0] : ['n' => $t['n'] + 1, 'fino' => $t['n'] + 1 >= 5 ? time() + 900 : 0];
  if ($t['fino']) $t['n'] = 0;
  scrivi_json(PRIV . '/tentativi.json', $t);
}
function imposta_password($pw) {
  if (mb_strlen($pw) < 10) throw new RuntimeException('La password deve avere almeno 10 caratteri.');
  scrivi_json(PRIV . '/utente.json', ['hash' => password_hash($pw, PASSWORD_DEFAULT), 'dal' => date('c')]);
}
function entra() {
  session_regenerate_id(true);
  $_SESSION['ok'] = 1;
  $_SESSION['scade'] = time() + 4 * 3600;
  $_SESSION['impronta'] = impronta();
}

/* ---------- messaggi tra una pagina e l'altra ---------- */
function avviso($testo, $tipo = 'ok') { $_SESSION['msg'][] = [$tipo, $testo]; }
function vai($url) { header('Location: ' . $url); exit; }
function e($s) { return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8'); }

/* ---------- impaginazione del pannello ---------- */
function testa($titolo, $attiva = '') {
  $voci = ['foto.php' => 'Foto del sito', 'montature.php' => 'Montature', 'orari.php' => 'Orari straordinari', 'articoli.php' => 'Articoli'];
  echo '<!DOCTYPE html><html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow"><title>' . e($titolo) . ' · Gestione Ottica Demo</title><link rel="icon" href="/assets/img/favicon.png"><link rel="stylesheet" href="/gestione/pannello.css?v=' . filemtime(__DIR__ . '/pannello.css') . '"></head><body>';
  if (connesso()) {
    echo '<header class="barra"><a class="logo" href="/gestione/">Gestione <b>Ottica Demo</b></a><nav>';
    foreach ($voci as $href => $nome) echo '<a href="/gestione/' . $href . '"' . ($attiva === $href ? ' aria-current="page"' : '') . '>' . $nome . '</a>';
    echo '</nav><div class="esci"><a href="/" target="_blank" rel="noopener">Vedi il sito</a><form method="post" action="/gestione/index.php?esci=1">' . campo_token() . '<button type="submit">Esci</button></form></div></header>';
  }
  echo '<main class="corpo"><h1>' . e($titolo) . '</h1>';
  foreach ($_SESSION['msg'] ?? [] as [$tipo, $testo]) echo '<p class="msg msg--' . e($tipo) . '" role="status">' . e($testo) . '</p>';
  unset($_SESSION['msg']);
}
function piede() { echo '</main><script src="/gestione/pannello.js?v=' . filemtime(__DIR__ . '/pannello.js') . '" defer></script></body></html>'; }

/* ---------- immagini ---------- */
function webp_disponibile() { return function_exists('imagewebp') && function_exists('imagecreatetruecolor'); }

/* legge la foto caricata, la verifica e la raddrizza secondo l'EXIF del telefono */
function apri_caricamento($campo) {
  $f = $_FILES[$campo] ?? null;
  if (!$f || $f['error'] === UPLOAD_ERR_NO_FILE) throw new RuntimeException('Scegli una foto.');
  if ($f['error'] === UPLOAD_ERR_INI_SIZE || $f['error'] === UPLOAD_ERR_FORM_SIZE || $f['size'] > MAX_UPLOAD) throw new RuntimeException('La foto è troppo grande: al massimo 15 MB.');
  if ($f['error'] !== UPLOAD_ERR_OK || !is_uploaded_file($f['tmp_name'])) throw new RuntimeException('Il caricamento non è riuscito, riprova.');
  if (!webp_disponibile()) throw new RuntimeException('Il server non supporta le immagini WebP (estensione GD). Avvisa chi gestisce il sito.');
  $info = @getimagesize($f['tmp_name']);
  $tipi = [IMAGETYPE_JPEG => 'imagecreatefromjpeg', IMAGETYPE_PNG => 'imagecreatefrompng', IMAGETYPE_WEBP => 'imagecreatefromwebp', IMAGETYPE_GIF => 'imagecreatefromgif'];
  if (!$info || !isset($tipi[$info[2]])) throw new RuntimeException('Formato non riconosciuto: usa una foto JPG, PNG o WebP. Le foto HEIC dell\'iPhone vanno prima salvate come JPG.');
  if ($info[0] * $info[1] > 40000000) throw new RuntimeException('La foto ha troppi pixel: riducila sotto i 40 megapixel.');
  $img = @$tipi[$info[2]]($f['tmp_name']);
  if (!$img) throw new RuntimeException('La foto sembra danneggiata, prova con un\'altra.');
  if ($info[2] === IMAGETYPE_JPEG && function_exists('exif_read_data')) {
    $exif = @exif_read_data($f['tmp_name']);
    $giro = [3 => 180, 6 => -90, 8 => 90][$exif['Orientation'] ?? 1] ?? 0;
    if ($giro) { $r = imagerotate($img, $giro, 0); imagedestroy($img); $img = $r; }
  }
  return $img;
}
/* inquadratura scelta nel pannello: zoom (1-4) e centro (cx, cy da 0 a 1 sulla foto caricata);
   senza JavaScript resta la scelta alto/centro/basso */
function inquadratura() {
  if (!isset($_POST['cx'], $_POST['cy']) || !is_numeric($_POST['cx']) || !is_numeric($_POST['cy'])) return (string)($_POST['fuoco'] ?? 'centro');
  $l = function ($v, $a, $b) { return max($a, min($b, (float)$v)); };
  return ['zoom' => $l($_POST['zoom'] ?? 1, 1, 4), 'cx' => $l($_POST['cx'], 0, 1), 'cy' => $l($_POST['cy'], 0, 1)];
}
/* campi per scegliere l'inquadratura: pannello.js li sostituisce con l'anteprima trascinabile */
function campo_inquadra($w, $h) {
  return '<label class="fuoco">Tieni la parte<select name="fuoco"><option value="centro">al centro</option><option value="alto">in alto</option><option value="basso">in basso</option></select></label>'
    . '<div class="inquadra" data-w="' . (int)$w . '" data-h="' . (int)$h . '"' . ($w >= 100 ? ' data-min="' . min(700, (int)$w) . '"' : '') . ' hidden><input type="hidden" name="zoom"><input type="hidden" name="cx"><input type="hidden" name="cy"></div>';
}
/* ritaglia alle proporzioni w:h tenendo il punto scelto (alto, centro, basso, oppure zoom e centro), poi ridimensiona a w x h */
function ritaglia($img, $w, $h, $fuoco = 'centro') {
  $sw = imagesx($img); $sh = imagesy($img);
  if ($sw / $sh > $w / $h) { $cw = (int)round($sh * $w / $h); $ch = $sh; $x = (int)(($sw - $cw) / 2); $y = 0; }
  else { $cw = $sw; $ch = (int)round($sw * $h / $w); $x = 0; $y = ['alto' => 0, 'basso' => $sh - $ch][is_string($fuoco) ? $fuoco : ''] ?? (int)(($sh - $ch) / 2); }
  if (is_array($fuoco)) {
    $cw = max(1, (int)round($cw / $fuoco['zoom'])); $ch = max(1, (int)round($ch / $fuoco['zoom']));
    $x = (int)round(max(0, min($sw - $cw, $fuoco['cx'] * $sw - $cw / 2)));
    $y = (int)round(max(0, min($sh - $ch, $fuoco['cy'] * $sh - $ch / 2)));
  }
  $out = imagecreatetruecolor($w, $h);
  imagefill($out, 0, 0, imagecolorallocate($out, 255, 255, 255));
  imagecopyresampled($out, $img, 0, 0, $x, $y, $w, $h, $cw, $ch);
  return $out;
}
function scala($img, $w) {
  $sw = imagesx($img); $sh = imagesy($img);
  if ($sw <= $w) { $out = imagecreatetruecolor($sw, $sh); imagecopy($out, $img, 0, 0, 0, 0, $sw, $sh); return $out; }
  $h = (int)round($sh * $w / $sw);
  $out = imagecreatetruecolor($w, $h);
  imagecopyresampled($out, $img, 0, 0, 0, 0, $w, $h, $sw, $sh);
  return $out;
}
/* salva 480/900/1600 px; restituisce {src, w, h} come le foto del sito (src = versione 1600) */
function salva_misure($img, $cartella, $nome) {
  $percorsi = [];
  foreach ([1600, 900, 480] as $w) {
    $v = scala($img, $w);
    $file = "$cartella/$nome-$w.webp";
    if (!imagewebp($v, ROOT . $file, 82)) throw new RuntimeException('Impossibile salvare la foto: controlla i permessi di /contenuti.');
    if ($w === 1600) $dim = [imagesx($v), imagesy($v)];
    imagedestroy($v);
  }
  return ['src' => "$cartella/$nome-1600.webp", 'w' => $dim[0], 'h' => $dim[1]];
}
function elimina_misure($src) {
  if (strpos($src, '/contenuti/') !== 0) return;
  foreach ([480, 900, 1600] as $w) @unlink(ROOT . str_replace('-1600.webp', "-$w.webp", $src));
}
function nome_file($testo) {
  $s = strtolower(trim(preg_replace('/[^a-z0-9]+/i', '-', iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', (string)$testo)), '-'));
  return substr($s ?: 'foto', 0, 40) . '-' . date('ymd') . '-' . bin2hex(random_bytes(3));
}

/* ---------- foto del sito: sostituzione nelle pagine ---------- */
function catalogo() { return leggi_json(MODELLI . '/catalogo-foto.json'); }
function mappa_foto() { return leggi_json(PRIV . '/foto-sito.json'); }
/* tutti gli HTML pubblicati, più i modelli del blog e gli articoli */
function file_del_sito() {
  $out = [];
  $it = new RecursiveIteratorIterator(new RecursiveCallbackFilterIterator(new RecursiveDirectoryIterator(ROOT, FilesystemIterator::SKIP_DOTS), function ($f) {
    $n = $f->getFilename();
    if ($f->isDir()) return $n[0] !== '.' && !in_array($n, ['gestione', 'contenuti', 'assets', 'media', 'cgi-bin', 'vecchio-wordpress', 'wp-content', 'wp-admin', 'wp-includes'], true);
    return substr($n, -5) === '.html';
  }));
  foreach ($it as $f) $out[] = $f->getPathname();
  foreach (glob(MODELLI . '/*.html') as $f) $out[] = $f;
  $out[] = PRIV . '/articoli.json';
  return $out;
}
/* nome dei file sostituiti: /assets/img/approved/negozio → approved_negozio-v3-900.webp */
function nome_foto($base) { return str_replace('/', '_', substr($base, strlen('/assets/img/'))); }
/* porta ogni misura della foto (originale o qualsiasi versione precedente) al percorso $nuovi[misura]:
   così anche un'operazione interrotta a metà si sistema rifacendola */
function sostituisci_foto_nel_sito($f, array $nuovi) {
  $da = []; $a = [];
  foreach ($f['file'] as $w => $orig) {
    $da[] = '#' . preg_quote($orig, '#') . '|/contenuti/foto-sito/' . preg_quote(nome_foto($f['base']), '#') . '-v\d+-' . $w . '\.webp#';
    $a[] = $nuovi[$w];
  }
  $n = 0;
  foreach (file_del_sito() as $file) {
    if (!is_file($file)) continue;
    $t = file_get_contents($file);
    $nuovo = preg_replace($da, $a, $t);
    if ($nuovo !== $t) { scrivi_file($file, $nuovo); $n++; }
  }
  return $n;
}
/* toglie le versioni della foto non più usate */
function pulisci_versioni($f, array $tieni) {
  foreach (glob(DATI . '/foto-sito/' . nome_foto($f['base']) . '-v*-*.webp') as $p) {
    if (!in_array('/contenuti/foto-sito/' . basename($p), $tieni, true)) @unlink($p);
  }
}

/* ---------- blog: gemello di design/articoli.mjs ---------- */
const FRECCIA = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10h13M11 5l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';
function articoli() { return leggi_json(PRIV . '/articoli.json'); }
function json_frammento($s) { return substr(json_encode((string)$s, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG), 1, -1); }
/* {{CHIAVE}} testo · {{CHIAVE_HTML}} html già pronto · {{CHIAVE_JSON}} dentro il JSON-LD */
function riempi($tpl, array $v) {
  return preg_replace_callback('/\{\{([A-Z]+(?:_[A-Z]+)*?)(_JSON|_HTML)?\}\}/', function ($m) use ($v) {
    $x = $v[$m[1]] ?? '';
    $modo = $m[2] ?? '';
    return $modo === '_HTML' ? $x : ($modo === '_JSON' ? json_frammento($x) : e($x));
  }, $tpl);
}
function senza_punto($h) { return preg_replace('/\.((?:<\/span>)?\s*<\/h[1-3]>)/', '$1', $h); }
function img_tag($f, $cls = '', $lazy = true) {
  $srcset = [];
  foreach ([480, 900, 1600] as $i => $w) if ($i === 0 || $f['w'] > [480, 900, 1600][$i - 1]) $srcset[] = str_replace('-1600.webp', "-$w.webp", $f['src']) . ' ' . min($w, $f['w']) . 'w';
  return '<img' . ($cls ? ' class="' . $cls . '"' : '') . ' src="' . e($f['src']) . '" alt="' . e($f['alt'] ?? '') . '" width="' . (int)$f['w'] . '" height="' . (int)$f['h'] . '" loading="' . ($lazy ? 'lazy' : 'eager') . '" decoding="async"' . ($lazy ? '' : ' fetchpriority="high"') . ' srcset="' . implode(', ', $srcset) . '" sizes="(max-width: 700px) 92vw, (max-width: 1100px) 80vw, 700px">';
}
function card($a) {
  return '<a class="post" href="/blog/' . $a['slug'] . '/"><div class="il-wrap">' . img_tag($a['foto'], 'photo') . '</div><div class="body"><p class="cat">' . e($a['categoria']) . '</p><h3>' . e($a['titolo']) . '</h3><p>' . e($a['riassunto']) . '</p><span class="link">Leggi ' . FRECCIA . '</span></div></a>';
}
function breve($t) {
  $t = preg_replace('/\.$/u', '', (string)$t);
  return mb_strlen($t) <= 46 ? $t : preg_replace('/[\s:,;–-]+\S*$/u', '', mb_substr($t, 0, 47));
}
function descrizione($a) {
  $d = trim((string)($a['riassunto'] ?: $a['intro']));
  if (mb_strlen($d) > 160) $d = preg_replace('/\s+\S*$/u', '', mb_substr($d, 0, 156)) . '…';
  return $d;
}
function pubblicati($lista) { return array_values(array_filter($lista, function ($x) { return $x['stato'] === 'pubblicato'; })); }
function pagina_articolo($lista, $a) {
  $pub = pubblicati($lista);
  $i = array_search($a['slug'], array_column($pub, 'slug'), true);
  $nx = count($pub) > 1 && $i !== false ? $pub[($i + 1) % count($pub)] : null;
  return riempi(file_get_contents(MODELLI . '/articolo.html'), [
    'SLUG' => $a['slug'], 'TITOLO' => $a['titolo'], 'TITOLOBREVE' => breve($a['titolo']), 'CATEGORIA' => $a['categoria'], 'INTRO' => $a['intro'], 'DESCRIZIONE' => descrizione($a),
    'FOTO' => img_tag($a['foto'], 'photo', false), 'FOTO_URL' => SITO . $a['foto']['src'],
    'CORPO' => senza_punto($a['corpo']), 'CHIUSURA' => $a['chiusura'] ? '<p class="closing">' . e($a['chiusura']) . '</p>' : '',
    'PROSSIMO' => $nx ? '<a class="link" href="/blog/' . $nx['slug'] . '/">Prossimo: ' . e($nx['titolo']) . ' ' . FRECCIA . '</a>' : '',
  ]);
}
function pagina_blog($lista) { return riempi(file_get_contents(MODELLI . '/blog.html'), ['ARTICOLI' => implode('', array_map('card', pubblicati($lista)))]); }

/* riscrive tutte le pagine del blog, toglie quelle non più pubblicate e aggiorna la sitemap */
function pubblica_blog($lista, $rimossi = []) {
  foreach (pubblicati($lista) as $a) {
    $dir = ROOT . '/blog/' . $a['slug'];
    if (!is_dir($dir)) mkdir($dir, 0755, true);
    scrivi_file("$dir/index.html", pagina_articolo($lista, $a));
  }
  foreach ($rimossi as $slug) {
    if (!preg_match('/^[a-z0-9-]+$/', $slug)) continue;
    @unlink(ROOT . "/blog/$slug/index.html");
    @rmdir(ROOT . "/blog/$slug");
  }
  scrivi_file(ROOT . '/blog/index.html', pagina_blog($lista));
  aggiorna_sitemap($lista, $rimossi);
}
function aggiorna_sitemap($lista, $rimossi = []) {
  $f = ROOT . '/sitemap.xml';
  if (!is_file($f)) return;
  /* anche gli eliminati: non sono più nell'elenco ma vanno tolti */
  $gestiti = array_merge(array_column($lista, 'slug'), $rimossi);
  $xml = preg_replace_callback('/\s*<url>\s*<loc>' . preg_quote(SITO, '/') . '\/blog\/([a-z0-9-]+)\/<\/loc>[\s\S]*?<\/url>/', function ($m) use ($gestiti) {
    return in_array($m[1], $gestiti, true) ? '' : $m[0];
  }, file_get_contents($f));
  $nuovi = '';
  foreach (pubblicati($lista) as $a) $nuovi .= "\n  <url>\n    <loc>" . SITO . '/blog/' . $a['slug'] . "/</loc>\n    <lastmod>" . e($a['aggiornato']) . "</lastmod>\n    <changefreq>yearly</changefreq>\n    <priority>0.7</priority>\n  </url>";
  scrivi_file($f, str_replace("\n</urlset>", $nuovi . "\n</urlset>", $xml));
}

/* testo degli articoli: solo i tag dell'editor, nessun attributo tranne href sicuri */
function pulisci_html($html) {
  $ammessi = ['h2', 'h3', 'p', 'strong', 'em', 'ul', 'ol', 'li', 'a', 'br'];
  $rinomina = ['b' => 'strong', 'i' => 'em', 'h1' => 'h2', 'h4' => 'h3', 'div' => 'p'];
  $doc = new DOMDocument();
  libxml_use_internal_errors(true);
  $doc->loadHTML('<?xml encoding="utf-8"?><div id="radice">' . $html . '</div>', LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD | LIBXML_NONET);
  libxml_clear_errors();
  $radice = $doc->getElementById('radice');
  $pulisci = function (DOMNode $nodo) use (&$pulisci, $doc, $ammessi, $rinomina) {
    foreach (iterator_to_array($nodo->childNodes) as $c) {
      if ($c->nodeType === XML_TEXT_NODE) continue;
      if ($c->nodeType !== XML_ELEMENT_NODE) { $nodo->removeChild($c); continue; }
      $tag = strtolower($c->nodeName);
      if (in_array($tag, ['script', 'style', 'iframe', 'object', 'embed', 'form', 'svg', 'math', 'template'], true)) { $nodo->removeChild($c); continue; }
      $pulisci($c);
      $tag = $rinomina[$tag] ?? $tag;
      if (!in_array($tag, $ammessi, true)) {
        while ($c->firstChild) $nodo->insertBefore($c->firstChild, $c);
        $nodo->removeChild($c);
        continue;
      }
      $n = $doc->createElement($tag);
      while ($c->firstChild) $n->appendChild($c->firstChild);
      if ($tag === 'a') {
        $href = trim($c->getAttribute('href'));
        /* link non sicuri (javascript:, data:…): resta solo il testo */
        if (!preg_match('#^(https?://|/|mailto:|tel:)#i', $href)) {
          while ($n->firstChild) $nodo->insertBefore($n->firstChild, $c);
          $nodo->removeChild($c);
          continue;
        }
        $n->setAttribute('href', $href);
        if (preg_match('#^https?://#i', $href) && stripos($href, SITO) !== 0) { $n->setAttribute('target', '_blank'); $n->setAttribute('rel', 'noopener'); }
      }
      $nodo->replaceChild($n, $c);
    }
  };
  $pulisci($radice);
  $out = '';
  foreach ($radice->childNodes as $c) $out .= $doc->saveHTML($c);
  $out = preg_replace('#<p>(\s|&nbsp;|<br>)*</p>#', '', $out);
  return trim(preg_replace('#(</(?:h2|h3|p|ul|ol)>)\s*#', "$1\n", $out));
}
