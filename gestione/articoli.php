<?php
/* Articoli del blog: scrittura, modifica, bozze e pubblicazione.
   I dati stanno in /contenuti/privato/articoli.json; alla pubblicazione le pagine
   /blog/ vengono riscritte come file statici dai modelli in gestione/modelli/. */
define('OMR', 1);
require __DIR__ . '/lib.php';
richiedi_accesso();

$file = PRIV . '/articoli.json';

function slug_unico($titolo, $lista) {
  $base = substr(trim(preg_replace('/[^a-z0-9]+/', '-', strtolower(iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $titolo))), '-'), 0, 70);
  $base = trim(preg_replace('/-[^-]*$/', '', $base . '-'), '-') ?: 'articolo';
  $s = $base; $n = 2;
  while (in_array($s, array_column($lista, 'slug'), true) || is_dir(ROOT . '/blog/' . $s)) $s = $base . '-' . $n++;
  return $s;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  verifica_token();
  $dove = '/gestione/articoli.php';
  try {
    $dove = con_blocco(function () use ($file) {
      $lista = leggi_json($file);
      $slug = (string)($_POST['slug'] ?? '');
      $i = array_search($slug, array_column($lista, 'slug'), true);
      $azione = (string)($_POST['azione'] ?? '');
      $rimossi = [];
      if ($azione === 'elimina') {
        if ($i === false) throw new RuntimeException('Articolo non trovato.');
        if ($lista[$i]['stato'] === 'pubblicato') $rimossi[] = $slug;
        if (strpos($lista[$i]['foto']['src'], '/contenuti/foto/') === 0) elimina_misure($lista[$i]['foto']['src']);
        array_splice($lista, $i, 1);
        scrivi_json($file, $lista);
        pubblica_blog($lista, $rimossi);
        avviso('Articolo eliminato.');
        return '/gestione/articoli.php';
      }
      $a = $i === false ? ['slug' => '', 'stato' => 'bozza', 'foto' => null] : $lista[$i];
      $prima = $a['stato'];
      foreach (['titolo' => 120, 'categoria' => 40, 'riassunto' => 220, 'intro' => 600, 'chiusura' => 200] as $k => $max) {
        $a[$k] = mb_substr(trim(preg_replace('/\s+/u', ' ', (string)($_POST[$k] ?? ''))), 0, $max);
      }
      $a['corpo'] = pulisci_html((string)($_POST['corpo'] ?? ''));
      $a['stato'] = $azione === 'pubblica' ? 'pubblicato' : 'bozza';
      $a['aggiornato'] = date('Y-m-d');
      $manca = [];
      foreach (['titolo' => 'il titolo', 'categoria' => 'la categoria', 'riassunto' => 'il riassunto', 'intro' => 'l\'introduzione'] as $k => $n) if ($a[$k] === '') $manca[] = $n;
      if (trim(strip_tags($a['corpo'])) === '') $manca[] = 'il testo';
      /* la bozza si salva anche incompleta, la pubblicazione no */
      if ($a['stato'] === 'pubblicato' && $manca) throw new RuntimeException('Per pubblicare manca ' . implode(', ', $manca) . '. Puoi intanto salvarlo come bozza.');
      if ($a['titolo'] === '') throw new RuntimeException('Scrivi almeno il titolo.');
      if (!empty($_FILES['foto']) && $_FILES['foto']['error'] !== UPLOAD_ERR_NO_FILE) {
        $img = apri_caricamento('foto');
        /* 16:9 come le copertine attuali */
        $q = inquadratura(); $z = is_array($q) ? $q['zoom'] : 1;
        $w = (int)min(1600, imagesx($img) / $z, imagesy($img) * 16 / 9 / $z);
        $taglio = ritaglia($img, $w, (int)round($w * 9 / 16), $q);
        imagedestroy($img);
        if ($a['foto'] && strpos($a['foto']['src'], '/contenuti/foto/') === 0) elimina_misure($a['foto']['src']);
        $a['foto'] = salva_misure($taglio, '/contenuti/foto', 'articolo-' . nome_file($a['titolo']));
        imagedestroy($taglio);
      }
      if (!$a['foto']) {
        if ($a['stato'] === 'pubblicato') throw new RuntimeException('Per pubblicare serve una foto di copertina.');
      } else {
        $a['foto']['alt'] = mb_substr(trim((string)($_POST['alt'] ?? '')), 0, 160) ?: $a['titolo'];
      }
      if ($i === false) { $a['slug'] = slug_unico($a['titolo'], $lista); array_unshift($lista, $a); }
      else $lista[$i] = $a;
      if ($prima === 'pubblicato' && $a['stato'] !== 'pubblicato') $rimossi[] = $a['slug'];
      scrivi_json($file, $lista);
      pubblica_blog($lista, $rimossi);
      avviso($a['stato'] === 'pubblicato' ? 'Articolo pubblicato.' : ($prima === 'pubblicato' ? 'Articolo tolto dal sito e salvato come bozza.' : 'Bozza salvata: non è visibile sul sito.'));
      return '/gestione/articoli.php?slug=' . urlencode($a['slug']);
    });
  } catch (RuntimeException $ex) {
    /* il testo scritto non si perde: lo ripresentiamo nel modulo */
    $_SESSION['bozza'] = $_POST;
    avviso($ex->getMessage(), 'errore');
    $dove = '/gestione/articoli.php?' . (($_POST['slug'] ?? '') !== '' ? 'slug=' . urlencode($_POST['slug']) : 'nuovo=1');
  }
  vai($dove);
}

