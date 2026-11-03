/* ==========================================================================
   redirects.mjs — genera .htaccess (301) + redirects-301.csv
   Mappa i 185 URL del sito attuale verso la nuova struttura.
   ========================================================================== */
import { readFileSync, writeFileSync } from "node:fs";

const SITE = "https://www.example.com";
const read = (f) => readFileSync(`seo-src/${f}.txt`, "utf8").split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
const path = (u) => u.replace(SITE, "") || "/";

const pages = read("page").map(path);
const posts = read("post").map(path);
const cats = read("category").map(path);
const tags = read("post_tag").map(path);

/* ---------- regole ---------- */
const rules = [];
const add = (from, to, why) => rules.push({ from, to, why });

/* pagine esistenti che mantengono la rotta */
const keep = ["/", "/chi-siamo/", "/contatti/", "/servizi/", "/dove-siamo/", "/prenota/", "/sostenibilita/"];

for (const p of pages) {
  if (keep.includes(p)) continue;
  if (p === "/vetrina/") add(p, "/chi-siamo/", "vetrina foto negozio");
  else if (p === "/prodotti-marchi/") add(p, "/promozioni/", "marchi e prodotti");
  else if (p === "/prova-meteo/") add(p, "/", "widget meteo rimosso");
  else if (p === "/cookie-policy-ue/") add(p, "/", "pagina legale rimossa su richiesta");
  else if (p === "/termini-e-condizioni/") add(p, "/", "pagina legale rimossa su richiesta");
  else add(p, "/", "pagina non più presente");
}

/* post: glossario -> nessuna pagina (rimosso su richiesta) -> /curiosita/ */
const GLOSSARIO = new Set([
  "aberrazione","accomodazione","acutezza-visiva","afachia","ambliopia","ametropia","aniseiconia","anisoforia",
  "anisometropia","annebbiamento","antimetropia","aste","astenopia","astigmatismo","bifocale","binoculare",
  "biocurare","calibro","campimetria","cataratta","cerniera","cheratometria","ciclopegia","conoide-di-sturm",
  "convergenza","cornea","cristallino","cvs","decimi","diottria","diplopia","distorsione","divergenza",
  "emmetropia","effetto-prismatico","fotofobia","frontale","frontifocometro","ipermetropia","ipovisione",
  "midriasi","miodesopsie","miopia","montatura","multifocale","neutra","occhio","placchette","polarizzazione",
  "ponte","presbiopia","pupilla","refrazione","rifrazione","riflessione","scotoma","senso-cromatico",
  "tonometria","topografia-corneale","vergenza","visus"
]);

/* le 9 voci numerate confluiscono nell'articolo unito */
const COSE_DA_EVITARE = new Set([
  "luce-intensa","luce-intensa-2","protezione-sport","cattiva-manutenzione","cure-pericolose","non-ammiccare",
  "dormire-con-le-lenti-a-contatto","eyeballing","ambienti-estremi","lavori-pericolosi","ignorare-segnali"
]);

/* le 10 valutazioni confluiscono in "Ci vedo bene?" */
const CI_VEDO_BENE = new Set([
  "ci-vedo-bene","test-1","occhi-stanchi-a-fine-giornata","test-3","test-4","test-5","test-6","test-7","test-8",
  "scritte-luminose","prevenzione"
]);

