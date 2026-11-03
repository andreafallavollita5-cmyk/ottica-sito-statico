# Sito statico per centro ottico

Versione dimostrativa del sito che ho realizzato per un centro ottico indipendente. È un sito di 28 pagine generato da modelli JavaScript, senza framework e senza dipendenze npm, con SEO tecnica completa e un pannello PHP che permette al titolare di aggiornare foto, montature, orari e blog da telefono, senza database.

> **Dati fittizi.** Nome del negozio, titolare, indirizzo, telefoni, email, P.IVA, account social e ID di analytics sono inventati. Le foto del negozio e del personale sono state sostituite da immagini di repertorio. I testi dei servizi e del blog sono quelli del progetto.

![Anteprima della home](docs/anteprima.png)

## Cosa c'è dentro

- **Generatore statico in Node.js** (`generate.mjs`). I contenuti stanno in `design/content.mjs`; `design/site.mjs` aggiunge rotte, fotografie, metadati e JSON-LD. Il risultato sono file HTML statici, veloci e facili da indicizzare.
- **SEO tecnica**:
  - `title` e `description` calcolati per ogni pagina, canonical e Open Graph
  - JSON-LD `Optician`, `BreadcrumbList` e `BlogPosting`
  - sitemap con priorità (`sitemap.mjs`)
  - 185 redirect 301 dal vecchio sito WordPress (`redirects.mjs` → `.htaccess`)
- **Controlli automatici** (`verify.mjs`): lunghezza dei title, description, h1 unico, JSON-LD presente, immagini e link interni esistenti.
- **Immagini responsive**: WebP in tre misure (480 / 900 / 1600 px) con `srcset` generato dall'helper `img()` in `build.mjs`.
- **Privacy**: Google Analytics 4 in Consent Mode v2. `gtag.js` si carica solo dopo il consenso e la cookie policy è generata con il sito.
- **Prenotazione**: modulo che apre WhatsApp o l'email già compilati. L'integrazione con un gestionale esterno è predisposta e resta spenta finché non viene configurata (oggetto `BOOKING` in `build.mjs`).
- **Pannello di gestione** (`gestione/`, PHP + GD, dati in JSON):
  - sostituisce le foto del sito, ritagliandole alle proporzioni originali e versionando i nomi per invalidare la cache
  - gestisce le montature per Uomo, Donna e Bambino, Vista e Sole
  - pubblica avvisi di orario straordinario con date di inizio e fine
  - scrive e pubblica gli articoli del blog, aggiornando anche la sitemap

  Il blog viene generato da Node (`design/articoli.mjs`) e dal pannello (`gestione/lib.php`) con gli stessi modelli, quindi il risultato è identico byte per byte.

## Avvio locale

Richiede Node.js 22 o successivo. Non serve `npm install`.

```bash
node generate.mjs      # rigenera tutte le pagine HTML
node sitemap.mjs       # sitemap.xml e robots.txt
node redirects.mjs     # .htaccess e redirects-301.csv
node verify.mjs        # controlli SEO e link
node serve.mjs         # http://127.0.0.1:4173
```

Per provare il pannello serve PHP 8 con l'estensione GD:

```bash
php -S 127.0.0.1:8080
```

Poi apri `http://127.0.0.1:8080/gestione/` e inserisci il codice di attivazione definito in `gestione/config.php`.

## Struttura

```
build.mjs            dati del sito, header, footer, schema JSON-LD, helper immagini
generate.mjs         generatore delle pagine
design/              contenuti, rotte, modelli del blog, catalogo foto per il pannello
pages/               articolo legacy mantenuto per compatibilità con il vecchio URL
assets/css, js       stile originale + migliorie, menu, prenotazione, animazioni, consenso
assets/img/          immagini WebP responsive
gestione/            pannello PHP (lib.php contiene le funzioni comuni)
contenuti/           dati JSON modificati dal pannello (privato/ non è raggiungibile dal web)
seo-src/             elenco URL del vecchio sito, usato per generare i redirect
```

Le pagine HTML generate sono versionate, così il risultato si può consultare anche senza eseguire il build.

## Stack

JavaScript (ES modules, Node.js) · HTML · CSS · PHP · Apache `.htaccess` · Schema.org