$lista = leggi_json($file);

/* anteprima, anche delle bozze: la pagina come apparirà, senza indicizzazione */
if (isset($_GET['anteprima'])) {
  $i = array_search((string)$_GET['anteprima'], array_column($lista, 'slug'), true);
  if ($i === false || !$lista[$i]['foto']) vai('/gestione/articoli.php');
  echo str_replace('<head>', '<head><meta name="robots" content="noindex, nofollow">', pagina_articolo($lista, $lista[$i]));
  exit;
}

if (isset($_GET['slug']) || isset($_GET['nuovo'])) {
  $i = isset($_GET['slug']) ? array_search((string)$_GET['slug'], array_column($lista, 'slug'), true) : false;
  if (isset($_GET['slug']) && $i === false) vai('/gestione/articoli.php');
  $a = $i === false ? ['slug' => '', 'titolo' => '', 'categoria' => '', 'riassunto' => '', 'intro' => '', 'corpo' => '', 'chiusura' => '', 'foto' => null, 'stato' => 'bozza'] : $lista[$i];
  if (!empty($_SESSION['bozza'])) { $b = $_SESSION['bozza']; foreach (['titolo', 'categoria', 'riassunto', 'intro', 'corpo', 'chiusura'] as $k) $a[$k] = (string)($b[$k] ?? $a[$k]); $a['corpo'] = pulisci_html($a['corpo']); unset($_SESSION['bozza']); }
  $categorie = array_unique(array_filter(array_column($lista, 'categoria')));

  testa($i === false ? 'Nuovo articolo' : 'Modifica articolo', 'articoli.php');
  echo '<p><a href="/gestione/articoli.php">← Tutti gli articoli</a>' . ($a['slug'] && $a['foto'] ? ' · <a href="?anteprima=' . e($a['slug']) . '" target="_blank" rel="noopener">Anteprima</a>' : '') . ($a['stato'] === 'pubblicato' ? ' · <a href="/blog/' . e($a['slug']) . '/" target="_blank" rel="noopener">Vedi sul sito</a>' : '') . '</p>';
  echo '<form method="post" enctype="multipart/form-data" class="scheda articolo" id="articolo">' . campo_token() . '<input type="hidden" name="slug" value="' . e($a['slug']) . '">';
  echo '<p class="stato">Stato: <span class="etichetta">' . ($a['stato'] === 'pubblicato' ? 'Pubblicato' : 'Bozza, non visibile') . '</span></p>';
  echo '<label>Titolo<input name="titolo" required maxlength="120" value="' . e($a['titolo']) . '"></label>';
  echo '<div class="riga"><label>Categoria<input name="categoria" list="categorie" maxlength="40" value="' . e($a['categoria']) . '" placeholder="es. Salute visiva"></label></div><datalist id="categorie">';
  foreach ($categorie as $c) echo '<option>' . e($c) . '</option>';
  echo '</datalist>';
  echo '<label>Riassunto <span class="nota">(compare nell\'elenco del blog e su Google, circa 150 caratteri)</span><textarea name="riassunto" rows="2" maxlength="220" data-conta="160">' . e($a['riassunto']) . '</textarea></label>';
  echo '<label>Introduzione <span class="nota">(il paragrafo in grande sotto il titolo)</span><textarea name="intro" rows="3" maxlength="600">' . e($a['intro']) . '</textarea></label>';
  echo '<fieldset class="copertina"><legend>Foto di copertina</legend>';
  if ($a['foto']) echo '<img src="' . e(str_replace('-1600.webp', '-480.webp', $a['foto']['src'])) . '" alt="">';
  echo '<label class="file">' . ($a['foto'] ? 'Cambia foto' : 'Scegli la foto') . '<input type="file" name="foto" accept="image/jpeg,image/png,image/webp"></label>';
  echo campo_inquadra(16, 9);
  echo '<label>Descrizione della foto <span class="nota">(per chi non vede le immagini e per Google)</span><input name="alt" maxlength="160" value="' . e($a['foto']['alt'] ?? '') . '"></label></fieldset>';
  echo '<div class="editor"><span class="etichetta-campo">Testo</span><div class="strumenti" role="toolbar" aria-label="Formattazione" hidden>';
  echo '<button type="button" data-cmd="h2">Titoletto</button><button type="button" data-cmd="p">Paragrafo</button><button type="button" data-cmd="bold"><b>G</b></button><button type="button" data-cmd="italic"><i>C</i></button><button type="button" data-cmd="insertUnorderedList">• Elenco</button><button type="button" data-cmd="insertOrderedList">1. Elenco</button><button type="button" data-cmd="link">Link</button><button type="button" data-cmd="unlink">Togli link</button></div>';
  echo '<div class="area prose" contenteditable="true" hidden></div><textarea name="corpo" rows="16">' . e($a['corpo']) . '</textarea></div>';
  echo '<label>Frase finale <span class="nota">(facoltativa, in evidenza in fondo)</span><input name="chiusura" maxlength="200" value="' . e($a['chiusura']) . '"></label>';
  echo '<div class="pulsanti"><button class="btn" type="submit" name="azione" value="pubblica">' . ($a['stato'] === 'pubblicato' ? 'Aggiorna sul sito' : 'Pubblica') . '</button><button class="btn btn--chiaro" type="submit" name="azione" value="bozza" formnovalidate>' . ($a['stato'] === 'pubblicato' ? 'Togli dal sito (bozza)' : 'Salva bozza') . '</button></div></form>';
  if ($a['slug']) echo '<form method="post" class="elimina">' . campo_token() . '<input type="hidden" name="slug" value="' . e($a['slug']) . '"><button class="btn-link pericolo" type="submit" name="azione" value="elimina" data-conferma="Eliminarlo per sempre?">Elimina articolo</button></form>';
  piede();
  exit;
}

testa('Articoli', 'articoli.php');
echo '<p><a class="btn" href="?nuovo=1">Scrivi un nuovo articolo</a></p>';
echo '<ul class="articoli">';
foreach ($lista as $a) {
  echo '<li class="scheda"><a href="?slug=' . e($a['slug']) . '">' . ($a['foto'] ? '<img src="' . e(str_replace('-1600.webp', '-480.webp', $a['foto']['src'])) . '" alt="" loading="lazy">' : '<span class="senza-foto"></span>') . '<span><b>' . e($a['titolo']) . '</b><span class="nota">' . e($a['categoria']) . ' · ' . ($a['stato'] === 'pubblicato' ? 'Pubblicato' : '<span class="etichetta">Bozza</span>') . ' · aggiornato il ' . date('d/m/Y', strtotime($a['aggiornato'])) . '</span></span></a></li>';
}
echo '</ul>';
piede();
