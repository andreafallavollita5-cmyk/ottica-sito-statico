<?php
/* Montature: foto per Uomo, Donna, Bambino × Vista, Sole.
   I dati vanno in /contenuti/montature.json, letto da modern.js nelle pagine /uomo/, /donna/, /bambino/. */
define('OMR', 1);
require __DIR__ . '/lib.php';
richiedi_accesso();

const CATEGORIE = ['uomo' => 'Uomo', 'donna' => 'Donna', 'bambino' => 'Bambino'];
const TIPI = ['vista' => 'Occhiali da vista', 'sole' => 'Occhiali da sole'];
$marchi = leggi_json(MODELLI . '/marchi.json');
$file = DATI . '/montature.json';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  verifica_token();
  try {
    con_blocco(function () use ($file) {
      $lista = leggi_json($file);
      $azione = (string)($_POST['azione'] ?? '');
      $id = (string)($_POST['id'] ?? '');
      $i = array_search($id, array_column($lista, 'id'), true);
      if ($azione === 'aggiungi') {
        $cat = (string)($_POST['cat'] ?? ''); $tipo = (string)($_POST['tipo'] ?? '');
        if (!array_key_exists($cat, CATEGORIE) || !array_key_exists($tipo, TIPI)) throw new RuntimeException('Scegli la categoria e il tipo.');
        $img = apri_caricamento('foto');
        /* 4:3, come la griglia sul sito */
        $q = inquadratura(); $z = is_array($q) ? $q['zoom'] : 1;
        $w = (int)min(1600, imagesx($img) / $z, imagesy($img) * 4 / 3 / $z);
        $taglio = ritaglia($img, $w, (int)round($w * 3 / 4), $q);
        imagedestroy($img);
        $marca = mb_substr(trim((string)($_POST['marca'] ?? '')), 0, 60);
        $nome = mb_substr(trim((string)($_POST['nome'] ?? '')), 0, 80);
        $foto = salva_misure($taglio, '/contenuti/foto', 'montatura-' . nome_file("$cat $marca"));
        imagedestroy($taglio);
        array_unshift($lista, ['id' => bin2hex(random_bytes(6)), 'cat' => $cat, 'tipo' => $tipo, 'marca' => $marca, 'nome' => $nome, 'foto' => $foto, 'data' => date('c')]);
        avviso('Montatura pubblicata in ' . CATEGORIE[$cat] . ' · ' . TIPI[$tipo] . '.');
      } elseif ($i !== false && $azione === 'elimina') {
        elimina_misure($lista[$i]['foto']['src']);
        array_splice($lista, $i, 1);
        avviso('Montatura eliminata.');
      } elseif ($i !== false && ($azione === 'su' || $azione === 'giu')) {
        /* sposta tra le montature della stessa sezione */
        $stessa = array_keys(array_filter($lista, function ($m) use ($lista, $i) { return $m['cat'] === $lista[$i]['cat'] && $m['tipo'] === $lista[$i]['tipo']; }));
        $k = array_search($i, $stessa, true) + ($azione === 'su' ? -1 : 1);
        if (isset($stessa[$k])) { $j = $stessa[$k]; [$lista[$i], $lista[$j]] = [$lista[$j], $lista[$i]]; }
      } elseif ($i !== false && $azione === 'modifica') {
        $lista[$i]['marca'] = mb_substr(trim((string)($_POST['marca'] ?? '')), 0, 60);
        $lista[$i]['nome'] = mb_substr(trim((string)($_POST['nome'] ?? '')), 0, 80);
        avviso('Dati aggiornati.');
      }
      scrivi_json($file, array_values($lista));
    });
  } catch (RuntimeException $ex) {
    avviso($ex->getMessage(), 'errore');
  }
  vai('/gestione/montature.php' . (isset($_POST['cat'], $_POST['tipo']) ? '?cat=' . urlencode($_POST['cat']) . '&tipo=' . urlencode($_POST['tipo']) : ''));
}

