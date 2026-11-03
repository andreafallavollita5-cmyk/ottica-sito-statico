<?php
/* Orari straordinari: chiusure e orari ridotti.
   I dati vanno in /contenuti/avvisi.json; modern.js mostra la fascia in cima alle
   pagine da 7 giorni prima fino all'ultimo giorno, poi sparisce da sola. */
define('OMR', 1);
require __DIR__ . '/lib.php';
richiedi_accesso();

const TIPI_AVVISO = ['chiuso' => 'Chiuso', 'ridotto' => 'Orario ridotto', 'info' => 'Comunicazione'];
$file = DATI . '/avvisi.json';
$data_ok = function ($d) { $x = DateTime::createFromFormat('!Y-m-d', (string)$d); return $x && $x->format('Y-m-d') === $d; };

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  verifica_token();
  try {
    con_blocco(function () use ($file, $data_ok) {
      $lista = leggi_json($file);
      if (($_POST['azione'] ?? '') === 'elimina') {
        $lista = array_values(array_filter($lista, function ($a) { return $a['id'] !== ($_POST['id'] ?? ''); }));
        avviso('Avviso eliminato.');
      } else {
        $dal = (string)($_POST['dal'] ?? ''); $al = (string)($_POST['al'] ?? '') ?: $dal;
        $tipo = (string)($_POST['tipo'] ?? '');
        $testo = trim(preg_replace('/\s+/u', ' ', (string)($_POST['testo'] ?? '')));
        if (!$data_ok($dal) || !$data_ok($al)) throw new RuntimeException('Indica le date.');
        if ($al < $dal) throw new RuntimeException('La data di fine viene prima di quella di inizio.');
        if (!array_key_exists($tipo, TIPI_AVVISO)) throw new RuntimeException('Scegli il tipo di avviso.');
        if ($testo === '' || mb_strlen($testo) > 160) throw new RuntimeException('Scrivi un testo breve, al massimo 160 caratteri.');
        $lista[] = ['id' => bin2hex(random_bytes(6)), 'dal' => $dal, 'al' => $al, 'tipo' => $tipo, 'testo' => $testo];
        $da = date('Y-m-d', strtotime("$dal -7 days"));
        avviso('Avviso salvato: ' . ($da <= date('Y-m-d') ? 'è già visibile sul sito' : 'comparirà sul sito dal ' . date('d/m', strtotime($da))) . ' fino al ' . date('d/m', strtotime($al)) . '.');
      }
      /* gli avvisi scaduti da più di un mese si tolgono da soli */
      $limite = date('Y-m-d', strtotime('-30 days'));
      $lista = array_values(array_filter($lista, function ($a) use ($limite) { return $a['al'] >= $limite; }));
      usort($lista, function ($a, $b) { return strcmp($a['dal'], $b['dal']); });
      scrivi_json($file, $lista);
    });
  } catch (RuntimeException $ex) {
    avviso($ex->getMessage(), 'errore');
  }
  vai('/gestione/orari.php');
}

$oggi = date('Y-m-d');
testa('Orari straordinari', 'orari.php');
echo '<p class="intro">L\'avviso compare in cima a tutte le pagine del sito una settimana prima e sparisce da solo dopo l\'ultimo giorno. Gli orari normali non cambiano.</p>';
echo '<form method="post" class="scheda nuova">' . campo_token() . '<h2>Nuovo avviso</h2>';
echo '<div class="riga"><label>Dal<input type="date" name="dal" required min="' . $oggi . '"></label><label>Al <span class="nota">(compreso)</span><input type="date" name="al" min="' . $oggi . '"></label></div>';
echo '<label>Tipo<select name="tipo">';
foreach (TIPI_AVVISO as $k => $v) echo '<option value="' . $k . '">' . $v . '</option>';
echo '</select></label>';
echo '<label>Testo<input name="testo" required maxlength="160" placeholder="es. Chiusi per ferie, riapriamo lunedì 25 agosto alle 15:30."></label>';
echo '<p class="nota">Sul sito le date vengono scritte da sole davanti al testo, ad esempio: <b>Dal 10 agosto al 24 agosto</b> Chiusi per ferie…</p>';
echo '<button class="btn" type="submit" name="azione" value="aggiungi">Salva avviso</button></form>';

$lista = leggi_json($file);
echo '<section class="gruppo"><h2>Avvisi</h2>';
if (!$lista) echo '<p class="nota">Nessun avviso.</p>';
echo '<ul class="avvisi">';
foreach ($lista as $a) {
  $stato = $a['al'] < $oggi ? 'Scaduto' : ($a['dal'] <= date('Y-m-d', strtotime('+7 days')) ? 'Visibile ora' : 'In programma');
  echo '<li class="scheda"><div><b>' . date('d/m/Y', strtotime($a['dal'])) . ($a['al'] !== $a['dal'] ? ' – ' . date('d/m/Y', strtotime($a['al'])) : '') . '</b> · ' . TIPI_AVVISO[$a['tipo']] . ' <span class="etichetta">' . $stato . '</span><p>' . e($a['testo']) . '</p></div>';
  echo '<form method="post">' . campo_token() . '<input type="hidden" name="id" value="' . e($a['id']) . '"><button class="btn-link pericolo" type="submit" name="azione" value="elimina" data-conferma="Eliminare?">Elimina</button></form></li>';
}
echo '</ul></section>';
piede();
