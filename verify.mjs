/* ==========================================================================
   verify.mjs — controlli tecnici SEO e integrità su tutte le pagine
   ========================================================================== */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, relative, sep } from "node:path";

const SKIP = new Set([".agents", ".claude", ".taste-skill", "agent", "assets", "media", "pages", "node_modules", "seo-src"]);

function walk(dir = ".", out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith(".") || e.name === 'sites' || SKIP.has(e.name)) continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name === "index.html") out.push(p);
  }
  return out;
}

const files = walk();
const problems = [];
const stats = { titles: [], descs: [], h1: [], schema: 0, images: 0, missingImg: [] };

for (const f of files) {
  const rel = relative(".", f).split(sep).join("/");
  const route = rel === "index.html" ? "/" : "/" + rel.replace(/index\.html$/, "");
  const html = readFileSync(f, "utf8");
  const push = (msg) => problems.push(`${route}  ${msg}`);

  /* title */
  const t = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || "";
  stats.titles.push([route, t.length, t]);
  if (!t) push("MANCA <title>");
  else if (t.length > 65) push(`title troppo lungo (${t.length}): ${t}`);
  else if (t.length < 25) push(`title troppo corto (${t.length}): ${t}`);

  /* description */
  const d = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "";
  stats.descs.push([route, d.length]);
  if (!d) push("MANCA meta description");
  else if (d.length > 165) push(`description troppo lunga (${d.length})`);
  else if (d.length < 70) push(`description troppo corta (${d.length})`);

  /* canonical */
  if (!/rel="canonical"/.test(html)) push("MANCA canonical");

  /* h1: esattamente uno */
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
  stats.h1.push([route, h1s.length]);
  if (h1s.length === 0) push("MANCA <h1>");
  else if (h1s.length > 1) push(`${h1s.length} <h1> (deve essere 1)`);

  /* lang */
  if (!/<html lang="it"/.test(html)) push('manca lang="it"');

  /* schema JSON-LD valido */
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (!ld.length) push("MANCA JSON-LD");
  else {
    stats.schema++;
    for (const m of ld) {
      try {
        const j = JSON.parse(m[1]);
        const types = (j["@graph"] || []).map((n) => n["@type"]).flat();
        if (!types.includes("Optician")) push("schema senza nodo Optician");
      } catch (e) { push(`JSON-LD non valido: ${e.message}`); }
    }
  }

  /* immagini: esistono e hanno alt */
  for (const m of html.matchAll(/<img[^>]*>/g)) {
    stats.images++;
    const src = (m[0].match(/src="([^"]+)"/) || [])[1] || "";
    const alt = (m[0].match(/alt="([^"]*)"/) || [])[1];
    if (alt === undefined) push(`immagine senza alt: ${src}`);
    else if (alt === "") push(`alt vuoto: ${src}`);
    if (src.startsWith("/")) {
      const p = "." + src;
      if (!existsSync(p)) stats.missingImg.push(`${route} -> ${src}`);
    }
  }

  /* link interni rotti */
  for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    const href = m[1];
    if (href.startsWith("/assets/") || href.endsWith(".xml") || href.endsWith(".txt")) continue;
    const p = href.endsWith("/") ? "." + href + "index.html" : "." + href;
    if (!existsSync(p) && !existsSync("." + href)) push(`link interno rotto: ${href}`);
  }
}

/* report */
console.log(`Pagine controllate: ${files.length}\n`);

const longT = stats.titles.filter(([, l]) => l > 65);
const shortT = stats.titles.filter(([, l]) => l < 25);
const longD = stats.descs.filter(([, l]) => l > 165);
const multiH1 = stats.h1.filter(([, n]) => n !== 1);

console.log(`title      ${stats.titles.length - longT.length - shortT.length}/${stats.titles.length} nella lunghezza ideale`);
console.log(`description ${stats.descs.length - longD.length}/${stats.descs.length} entro 165 caratteri`);
console.log(`un solo h1  ${stats.h1.length - multiH1.length}/${stats.h1.length}`);
console.log(`JSON-LD     ${stats.schema}/${files.length} pagine`);
console.log(`immagini    ${stats.images} totali, ${stats.missingImg.length} file mancanti`);

if (stats.missingImg.length) {
  console.log("\nIMMAGINI MANCANTI:");
  [...new Set(stats.missingImg)].forEach((x) => console.log("  " + x));
}

if (problems.length) {
  console.log(`\nPROBLEMI (${problems.length}):`);
  problems.forEach((p) => console.log("  " + p));
  process.exitCode = 1;
} else {
  console.log("\nNessun problema rilevato.");
}
