/* ==========================================================================
   build.mjs — genera header, footer e pagine da un unico modello
   Nessuna dipendenza. Node 22+.
   Uso: node build.mjs
   ========================================================================== */
import { readFileSync, writeFileSync, existsSync } from "node:fs";

/* ---------- dati del sito ---------- */
export const SITE = {
  name: "Ottica Demo",
  legal: "Ottica Demo di Mario Rossi",
  url: "https://www.example.com",
  tel: "0212345678",
  telLabel: "02 12345678",
  mobile: "3330000000",
  mobileLabel: "333 000 0000",
  whatsapp: "393330000000",
  email: "info@example.com",
  street: "Via Roma 1",
  cap: "20100",
  city: "Milano",
  region: "MI",
  legalAddr: "Via Roma 1, 20100 Milano",
  vat: "00000000000",
  rea: "MI-0000000",
  since: 1995,
  geo: { lat: 45.4642, lng: 9.1900 },
  social: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
    x: "https://x.com/",
    linkedin: "https://www.linkedin.com/",
    whatsapp: "https://wa.me/393330000000",
    email: "mailto:info@example.com"
  },
  hours: [
    ["Lunedì", "15:30 – 19:00"],
    ["Martedì", "9:30 – 13:30 / 15:30 – 19:30"],
    ["Mercoledì", "9:30 – 13:30 / 15:30 – 19:30"],
    ["Giovedì", "9:30 – 13:30 / 15:30 – 19:30"],
    ["Venerdì", "9:30 – 13:30 / 15:30 – 19:30"],
    ["Sabato", "9:30 – 13:30 / 15:30 – 19:00"],
    ["Domenica", "Chiuso"]
  ]
};

/* ---------- prenotazione: gestionale Iridex Next ----------
   L'integrazione è predisposta ma spenta finché non arrivano endpoint e token.
   Con `enabled: false` la pagina /prenota/ mostra i canali diretti (telefono,
   WhatsApp, email) come sempre. Per attivarla vedi il README, sezione
   "Prenotazione con Iridex Next". */
export const BOOKING = {
  enabled: false,
  endpoint: "",   /* es. https://<tenant>.iridexnext.it/api/public/appointments */
  token: "",      /* token API — non va versionato */
  /* durata dello slot proposta al gestionale, in minuti */
  slot: 30
};

/* ---------- icone ---------- */
const ICON = {
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><rect x="2.5" y="2.5" width="19" height="19" rx="5.2"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H16.7V3.6c-.3-.04-1.3-.13-2.47-.13-2.44 0-4.11 1.49-4.11 4.23V9.9H7.4V13h2.72v8h3.38z"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.6 3h3.3l-7.2 8.24L22.2 21h-6.62l-5.19-6.78L4.45 21H1.14l7.7-8.8L1.5 3h6.79l4.69 6.2L17.6 3zm-1.16 16.1h1.83L7.65 4.8H5.69l10.75 14.3z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.94 5.5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0zM3.3 8.4h3.32V21H3.3V8.4zm5.72 0h3.18v1.72h.05c.44-.83 1.53-1.72 3.15-1.72 3.37 0 4 2.2 4 5.06V21h-3.32v-6.06c0-1.45-.03-3.3-2.02-3.3-2.02 0-2.33 1.57-2.33 3.2V21H9.02V8.4z"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.83c0 1.94.55 3.75 1.5 5.28L2 22.5l5.53-1.65a9.9 9.9 0 0 0 4.51 1.1c5.43 0 9.83-4.4 9.83-9.83S17.47 2 12.04 2zm5.72 13.9c-.24.68-1.4 1.3-1.93 1.35-.53.05-1.02.24-3.45-.9-2.9-1.36-4.68-4.5-4.82-4.7-.14-.2-1.12-1.6-1.06-3 .06-1.4.83-2.07 1.11-2.35.28-.28.6-.33.8-.33h.56c.18 0 .42-.03.64.52.24.6.8 2.06.87 2.2.07.15.11.32.01.51-.1.2-.5.75-.68.94-.14.15-.3.32-.13.62.17.3.75 1.25 1.6 2.02 1.1.98 1.86 1.28 2.13 1.42.26.15.42.13.58-.05.16-.18.68-.79.86-1.06.18-.28.36-.22.6-.13.25.09 1.6.76 1.87.9.28.13.46.2.53.31.06.12.06.68-.18 1.36z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="M3 6.5l9 6 9-6"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5.2l3.4 2"/></svg>',
  caret: '<svg class="nav-caret" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><path d="M2.5 4.5L6 8l3.5-3.5"/></svg>',
  arrowRight: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>',
  arrowLeft: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><path d="M13 8H3M7 4L3 8l4 4"/></svg>',
  check: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 8.5l3.2 3L13 5"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M3 6.5h18M3 12h18M3 17.5h18"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'
};

