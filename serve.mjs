/* ==========================================================================
   serve.mjs — server statico locale per verificare il sito
   Uso: node serve.mjs [porta]
   ========================================================================== */
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const PORT = parseInt(process.argv[2] || "4173", 10);
const ROOT = fileURLToPath(new URL(".", import.meta.url));

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".ico": "image/x-icon"
};

createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);

  /* normalizza: /foo/ -> /foo/index.html, /foo -> /foo/index.html */
  let file = join(ROOT, p);
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  else if (!existsSync(file) && !extname(file)) file = join(ROOT, p, "index.html");

  if (!existsSync(file)) {
    /* prova la versione .html */
    const alt = join(ROOT, p + ".html");
    if (existsSync(alt)) file = alt;
    else {
      res.writeHead(404, { "content-type": "text/html; charset=utf-8" });
      res.end(`<h1>404</h1><p>${p} non trovato</p><p><a href="/">Torna alla home</a></p>`);
      return;
    }
  }

  const type = TYPES[extname(file)] || "application/octet-stream";
  const body = readFileSync(file);
  res.writeHead(200, {
    "content-type": type,
    "cache-control": extname(file) === ".html" ? "no-cache" : "public, max-age=3600"
  });
  res.end(body);
}).listen(PORT, () => {
  console.log(`Sito servito su http://127.0.0.1:${PORT}/`);
  console.log("Ctrl+C per fermare.");
});
