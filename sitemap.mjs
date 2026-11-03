/* ==========================================================================
   sitemap.mjs — genera sitemap.xml e robots.txt dalle pagine presenti
   ========================================================================== */
import { readdirSync, writeFileSync, statSync, existsSync, readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const SITE = "https://www.example.com";
const SKIP = new Set([".agents", ".claude", ".taste-skill", "agent", "assets", "media", "pages", "node_modules", "seo-src", "gestione", "contenuti"]);

function walk(dir = ".", out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith(".") || e.name === 'sites' || SKIP.has(e.name)) continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name === "index.html") out.push(p);
  }
  return out;
}

const files = walk().filter(f=>{
 const route='/'+relative('.',f).split(sep).join('/').replace(/index\.html$/,'');
 const canonical=readFileSync(f,'utf8').match(/rel="canonical" href="([^"]+)"/)?.[1];
 return !canonical || canonical === SITE+route;
});

/* priorità e frequenza per tipo di pagina */
function meta(route) {
  if (route === "/") return { p: "1.0", c: "weekly" };
  if (/^\/(prenota|servizi|contatti)\/$/.test(route)) return { p: "0.9", c: "monthly" };
  if (/^\/(chi-siamo|promozioni|convenzioni|buono-regalo|orari|dove-siamo|sostenibilita)\/$/.test(route)) return { p: "0.8", c: "monthly" };
  if (/^\/blog\/[^/]+\/$/.test(route)) return { p: "0.7", c: "yearly" };
  if (/^\/curiosita\/[^/]+\/$/.test(route)) return { p: "0.7", c: "yearly" };
  if (/^\/(blog|curiosita)\/$/.test(route)) return { p: "0.8", c: "monthly" };
  return { p: "0.6", c: "monthly" };
}

const today = new Date().toISOString().slice(0, 10);

const urls = files.map((f) => {
  const rel = relative(".", f).split(sep).join("/");
  const route = rel === "index.html" ? "/" : "/" + rel.replace(/index\.html$/, "");
  const m = meta(route);
  const mod = statSync(f).mtime.toISOString().slice(0, 10);
  return { route, ...m, mod };
}).sort((a, b) => b.p - a.p || a.route.localeCompare(b.route));

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${SITE}${u.route}</loc>
    <lastmod>${u.mod}</lastmod>
    <changefreq>${u.c}</changefreq>
    <priority>${u.p}</priority>
  </url>`).join("\n")}
</urlset>
`;

writeFileSync("sitemap.xml", xml, "utf8");

const robots = `# robots.txt — Ottica Demo
User-agent: *
Allow: /

# risorse tecniche non indicizzabili
Disallow: /design/
Disallow: /media/
Disallow: /seo-src/
Disallow: /gestione/
Disallow: /contenuti/privato/

Sitemap: ${SITE}/sitemap.xml
`;

writeFileSync("robots.txt", robots, "utf8");

console.log(`sitemap.xml: ${urls.length} URL`);
console.log(`robots.txt: scritto`);
console.log("\npagine in sitemap:");
urls.forEach((u) => console.log(`  ${u.p}  ${u.route}`));