export const MENU = [
  /* "Chi siamo" non ha sottovoci: la sostenibilità è un capitolo della pagina,
     raggiungibile scorrendo (/#sostenibilita) e dal link in fondo alla sezione. */
  { label: "Chi siamo", href: "/chi-siamo/", children: [] },
  { label: "Contatti", href: "/contatti/", children: [{ label: "Orari", href: "/orari/" }, { label: "Dove siamo", href: "/dove-siamo/" }] },
  { label: "Servizi", href: "/servizi/", children: [
    { label: "I nostri servizi", href: "/servizi/" },
    { label: "Convenzioni", href: "/convenzioni/" },
    { label: "Promozioni", href: "/promozioni/" },
    { label: "Buono regalo", href: "/buono-regalo/" }
  ]},
  { label: "Uomo", href: "/uomo/", soon: true, children: [
    { label: "Occhiali da sole", href: "/uomo/occhiali-da-sole/" },
    { label: "Occhiali da vista", href: "/uomo/occhiali-da-vista/" }
  ]},
  { label: "Donna", href: "/donna/", soon: true, children: [
    { label: "Occhiali da sole", href: "/donna/occhiali-da-sole/" },
    { label: "Occhiali da vista", href: "/donna/occhiali-da-vista/" }
  ]},
  { label: "Bambino", href: "/bambino/", soon: true, children: [
    { label: "Occhiali da sole", href: "/bambino/occhiali-da-sole/" },
    { label: "Occhiali da vista", href: "/bambino/occhiali-da-vista/" }
  ]},
  { label: "Curiosità", href: "/curiosita/", children: [
    { label: "Blog", href: "/blog/" },
    { label: "Curiosità", href: "/curiosita/" }
  ]}
];

/* ---------- header ---------- */
export function header(active = "") {
  const socialLinks = [
    ["instagram", "Instagram"],
    ["linkedin", "LinkedIn"],
    ["x", "X"],
    ["facebook", "Facebook"],
    ["whatsapp", "WhatsApp"],
    ["email", "Email"]
  ].map(([k, label]) =>
    `<a href="${SITE.social[k]}" target="_blank" rel="noopener" aria-label="${label} di Ottica Demo" title="${label}">${ICON[k === "email" ? "mail" : k]}</a>`
  ).join("");

  const items = MENU.map((item) => {
    const isActive = active === item.href || item.children.some((c) => c.href === active);
    const hasKids = item.children.length > 0;
    /* le voci "soon" non hanno ancora una pagina: restano visibili ma non cliccabili */
    const kids = hasKids
      ? `<ul class="dropdown">${item.children.map((c) => item.soon
          ? `<li><span class="dropdown-soon">${c.label} <em>in arrivo</em></span></li>`
          : `<li><a href="${c.href}">${c.label}</a></li>`).join("")}</ul>`
      : "";
    const label = item.soon
      ? `<span class="nav-link nav-link--soon"${hasKids ? ' aria-expanded="false" role="button" tabindex="0"' : ""}>${item.label}${hasKids ? ICON.caret : ""}</span>`
      : `<a class="nav-link" href="${item.href}"${isActive ? ' aria-current="page"' : ""}${hasKids ? ' aria-expanded="false"' : ""}>${item.label}${hasKids ? ICON.caret : ""}</a>`;
    return `<li class="nav-item"${item.soon ? ' data-soon="true"' : ""}>
      ${label}
      ${kids}
    </li>`;
  }).join("");

  return `<a class="skip" href="#main">Vai al contenuto</a>
<header class="site-header">
  <div class="wrap header-inner">
    <a class="brand" href="/" aria-label="Ottica Demo — home">
      <img src="/assets/img/logo.png" width="150" height="95" alt="Ottica Demo" fetchpriority="high">
      <span class="brand-text"><strong>OTTICA</strong><span>Demo</span></span>
    </a>
    <nav class="nav" id="site-nav" data-open="false" aria-label="Navigazione principale">
      <button class="nav-close" type="button" aria-label="Chiudi il menu">${ICON.close}</button>
      <ul class="nav-list">${items}</ul>
      <div class="nav-social">${socialLinks}</div>
    </nav>
    <div class="header-right">
      <div class="social" aria-label="Seguici e contattaci">${socialLinks}</div>
      <a class="btn btn--primary" href="/prenota/">Prenota appuntamento</a>
      <button class="nav-toggle" type="button" aria-label="Apri il menu" aria-expanded="false" aria-controls="site-nav">${ICON.menu}</button>
    </div>
  </div>
</header>`;
}

