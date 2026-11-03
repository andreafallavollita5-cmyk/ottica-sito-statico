<?php
/* Cambio password */
define('OMR', 1);
require __DIR__ . '/lib.php';
richiedi_accesso();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  verifica_token();
  try {
    if (!password_verify((string)($_POST['attuale'] ?? ''), utente()['hash'])) throw new RuntimeException('La password attuale non è corretta.');
    if (($_POST['nuova'] ?? '') !== ($_POST['conferma'] ?? '')) throw new RuntimeException('Le due password nuove non coincidono.');
    con_blocco(function () { imposta_password((string)$_POST['nuova']); });
    entra();
    avviso('Password cambiata.');
    vai('/gestione/');
  } catch (RuntimeException $ex) {
    avviso($ex->getMessage(), 'errore');
    vai('/gestione/password.php');
  }
}

testa('Cambia password');
echo '<form method="post" class="scheda stretta">' . campo_token();
echo '<label>Password attuale<input type="password" name="attuale" required autocomplete="current-password"></label>';
echo '<label>Nuova password <span class="nota">(almeno 10 caratteri)</span><input type="password" name="nuova" required minlength="10" autocomplete="new-password"></label>';
echo '<label>Ripeti la nuova password<input type="password" name="conferma" required minlength="10" autocomplete="new-password"></label>';
echo '<button class="btn" type="submit">Cambia password</button></form>';
piede();
