<?php
/* Copia dei contenuti (zip di /contenuti, password esclusa).
   Chi gestisce il sito la scompatta nella cartella del progetto prima di rigenerare
   le pagine con node generate.mjs: così le modifiche fatte dal pannello non si perdono. */
define('OMR', 1);
require __DIR__ . '/lib.php';
richiedi_accesso();

if (!class_exists('ZipArchive')) { testa('Copia dei contenuti'); echo '<p class="msg msg--errore">Il server non può creare file zip: scarica la cartella /contenuti via FTP.</p>'; piede(); exit; }

$tmp = tempnam(sys_get_temp_dir(), 'omr');
$zip = new ZipArchive();
$zip->open($tmp, ZipArchive::OVERWRITE);
$it = new RecursiveIteratorIterator(new RecursiveDirectoryIterator(DATI, FilesystemIterator::SKIP_DOTS));
foreach ($it as $f) {
  $rel = 'contenuti/' . str_replace('\\', '/', substr($f->getPathname(), strlen(DATI) + 1));
  if (preg_match('#^contenuti/privato/(utente|tentativi)\.json$|/\.blocco$|\.tmp-#', $rel)) continue;
  $zip->addFile($f->getPathname(), $rel);
}
$zip->close();
header('Content-Type: application/zip');
header('Content-Disposition: attachment; filename="contenuti-ottica-demo-' . date('Y-m-d') . '.zip"');
header('Content-Length: ' . filesize($tmp));
readfile($tmp);
unlink($tmp);