$lista = leggi_json($file);
$scelta = [$_GET['cat'] ?? 'uomo', $_GET['tipo'] ?? 'vista'];
$opzioni_marchi = '<option value="">—</option>';
foreach ($marchi as $m) $opzioni_marchi .= '<option>' . e($m) . '</option>';

testa('Montature', 'montature.php');
echo '<form method="post" enctype="multipart/form-data" class="scheda nuova">' . campo_token() . '<h2>Aggiungi una montatura</h2>';
echo '<label class="file">Foto<input type="file" name="foto" accept="image/jpeg,image/png,image/webp" required></label>';
echo '<div class="riga"><label>Per<select name="cat">';
foreach (CATEGORIE as $k => $v) echo '<option value="' . $k . '"' . ($scelta[0] === $k ? ' selected' : '') . '>' . $v . '</option>';
echo '</select></label><label>Tipo<select name="tipo">';
foreach (TIPI as $k => $v) echo '<option value="' . $k . '"' . ($scelta[1] === $k ? ' selected' : '') . '>' . $v . '</option>';
echo '</select></label></div>';
echo '<div class="riga"><label>Marca<input name="marca" list="marchi" maxlength="60" placeholder="es. Ray-Ban"></label><label>Modello <span class="nota">(facoltativo)</span><input name="nome" maxlength="80" placeholder="es. Clubmaster"></label></div>';
echo '<datalist id="marchi">' . $opzioni_marchi . '</datalist>';
echo campo_inquadra(4, 3);
echo '<p class="nota">La foto viene ritagliata in formato 4:3: dopo averla scelta puoi ingrandirla e spostarla. Meglio un occhiale su sfondo chiaro e senza riflessi.</p>';
echo '<button class="btn" type="submit" name="azione" value="aggiungi">Pubblica</button></form>';

foreach (CATEGORIE as $cat => $nc) foreach (TIPI as $tipo => $nt) {
  $sezione = array_values(array_filter($lista, function ($m) use ($cat, $tipo) { return $m['cat'] === $cat && $m['tipo'] === $tipo; }));
  echo '<section class="gruppo"><h2>' . $nc . ' · ' . $nt . ' <span class="nota">' . count($sezione) . '</span> <a class="nota" href="/' . $cat . '/#' . $tipo . '" target="_blank" rel="noopener">apri la pagina</a></h2>';
  if (!$sezione) { echo '<p class="nota">Nessuna montatura: sul sito compare "Vieni a scoprirle in negozio".</p></section>'; continue; }
  echo '<div class="griglia-foto">';
  foreach ($sezione as $n => $m) {
    $nasc = '<input type="hidden" name="id" value="' . e($m['id']) . '"><input type="hidden" name="cat" value="' . $cat . '"><input type="hidden" name="tipo" value="' . $tipo . '">';
    echo '<article class="scheda foto"><img src="' . e(str_replace('-1600.webp', '-480.webp', $m['foto']['src'])) . '" alt="" loading="lazy" style="aspect-ratio:4/3">';
    echo '<form method="post" class="dati">' . campo_token() . $nasc . '<input name="marca" list="marchi" value="' . e($m['marca']) . '" placeholder="Marca" aria-label="Marca"><input name="nome" value="' . e($m['nome']) . '" placeholder="Modello" aria-label="Modello"><button class="btn-link" type="submit" name="azione" value="modifica">Salva</button></form>';
    echo '<form method="post" class="azioni">' . campo_token() . $nasc;
    echo '<button type="submit" name="azione" value="su" aria-label="Sposta prima"' . ($n === 0 ? ' disabled' : '') . '>←</button><button type="submit" name="azione" value="giu" aria-label="Sposta dopo"' . ($n === count($sezione) - 1 ? ' disabled' : '') . '>→</button>';
    echo '<button class="btn-link pericolo" type="submit" name="azione" value="elimina" data-conferma="Eliminare?">Elimina</button></form></article>';
  }
  echo '</div></section>';
}
piede();