/* ---------- footer ---------- */
export function footer() {
  const hours = SITE.hours.slice(0, 6).map(([d, h]) => `<li class="row-k">${d} <span class="row-v">${h}</span></li>`).join("");
  return `<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div class="footer-brand">
        <img src="/assets/img/logo.png" width="150" height="95" alt="Ottica Demo" loading="lazy">
        <p>Ottico a Milano dal ${SITE.since}. Specializzati nella gestione della progressione miopica nei più giovani e nelle soluzioni visive personalizzate per la presbiopia.</p>
      </div>
      <div class="footer-col">
        <h3>Dove siamo</h3>
        <ul>
          <li>${SITE.street}</li>
          <li>${SITE.cap} ${SITE.city}</li>
          <li><a href="tel:${SITE.tel}">${SITE.telLabel}</a></li>
          <li><a href="tel:+39${SITE.mobile}">${SITE.mobileLabel}</a></li>
          <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h3>Orari</h3>
        <ul class="rows rows--plain rows--ink" style="display:grid;gap:.35rem">${hours}</ul>
      </div>
      <div class="footer-col">
        <h3>Pagine</h3>
        <ul>
          <li><a href="/chi-siamo/">Chi siamo</a></li>
          <li><a href="/sostenibilita/">Sostenibilità</a></li>
          <li><a href="/servizi/">Servizi</a></li>
          <li><a href="/promozioni/">Promozioni</a></li>
          <li><a href="/curiosita/">Curiosità</a></li>
          <li><a href="/blog/">Blog</a></li>
          <li><a href="/prenota/">Prenota appuntamento</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-legal">
        <span>${SITE.legal} · ${SITE.legalAddr} · P.IVA ${SITE.vat} · REA ${SITE.rea}</span>
        <span>Camera di commercio di Milano, Monza e Brianza, Lodi</span>
      </div>
      <div>
        <span>© ${new Date().getFullYear()} ${SITE.name}</span>
      </div>
    </div>
  </div>
</footer>
<script src="/assets/js/site.js" defer></script>`;
}

/* ---------- helper: immagine responsive ---------- */
export function img(base, alt, opts = {}) {
  const { sizes = "(max-width: 720px) 100vw, (max-width: 1024px) 50vw, 33vw", lazy = true, ratio = "" } = opts;
  const srcset = `/assets/img/${base}-480.webp 480w, /assets/img/${base}-900.webp 900w, /assets/img/${base}.webp 1600w`;
  return `<img src="/assets/img/${base}-900.webp" srcset="${srcset}" sizes="${sizes}" alt="${alt}"${ratio ? ` style="aspect-ratio:${ratio}"` : ""} loading="${lazy ? "lazy" : "eager"}" decoding="async">`;
}