/* curiosità e info generiche */
const MISC = {
  "il-tuo-ottico": "/chi-siamo/",
  "sostenibilita": "/sostenibilita/",
  "promo-lenti": "/promozioni/",
  "multi-equipaggiamento": "/promozioni/",
  "buoni-regalo": "/buono-regalo/",
  "convenzioni": "/convenzioni/",
  "orari": "/orari/",
  "orario": "/orari/",
  "privacy-policy": "/",
  "programma-assicura-valore-formula-kasco": "/promozioni/",
  "sindrome-da-disfunzione-del-film-lacrimale": "/servizi/",
  "non-ho-tempo-di-andare-a-fare-una-visita-dalloculista": "/curiosita/ci-vedo-bene/",
  "prima-con-gli-occhiali-vedevo-bene-a-tutte-le-distanze": "/curiosita/ci-vedo-bene/",
  "le-lenti-degli-occhiali-sono-sempre-opache-o-sporche": "/curiosita/ci-vedo-bene/",
  "sento-fastidio-con-una-lente-a-contatto": "/curiosita/ci-vedo-bene/",
  "improvvisamente-con-gli-occhiali-non-vedo-piu-come-prima": "/curiosita/ci-vedo-bene/",
  "il-mio-occhiale-non-mi-sta-piu-in-faccia": "/curiosita/ci-vedo-bene/",
  "ce-correlazione-tra-vista-e-udito": "/curiosita/ci-vedo-bene/",
  "differenze-tra-occhiali-per-vicino": "/blog/lenti-progressive-come-sceglierle/",
  "si-puo-curare-la-miopia": "/blog/miopia-bambini-come-rallentarla/",
  "miopia-che-cosa-e-come-si-manifesta-fattori-di-rischio-come-si-puo-gestire": "/blog/miopia-bambini-come-rallentarla/",
  "lenti-progressive-e-lenti-office-pregi-qualita-e-vantaggi-di-utilizzo": "/blog/lenti-progressive-come-sceglierle/",
  "lenti-progressive-o-multifocali-e-lenti-office-o-degressive-pregi-qualita-e-vantaggi-di-utilizzo": "/blog/lenti-progressive-come-sceglierle/",
  "lenti-a-contatto": "/blog/lenti-a-contatto-guida/",
  "portalenti-a-contatto": "/blog/lenti-a-contatto-guida/",
  "lenti-d-ingrandimento-con-luce-led": "/servizi/",
  "senso-cromatico-2": "/curiosita/",
  "webee-eyewear-to-aid-the-bees": "/sostenibilita/",
  "ipovisione-2": "/servizi/",
  "articoli-per-ipovedenti": "/servizi/",
  "astucci": "/servizi/",
  "catenelle-e-cordoncini": "/servizi/",
  "microfibre": "/servizi/",
  "spray-clean": "/servizi/",
  "occhiali-storti": "/servizi/",
  "ferie-2026": "/orari/"
};

let glossarioHits = 0, coseHits = 0, valHits = 0, miscHits = 0, fallback = 0;

