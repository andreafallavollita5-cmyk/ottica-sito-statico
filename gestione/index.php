<?php
/* Ingresso del pannello: primo accesso, login, uscita e pagina iniziale */
define('OMR', 1);
require __DIR__ . '/lib.php';

if (isset($_GET['esci'])) {
  verifica_token();
  $_SESSION = [];
  session_destroy();
  vai('/gestione/');
}

$errore = '';
$primo = utente() === null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  verifica_token();
  try {
    if ($fino = bloccato()) throw new RuntimeException('Troppi tentativi sbagliati. Riprova alle ' . date('H:i', $fino) . '.');
    if ($primo) {
      if (!hash_equals(CODICE_ATTIVAZIONE, strtoupper(trim((string)($_POST['codice'] ?? ''))))) { tentativo(false); throw new RuntimeException('Il codice di attivazione non è corretto.'); }
      if (($_POST['password'] ?? '') !== ($_POST['conferma'] ?? '')) throw new RuntimeException('Le due password non coincidono.');
      con_blocco(function () { imposta_password((string)$_POST['password']); });
      tentativo(true);
      entra();
      avviso('Password impostata. Da ora entri solo con questa.');
      vai('/gestione/');
    }
    if (!password_verify((string)($_POST['password'] ?? ''), utente()['hash'])) { tentativo(false); throw new RuntimeException('Password non corretta.'); }
    tentativo(true);
    entra();
    vai('/gestione/');
  } catch (RuntimeException $ex) {
    $errore = $ex->getMessage();
  }
}

if (!connesso()) {
  testa($primo ? 'Primo accesso' : 'Accedi');
  if ($errore) echo '<p class="msg msg--errore" role="alert">' . e($errore) . '</p>';
  echo '<form method="post" class="scheda stretta">' . campo_token();
  if ($primo) {
    echo '<p>Inserisci il codice di attivazione che ti ha dato chi ha realizzato il sito, poi scegli la tua password (almeno 10 caratteri).</p>';
    echo '<label>Codice di attivazione<input name="codice" required autocomplete="off" autocapitalize="characters"></label>';
    echo '<label>Nuova password<input type="password" name="password" required minlength="10" autocomplete="new-password"></label>';
    echo '<label>Ripeti la password<input type="password" name="conferma" required minlength="10" autocomplete="new-password"></label>';
  } else {
    echo '<label>Password<input type="password" name="password" required autofocus autocomplete="current-password"></label>';
  }
  echo '<button class="btn" type="submit">' . ($primo ? 'Imposta e entra' : 'Entra') . '</button></form>';
  piede();
  exit;
}

richiedi_accesso();
testa('Cosa vuoi aggiornare?');
if (!webp_disponibile()) echo '<p class="msg msg--errore">Attenzione: il server non supporta le immagini WebP, quindi il caricamento delle foto non funzionerà. Avvisa chi gestisce il sito.</p>';
$oggi = date('Y-m-d');
$attivi = array_filter(leggi_json(DATI . '/avvisi.json'), function ($a) use ($oggi) { return $a['al'] >= $oggi; });
$bozze = array_filter(articoli(), function ($a) { return $a['stato'] !== 'pubblicato'; });
$n = function ($k, $uno, $tanti) { return $k . ' ' . ($k === 1 ? $uno : $tanti); };
$schede = [
  ['foto.php', 'Foto del sito', 'Sostituisci le foto delle pagine con foto nuove del negozio.', $n(count(mappa_foto()), 'foto cambiata', 'foto cambiate') . ' finora'],
  ['montature.php', 'Montature', 'Carica le foto degli occhiali per Uomo, Donna e Bambino.', $n(count(leggi_json(DATI . '/montature.json')), 'montatura online', 'montature online')],
  ['orari.php', 'Orari straordinari', 'Ferie, chiusure, festività e orari ridotti.', count($attivi) ? $n(count($attivi), 'avviso in programma', 'avvisi in programma') : 'Nessun avviso in programma'],
  ['articoli.php', 'Articoli', 'Scrivi un nuovo articolo o correggi quelli del blog.', $n(count(pubblicati(articoli())), 'pubblicato', 'pubblicati') . (count($bozze) ? ', ' . count($bozze) . ' in bozza' : '')],
];
echo '<div class="menu-grande">';
foreach ($schede as [$href, $titolo, $testo, $stato]) echo '<a class="scheda voce" href="/gestione/' . $href . '"><h2>' . $titolo . '</h2><p>' . $testo . '</p><span>' . e($stato) . '</span></a>';
echo '</div>';
echo '<section class="scheda"><h2>Altro</h2><ul class="elenco-link"><li><a href="/gestione/password.php">Cambia password</a></li><li><a href="/gestione/copia.php">Scarica una copia dei contenuti</a> <span class="nota">(per chi gestisce il sito, prima di ogni aggiornamento tecnico)</span></li></ul></section>';
piede();
