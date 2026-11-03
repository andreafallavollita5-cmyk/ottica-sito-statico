<?php
/* Foto del sito: sostituzione e ripristino.
   La foto nuova prende le stesse proporzioni e misure dell'originale e un nome nuovo
   (le foto restano in cache nei browser per un anno: con lo stesso nome non si
   vedrebbe il cambio). Tutte le pagine vengono aggiornate al nuovo nome. */
define('OMR', 1);
require __DIR__ . '/lib.php';
richiedi_accesso();

$cat = [];
foreach (catalogo() as $f) $cat[$f['base']] = $f;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  verifica_token();
  $base = (string)($_POST['base'] ?? '');
  try {
    if (!isset($cat[$base])) throw new RuntimeException('Foto non trovata nel catalogo.');
    $f = $cat[$base];
    con_blocco(function () use ($f, $base) {
      $mappa = mappa_foto();
      if (($_POST['azione'] ?? '') === 'ripristina') {
        sostituisci_foto_nel_sito($f, $f['file']);
        unset($mappa[$base]);
        scrivi_json(PRIV . '/foto-sito.json', $mappa);
        pulisci_versioni($f, []);
        avviso('Foto originale ripristinata in tutte le pagine.');
        return;
      }
      $img = apri_caricamento('foto');
      $taglio = ritaglia($img, $f['w'], $f['h'], inquadratura());
      imagedestroy($img);
      /* versione = data e ora: sempre nuova, anche dopo un ripristino, quindi niente cache vecchie */
      $v = date('ymdHis');
      $nome = nome_foto($base) . '-v' . $v;
      salva_misure($taglio, '/contenuti/foto-sito', $nome);
      imagedestroy($taglio);
      $nuovi = [];
      foreach ($f['file'] as $w => $orig) $nuovi[$w] = "/contenuti/foto-sito/$nome-$w.webp";
      $n = sostituisci_foto_nel_sito($f, $nuovi);
      $mappa[$base] = ['v' => $v, 'file' => array_combine(array_values($f['file']), array_values($nuovi)), 'data' => date('c')];
      scrivi_json(PRIV . '/foto-sito.json', $mappa);
      pulisci_versioni($f, array_values($nuovi));
      avviso('Foto sostituita: ' . ($n === 1 ? 'aggiornata 1 pagina.' : "aggiornate $n pagine."));
    });
  } catch (RuntimeException $ex) {
    avviso($ex->getMessage(), 'errore');
  }
  vai('/gestione/foto.php#f-' . md5($base));
}

/* raggruppate per la prima pagina in cui compaiono; la home per prima */
$mappa = mappa_foto();
$gruppi = [];
foreach ($cat as $f) {
  $p = $f['pagine'][0];
  foreach ($f['pagine'] as $q) if ($q['url'] === '/') $p = $q;
  $gruppi[$p['url']]['titolo'] = $p['url'] === '/' ? 'Home' : $p['titolo'];
  $gruppi[$p['url']]['foto'][] = $f;
}
uksort($gruppi, function ($a, $b) { return $a === '/' ? -1 : ($b === '/' ? 1 : strcmp($a, $b)); });

testa('Foto del sito', 'foto.php');
echo '<p class="intro">Scegli la foto da cambiare e carica quella nuova. Viene ritagliata automaticamente con le stesse proporzioni, così la pagina resta in ordine: dopo aver scelto la foto puoi ingrandirla e spostarla per scegliere la parte da tenere. Puoi sempre tornare alla foto originale.</p>';
echo '<nav class="indice">';
foreach ($gruppi as $url => $g) echo '<a href="#g-' . md5($url) . '">' . e($g['titolo']) . '</a>';
echo '</nav>';
foreach ($gruppi as $url => $g) {
  echo '<section class="gruppo" id="g-' . md5($url) . '"><h2>' . e($g['titolo']) . ' <a class="nota" href="' . e($url) . '" target="_blank" rel="noopener">apri la pagina</a></h2><div class="griglia-foto">';
  foreach ($g['foto'] as $f) {
    $cambiata = isset($mappa[$f['base']]);
    $vista = $cambiata ? $mappa[$f['base']]['file'][$f['file']['480']] : $f['file']['480'];
    $altre = array_filter($f['pagine'], function ($p) use ($url) { return $p['url'] !== $url; });
    echo '<article class="scheda foto" id="f-' . md5($f['base']) . '"><img src="' . e($vista) . '" alt="" loading="lazy" style="aspect-ratio:' . $f['w'] . '/' . $f['h'] . '">';
    echo '<p class="nota">' . ($cambiata ? '<span class="cambiata">✓ Già sostituita</span> · ' : '') . ($f['w'] > $f['h'] ? 'Orizzontale' : ($f['w'] < $f['h'] ? 'Verticale' : 'Quadrata')) . ($altre ? ' · compare anche in ' . count($altre) . ' altre pagine' : '') . '</p>';
    echo '<form method="post" enctype="multipart/form-data" class="carica">' . campo_token() . '<input type="hidden" name="base" value="' . e($f['base']) . '">';
    echo '<label class="file">Nuova foto<input type="file" name="foto" accept="image/jpeg,image/png,image/webp" required></label>';
    echo campo_inquadra($f['w'], $f['h']);
    echo '<button class="btn" type="submit" name="azione" value="sostituisci">Sostituisci</button></form>';
    if ($cambiata) echo '<form method="post" class="ripristina">' . campo_token() . '<input type="hidden" name="base" value="' . e($f['base']) . '"><button class="btn-link" type="submit" name="azione" value="ripristina" data-conferma="Tornare alla foto di prima?">Ripristina originale</button></form>';
    echo '</article>';
  }
  echo '</div></section>';
}
piede();