/* ---------- helper: marchi trattati ----------
   Se in assets/img/loghi/ esiste il file <slug>.webp il marchio viene mostrato
   con il suo logo, altrimenti con il solo nome. I loghi si aggiungono senza
   toccare il codice: vedi il README, sezione "Loghi dei marchi". */
export function logoSlug(name) {
  return name
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/\+/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function brandTile(name) {
  const slug = logoSlug(name);
  const file = `assets/img/loghi/${slug}.webp`;
  if (existsSync(file)) {
    return `<span class="brand-tile brand-tile--logo"><img src="/assets/img/loghi/${slug}.webp" alt="${name}" loading="lazy" decoding="async"></span>`;
  }
  return `<span class="brand-tile">${name}</span>`;
}

/* ---------- composizione pagina ---------- */
export function page({ title, description, canonical, body, active = "", schema = [], ogImage = "/assets/img/negozio-interno.webp" }) {
  const graph = [
    {
      "@type": "Optician",
      "@id": `${SITE.url}/#organization`,
      name: SITE.name,
      legalName: SITE.legal,
      url: `${SITE.url}/`,
      image: `${SITE.url}${ogImage}`,
      logo: `${SITE.url}/assets/img/logo.png`,
      telephone: [SITE.tel, `+39${SITE.mobile}`],
      email: SITE.email,
      foundingDate: String(SITE.since),
      founder: { "@type": "Person", name: "Mario Rossi", jobTitle: "Ottico" },
      priceRange: "€€",
      currenciesAccepted: "EUR",
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.street,
        postalCode: SITE.cap,
        addressLocality: SITE.city,
        addressRegion: SITE.region,
        addressCountry: "IT"
      },
      geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
      hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.street + " " + SITE.cap + " " + SITE.city)}`,
      areaServed: [
        { "@type": "City", name: "Milano" }
      ],
      sameAs: Object.values(SITE.social).filter((u) => u.startsWith("http")),
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday"], opens: "15:30", closes: "19:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:30", closes: "13:30" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"], opens: "15:30", closes: "19:30" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "09:30", closes: "13:30" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "15:30", closes: "19:00" }
      ],
      makesOffer: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Valutazione della vista" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Gestione della progressione miopica" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Lenti progressive e office" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Applicazione di lenti a contatto" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Laboratorio di montaggio e riparazioni" } }
      ]
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: `${SITE.url}/`,
      name: SITE.name,
      inLanguage: "it-IT",
      publisher: { "@id": `${SITE.url}/#organization` }
    },
    {
      "@type": "WebPage",
      "@id": `${SITE.url}${canonical}#webpage`,
      url: `${SITE.url}${canonical}`,
      name: title,
      description,
      isPartOf: { "@id": `${SITE.url}/#website` },
      about: { "@id": `${SITE.url}/#organization` },
      inLanguage: "it-IT"
    },
    ...schema
  ];

  return `<!DOCTYPE html>
<html lang="it" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${SITE.url}${canonical}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
<meta name="author" content="Mario Rossi">
<meta name="geo.region" content="IT-MI">
<meta name="geo.placename" content="Milano">
<meta name="geo.position" content="${SITE.geo.lat};${SITE.geo.lng}">
<meta name="ICBM" content="${SITE.geo.lat}, ${SITE.geo.lng}">
<meta property="og:type" content="website">
<meta property="og:locale" content="it_IT">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${SITE.url}${canonical}">
<meta property="og:image" content="${SITE.url}${ogImage}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#ffffff">
<link rel="icon" href="/assets/img/favicon.png" type="image/png">
<link rel="apple-touch-icon" href="/assets/img/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&display=swap" media="print" onload="this.media='all'">
<link rel="stylesheet" href="/assets/css/site.css">
<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph })}</script>
</head>
<body>
${header(active)}
<main id="main">
${body}
</main>
${footer()}
</body>
</html>
`;
}

export { ICON };