for (const p of posts) {
  const slug = p.replace(/^\/\d{4}\/\d{2}\/\d{2}\//, "").replace(/\/$/, "");

  if (COSE_DA_EVITARE.has(slug)) { add(p, "/curiosita/10-cose-da-evitare/", "unito nell'articolo 10 cose da evitare"); coseHits++; }
  else if (CI_VEDO_BENE.has(slug)) { add(p, "/curiosita/ci-vedo-bene/", "unito in Ci vedo bene"); valHits++; }
  else if (GLOSSARIO.has(slug)) { add(p, "/curiosita/", "glossario rimosso su richiesta"); glossarioHits++; }
  else if (MISC[slug]) { add(p, MISC[slug], "contenuto trasferito"); miscHits++; }
  else if (/^slider-/.test(slug)) { add(p, "/", "slide della vecchia home"); fallback++; }
  else { add(p, "/", "contenuto non ripreso"); fallback++; }
}

/* categorie e tag: le pagine di archivio non esistono più */
for (const c of cats) add(c, c.includes("glossario") ? "/curiosita/" : "/blog/", "archivio categoria rimosso");
for (const t of tags) add(t, "/blog/", "archivio tag rimosso");

/* contenuti pubblicati mancanti da seo-src, ricavati dal backup del database WordPress */
add("/home/", "/", "vecchia pagina Home");
add("/2025/10/15/programma-assicura-valore-formula-kasco/", "/promozioni/", "contenuto trasferito");

/* ---------- .htaccess ---------- */
const lines = [];
lines.push("# ==========================================================================");
lines.push("# Ottica Demo — redirect 301 dal sito WordPress precedente");
lines.push("# Generato automaticamente. Non modificare a mano: rigenerare con redirects.mjs");
lines.push("# ==========================================================================");
lines.push("");
lines.push("# il sito è statico: la home è index.html, anche se resta un vecchio index.php");
lines.push("DirectoryIndex index.html");
lines.push("");
lines.push("<IfModule mod_rewrite.c>");
lines.push("RewriteEngine On");
lines.push("");
lines.push("# forza https e www");
lines.push("RewriteCond %{HTTPS} off [OR]");
lines.push("RewriteCond %{HTTP_HOST} !^www\\. [NC]");
lines.push("RewriteRule ^(.*)$ https://www.example.com/$1 [R=301,L]");
lines.push("");
lines.push("# il vecchio WordPress resta sul server ma è spento: 410 Gone");
lines.push("RewriteRule ^(wp-admin|wp-content|wp-includes|vecchio-wordpress)(/|$) - [G,L]");
lines.push("RewriteRule ^(index\\.php|ver\\.php|xmlrpc\\.php|wp-[^/]+\\.php|readme\\.html|license\\.txt|llms\\.txt)$ - [G,L]");
lines.push("");
lines.push("# --- redirect specifici (i più lunghi per primi) ---");
lines.push("# un solo salto, barra finale facoltativa, destinazione https assoluta (Aruba è dietro un proxy)");
lines.push("");

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const sorted = [...rules].sort((a, b) => b.from.length - a.from.length);
for (const r of sorted) {
  const from = escape(r.from.replace(/^\//, "").replace(/\/$/, ""));
  lines.push(`# ${r.why}`);
  lines.push(`RewriteRule ^${from}(/.*)?$ ${SITE}${r.to} [R=301,L]`);
}

lines.push("");
lines.push("# rimuovi la barra finale duplicata");
lines.push("RewriteCond %{REQUEST_FILENAME} !-d");
// E=SENZACACHE: un articolo non ancora pubblicato non deve restare rediretto nella cache di Aruba
lines.push(`RewriteRule ^(.+)/$ ${SITE}/$1 [R=301,L,E=SENZACACHE:1]`);
lines.push("");
lines.push("</IfModule>");
lines.push("");
lines.push("# --- compressione ---");
lines.push("<IfModule mod_deflate.c>");
lines.push("  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json image/svg+xml");
lines.push("</IfModule>");
lines.push("");
lines.push("# --- cache ---");
lines.push("<IfModule mod_expires.c>");
lines.push("  ExpiresActive On");
lines.push("  ExpiresByType image/webp \"access plus 1 year\"");
lines.push("  ExpiresByType image/png \"access plus 1 year\"");
lines.push("  ExpiresByType text/css \"access plus 1 month\"");
lines.push("  ExpiresByType application/javascript \"access plus 1 month\"");
lines.push("</IfModule>");
// le pagine le riscrive il pannello /gestione/: no-cache, così la cache di Aruba non tiene la versione vecchia
lines.push("<FilesMatch \"\\.html$\">");
lines.push("  Header set Cache-Control \"no-cache\"");
lines.push("</FilesMatch>");
lines.push("Header always set Cache-Control \"no-store\" env=SENZACACHE");
lines.push("");
lines.push("# --- sicurezza ---");
lines.push("Header always set X-Content-Type-Options \"nosniff\"");
lines.push("Header always set Referrer-Policy \"strict-origin-when-cross-origin\"");
lines.push("");
lines.push("# --- pagina 404 ---");
lines.push("ErrorDocument 404 /404.html");
lines.push("");

writeFileSync(".htaccess", lines.join("\n"), "utf8");

/* ---------- CSV ---------- */
const csv = ["da,a,motivo", ...rules.map((r) => `"${SITE}${r.from}","${SITE}${r.to}","${r.why}"`)];
writeFileSync("redirects-301.csv", csv.join("\n"), "utf8");

console.log(`Redirect generati: ${rules.length}`);
console.log(`  glossario -> /curiosita/        ${glossarioHits}`);
console.log(`  cose da evitare -> articolo     ${coseHits}`);
console.log(`  ci vedo bene -> pagina          ${valHits}`);
console.log(`  contenuto trasferito            ${miscHits}`);
console.log(`  non ripreso -> home             ${fallback}`);
console.log(`  categorie e tag                 ${cats.length + tags.length}`);
console.log(`\n.htaccess: ${lines.length} righe`);
console.log(`redirects-301.csv: ${rules.length} righe`);
