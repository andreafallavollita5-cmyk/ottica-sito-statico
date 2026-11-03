
const IMG = {
  "vetrina_uomo": "/assets/img/approved/vetrina-uomo-1600.webp",
  "vetrina_donna": "/assets/img/approved/vetrina-donna-1600.webp",
  "vetrina_bambino": "/assets/img/approved/vetrina-bambino-1600.webp",
  "hoya": "/assets/img/approved/hoya-1600.webp",
  "forest": "/assets/img/approved/forest-1600.webp",
  "milano": "/assets/img/approved/milano-1600.webp",
  "tech": "/assets/img/approved/tech-1600.webp",
  "girl": "/assets/img/approved/girl-1600.webp",
  "art_miopia": "/assets/img/approved/art_miopia-1600.webp",
  "art_prog": "/assets/img/approved/art_prog-1600.webp",
  "art_office": "/assets/img/approved/art_office-1600.webp",
  "art_multi": "/assets/img/approved/art_multi-1600.webp",
  "art_lac": "/assets/img/approved/art_lac-1600.webp",
  "art_pc": "/assets/img/approved/art_pc-1600.webp",
  "lab": "/assets/img/approved/lab-1600.webp",
  "hero": "/assets/img/approved/hero-1600.webp",
  "titolare": "/assets/img/approved/titolare-1600.webp",
  "negozio": "/assets/img/approved/negozio-1600.webp",
  "vista": "/assets/img/approved/vista-1600.webp",
  "bimbo": "/assets/img/approved/bimbo-1600.webp",
  "sole": "/assets/img/approved/sole-1600.webp",
  "eco": "/assets/img/approved/eco-1600.webp"
};
const ARR = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10h13M11 5l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';

/* ---------- social ---------- */
const SOC = [
 ["https://www.instagram.com/","Instagram",'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none"/></svg>'],
 ["https://www.linkedin.com/","LinkedIn",'<svg viewBox="0 0 24 24" fill="currentColor"><rect x="3.5" y="9" width="3.6" height="11.5"/><circle cx="5.3" cy="5.3" r="2.1"/><path d="M10 9h3.4v1.6c.6-1 1.9-1.9 3.7-1.9 3.2 0 3.9 2 3.9 4.7v7.1h-3.6v-6.3c0-1.5-.1-3-1.9-3s-2.1 1.4-2.1 2.9v6.4H10z"/></svg>'],
 ["https://x.com/","X",'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M4 4l16 16M20 4L4 20"/></svg>'],
 ["https://www.facebook.com/","Facebook",'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21z"/></svg>'],
 ["https://wa.me/393330000000","WhatsApp",'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 20l1.2-4A8 8 0 1 1 8 18.8z"/><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 .8a5 5 0 0 1-2.3-2.3l.8-1-1-2z" fill="currentColor" stroke="none"/></svg>'],
 ["mailto:info@example.com","Email",'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6l8.5 7 8.5-7"/></svg>']
];
const socHTML = [0,2,1,3,4,5].map(i=>SOC[i]).map(([h,l,s])=>`<a href="${h}" target="_blank" rel="noopener" aria-label="${l}">${s}</a>`).join("");


/* ---------- illustrations ---------- */
const svg = (inner, vb="0 0 600 360") => `<svg class="il" viewBox="${vb}" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">${inner}</svg>`;
const ILL = {
 shop: svg(`<rect class="b" width="600" height="420"/>
  <circle cx="530" cy="62" r="30" fill="#f2c94c" opacity=".85"/>
  <rect x="70" y="40" width="460" height="330" class="w"/><rect x="70" y="40" width="460" height="330" class="k" stroke-width="3"/>
  ${[0,1,2].map(r=>[0,1,2,3,4].map(c=>`<rect x="${100+c*86}" y="${62+r*54}" width="54" height="34" rx="3" class="b2"/><rect x="${100+c*86}" y="${62+r*54}" width="54" height="34" rx="3" class="k" stroke-width="2"/><path d="M${94+c*86} ${102+r*54}h66" class="k" stroke-width="3"/>`).join("")).join("")}
  <rect x="70" y="226" width="460" height="40" class="K"/>
  <text x="300" y="253" text-anchor="middle" font-size="20" font-weight="600" letter-spacing="3" style="fill:var(--bg)">OTTICA Demo</text>
  <rect x="94" y="280" width="170" height="80" class="b"/><rect x="94" y="280" width="170" height="80" class="k" stroke-width="3"/>
  <rect x="336" y="280" width="170" height="80" class="b"/><rect x="336" y="280" width="170" height="80" class="k" stroke-width="3"/>
  ${[[116,306],[176,334],[196,302],[358,314],[416,300],[452,336]].map(([x,y])=>`<g class="A" stroke-width="3"><circle cx="${x}" cy="${y}" r="10"/><circle cx="${x+26}" cy="${y}" r="10"/><path d="M${x+10} ${y}h6"/></g>`).join("")}
  <rect x="276" y="280" width="48" height="90" class="gr"/><rect x="276" y="280" width="48" height="90" class="k" stroke-width="3"/>
  <text x="300" y="302" text-anchor="middle" font-size="12" font-weight="600">69/71</text><circle cx="315" cy="330" r="3" class="K"/>
  <rect x="0" y="370" width="600" height="18" class="gr"/>
  <rect x="0" y="388" width="600" height="32" class="ap"/>
  <g class="A" stroke-width="2.5" stroke-linejoin="round"><circle cx="284" cy="406" r="9"/><circle cx="318" cy="406" r="9"/><path d="M284 406l11-14h13l10 14M295 392l9 14h-20"/></g>
  <rect x="31" y="296" width="9" height="74" fill="#6b5a44"/><circle cx="36" cy="282" r="34" fill="#7fa37a"/>
  <rect x="560" y="296" width="9" height="74" fill="#6b5a44"/><circle cx="564" cy="282" r="34" fill="#7fa37a"/>`, "0 0 600 420"),

 sost: svg(`<rect class="b" width="600" height="360"/>
  <path d="M0 300 Q150 252 300 290 T600 276 V360 H0z" fill="#9cc29a" opacity=".55"/>
  <g transform="translate(98 74)"><circle r="30" fill="#f2c94c"/>${Array.from({length:10},(_,i)=>{const a=i*Math.PI/5;return `<path d="M${(Math.cos(a)*40).toFixed(1)} ${(Math.sin(a)*40).toFixed(1)}L${(Math.cos(a)*54).toFixed(1)} ${(Math.sin(a)*54).toFixed(1)}" stroke="#e0b334" stroke-width="5" stroke-linecap="round"/>`}).join("")}</g>
  <circle cx="226" cy="186" r="64" class="w"/><circle cx="374" cy="186" r="64" class="w"/>
  <path d="M196 220C196 172 230 146 264 146C264 190 240 220 196 220Z" fill="#6f9a63"/><path d="M201 215L257 153" stroke="#4e7546" stroke-width="3" fill="none"/>
  <circle cx="374" cy="174" r="24" fill="#f2c94c"/><path d="M366 174l8 10 8-10" class="k" stroke-width="2.5"/><rect x="362" y="196" width="24" height="16" rx="3" class="gr"/><path d="M366 218h16" class="k" stroke-width="3" stroke-linecap="round"/>
  <circle cx="226" cy="186" r="64" class="k" stroke-width="8"/><circle cx="374" cy="186" r="64" class="k" stroke-width="8"/>
  <path d="M290 178Q300 166 310 178" class="k" stroke-width="8"/>
  <path d="M162 174L118 162M438 174L482 162" class="k" stroke-width="8" stroke-linecap="round"/>
  <path d="M500 230c0-14 10-24 24-26 0 14-10 24-24 26z" fill="#6f9a63"/><path d="M70 250c0-12 9-21 21-23 0 12-9 21-21 23z" fill="#6f9a63" opacity=".8"/>`),

 dono: svg(`<rect class="b" width="600" height="360"/>
  <path class="A" d="M346 116Q420 60 470 96" stroke-width="2.5" stroke-dasharray="6 7"/>
  <g transform="translate(510 116)"><circle r="44" class="w"/><circle r="44" class="A" stroke-width="3"/><ellipse rx="18" ry="44" class="A" stroke-width="2.5"/><path d="M-44 0H44M-38 -22H38M-38 22H38" class="A" stroke-width="2"/></g>
  <path class="a" d="M300 118C300 98 268 90 260 110C252 130 300 150 300 160C300 150 348 130 340 110C332 90 300 98 300 118Z"/>
  <g stroke="var(--ink)" stroke-width="6" fill="var(--il-paper)"><circle cx="264" cy="208" r="27"/><circle cx="336" cy="208" r="27"/></g>
  <path d="M291 204Q300 196 309 204" class="k" stroke-width="6"/>
  <path d="M170 210L300 238L300 350L170 322Z" fill="#c99a5e"/><path d="M430 210L300 238L300 350L430 322Z" fill="#d9b27c"/>
  <path d="M170 210L118 176L248 200L300 238Z" fill="#e6c595"/><path d="M430 210L482 176L352 200L300 238Z" fill="#e6c595"/>
  <path d="M170 210L300 238L430 210M300 238V350M170 210V322L300 350L430 322V210" class="k" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M232 290l18 4M232 302l30 6" class="k" stroke-width="2" opacity=".5"/>`),
 miopia: svg(`<rect class="b" width="600" height="360"/>
  <circle class="b2" cx="380" cy="180" r="150"/>
  <circle class="w" cx="380" cy="180" r="112"/>
  <circle class="k" cx="380" cy="180" r="112" stroke-width="3"/>
  <path class="G" d="M432 81 A112 112 0 0 1 432 279" stroke-width="10" stroke-linecap="round"/>
  <path class="k" d="M284 122 Q252 180 284 238" stroke-width="3"/>
  <ellipse class="ap" cx="302" cy="180" rx="15" ry="46"/><ellipse class="A" cx="302" cy="180" rx="15" ry="46" stroke-width="2.5"/>
  <g class="A" stroke-width="2.6" stroke-linecap="round">
   <path d="M40 132 H276 L420 180 L490 203"/><path d="M40 228 H276 L420 180 L490 157"/><path d="M40 180 H490"/>
  </g>
  <circle class="a" cx="420" cy="180" r="8"/>
  <path class="k" d="M420 210 v38 M490 230 v18 M420 240 h70" stroke-width="2" stroke-dasharray="4 5"/>
  <g transform="translate(72 268)"><circle class="w" r="44"/><circle class="k" r="44" stroke-width="2.5"/><circle class="a" r="9" opacity=".9"/>
   ${Array.from({length:22},(_,i)=>{const a=i*0.2856*2,r=i%2?32:22;return `<circle class="a" cx="${(Math.cos(a)*r).toFixed(1)}" cy="${(Math.sin(a)*r).toFixed(1)}" r="3.4" opacity=".55"/>`}).join("")}</g>`),

 progressive: svg(`<rect class="b" width="600" height="360"/>
  <defs><clipPath id="lensP"><path d="M150 72c0-20 18-32 48-32h204c30 0 48 12 48 32v170c0 52-42 78-150 78s-150-26-150-78z"/></clipPath></defs>
  <path class="w" d="M150 72c0-20 18-32 48-32h204c30 0 48 12 48 32v170c0 52-42 78-150 78s-150-26-150-78z"/>
  <g clip-path="url(#lensP)">
   <rect class="ap" x="140" y="30" width="320" height="128"/>
   <path class="ap" d="M282 158h36l14 74h-64z"/>
   <ellipse class="gp" cx="300" cy="282" rx="96" ry="52"/>
   <ellipse class="gr" cx="160" cy="250" rx="58" ry="92" opacity=".55"/><ellipse class="gr" cx="440" cy="250" rx="58" ry="92" opacity=".55"/>
  </g>
  <path class="k" d="M150 72c0-20 18-32 48-32h204c30 0 48 12 48 32v170c0 52-42 78-150 78s-150-26-150-78z" stroke-width="3"/>
  <path class="k" d="M262 118l26-34 16 18 14-12 26 28z" stroke-width="2.5" stroke-linejoin="round"/>
  <rect class="k" x="281" y="176" width="38" height="25" rx="3" stroke-width="2.5"/><path class="k" d="M300 201v7M290 210h20" stroke-width="2.5"/>
  <path class="k" d="M272 270q14-8 28 0q14-8 28 0v20q-14-8-28 0q-14-8-28 0z" stroke-width="2.5" stroke-linejoin="round"/><path class="k" d="M300 270v20" stroke-width="2"/>
  <path class="m" d="M480 92h60M480 188h60M480 280h60" stroke-width="2" stroke-dasharray="3 6"/>`),

 office: svg(`<rect class="b" width="600" height="360"/>
  <path class="ap" d="M120 168 L470 70 L470 300 L120 196z"/>
  <rect class="gr" x="40" y="284" width="540" height="10" rx="5"/>
  <rect class="w" x="380" y="74" width="190" height="128" rx="10"/><rect class="k" x="380" y="74" width="190" height="128" rx="10" stroke-width="3"/>
  <path class="k" d="M475 202v44M440 250h70" stroke-width="3" stroke-linecap="round"/>
  <rect class="a" x="398" y="96" width="110" height="10" rx="5" opacity=".7"/><rect class="gr" x="398" y="118" width="150" height="8" rx="4"/><rect class="gr" x="398" y="136" width="130" height="8" rx="4"/><rect class="gr" x="398" y="154" width="140" height="8" rx="4"/>
  <rect class="w" x="230" y="262" width="150" height="18" rx="5"/><rect class="k" x="230" y="262" width="150" height="18" rx="5" stroke-width="2.5"/>
  <path class="w" d="M70 182q42-36 84 0q-42 36-84 0z"/><path class="k" d="M70 182q42-36 84 0q-42 36-84 0z" stroke-width="3"/><circle class="a" cx="112" cy="182" r="13"/><circle class="K" cx="112" cy="182" r="5"/>
  <path class="A" d="M300 56 A215 215 0 0 1 300 306" stroke-width="2.5" stroke-dasharray="6 7"/>
  <path class="A" d="M440 40 A340 340 0 0 1 440 322" stroke-width="2.5" stroke-dasharray="6 7"/>`),

 multi: svg(`<rect class="b" width="600" height="360"/>
  <rect class="b2" x="0" y="250" width="600" height="110"/>
  <g transform="translate(70 120)"><path class="w" d="M0 40q30-14 60 0q30-14 60 0v64q-30-14-60 0q-30-14-60 0z"/><path class="k" d="M0 40q30-14 60 0q30-14 60 0v64q-30-14-60 0q-30-14-60 0z" stroke-width="3" stroke-linejoin="round"/><path class="k" d="M60 40v64" stroke-width="2.5"/><path class="m" d="M12 58h36M12 72h36M72 58h36M72 72h36" stroke-width="2"/></g>
  <g transform="translate(220 110)"><rect class="w" width="90" height="120" rx="10"/><rect class="k" width="90" height="120" rx="10" stroke-width="3"/><rect class="ap" x="10" y="12" width="70" height="90" rx="3"/><circle class="K" cx="45" cy="110" r="3"/></g>
  <g transform="translate(345 92)"><rect class="w" width="120" height="84" rx="8"/><rect class="k" width="120" height="84" rx="8" stroke-width="3"/><path class="k" d="M60 84v26M38 112h44" stroke-width="3" stroke-linecap="round"/><rect class="a" x="14" y="16" width="60" height="8" rx="4" opacity=".7"/><rect class="gr" x="14" y="32" width="90" height="7" rx="3"/><rect class="gr" x="14" y="46" width="76" height="7" rx="3"/></g>
  <g transform="translate(490 110)"><path class="g" d="M-20 120 L30 40 L60 86 L80 62 L120 120z"/><path class="k" d="M-20 120 L30 40 L60 86 L80 62 L120 120" stroke-width="3" stroke-linejoin="round"/><circle class="G" cx="70" cy="22" r="14" stroke-width="3"/></g>
  <path class="k" d="M40 286H580" stroke-width="2.5"/>
  ${[130,265,405,540].map(x=>`<path class="k" d="M${x} 278v16" stroke-width="2.5"/><circle class="a" cx="${x}" cy="286" r="6"/>`).join("")}
  <text x="130" y="326" text-anchor="middle" font-size="20" font-weight="500">35-40 cm</text><text x="265" y="326" text-anchor="middle" font-size="20" font-weight="500">45-50 cm</text><text x="405" y="326" text-anchor="middle" font-size="20" font-weight="500">60-70 cm</text><text x="540" y="326" text-anchor="middle" font-size="20" font-weight="500">lontano</text>`),

 lac: svg(`<rect class="b" width="600" height="360"/>
  <circle class="b2" cx="300" cy="200" r="150"/>
  <path class="g" d="M220 380 V230 C220 160 380 160 380 230 V380z"/>
  <path class="k" d="M220 380 V230 C220 160 380 160 380 230 V380" stroke-width="3"/>
  <path class="m" d="M258 214q42-18 84 0" stroke-width="2"/>
  <path class="ap" d="M226 186 C230 118 370 118 374 186 C340 172 260 172 226 186z" style="opacity:.3"/>
  <path class="A" d="M226 186 C230 118 370 118 374 186" stroke-width="4" stroke-linecap="round"/>
  <path class="A" d="M226 186 C260 172 340 172 374 186" stroke-width="2.5"/>
  <path class="w" d="M262 140 q20-14 40-12" stroke="var(--il-paper)" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path class="a" d="M120 110c0-16 12-30 12-30s12 14 12 30a12 12 0 0 1-24 0z" opacity=".6"/>
  <path class="a" d="M460 150c0-12 9-22 9-22s9 10 9 22a9 9 0 0 1-18 0z" opacity=".45"/>
  <path class="a" d="M488 92c0-9 7-17 7-17s7 8 7 17a7 7 0 0 1-14 0z" opacity=".35"/>`),

 computer: svg(`<rect class="b" width="600" height="360"/>
  <rect class="w" x="40" y="80" width="200" height="140" rx="10"/><rect class="k" x="40" y="80" width="200" height="140" rx="10" stroke-width="3"/>
  <path class="k" d="M140 220v40M100 262h80" stroke-width="3" stroke-linecap="round"/>
  <rect class="ap" x="56" y="96" width="168" height="108" rx="4"/>
  <g transform="translate(300 170)"><path class="w" d="M-52 0q52-46 104 0q-52 46-104 0z"/><path class="k" d="M-52 0q52-46 104 0q-52 46-104 0z" stroke-width="3"/><circle class="a" r="17"/><circle class="K" r="7"/></g>
  <rect class="w" x="400" y="62" width="160" height="200" rx="6"/><rect class="k" x="400" y="62" width="160" height="200" rx="6" stroke-width="3"/>
  <path class="k" d="M480 62v200M400 162h160" stroke-width="2"/>
  <circle class="g" cx="510" cy="210" r="28"/><path class="k" d="M510 238v24" stroke-width="3"/>
  <path class="b2" d="M410 262 L452 214 L478 262z"/>
  <path class="A" d="M360 170 H392" stroke-width="3" stroke-dasharray="5 6"/><path class="A" d="M384 162 l10 8 -10 8" stroke-width="3"/>
  <path class="A" d="M240 170 H246" stroke-width="3"/>
  <g transform="translate(300 300)"><circle class="w" r="30"/><circle class="k" r="30" stroke-width="3"/><path class="A" d="M0 -18 V0 L12 8" stroke-width="3.5" stroke-linecap="round"/></g>`),

 centratura: svg(`<rect class="b" width="600" height="360"/>
  <path class="k" d="M64 150 L40 140 M536 150 L560 140" stroke-width="5" stroke-linecap="round"/>
  <rect class="w" x="80" y="104" width="190" height="136" rx="40"/><rect class="w" x="330" y="104" width="190" height="136" rx="40"/>
  <rect class="k" x="80" y="104" width="190" height="136" rx="40" stroke-width="7"/><rect class="k" x="330" y="104" width="190" height="136" rx="40" stroke-width="7"/>
  <path class="k" d="M270 140 Q300 122 330 140" stroke-width="7" fill="none"/>
  <path class="A" d="M175 90v164M90 172h170M425 90v164M340 172h170" stroke-width="1.6"/>
  <circle class="a" cx="175" cy="172" r="7"/><circle class="a" cx="425" cy="172" r="7"/>
  <circle class="A" cx="175" cy="172" r="20" stroke-width="2"/><circle class="A" cx="425" cy="172" r="20" stroke-width="2"/>
  <path class="A" d="M175 290H425" stroke-width="2.5"/><path class="A" d="M175 280v20M425 280v20" stroke-width="2.5"/>
  <rect class="a" x="254" y="276" width="92" height="30" rx="15"/><text x="300" y="297" text-anchor="middle" font-size="17" font-weight="600" style="fill:var(--on-blue)">0,1 mm</text>
  <path class="G" d="M540 60 A90 90 0 0 1 568 118" stroke-width="3"/><path class="G" d="M530 52 L548 128" stroke-width="2" stroke-dasharray="4 5"/>
  <text x="560" y="52" font-size="17" font-weight="600" style="fill:var(--gold)">1°</text>`),

 film: svg(`<rect class="b" width="600" height="360"/>
  <g transform="translate(170 180)"><path class="w" d="M-130 0q130-118 260 0q-130 118-260 0z"/><path class="k" d="M-130 0q130-118 260 0q-130 118-260 0z" stroke-width="3.5"/>
  <circle class="a" r="50" opacity=".85"/><circle class="K" r="20"/><circle class="w" cx="12" cy="-14" r="7"/>
  <circle class="A" cx="62" cy="-34" r="26" stroke-width="2.5"/></g>
  <path class="A" d="M255 130 L360 86 M250 162 L360 284" stroke-width="2" stroke-dasharray="5 6"/>
  <rect class="w" x="360" y="70" width="210" height="230" rx="18"/><rect class="k" x="360" y="70" width="210" height="230" rx="18" stroke-width="2.5"/>
  <rect class="g" x="378" y="96" width="174" height="30" rx="6"/>
  <rect class="b2" x="378" y="132" width="174" height="74" rx="6"/>
  <rect class="ap" x="378" y="212" width="174" height="34" rx="6" style="opacity:.45"/>
  <rect class="gr" x="378" y="252" width="174" height="28" rx="6"/>
  <text x="392" y="117" font-size="15" font-weight="600">lipidico</text>
  <text x="392" y="174" font-size="15" font-weight="600">acquoso</text>
  <text x="392" y="234" font-size="15" font-weight="600">mucinico</text>
  <text x="392" y="271" font-size="15" font-weight="500">cornea</text>`),

 evitare: svg(`<rect class="b" width="600" height="360"/>
  <g transform="translate(150 150)"><circle class="g" r="52"/>${Array.from({length:12},(_,i)=>{const a=i*Math.PI/6;return `<path class="G" d="M${(Math.cos(a)*70).toFixed(1)} ${(Math.sin(a)*70).toFixed(1)} L${(Math.cos(a)*96).toFixed(1)} ${(Math.sin(a)*96).toFixed(1)}" stroke-width="5" stroke-linecap="round"/>`}).join("")}</g>
  <g transform="translate(250 170)"><path class="K" d="M10 20 Q14 76 76 76 Q132 76 140 20z" opacity=".85"/><path class="K" d="M170 20 Q178 76 234 76 Q296 76 300 20z" opacity=".85"/>
  <path class="k" d="M0 18 H310 M140 22 Q155 10 170 22" stroke-width="7" stroke-linecap="round"/>
  <path class="w" d="M40 36 q20-8 40 -4" stroke="var(--il-paper)" stroke-width="5" fill="none" opacity=".5"/></g>
  <path class="A" d="M218 214 L262 196" stroke-width="3" stroke-dasharray="6 6"/>`),

 civedo: svg(`<rect class="b" width="600" height="360"/>
  <rect class="w" x="150" y="28" width="300" height="304" rx="14"/><rect class="k" x="150" y="28" width="300" height="304" rx="14" stroke-width="2.5"/>
  <text x="300" y="118" text-anchor="middle" font-size="80" font-weight="600">E</text>
  <text x="300" y="182" text-anchor="middle" font-size="46" font-weight="600" letter-spacing="14">F P</text>
  <text x="300" y="228" text-anchor="middle" font-size="30" font-weight="600" letter-spacing="10">T O Z</text>
  <text x="300" y="262" text-anchor="middle" font-size="20" font-weight="600" letter-spacing="8">L P E D</text>
  <text x="300" y="288" text-anchor="middle" font-size="13" font-weight="600" letter-spacing="6">P E C F D</text>
  <text x="300" y="308" text-anchor="middle" font-size="9" font-weight="600" letter-spacing="5">E D F C Z P</text>
  <path class="A" d="M468 228 H520" stroke-width="3"/><path class="A" d="M508 218 l12 10 -12 10" stroke-width="3"/>
  <path class="A" d="M132 228 H80" stroke-width="3"/><path class="A" d="M92 218 l-12 10 12 10" stroke-width="3"/>`)
};
const icon = {
 leaf:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/></svg>',
 heart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="6.5" cy="15" r="3.5"/><circle cx="17.5" cy="15" r="3.5"/><path d="M10 15q2-1.6 4 0M3 15l1-6h3M21 15l-1-6h-3"/><path d="M12 9.5c-1.2-1.4-3.4-.6-3-1.2C9.4 6.4 11.2 6 12 7.2c.8-1.2 2.6-.8 3 1.1.4.6-1.8-.2-3 1.2z" fill="currentColor" stroke="none"/></svg>',
 eye:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M8 20.5c1 .4 2.6.6 4 .6"/></svg>',
 loupe:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="10" cy="10" r="6.5"/><path d="M15 15l6 6"/><path d="M7 10h6M10 7v6"/></svg>',
 photo:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-8 8"/></svg>',
 doc:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/><path d="M2 14c2-2 4-2 5 0" /></svg>'
};

/* ---------- posters (illustrazioni originali, senza marchi) ---------- */
function poster(p){
  const kid = !!p.kid, S = p.skin, Sd = p.skinD, Hc = p.hair;
  const hair = {
    short:{back:"",front:`<path d="M92 166C84 104 118 82 152 82C190 82 220 104 210 166C204 132 186 116 150 116C116 116 100 132 92 166Z" fill="${Hc}"/>`},
    long:{back:`<path d="M84 170C72 94 116 72 152 72C196 72 232 96 220 172C228 238 240 300 226 352L76 352C62 300 76 236 84 170Z" fill="${Hc}"/>`,front:`<path d="M92 162C96 102 134 86 164 90C198 94 214 124 212 162C196 124 158 110 128 124C108 132 98 148 92 162Z" fill="${Hc}"/>`},
    bun:{back:`<circle cx="150" cy="76" r="32" fill="${Hc}"/>`,front:`<path d="M92 166C86 108 120 90 150 90C182 90 216 108 208 166C202 132 180 114 150 114C120 114 100 132 92 166Z" fill="${Hc}"/>`},
    curly:{back:`${[[96,120,26],[118,92,28],[150,82,30],[182,92,28],[204,120,26],[90,150,20],[210,150,20]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${Hc}"/>`).join("")}`,front:`${[[112,112,18],[136,100,18],[162,100,18],[188,112,18]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${Hc}"/>`).join("")}`},
    bob:{back:`<path d="M80 176C70 96 116 76 152 76C196 76 232 98 222 176C226 214 224 236 214 250L88 250C76 236 76 214 80 176Z" fill="${Hc}"/>`,front:`<path d="M92 150C94 104 128 88 156 88C194 88 214 112 210 150C180 140 140 124 118 112C108 124 98 136 92 150Z" fill="${Hc}"/>`}
  }[p.hairStyle];
  const lens = p.tint || "rgba(255,255,255,.28)";
  const fr = p.frame, sw = p.thin ? 3.5 : 6;
  const shapes = {
    round:(cx)=>`<circle cx="${cx}" cy="172" r="22" fill="${lens}" stroke="${fr}" stroke-width="${sw}"/>`,
    square:(cx)=>`<rect x="${cx-25}" y="155" width="50" height="36" rx="7" fill="${lens}" stroke="${fr}" stroke-width="${sw}"/>`,
    cat:(cx,s)=>`<path d="M${cx-24} 166C${cx-24} ${152} ${cx-8} 154 ${cx} 156C${cx+14} 157 ${cx+25} 160 ${cx+25} 170C${cx+25} 186 ${cx+12} 192 ${cx} 192C${cx-14} 192 ${cx-24} 184 ${cx-24} 170Z" transform="${s<0?`translate(${2*cx} 0) scale(-1 1)`:""}" fill="${lens}" stroke="${fr}" stroke-width="${sw}"/><path d="M${s<0?cx+24:cx-24} 160 l${s<0?5:-5} -6" stroke="${fr}" stroke-width="${sw}" stroke-linecap="round"/>`,
    pano:(cx)=>`<path d="M${cx-26} 160 H${cx+26} V176 C${cx+26} 190 ${cx+12} 194 ${cx} 194 C${cx-14} 194 ${cx-26} 190 ${cx-26} 176Z" fill="${lens}" stroke="${fr}" stroke-width="${sw}" stroke-linejoin="round"/>`
  };
  const L = shapes[p.frameStyle];
  const shoulders = kid ? `M70 400C76 312 112 268 150 268C188 268 224 312 230 400Z` : `M30 400C40 316 96 286 150 286C204 286 260 316 270 400Z`;
  const beard = p.beard ? `<path d="M96 190C98 250 124 266 150 266C176 266 202 250 204 190C198 222 184 234 172 236C164 226 136 226 128 236C116 234 102 222 96 190Z" fill="${Hc}"/>` : "";
  const head = kid ? `<ellipse cx="150" cy="178" rx="58" ry="66" fill="${S}"/>` : `<ellipse cx="150" cy="176" rx="56" ry="72" fill="${S}"/>`;
  return `<svg viewBox="0 0 300 375" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${p.label}">
   <rect width="300" height="375" fill="${p.bg}"/>
   <circle cx="${p.cx||236}" cy="${p.cy||84}" r="${p.r||118}" fill="${p.bg2}"/>
   ${p.deco||""}
   ${hair.back}
   <rect x="133" y="${kid?226:228}" width="34" height="${kid?40:64}" fill="${Sd}"/>
   <path d="${shoulders}" fill="${p.shirt}"/>
   ${p.collar||""}
   <ellipse cx="93" cy="180" rx="9" ry="15" fill="${Sd}"/><ellipse cx="207" cy="180" rx="9" ry="15" fill="${Sd}"/>
   ${head}
   ${beard}
   ${hair.front}
   <path d="M106 148Q124 140 142 147" stroke="${p.brow||Hc}" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M158 147Q176 140 194 148" stroke="${p.brow||Hc}" stroke-width="4" fill="none" stroke-linecap="round"/>
   <ellipse cx="124" cy="174" rx="4.5" ry="5" fill="#2a2522"/><ellipse cx="176" cy="174" rx="4.5" ry="5" fill="#2a2522"/>
   <path d="M150 182Q147 198 143 205Q150 210 157 206" stroke="${Sd}" stroke-width="3" fill="none" stroke-linecap="round"/>
   <path d="M${p.smile?'132 222Q150 238 168 222':'136 224Q150 230 164 224'}" stroke="${p.lip||'#9c4f45'}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
   ${p.cheek?`<circle cx="112" cy="205" r="9" fill="#f08f86" opacity=".35"/><circle cx="188" cy="205" r="9" fill="#f08f86" opacity=".35"/>`:""}
   <path d="M98 168 L88 172 M202 168 L212 172" stroke="${fr}" stroke-width="${sw}" stroke-linecap="round"/>
   ${L(124,1)}${L(176,-1)}
   <path d="M${p.frameStyle==='pano'?'150 164':'146 168'}Q150 ${p.frameStyle==='pano'?160:163} ${p.frameStyle==='pano'?'150 164':'154 168'}" stroke="${fr}" stroke-width="${sw}" fill="none"/>
   ${p.frameStyle==='pano'?`<path d="M98 160H202" stroke="${fr}" stroke-width="${sw}"/>`:""}
  </svg>`;
}
const POSTERS = {
  sole: poster({label:"Illustrazione: modella con occhiali da sole squadrati",bg:"#e2b13c",bg2:"#d39a21",skin:"#f1cdb4",skinD:"#dcae92",hair:"#7a2e1c",hairStyle:"long",shirt:"#4a1a1f",frame:"#2a1a14",frameStyle:"square",tint:"rgba(70,30,20,.86)",lip:"#9a3b38",collar:`<path d="M110 300L150 352L190 300L176 292L150 326L124 292Z" fill="#2c0f13"/>`}),
  uomo: poster({label:"Illustrazione: uomo con montatura squadrata",bg:"#dfe4ee",bg2:"#c9d2e3",skin:"#e8b996",skinD:"#d29c78",hair:"#3b2f2a",hairStyle:"short",beard:true,shirt:"#20304f",frame:"#1b1b1b",frameStyle:"square",collar:`<path d="M126 290L150 318L174 290" fill="#f4f1ea"/>`}),
  uomo2: poster({label:"Illustrazione: uomo con occhiali da sole a goccia",bg:"#e7e2d6",bg2:"#d7cdb6",skin:"#a8714f",skinD:"#8f5d40",hair:"#1d1a19",hairStyle:"short",shirt:"#b6553b",frame:"#b8902f",frameStyle:"pano",thin:true,tint:"rgba(40,62,58,.82)",smile:true}),
  donna: poster({label:"Illustrazione: donna con montatura cat-eye",bg:"#f1dfd8",bg2:"#e7c8bd",skin:"#f0c7a9",skinD:"#dca98a",hair:"#6b3a24",hairStyle:"long",shirt:"#1f2a44",frame:"#7d1f2b",frameStyle:"cat",lip:"#b24a4a",smile:true}),
  donna2: poster({label:"Illustrazione: donna con occhiali da sole rotondi",bg:"#dfe9e4",bg2:"#c3d8cd",skin:"#7a4a33",skinD:"#643a27",hair:"#141212",hairStyle:"bun",shirt:"#e9d9b4",frame:"#2b2b2b",frameStyle:"round",tint:"rgba(116,72,30,.78)",lip:"#6e2c2a"}),
  donna3: poster({label:"Illustrazione: donna con montatura sottile",bg:"#e6e3f1",bg2:"#d0cbe6",skin:"#f3d2b8",skinD:"#ddb294",hair:"#c79b5d",hairStyle:"bob",shirt:"#3d4a3b",frame:"#9a7a3a",frameStyle:"round",thin:true,brow:"#8a6a3c",smile:true}),
  bambino: poster({label:"Illustrazione: bambino con montatura blu",kid:true,bg:"#fbe7c7",bg2:"#f6d394",skin:"#f2c6a2",skinD:"#dfab84",hair:"#8a4b22",hairStyle:"curly",shirt:"#2f8f7a",frame:"#1f43e0",frameStyle:"round",smile:true,cheek:true,deco:`<circle cx="52" cy="70" r="10" fill="#f08f86"/><circle cx="262" cy="300" r="14" fill="#1f43e0" opacity=".25"/>`}),
  bambina: poster({label:"Illustrazione: bambina con montatura rosa",kid:true,bg:"#dfeefb",bg2:"#bcdcf6",skin:"#e9b48e",skinD:"#d29a72",hair:"#2e1d14",hairStyle:"bob",shirt:"#f2a7c0",frame:"#e2457e",frameStyle:"square",smile:true,cheek:true,deco:`<path d="M44 64l6 12 13 2-9 9 2 13-12-6-12 6 2-13-9-9 13-2z" fill="#f6d394"/>`})
};

const camp = (k, t, s) => `<figure class="camp">${POSTERS[k].replace('viewBox="0 0 300 375"','viewBox="50 62 200 250"')}<figcaption><b>${t}</b><span>${s}</span></figcaption></figure>`;

/* ---------- data ---------- */
const BRANDS = [
  ["Lenti oftalmiche", ["Hoya","Zeiss","Essilor","Rodenstock","Seiko","Ital-Lenti"]],
  ["Montature e occhiali da sole", ["Ray-Ban","Nike","Tommy Hilfiger","Victoria Beckham","Gigi Studios","Kartell","Modo Eco","Atlant","Webee","Quoise","Lamarca","Serengeti"]],
  ["Lenti a contatto", ["CooperVision","Bausch + Lomb","Johnson & Johnson","Menicon"]],
  ["Sport e mare", ["Divel","Cressi"]]
];
/* Per inserire un logo: sostituire il nome con {n:"Hoya", logo:"data:image/png;base64,..."} */
const brandTile = b => typeof b === "string" ? `<div class="logo-tile">${b}</div>` : `<div class="logo-tile"><img src="${b.logo}" alt="${b.n}"></div>`;

const mqItem = b => typeof b === "string" ? `<span class="mq-item">${b}</span>` : `<span class="mq-item"><img src="${b.logo}" alt="${b.n}"></span>`;
const marquee = () => {
  const rows = [BRANDS[1][1], [...BRANDS[0][1], ...BRANDS[2][1], ...BRANDS[3][1]]];
  return `<div class="mq-wrap">${rows.map((r,i)=>`<div class="marquee${i?' rev':''}" role="region" aria-label="Brand in negozio"><div class="mq-track"><div class="mq-set">${r.map(mqItem).join("")}</div><div class="mq-set" aria-hidden="true">${r.map(mqItem).join("")}</div></div></div>`).join("")}</div>`;
};
const HOURS = [["Lunedì","15:30 – 19:00"],["Martedì","9:30 – 13:30 / 15:30 – 19:30"],["Mercoledì","9:30 – 13:30 / 15:30 – 19:30"],["Giovedì","9:30 – 13:30 / 15:30 – 19:30"],["Venerdì","9:30 – 13:30 / 15:30 – 19:30"],["Sabato","9:30 – 13:30 / 15:30 – 19:00"],["Domenica","Chiuso"]];
const MAPS = "https://www.google.com/maps/search/?api=1&query=Ottica+Demo+Via+Roma+1+Milano";

const POSTS = [
 {s:"miopia-nei-bambini", cat:"Miopia", il:"miopia", img:"art_miopia", alt:"Un ragazzo seduto su una panchina guarda la città attraverso un paio di occhiali", t:"Miopia nei bambini: come rallentarla davvero", ex:"Che cos’è la miopia, perché aumenta durante la crescita e come lenti MiYOSMART e lenti a contatto dedicate possono rallentarne la progressione.",
  intro:"La miopia non è solo “vedere male da lontano”. Nei più giovani è un occhio che si allunga anno dopo anno, finché la crescita non si ferma. Oggi possiamo rallentarla, ma solo se interveniamo in tempo.",
  body:`<h2>Che cos’è la miopia</h2><p>La miopia è un difetto visivo: i raggi di luce che entrano nell’occhio vanno a fuoco davanti alla retina invece che sopra. Il risultato è che gli oggetti lontani appaiono sfocati. Chi è miope e non porta la correzione tende a strizzare gli occhi per vedere meglio da lontano.</p><p>È uno dei difetti visivi più diffusi: in Italia riguarda oltre il 30% della popolazione, e le stime internazionali indicano che entro il 2050 circa metà della popolazione mondiale sarà miope.</p>
  <h2>Come si misura</h2><p>La miopia si misura in diottrie. Più è alta, più si accorcia la distanza alla quale si riesce a vedere bene.</p><ul><li>Miopia lieve: da −0,25 a −3,00 diottrie.</li><li>Miopia media: da −3,25 a −6,00 diottrie.</li><li>Miopia elevata: oltre −6,00 diottrie.</li></ul><p>Spesso è accompagnata da astigmatismo, un altro difetto che distorce le immagini a tutte le distanze.</p>
  <h2>Quando compare e perché</h2><p>La prima diagnosi arriva di solito in età scolare, ma con le tecniche di oggi è possibile una valutazione già intorno ai 2 anni. La miopia tende ad aumentare fino ai 20-25 anni, poi si stabilizza e può crescere solo lievemente nel corso della vita.</p><p>Le cause principali sono tre: un bulbo oculare più lungo del normale, che è la più comune; un cristallino con un potere di rifrazione eccessivo; una curvatura troppo accentuata della cornea o del cristallino.</p>
  <h2>I fattori di rischio</h2><ul><li>Familiarità: un bambino con entrambi i genitori miopi ha una probabilità molto alta di diventarlo.</li><li>Molte ore al chiuso e poco tempo all’aria aperta, con meno luce naturale.</li><li>Uso intenso di tablet, telefoni e libri a distanza ravvicinata.</li><li>Comparsa precoce: prima inizia, più tempo ha per aumentare.</li></ul>
  <h2>Perché la miopia elevata va evitata</h2><p>Quando l’occhio si allunga troppo, la retina periferica si assottiglia e i tessuti interni si deformano. Aumenta così il rischio di problemi seri: rotture e distacco della retina, fori maculari, alterazioni del vitreo, e una maggiore frequenza di cataratta e glaucoma. Lampi di luce e “mosche volanti” sono segnali da non trascurare.</p><p>Avere una miopia elevata non significa per forza avere complicazioni, ma il rischio cresce con ogni diottria in più. Per questo conviene agire quando la miopia è ancora bassa.</p>
  <h2>Le lenti che correggono e rallentano</h2><p>Con le lenti monofocali tradizionali l’immagine è nitida al centro, ma in periferia la luce va a fuoco dietro la retina: l’occhio risponde allungandosi, e la miopia aumenta.</p><p>Le lenti Hoya MiYOSMART, con tecnologia D.I.M.S. (Defocus Incorporated Multiple Segments) o T.E.D. (Triple Enhanced Design), correggono la miopia e allo stesso tempo ne rallentano la progressione. Piccole isole di potere positivo (+3,50 D nella D.I.M.S., +4,50 D nella T.E.D.) riportano la messa a fuoco anche in periferia e riducono lo stimolo ad allungare l’occhio. Si possono usare dall’età di circa 6 anni.</p><p>Nello studio clinico a 24 mesi pubblicato nel 2020 (Lam e colleghi, British Journal of Ophthalmology), con le lenti D.I.M.S., rispetto alle lenti monofocali, la progressione della miopia è risultata rallentata in media del 59% e l’allungamento dell’occhio del 60%, e in circa un bambino su cinque la miopia non è aumentata affatto. Gli studi clinici a 12 mesi hanno invece evidenziato, nei portatori di lenti T.E.D., un arresto completo della progressione miopica e della lunghezza assiale dell’occhio. Tutt’ora gli studi clinici continuano.</p><p>Esteticamente non si distinguono da una lente tradizionale, sono resistenti e adatte alla vita di tutti i giorni. E rallentare la miopia significa anche cambiare le lenti meno spesso.</p>
  <h2>Le lenti a contatto per il controllo della miopia</h2><p>Anche la contattologia offre soluzioni specifiche. Menicon Bloom Day è una lente morbida giornaliera a profondità di fuoco estesa (E.D.O.F.): nitida al centro per la visione da lontano, con un potere relativo maggiore verso la periferia. CooperVision MyDay MiSight è una lente giornaliera in silicone-hydrogel progettata per contenere l’evoluzione della miopia nei giovani. La scelta tra occhiali e lenti a contatto si fa insieme, in base all’età e allo stile di vita, e in accordo con l’oculista.</p>
  <h2>I controlli</h2><p>I primi benefici si vedono già nei primi 6 mesi di utilizzo costante. Consigliamo un controllo ogni 6 mesi in negozio e una visita all’anno dall’oculista: confrontando i valori nel tempo capiamo se il percorso sta funzionando.</p>`,
  closing:"Ogni anno di progressione miopica non gestita non si recupera."},

 {s:"lenti-progressive", cat:"Presbiopia", il:"progressive", img:"art_prog", alt:"Un uomo alla guida usa una lente d’ingrandimento per leggere il navigatore", t:"Lenti progressive: come sceglierle", ex:"Dopo i 40 anni mettere a fuoco da vicino diventa faticoso. Come funziona una lente progressiva, perché i premontati non bastano e le domande da fare al tuo ottico.",
  intro:"Una lente progressiva permette di vedere bene da lontano, a media distanza e da vicino con un solo paio di occhiali. Funziona davvero solo se è progettata, misurata e montata per te.",
  body:`<h2>Che cosa cambia dopo i 40 anni</h2><p>Dopo i 40 anni il cristallino, la parte dell’occhio che regola la messa a fuoco, perde progressivamente la capacità di mettere a fuoco gli oggetti vicini. Ce ne accorgiamo prima quando la luce è scarsa: per leggere allunghiamo le braccia, oppure ci allontaniamo per decifrare la lista degli ingredienti al supermercato. È la presbiopia, ed è il momento di fare un controllo della vista.</p>
  <h2>Perché gli occhiali premontati non bastano</h2><p>Gli occhiali da lettura già pronti hanno una qualità ottica di base, la stessa gradazione su entrambe le lenti (mentre quasi sempre i due occhi sono diversi) e una centratura standard, uguale per tutti. Possono andare bene come occhiale di scorta, ma non per letture lunghe o lavori impegnativi.</p>
  <h2>Come è fatta una lente progressiva</h2><p>Possiamo immaginarla divisa in tre zone: nella parte alta c’è la correzione per la visione da lontano, in quella centrale la correzione per le distanze intermedie, in basso quella per il vicino. Tra una zona e l’altra il potere cambia in modo graduale, lungo un “corridoio”. Ai lati ci sono zone di distorsione che nessuna progressiva elimina del tutto: la qualità del progetto decide quanto sono ampie e quanto si percepiscono.</p>
  <h2>L’adattamento</h2><p>All’inizio una progressiva richiede un po’ di adattamento: si impara a muovere la testa più che gli occhi e a trovare la postura giusta per ogni distanza. Di solito bastano pochi giorni. Se dopo qualche settimana non ci si trova, quasi sempre il problema è nelle misure: anche un millimetro di errore sposta il corridoio rispetto alla pupilla.</p>
  <h2>Le domande da fare al tuo ottico</h2><ol><li>Come misura la centratura, e con quale precisione?</li><li>Tiene conto di inclinazione e avvolgimento della montatura?</li><li>Quali distanze uso di più durante la giornata?</li><li>La montatura che ho scelto è adatta a una progressiva?</li><li>Cosa succede se dopo qualche settimana non mi trovo?</li></ol>
  <p>Da noi la risposta all’ultima domanda è semplice: ti seguiamo durante l’adattamento e verifichiamo misure e montaggio finché la lente non lavora come deve. Perché per la vista non esistono soluzioni “fai da te”.</p>`},

 {s:"lenti-office-per-presbiti", cat:"Presbiopia", il:"office", img:"art_office", alt:"Un uomo al bar legge sullo smartphone, con gli occhiali appoggiati sul tavolo", t:"Lenti office: la soluzione per chi lavora alla scrivania", ex:"Correggono da vicino fino a media distanza, dove stanno documenti e monitor. Quando sono la scelta giusta e quando non bastano.",
  intro:"Se la tua giornata si svolge soprattutto alla scrivania, tra documenti e uno o più monitor, la progressiva può non essere la scelta più comoda. Le lenti office, chiamate anche degressive, sono pensate proprio per questo spazio.",
  body:`<h2>La presbiopia cambia con la distanza</h2><p>La messa a fuoco che la presbiopia ci toglie non è la stessa a tutte le distanze. È massima per ciò che guardiamo a 35-40 cm, come un libro o il telefono, e diminuisce man mano che ci allontaniamo: il tablet a 45-50 cm, lo schermo del computer a 60-70 cm, il collega seduto di fronte.</p><p>Per questo un occhiale da lettura, che corregge la presbiopia per i 40 cm, diventa sempre più fastidioso quanto più lo usiamo lontano da quella distanza.</p>
  <h2>Cosa fa una lente office</h2><p>Le lenti office hanno campi visivi ampi per le distanze dal vicino alla media distanza. Assecondano la postura naturale, senza costringere ad alzare il mento per vedere il monitor, e così risparmiano collo e spalle. Non sono però pensate per guardare lontano: oltre i 4 metri circa l’immagine si sfoca, quindi non vanno usate per guidare o camminare.</p>
  <h2>Per chi sono pensate</h2><ul><li>Chi passa molte ore al computer o tra documenti da leggere e compilare.</li><li>Chi con la progressiva sente il collo rigido a fine giornata.</li><li>Chi alterna continuamente schermo, fogli e persone al tavolo.</li></ul>
  <h2>Office o progressiva?</h2><p>Dipende da come usi gli occhi. Se il lavoro è dinamico e ti sposti di continuo tra distanze diverse, la progressiva resta lo strumento più adatto, perché copre tutte le distanze con un solo occhiale. Se invece la giornata è soprattutto alla scrivania, la lente office offre più comfort, come ad esempio alleviando il carico di lavoro a collo e spalle. Spesso la soluzione migliore è averle entrambe: ne parliamo nell’articolo sul multi-equipaggiamento.</p>`},

 {s:"multi-equipaggiamento", cat:"Presbiopia", il:"multi", img:"art_multi", alt:"Mani che tengono un libro aperto al tavolino di un bar, con gli occhiali appoggiati accanto", t:"Multi-equipaggiamento: perché un occhiale solo non basta", ex:"Lettura a 35-40 cm, tablet a 45-50, schermo a 60-70, lontano. Quattro distanze, e come coprirle tutte con il comfort giusto.",
  intro:"Durante la giornata gli occhi cambiano distanza decine di volte. Dopo i 45 anni un solo occhiale difficilmente riesce a coprirle tutte con lo stesso comfort.",
  body:`<h2>Le quattro distanze della giornata</h2><ul><li>35-40 cm: libro, telefono, etichette. È qui che la presbiopia si fa sentire di più.</li><li>45-50 cm: tablet e documenti sulla scrivania.</li><li>60-70 cm: lo schermo del computer.</li><li>Oltre i 4 metri: strada, televisione, persone.</li></ul>
  <h2>Perché un solo occhiale non basta</h2><p>Ogni lente è un compromesso. La progressiva copre tutte le distanze, ma con zone per il vicino e per l’intermedio più strette. La lente office allarga lo spazio della scrivania ma non serve per lontano. L’occhiale da lettura funziona bene solo a 40 cm. Usare un solo occhiale per tutto significa accettare fatica in almeno una di queste situazioni.</p>
  <h2>Le combinazioni più comuni</h2><ul><li>Progressiva per uscire e guidare, lente office per il lavoro al computer.</li><li>Progressiva da vista e progressiva da sole graduata per la guida e il tempo libero.</li><li>Lenti a contatto multifocali per lo sport, occhiale per il resto della giornata.</li></ul>
  <h2>Come lo costruiamo insieme</h2><p>Partiamo da come passi la tua giornata: quante ore al computer, quanto guidi, cosa leggi e dove. Da lì scegliamo la combinazione che ti serve davvero, senza aggiungere nulla di superfluo. Non si tratta di comprare di più, ma di avere lo strumento giusto per ogni momento e arrivare a sera con gli occhi meno stanchi. Chiedi in negozio della promozione dedicata al multi-equipaggiamento.</p>`},

 {s:"lenti-a-contatto-guida", cat:"Lenti a contatto", il:"lac", img:"art_lac", alt:"Una donna davanti allo specchio del bagno sta per applicare una lente a contatto", t:"Lenti a contatto: la guida completa", ex:"Morbide, rigide, gas-permeabili, giornaliere o mensili. Come si sceglie, come si applica e gli errori da evitare con lenti e portalenti.",
  intro:"Le lenti a contatto sono un dispositivo medico. La scelta giusta dipende dall’occhio, dal difetto visivo e dallo stile di vita, e l’applicazione va fatta da un professionista.",
  body:`<h2>I tipi di lenti a contatto</h2><ul><li>Morbide idrofile giornaliere: le più igieniche, una lente nuova ogni mattina e nessuna manutenzione.</li><li>Morbide bisettimanali e mensili: richiedono una pulizia quotidiana con la soluzione adatta e un portalenti sempre in ordine.</li><li>Toriche, per chi ha l’astigmatismo, e multifocali, per chi è presbite.</li><li>Rigide gas-permeabili: visione molto nitida, indicate anche negli astigmatismi elevati e nel cheratocono.</li><li>Lenti dedicate al controllo della progressione della miopia nei più giovani.</li></ul>
  <h2>L’applicazione</h2><p>In negozio valutiamo l’occhio, proviamo le lenti e osserviamo come si muovono sulla cornea. Poi ti insegniamo a metterle e toglierle in sicurezza e a gestirne la pulizia. Dopo il primo periodo di utilizzo facciamo un controllo per verificare comfort e qualità della visione.</p>
  <h2>La manutenzione e il portalenti</h2><p>Il portalenti è uno dei punti più trascurati. Va sciacquato ogni giorno con la soluzione, mai con l’acqua del rubinetto, lasciato asciugare aperto e capovolto, e sostituito spesso. Un portalenti vecchio può diventare un serbatoio di batteri anche se le lenti sono nuove.</p>
  <h2>Gli errori da evitare</h2><ul><li>Dormire con lenti non pensate per l’uso notturno.</li><li>Sciacquare o conservare le lenti in acqua del rubinetto.</li><li>Usarle oltre la durata prevista o “allungare” una mensile.</li><li>Applicarle con le mani non lavate o con cosmetici stesi sul contorno occhi.</li><li>Ignorare arrossamento, dolore o calo della vista: in quel caso si tolgono subito e si chiede un parere.</li></ul>`},

 {s:"vista-e-computer", cat:"Salute visiva", il:"computer", img:"art_pc", alt:"Un ragazzo con gli occhiali lavora al computer in uno studio luminoso", t:"Vista e computer: capire l’affaticamento visivo", ex:"Perché gli occhi bruciano a fine giornata davanti allo schermo e cosa si può fare davvero, oltre alla regola 20-20-20.",
  intro:"Bruciore, vista che si appanna, mal di testa nel pomeriggio, collo rigido. Davanti allo schermo gli occhi lavorano per ore alla stessa distanza e ammiccano meno del normale.",
  body:`<h2>Perché succede</h2><p>Quando fissiamo uno schermo il numero di ammiccamenti si riduce di molto e la superficie dell’occhio si asciuga. In più i muscoli che regolano la messa a fuoco restano contratti per ore sulla stessa distanza. È quella che viene chiamata sindrome da visione al computer (CVS).</p><p>Un piccolo difetto visivo non corretto, oppure un occhiale pensato per altre distanze, peggiora tutto: per vedere lo schermo si assumono posture scorrette e a fine giornata ne risentono anche collo e spalle.</p>
  <h2>La regola 20-20-20</h2><p>Ogni 20 minuti guarda qualcosa a circa 6 metri (20 piedi) per almeno 20 secondi. È un’abitudine utile per rilassare la messa a fuoco, ma da sola non basta.</p>
  <h2>Cosa fare davvero</h2><ul><li>Verificare la vista alla distanza reale dello schermo, non solo da lontano.</li><li>Dopo i 40 anni, valutare una lente office se lavori molte ore al computer.</li><li>Sistemare lo schermo poco sotto l’altezza degli occhi, a circa un braccio di distanza.</li><li>Curare la luce: evitare riflessi sullo schermo e finestre alle spalle del monitor.</li><li>Ricordarsi di ammiccare e fare pause regolari.</li><li>Se il bruciore persiste, controllare la qualità del film lacrimale.</li></ul>`},

 {s:"centratura-digitale", cat:"Tecnologia", il:"centratura", img:"tech", alt:"Occhiali tartarugati su una superficie di pietra tra lenti trasparenti e linee di misura", t:"Centratura digitale: perché conta più di quanto pensi", ex:"Al decimo di millimetro e al singolo grado di inclinazione della montatura. La differenza tra una lente montata bene e una su misura.",
  intro:"Due occhiali con le stesse lenti possono dare risultati molto diversi. A fare la differenza è la posizione esatta della lente davanti al tuo occhio.",
  body:`<h2>Cosa misuriamo</h2><ul><li>La distanza di ciascuna pupilla dal centro del naso, separatamente per l’occhio destro e per il sinistro.</li><li>L’altezza della pupilla rispetto al bordo della montatura.</li><li>L’inclinazione della montatura rispetto al viso.</li><li>L’avvolgimento, cioè quanto la montatura segue la curva del viso.</li><li>La distanza tra la lente e l’occhio.</li></ul>
  <h2>Perché serve tanta precisione</h2><p>Nelle lenti monofocali un errore di centratura crea piccoli effetti prismatici che affaticano gli occhi senza che ce ne accorgiamo. Nelle lenti progressive e in quelle per il controllo della miopia è ancora più critico: il progetto della lente funziona solo se è allineato con precisione alla pupilla.</p>
  <h2>Come lavoriamo</h2><p>Con la centratura digitalizzata misuriamo al decimo di millimetro e al singolo grado, sulla montatura che hai scelto, indossata nella tua postura naturale. Le misure passano poi al nostro laboratorio (o, per alcuni lavori, direttamente alle aziende produttrici delle lenti), dove le lenti vengono montate e verificate prima della consegna.</p><p>Il risultato si vede: visione più nitida, campo visivo pieno e un adattamento più rapido, soprattutto con le progressive.</p>`},

 {s:"disfunzione-film-lacrimale", cat:"Salute visiva", il:"film", img:"girl", alt:"Il profilo di una ragazza con gli occhiali davanti a un paesaggio di lago e montagne", t:"Disfunzione del film lacrimale: quando l’occhio secco non è solo stanchezza", ex:"Bruciore, sensazione di sabbia, vista che va e viene. Come funziona il film lacrimale, chi è più a rischio e cosa si può fare per ritrovare il comfort.",
  intro:"L’occhio è protetto da una pellicola sottilissima, il film lacrimale, ricca di sostanze nutritive e protettive in equilibrio tra loro. Quando questo equilibrio si rompe, gli occhi diventano secchi e irritati e la vista meno stabile.",
  body:`<h2>Tre strati, un equilibrio</h2><p>Il film lacrimale è spesso circa 9 micron appena prodotto e si riduce a circa 4 prima dell’ammiccamento successivo. È formato da tre strati:</p><ul><li>Lo strato lipidico, il più esterno, che limita l’evaporazione.</li><li>Lo strato acquoso, il più spesso, che nutre e idrata la cornea, diluisce le sostanze dannose ed elimina i detriti.</li><li>Lo strato mucinico, il più profondo, che rende la cornea “bagnabile” e impedisce alla lacrima di scivolare via.</li></ul>
  <h2>Le due forme principali</h2><p>Nella grande maggioranza dei casi l’occhio secco dipende da un’evaporazione eccessiva: le ghiandole di Meibomio, nelle palpebre, producono poca componente oleosa e le lacrime evaporano troppo in fretta. Più raramente il problema è una produzione insufficiente di lacrime da parte delle ghiandole lacrimali.</p>
  <h2>I segnali da non trascurare</h2><ul><li>Bruciore e fastidio, sensazione di corpo estraneo.</li><li>Occhi arrossati, sensibilità alla luce.</li><li>Vista che si annebbia e torna nitida ammiccando.</li><li>Paradossalmente, una lacrimazione eccessiva.</li></ul><p>È un disturbo molto diffuso e colpisce soprattutto le donne dopo i 45 anni e in menopausa.</p>
  <h2>I fattori di rischio</h2><p>L’età, le infiammazioni e le allergie oculari, le blefariti croniche, gli squilibri ormonali, alcuni farmaci, il fumo, l’abuso di cosmetici per gli occhi, un uso scorretto delle lenti a contatto e gli esiti di chirurgia refrattiva. Contano molto anche l’ambiente e le abitudini: aria condizionata o riscaldamento troppo secchi, inquinamento, poca acqua, ore di schermo senza pause e a distanza troppo ravvicinata.</p>
  <h2>Cosa possiamo fare</h2><p>La diagnosi non va fatta da soli. Con questionari e strumenti dedicati si valuta la qualità del film lacrimale, il tempo in cui si rompe e lo stato delle ghiandole di Meibomio; quando serve, indirizziamo all’oculista per un approfondimento.</p><ul><li>Bere molta acqua e curare l’alimentazione, con più frutta, verdura e omega-3.</li><li>Controllare l’umidità dell’aria dove si vive e si lavora.</li><li>Tenere i dispositivi digitali ad almeno 30 cm e fare pause regolari.</li><li>Usare sostituti lacrimali adatti al proprio caso.</li><li>Fare impacchi tiepidi sulle palpebre, intorno ai 40 gradi, per mantenere puliti i dotti delle ghiandole.</li></ul><p>Non è una condizione a cui rassegnarsi: affrontata per tempo, si può migliorare molto.</p>`}
];

const CURIO = [
 {s:"10-cose-da-evitare", il:"evitare", img:"art_lac", t:"10 cose da evitare", ex:"Dieci comportamenti che fanno male agli occhi, raccolti in oltre trent’anni di banco. Dalla luce intensa ai lavori pericolosi.",
  intro:"Dieci abitudini che vediamo spesso e che, nel tempo, mettono alla prova gli occhi.",
  items:[["Luce intensa","Sole, neve e acqua senza filtro solare adeguato affaticano e danneggiano la superficie oculare."],["Due ruote senza protezione","Vento, polvere e insetti: in bici e in moto servono occhiali avvolgenti."],["Cattiva manutenzione","Lenti graffiate e montature storte peggiorano la visione più di quanto si pensi."],["Cure fai da te","Colliri presi “a sentimento” possono mascherare un problema invece di risolverlo."],["Non ammiccare","Davanti agli schermi ammicchiamo meno, e l’occhio si asciuga."],["Dormire con le lenti a contatto","Se non sono pensate per la notte, aumenta il rischio di infezioni."],["Eyeballing","Le mode che mettono sostanze a contatto con l’occhio sono pericolose, sempre."],["Ambienti estremi","Freddo, vento, aria secca e cloro richiedono protezioni specifiche."],["Lavori pericolosi","Schegge, saldature e sostanze chimiche: gli occhiali di sicurezza non sono un optional."],["Ignorare i segnali","Lampi, ombre, calo improvviso della vista: si va subito dall’oculista."]]},
 {s:"ci-vedo-bene", il:"civedo", img:"girl", t:"Ci vedo bene? Scoprilo in 10 valutazioni", ex:"Dieci situazioni quotidiane che forse stai dando per scontate. Se ti riconosci in una di queste, vale la pena di un controllo.",
  intro:"Dieci situazioni di tutti i giorni. Se ti riconosci in una o più, è il momento di un controllo della vista.",
  items:[["Guarda un punto luminoso","Vedi aloni o raggi intorno ai fari e ai lampioni?"],["Occhi stanchi","A fine giornata senti bruciore o pesantezza?"],["Tensione cervicale","Il collo è rigido dopo il lavoro al computer?"],["Scritte in video","Ti avvicini allo schermo per leggere?"],["Focalizzare","Passando da lontano a vicino serve qualche secondo per mettere a fuoco?"],["Leggere il menù","Allontani il menù per leggerlo meglio?"],["La lettura","Dopo poche pagine perdi il segno o ti viene sonno?"],["Visione dinamica","Fai fatica a leggere i cartelli mentre guidi?"],["Scritte luminose","Le insegne di sera ti sembrano sdoppiate o sfocate?"],["Prevenzione","È passato più di un anno dall’ultimo controllo?"]]},
 {s:"occhi-stanchi", il:"computer", img:"art_pc", t:"Occhi stanchi e lavoro al computer", ex:"Perché dopo otto ore davanti allo schermo gli occhi bruciano, e cosa si può fare davvero, non solo la regola 20-20-20.", go:"vista-e-computer"}
];

/* ---------- helpers ---------- */
const crumb = (...c) => `<nav class="crumb" aria-label="Percorso"><a href="#/">Home</a>${c.map(([t,h])=>`<span>/</span>${h?`<a href="${h}">${t}</a>`:t}`).join("")}</nav>`;
const phead = (crumbs, h, lead, extra="") => `<section class="phead"><div class="wrap">${crumb(...crumbs)}<h1>${h}</h1>${lead?`<p class="lead">${lead}</p>`:""}${extra}</div></section>`;
const band = (h="Prenota la tua visita in negozio.") => `<section><div class="wrap"><div class="band"><h2>${h}</h2><a class="btn" href="#/prenota">Prenota appuntamento</a></div></div></section>`;
const postCard = p => `<a class="post" href="#/blog/${p.s}"><div class="il-wrap">${p.img?`<img class="photo" src="${IMG[p.img]}" alt="${p.alt}" loading="lazy">`:ILL[p.il]}</div><div class="body"><p class="cat">${p.cat}</p><h3>${p.t}</h3><p>${p.ex}</p><span class="link">Leggi ${ARR}</span></div></a>`;
const hoursTable = () => `<table class="hours">${HOURS.map(([d,h])=>`<tr><td>${d}</td><td>${h}</td></tr>`).join("")}</table>`;
const contacts = () => `<div class="cbtns"><a class="cbtn wa" href="https://wa.me/393330000000" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 20l1.2-4A8 8 0 1 1 8 18.8z"/><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 .8a5 5 0 0 1-2.3-2.3l.8-1-1-2z" fill="currentColor" stroke="none"/></svg>WhatsApp</a><a class="cbtn" href="tel:0212345678"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>Chiama il negozio</a><a class="cbtn" href="mailto:info@example.com"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6l8.5 7 8.5-7"/></svg>Email</a></div>`;
const locSection = (title="Dove trovarci", soft=false) => `<section${soft?' class="soft"':''} id="dove"><div class="wrap">
  <div class="head"><span class="bar"></span><h2>${title}</h2></div>
  <div class="loc">
   <div class="info"><p class="addr">Via Roma 1<br>20100 Milano</p><div><h3 style="margin-bottom:10px">Orari di apertura</h3>${hoursTable()}</div><a class="link" href="#/dove-siamo">Come raggiungerci ${ARR}</a></div>
   <figure class="shopcard" style="margin:0"><img class="photo" src="${IMG.negozio}" alt="L’interno del negozio Ottica Demo"></figure>
  </div></div></section>`;
const brandsBlock = () => BRANDS.map(([g,list])=>`<div class="brands-grp"><p>${g}</p><div class="brands">${list.map(brandTile).join("")}</div></div>`).join("");

/* ---------- pages ---------- */
const P = {};
P.home = () => `
<section class="hero"><div class="wrap">
 <div>
  <h1><span>Ottico a Milano,</span><span>in via Roma.</span></h1>
  <p class="tag">La vista non si ripara. Si custodisce.</p>
  <p class="lead">Esperienza, tecnologia e consulenza personalizzata per aiutarti a scegliere le lenti e le montature più adatte alla tua vista e alla tua quotidianità.</p>
  <div class="ctas"><a class="btn" href="#/prenota/form">Prenota un check-up visivo</a><a class="link" href="#/servizi">Scopri i servizi ${ARR}</a></div>
  
 </div>
 <figure><img src="${IMG.hero}" alt="Mario Rossi aiuta due bambini a provare le montature"><figcaption>Ottico dal 1995, Via Roma 1</figcaption></figure>
</div></section>

<section class="soft"><div class="wrap">
 <div class="head"><span class="bar"></span><h2>Perché affidarsi a un<br>ottico indipendente</h2><p class="lead">Essere un ottico indipendente significa costruire rapporti di fiducia duraturi, seguendo il cliente anche dopo l’acquisto.</p></div>
 <div class="cols3">
  <div><p class="num">I</p><h3>Misurazione digitalizzata</h3><p>Centratura calibrata al decimo di millimetro e al singolo grado di inclinazione e avvolgimento della tua montatura. È la differenza tra una lente montata bene e una montata su misura.</p></div>
  <div><p class="num">II</p><h3>Tecnologia di<br>ultima generazione</h3><p>Lenti Hoya MiYOSMART con tecnologia D.I.M.S. e T.E.D., lenti a contatto Menicon Bloom E.D.O.F. e CooperVision MyDay MiSight per la gestione della miopia evolutiva.</p></div>
  <div><p class="num">III</p><h3>Una relazione di<br>lungo periodo</h3><p>Visite di controllo periodiche, garanzia sulle lenti, programma assicurativo Kasco. Ci prendiamo cura di te nel tempo, non solo il giorno dell’acquisto.</p></div>
 </div>
</div></section>

<section><div class="wrap">
 <div class="head"><h2>Le montature in negozio</h2><p class="lead muted">Da vista e da sole, per tutta la famiglia. Ogni montatura la puoi provare in negozio, la centratura sarà personalizzata, quindi unica come te.</p></div>
 <div class="cat3">
  <a class="catcard" href="#/uomo"><div class="poster"><img class="photo" src="${IMG.vetrina_uomo}" alt="Montature da vista da uomo esposte in negozio"></div><div class="tx"><div><h3>Uomo</h3><p>Acetato, titanio e metallo</p></div><span class="arr">${ARR}</span></div></a>
  <a class="catcard" href="#/donna"><div class="poster"><img class="photo" src="${IMG.vetrina_donna}" alt="Montature e occhiali da sole da donna esposti in negozio"></div><div class="tx"><div><h3>Donna</h3><p>Forme classiche e di tendenza</p></div><span class="arr">${ARR}</span></div></a>
  <a class="catcard" href="#/bambino"><div class="poster"><img class="photo" src="${IMG.vetrina_bambino}" alt="Occhiali e astucci colorati per bambini esposti in negozio"></div><div class="tx"><div><h3>Bambino</h3><p>Montature flessibili e colorate</p></div><span class="arr">${ARR}</span></div></a>
 </div>
</div></section>

<section id="brand"><div class="wrap">
 <div class="head"><h2>I nostri brand</h2><p class="lead">Vivi l’esperienza dei dettagli della visione che ritroverai grazie alle nostre montature e lenti da vista delle più rinomate e affidabili aziende oftalmiche.</p></div>
</div>
${marquee()}
</section>

${locSection("Dove trovarci", true)}`;

P["chi-siamo"] = () => `
<section class="chi-top"><div class="wrap">
 <div>
  ${crumb(["Chi siamo"])}
  <h1>La vista non si ripara. Si custodisce.</h1>
  <p class="motto"><em>Passione, tenacia, dedizione. Dal 1995, al servizio della tua vista.</em></p>
  <p class="lead">Sono Mario, ottico dal 1995. Ho iniziato il mio percorso professionale in uno storico negozio del centro di Milano e, da allora, porto avanti il mio lavoro con la stessa passione, professionalità e attenzione verso ciò che considero il patrimonio più importante della mia attività: la fiducia dei miei clienti.</p>
 </div>
 <figure><img src="${IMG.titolare}" alt="Mario Rossi in negozio"></figure>
</div></section>

<section class="soft"><div class="wrap"><div class="intro2">
 <p>Credo che la vista sia un bene prezioso, da proteggere e custodire ogni giorno. Per questo, il mio lavoro non consiste soltanto nel trovare la soluzione visiva più adatta, ma anche nell’ascoltare ogni persona, comprenderne le esigenze e accompagnarla con competenza e attenzione.</p>
 <p>Oggi, in <em>Ottica Demo, in Via Roma 1 a Milano</em>, metto la mia esperienza al servizio di chi cerca un ottico di fiducia in zona, con una consulenza personalizzata e una cura meticolosa di ogni dettaglio.</p>
</div></div></section>

<section><div class="wrap">
 <div class="head"><span class="bar"></span><h2>Competenza, qualità e<br>attenzione al cliente</h2></div>
 <div class="vals">
  <div class="val"><span class="n">1</span><h3>Dall’analisi alla scelta</h3><p>Dall’analisi del visus alla scelta della soluzione correttiva più idonea, seguo ogni cliente con attenzione e professionalità. Propongo una selezione di <em>occhiali da vista a Milano</em>, montature, lenti oftalmiche e lenti a contatto, privilegiando prodotti di qualità che uniscano funzionalità, estetica e comfort.</p></div>
  <div class="val"><span class="n">2</span><h3>Precisione nei dettagli</h3><p>La mia dedizione si esprime nella precisione del montaggio, nella corretta centratura delle lenti e nella cura dei dettagli, per offrire soluzioni personalizzate e affidabili nel tempo.</p></div>
  <div class="val"><span class="n">3</span><h3>Dai più piccoli alla presbiopia</h3><p>Dedico particolare attenzione anche alle esigenze visive dei bambini e dei ragazzi, con soluzioni specifiche per la gestione della progressione della miopia, e a chi cerca lenti progressive per affrontare i cambiamenti della vista legati all’età.</p></div>
 </div>
 <p class="bigquote">Essere un ottico indipendente significa costruire rapporti di fiducia duraturi, seguendo il cliente anche dopo l’acquisto.</p>
</div></section>

<section class="soft" id="sostenibilita"><div class="wrap">
 <div class="sost">
  <figure><img src="${IMG.forest}" alt="Un uomo nel bosco mostra un paio di occhiali con montatura effetto legno"></figure>
  <div class="prose">
   <span class="bar"></span><h2 style="margin-bottom:30px">Il nostro impegno per la sostenibilità</h2>
   <p>Custodire ciò che abbiamo significa anche prenderci cura dell’ambiente in cui viviamo. Per questo, considero la sostenibilità ambientale e sociale una parte importante del mio modo di lavorare.</p>
   <p>Collaboro con fornitori attenti ai diritti dei lavoratori e alla riduzione dell’impatto ambientale dei processi produttivi. Utilizzo energia elettrica proveniente da fonti rinnovabili e limito i consumi attraverso illuminazione a LED e apparecchiature efficienti. Anche per la pulizia del negozio privilegio prodotti biodegradabili e materiali riutilizzabili.</p>
  </div>
 </div>
 <div class="head" style="margin:clamp(72px,8vw,120px) 0 0"><h2>I nostri brand eco</h2><p class="lead">Tre marchi che trovi in negozio e che hanno fatto della sostenibilità il loro modo di progettare occhiali.</p></div>
 <div class="ecobrands">
  <article class="eco"><img class="eco-photo" src="/assets/img/approved/eco-modo-sostenibilita-1600.webp" alt="Montatura ECO by Modo su una roccia, tra ulivi e montagne"><div class="top"><b>ECO</b><span>by Modo</span></div><div class="body"><p>Montature realizzate con materiali riciclati o di origine biologica, come la collezione bio-based ricavata in parte dai semi di ricino. Con il progetto One Frame, One Tree, per ogni montatura venduta viene piantato un albero insieme all’associazione Trees for the Future.</p><div class="tags"><span>Materiali riciclati</span><span>Bio-based</span><span>Un albero per ogni montatura</span></div></div></article>
  <article class="eco"><img class="eco-photo" src="/assets/img/approved/quoise-sostenibilita-1600.webp" alt="Montatura Quoise sul mare, con una tartaruga in acqua"><div class="top"><b>Quoise</b><span>Eyewear, made in Italy</span></div><div class="body"><p>Brand italiano che trasforma reti da pesca e scarti industriali in Econyl, un nylon rigenerato con cui realizza gli occhiali da sole. La collezione da vista è in bio-acetato e ogni modello porta il nome di un’area marina protetta italiana. Sostiene Marevivo nella tutela del mare.</p><div class="tags"><span>Nylon rigenerato</span><span>Bio-acetato</span><span>Tutela del mare</span></div></div></article>
  <article class="eco"><img class="eco-photo" src="/assets/img/approved/webee-sostenibilita-1600.webp" alt="Montatura WeBee accanto a un alveare, tra api e fiori"><div class="top"><b>WeBee</b><span>Eyewear to aid the bees</span></div><div class="body"><p>Occhiali nati con una missione: proteggere le api. WeBee devolve il 10% delle vendite a progetti dedicati alla loro salvaguardia, come una sorta di “licenza” pagata alle api per il loro lavoro prezioso.</p><div class="tags"><span>10% alle api</span><span>Design iconico</span></div></div></article>
 </div>
</div></section>

<section><div class="wrap"><div class="dono">
 <h2>Dare una seconda vita agli occhiali</h2>
 <div><p>Gli occhiali che non utilizziamo più possono diventare una risorsa preziosa per chi ne ha bisogno. Se hai un paio di occhiali ancora integri e in buono stato, puoi portarli in negozio: mi occuperò personalmente di donarli al Centro Missionario PIME di Milano e al Lions Club di Chivasso, affinché possano raggiungere persone bisognose.</p><p>Un piccolo gesto di solidarietà può fare la differenza, trasformando un oggetto che non utilizziamo più in un aiuto concreto per qualcun altro.</p></div>
</div></div></section>`;

P.orari = () => `
${phead([["Contatti"],["Orari"]],"Orari di apertura.","")}
<section class="soft" style="padding-top:clamp(56px,6vw,90px)"><div class="wrap orari-grid">
 <div>${hoursTable()}<div class="closures"><h3>Chiusure e festività</h3><p>In occasione delle festività nazionali il negozio può restare chiuso o osservare un orario ridotto. Le variazioni vengono sempre annunciate sulla vetrina e sui nostri canali social.</p></div><div class="closures"><h3>Contatti</h3>${contacts()}</div></div>
 <figure><img src="${IMG.negozio}" alt="L’interno del negozio Ottica Demo"></figure>
</div></section>`;

P["dove-siamo"] = () => `
${phead([["Contatti"],["Dove siamo"]],"Dove siamo.","In via Roma, in zona centrale: a pochi minuti a piedi dalla metropolitana e dai principali servizi del quartiere.")}
<section style="padding-top:0"><div class="wrap addr-grid">
 <div>
  <h2>L’indirizzo</h2>
  <p class="lead" style="margin-top:28px"><b>Ottica Demo</b><br>Via Roma 1<br>20100 Milano (MI)</p>
  <div class="ctas" style="margin-top:30px"><a class="btn" href="${MAPS}" target="_blank" rel="noopener">Apri in Google Maps</a></div>
  <ul class="dist">
   <li><b>Fermata della metropolitana</b><span>circa 500 m, 6 minuti a piedi</span></li>
   <li><b>Parcheggio pubblico</b><span>circa 300 m, 4 minuti a piedi</span></li>
  </ul>
 </div>
 <figure class="shopcard" style="margin:0"><img class="photo" src="${IMG.negozio}" alt="L’interno del negozio Ottica Demo"></figure>
</div></section>
<section class="soft"><div class="wrap">
 <div class="head"><span class="bar"></span><h2>Il quartiere</h2><p class="lead">Il negozio è in una via residenziale e ben servita, facile da raggiungere a piedi, in bicicletta o con i mezzi pubblici. (Testo dimostrativo: indirizzo e quartiere sono fittizi.)</p></div>
 <div class="cols3" style="padding:0">
  <div><h3>Metropolitana a circa 500 metri</h3><p>La fermata più vicina è a pochi minuti a piedi; in alternativa ci sono le linee di superficie che passano davanti al negozio.</p></div>
  <div><h3>Parcheggi in zona</h3><p>Un parcheggio pubblico a pagamento si trova a qualche minuto di distanza, con posti anche per moto e scooter.</p></div>
  <div><h3>In bicicletta fino in negozio</h3><p>La via è servita da una pista ciclabile: un modo comodo e tranquillo per venirci a trovare.</p></div>
 </div>
</div></section>
${band("Vuoi prenotare una visita?")}`;

P.servizi = () => `
${phead([["Servizi"]],"I nostri servizi.","Dalla valutazione della vista al laboratorio di montaggio, sotto il controllo diretto dell’ottico.")}
<section class="soft" id="percorso"><div class="wrap">
 <div class="head"><h2>La visita, passo per passo</h2></div>
 <div class="visita">
  <div>
   <ol class="vrows">${[["Visus","Da vicino e da lontano"],["Scelta della montatura","Sul tuo viso e il tuo stile"],["Scelta delle lenti e dei trattamenti","Sulle distanze che usi davvero"],["Centratura digitalizzata","Al decimo di millimetro"],["Montaggio","Nel nostro laboratorio"],["Consegna e adattamento","Con prova e regolazione"],["Controlli periodici","Nel tempo"]].map(([a])=>`<li><b>${a}</b></li>`).join("")}</ol>
   <p class="vnote">La valutazione della vista si fa <b>su appuntamento</b>: così ti dedichiamo tutto il tempo che serve.</p>
   <a class="btn" href="#/prenota/form">Prenota il tuo check-up visivo</a>
  </div>
  <figure><img src="${IMG.lab}" alt="Lo strumento per l’analisi della vista in negozio"></figure>
 </div>
</div></section>

<section id="tutti"><div class="wrap">
 <div class="head"><h2>Tutti i servizi</h2><p class="lead">Le prestazioni di tutti i giorni, dalla prevenzione alla riparazione. Se non trovi quello che cerchi, chiedi: molto probabilmente lo facciamo.</p></div>
 <div class="grid5">
  <div class="card"><h3>Valutazione della vista</h3><p>Analisi accurata del visus con centratura digitalizzata calibrata al decimo di millimetro e al singolo grado di inclinazione e avvolgimento della montatura. Su appuntamento.</p></div>
  <div class="card"><h3>Applicazione di lenti a contatto</h3><p>Applicazione personalizzata di lenti morbide, rigide e gas-permeabili, con prova in negozio e formazione alla manutenzione.</p></div>
  <div class="card"><h3>Laboratorio di montaggio</h3><p>Il montaggio e la sagomatura delle lenti avvengono di norma in negozio, sotto il controllo diretto di Mario, con la strumentazione del laboratorio. Alcuni lavori sono affidati direttamente alle aziende produttrici delle lenti.</p></div>
  <div class="card"><h3>Riparazione, ripristino e lucidatura</h3><p>Saldature, sostituzione di placchette e aste, ripristino dell’assetto originale. Con la lucidatura professionale rigeneriamo la montatura e le restituiamo il suo aspetto originale. Anche su occhiali non acquistati da noi.</p></div>
  <div class="card"><h3>Sagomatura clip-on solari</h3><p>Realizzazione su misura di clip-on solari per la tua montatura da vista, anche con lenti polarizzate.</p></div>
 </div>
</div></section>

<section class="soft" id="specializzazioni"><div class="wrap">
 <div class="head"><span class="bar"></span><h2>Specializzazioni</h2><p class="lead">Le competenze su cui Mario ha costruito il suo lavoro. Sono percorsi seguiti di persona, con strumenti e lenti dedicate.</p></div>
 <div class="spec">
  <article class="specard"><div class="body"><h3>Gestione della progressione miopica nei più giovani</h3><p>Nei bambini la miopia tende ad aumentare ogni anno, finché l’occhio cresce. Con lenti da occhiale Hoya MiYOSMART e lenti a contatto Menicon Bloom e CooperVision MyDay MiSight possiamo rallentarla, con controlli ogni 6 mesi per misurare i risultati.</p><p class="benefit"><b>Il beneficio</b>Meno diottrie in età adulta e un occhio più sano nel tempo. Prima si inizia, più si risparmia.</p></div></article>
  <article class="specard"><div class="body"><h3>Lenti progressive e lenti Office</h3><p>Dopo i 40 anni leggere da vicino diventa più faticoso. Progettiamo progressive e lenti office sulle distanze che usi davvero, dal libro allo schermo alla strada, e ti accompagniamo nelle prime settimane di adattamento.</p><p class="benefit"><b>Il beneficio</b>Un occhiale che ti fa vedere bene a ogni distanza e una giornata al computer senza collo rigido né occhi stanchi.</p></div></article>
  <article class="specard"><div class="body"><h3>Centratura personalizzata e precisione nel montaggio</h3><p>Misuriamo la posizione di ciascuna pupilla al decimo di millimetro, insieme a inclinazione e avvolgimento della montatura che hai scelto. Poi montiamo le lenti nel nostro laboratorio (o, per alcuni lavori, le facciamo realizzare direttamente dalle aziende produttrici) e verifichiamo ogni misura prima della consegna.</p><p class="benefit"><b>Il beneficio</b>La lente lavora esattamente come è stata progettata: visione più nitida, campo visivo pieno, adattamento più rapido.</p></div></article>
 </div>
 <div class="spec2 one">
  <div class="card"><span class="ic">${icon.eye}</span><h3>Disfunzione del film lacrimale</h3><p>Valutazione dell’occhio secco e indicazione delle soluzioni di comfort più adatte alla tua situazione, in collaborazione con l’oculista quando serve.</p></div>
 </div>
</div></section>

<section id="laboratorio"><div class="wrap">
 <div class="head"><span class="bar"></span><h2>Il laboratorio e<br>la strumentazione</h2><p class="lead">Montaggio, sagomatura e controlli si fanno qui, con gli strumenti che vedete. Per alcune lavorazioni ci affidiamo direttamente alle aziende produttrici delle lenti.</p></div>
 <div class="labph">
  <div class="ph">${icon.photo}<b>Laboratorio, piano superiore</b><span>Spazio per la foto</span></div>
  <div class="ph">${icon.photo}<b>Laboratorio, piano inferiore</b><span>Spazio per la foto</span></div>
 </div>
 <div class="labv">
  <div><h3>Analisi della vista</h3><p>Strumenti per l’esame del visus e la prova della correzione, in un ambiente dedicato.</p></div>
  <div><h3>Centratura digitalizzata</h3><p>Rilevazione delle misure al decimo di millimetro e al singolo grado di inclinazione.</p></div>
  <div><h3>Montaggio e sagomatura</h3><p>Di norma le lenti vengono sagomate e montate in negozio sulla tua montatura; alcuni lavori sono affidati direttamente ai produttori delle lenti.</p></div>
  <div class="new"><h3>Controllo qualità e riparazioni</h3><p>Verifica finale di ogni lente montata, regolazioni, saldature e lucidatura della montatura.</p></div>
 </div>
</div></section>
${band()}`;

P.convenzioni = () => `
${phead([["Servizi","#/servizi"],["Convenzioni"]],"Convenzioni e fondi assistenziali.","Come Centro Ottico HOYA CENTER aderiamo al programma HOYA CENTER LIFE CARE. Se sei assistito da uno di questi fondi, hai diritto a condizioni dedicate.")}
<section class="soft"><div class="wrap split">
 <div class="prose"><h2 style="margin-bottom:34px">Il programma HOYA CENTER LIFE CARE</h2>
  <p>HOYA è uno dei maggiori produttori mondiali di lenti oftalmiche. Il programma <b>HOYA CENTER LIFE CARE</b> riserva agli assistiti dei fondi convenzionati condizioni particolari sull’acquisto di occhiali completi di lenti HOYA, oltre a un percorso di garanzia e assistenza dedicato.</p>
  <p>Come Centro Ottico HOYA CENTER siamo autorizzati ad applicare queste condizioni direttamente in negozio. Non serve alcuna pratica online: basta presentare la tessera del fondo.</p>
 </div>
 <figure><img src="${IMG.hoya}" alt="La parete del negozio con attestati e materiali HOYA"></figure>
</div></section>
<section><div class="wrap">
 <div class="head"><span class="bar"></span><h2>Fondi e aziende convenzionati</h2><p class="lead">Se il tuo fondo non è in elenco, chiedicelo comunque: le convenzioni vengono aggiornate con regolarità.</p></div>
 <div class="ftable-wrap"><table class="ftable"><thead><tr><th>Fondo o azienda</th><th>Descrizione</th></tr></thead><tbody><tr><td>Assidim</td><td>Fondo assistenza sanitaria dirigenti industria manifatturiera</td></tr><tr><td>Mutualitas</td><td>Società mutua per l’assistenza sanitaria integrativa</td></tr><tr><td>Sanint</td><td>Sanità integrativa</td></tr><tr><td>Sanimoda</td><td>Fondo sanitario integrativo</td></tr><tr><td>Intellera Consulting</td><td>Convenzione aziendale</td></tr></tbody></table></div>
</div></section>
${band()}`;

P.promozioni = () => `
${phead([["Servizi","#/servizi"],["Promozioni"]],"Promozioni.","Le iniziative attive in negozio, spiegate in breve. Per i dettagli chiedi a Mario o chiamaci.")}
<section class="soft"><div class="wrap"><div class="offers">
 <div class="offer"><h3>Programma Assicura Valore, formula Kasco</h3><p>Attivando il programma insieme a un occhiale da vista completo, per un anno puoi acquistare un secondo paio a condizioni agevolate: se rovini le lenti o perdi gli occhiali, hai uno sconto del 40 o del 60% sulle nuove lenti da vista. In alternativa, le stesse condizioni valgono per un tuo caro che acquista un occhiale completo.</p><p class="note">Costo del programma €24, valido un anno dall’attivazione, non rinnovabile né rimborsabile.</p></div>
 <div class="offer"><h3>Promo secondo occhiale</h3><p>Con l’acquisto di un occhiale da vista completo puoi avere un secondo paio, da vista o da sole graduato, a condizioni dedicate. Comodo come occhiale di scorta o per avere uno stile diverso.</p><p class="note">Le condizioni in corso sono disponibili in negozio.</p></div>
 <div class="offer"><h3>Multi-equipaggiamento</h3><p>Dopo i 40 anni, con la presbiopia, non esiste ancora un solo occhiale perfetto per tutte le distanze. La soluzione migliore è un occhiale specifico per il lavoro e uno versatile per tutto il resto: per questo proponiamo offerte speciali per il multi-equipaggiamento.</p><a class="link" href="#/blog/multi-equipaggiamento">Leggi l’articolo ${ARR}</a></div>
</div></div></section>
${band()}`;

P["buono-regalo"] = () => `
${phead([["Servizi","#/servizi"],["Buono regalo"]],"Buono regalo.","Regala un buono del valore che stabilisci tu, e non solo a Natale: un dono utile, che chi lo riceve sceglie in negozio con la nostra consulenza.")}
<section class="soft"><div class="wrap">
 <div class="head"><span class="bar"></span><h2>Perché è un regalo che funziona</h2><p class="lead">Un occhiale è una scelta personale: il buono lascia libertà a chi lo riceve, senza il rischio di sbagliare misura, modello o stile.</p></div>
 <div class="cols3">
  <div><h3>Non sbaglia mai</h3><p>Chi lo riceve sceglie con calma la montatura che preferisce, con la nostra consulenza. Nessuna taglia, nessun colore da indovinare.</p></div>
  <div><h3>Vale tutto l’anno</h3><p>Non solo a Natale: compleanni, lauree, anniversari. Un buono si acquista in qualsiasi momento dell’anno e dura dodici mesi.</p></div>
  <div><h3>Un dono utile davvero</h3><p>Contribuisce a qualcosa che serve ogni giorno: vedere bene. Include la valutazione della vista e la centratura digitalizzata.</p></div>
 </div>
 <div class="photorow">
  <figure><img src="${IMG.vista}" alt="Montature da vista in negozio"></figure>
  <figure><img src="${IMG.sole}" alt="Occhiali da sole in negozio"></figure>
  <figure><img src="${IMG.negozio}" alt="L’interno del negozio"></figure>
  <figure><img src="${IMG.eco}" alt="Montature in negozio"></figure>
 </div>
</div></section>
<section><div class="wrap">
 <div class="head"><h2>Come funziona</h2></div>
 <ol class="visit">
  <li><div><b>Scegli l’importo</b><span>In negozio oppure contattandoci per telefono, WhatsApp o email.</span></div></li>
  <li><div><b>Ritira il buono</b><span>Lo prepariamo noi, pronto da regalare.</span></div></li>
  <li><div><b>Chi lo riceve sceglie</b><span>Occhiali da vista, da sole, lenti a contatto o servizi, con la nostra consulenza.</span></div></li>
 </ol>
 <div style="margin-top:40px">${contacts()}</div>
</div></section>`;

/* Le montature si caricano dal pannello /gestione/: modern.js riempie data-montature da /contenuti/montature.json.
   I testi e le foto sotto restano pronti da riattivare */
const catSec = (cat, id, soft, h) => `<section${soft?' class="soft"':''} id="${id}" style="min-height:55vh"><div class="wrap"><span class="bar"></span><h2>${h}</h2><div class="mont-grid" data-montature="${cat}/${id}"></div></div></section>`;
const catPage = (title) => `
${phead([["Montature"],[title]],`${title}.`,"")}
${catSec(title.toLowerCase(), "vista", true, "Occhiali da vista")}
${catSec(title.toLowerCase(), "sole", false, "Occhiali da sole")}`;

P.uomo = () => catPage("Uomo","Montature da vista e da sole per uomo, dalle forme classiche a quelle più leggere. Ti aiutiamo a trovare quella giusta per il tuo viso.",
 [IMG.vista,"Montature da vista in negozio","Occhiali da vista","Acetato, titanio e metallo: dalle forme squadrate e panto ai modelli leggerissimi da portare tutto il giorno.",[["Su misura per il tuo viso","Valutiamo proporzioni, ponte e lunghezza delle aste prima di scegliere."],["Pronte per le tue lenti","Verifichiamo che la montatura sia adatta anche a progressive e lenti office."]]],
 [IMG.sole,"Occhiali da sole in negozio","Occhiali da sole","Modelli da sole anche graduati, con lenti polarizzate per la guida e il tempo libero e protezione UV completa.",[["Graduati e polarizzati","Le lenti da sole con la tua correzione, per vedere bene anche al sole."],["Clip-on su misura","Sagomiamo clip-on solari per la tua montatura da vista."]]]);
P.donna = () => catPage("Donna","Montature da vista e da sole per donna, dalle linee essenziali ai modelli più decisi. Ogni paio si prova in negozio.",
 [IMG.eco,"Montature da vista in negozio","Occhiali da vista","Cat-eye, ovali, rotonde e squadrate, in acetato e metallo: forme e colori per ogni stile.",[["Consulenza su forma e colore","Scegliamo insieme la montatura più adatta a viso, carnagione e stile."],["Pronte per le tue lenti","Verifichiamo che la montatura sia adatta anche a progressive e lenti office."]]],
 [IMG.sole,"Occhiali da sole in negozio","Occhiali da sole","Dalle forme oversize ai modelli più sottili, con lenti sfumate, specchiate o polarizzate.",[["Graduati e polarizzati","Le lenti da sole con la tua correzione, per vedere bene anche al sole."],["Protezione UV completa","Filtri adatti alla città, al mare e alla montagna."]]]);
P.bambino = () => catPage("Bambino","Montature leggere, resistenti e colorate, pensate per chi corre, gioca e cresce. E un percorso dedicato per la miopia dei più giovani.",
 [IMG.bimbo,"Montature per bambini in negozio","Occhiali da vista","Montature flessibili e resistenti, della misura giusta per il viso che cresce. I bambini provano e scelgono il colore: un occhiale che piace si porta volentieri.",[["Cerniere flex e materiali morbidi","Reggono le giornate più movimentate."],["Lenti per il controllo della miopia","Hoya MiYOSMART e lenti a contatto dedicate, con controlli ogni 6 mesi."]]],
 [IMG.hero,"Mario con due bambini che provano le montature","Occhiali da sole","Gli occhi dei bambini sono più sensibili alla luce del sole: per giocare all’aperto, al mare e in montagna servono lenti con filtro UV completo.",[["Leggeri e sicuri","Materiali resistenti agli urti, pensati per i più piccoli."],["Anche graduati","Per chi porta già gli occhiali da vista."]]],
 `<section class="soft"><div class="wrap split"><div class="prose"><h2 style="margin-bottom:30px">Specializzazione: progressione miopica</h2><p>Se tuo figlio è miope, ogni anno conta. Con lenti e controlli dedicati possiamo rallentare l’aumento della miopia durante la crescita.</p><div class="ctas"><a class="link" href="#/blog/miopia-nei-bambini">Leggi l’articolo ${ARR}</a></div></div><figure><img src="${IMG.negozio}" alt="L’interno del negozio Ottica Demo"></figure></div></section>`);

P.blog = () => `
${phead([["Curiosità"],["Blog"]],"Blog sulla salute visiva.","Le stesse cose che spieghiamo al banco, con i numeri e le fonti. Per capire meglio la tua vista prima di scegliere.")}
<section style="padding:0 0 clamp(48px,5vw,80px)"><div class="wrap"><figure class="blogban"><img src="${IMG.milano}" alt="Occhiali tartarugati su un muretto, con lo skyline di Milano al tramonto"></figure></div></section>
<section class="soft" style="padding-top:clamp(56px,6vw,90px)"><div class="wrap"><div class="posts">${POSTS.map(postCard).join("")}</div></div></section>
<section><div class="wrap split">
 <div class="prose"><h2 style="margin-bottom:34px">Chi scrive</h2>
  <p>Gli articoli li scrivo io, Mario Rossi, ottico dal 1995. Non sono contenuti generici: sono le stesse cose che spiego al banco, con i numeri che uso quando devo convincere un genitore che vale la pena di intervenire sulla miopia di un figlio di otto anni.</p>
  <p>Dove cito dati clinici, indico la fonte e il periodo di riferimento. Dove si tratta di esperienza personale, lo dico.</p>
  <div class="ctas"><a class="link" href="#/chi-siamo">La mia storia ${ARR}</a></div>
 </div>
 <figure><img src="${IMG.titolare}" alt="Mario Rossi"></figure>
</div></section>`;

P.article = (s) => {
  const p = POSTS.find(x=>x.s===s); if(!p) return P.notfound();
  const i = POSTS.indexOf(p), nx = POSTS[(i+1)%POSTS.length];
  return `<section style="padding-top:clamp(40px,5vw,72px)"><div class="wrap"><article class="art">
   ${crumb(["Blog","#/blog"],[p.cat])}
   <p class="cat">${p.cat}</p><h1>${p.t}</h1><p class="intro">${p.intro}</p>
   <div class="il-wrap">${p.img?`<img class="photo" src="${IMG[p.img]}" alt="${p.alt}">`:ILL[p.il]}</div>
   ${p.body}
   ${p.closing?`<p class="closing">${p.closing}</p>`:""}
   <p class="src">Le informazioni di questo articolo non sostituiscono la visita oculistica.</p>
   <div class="back"><a class="link" href="#/blog">Tutti gli articoli ${ARR}</a><a class="link" href="#/blog/${nx.s}">Prossimo: ${nx.t} ${ARR}</a></div>
  </article></div></section>${band("Hai dubbi sulla tua vista? Parliamone in negozio.")}`;
};

P.curiosita = () => `
${phead([["Curiosità"]],"Curiosità.","Cose che al banco ci sentiamo chiedere spesso, e che vale la pena di raccontare per esteso. Scritte da chi le vede tutti i giorni.")}
<section class="soft" style="padding-top:clamp(56px,6vw,90px)"><div class="wrap"><div class="posts three">${CURIO.map(c=>`<a class="post" href="#/${c.go?`blog/${c.go}`:`curiosita/${c.s}`}"><div class="body"><h3>${c.t}</h3><p>${c.ex}</p><span class="link">Leggi ${ARR}</span></div></a>`).join("")}</div></div></section>`;

P.curio = (s) => {
  const c = CURIO.find(x=>x.s===s); if(!c||!c.items) return P.notfound();
  return `${phead([["Curiosità","#/curiosita"],[c.t]],c.t+".",c.intro)}
  <section class="soft"><div class="wrap"><ol class="tenlist">${c.items.map(([b,t])=>`<li><div><b>${b}</b><span>${t}</span></div></li>`).join("")}</ol></div></section>${band("Ti sei riconosciuto? Prenota un controllo.")}`;
};

P.prenota = () => `
${phead([["Prenota appuntamento"]],"Prenota appuntamento.","Una visita dedicata, senza fretta. Scegli il giorno che preferisci e attendi conferma: ti ricontattiamo per confermare l’appuntamento.")}
<section class="soft"><div class="wrap">
 <div class="head"><span class="bar"></span><h2>Come si svolge la visita</h2></div>
 <ol class="visit">
  <li><div><b>Accoglienza e anamnesi</b><span>Parliamo delle tue abitudini, del lavoro, di eventuali fastidi e della tua storia visiva.</span></div></li>
  <li><div><b>Analisi del visus</b><span>Misuriamo la tua capacità visiva da lontano, a media distanza e da vicino.</span></div></li>
  <li><div><b>Prova della correzione</b><span>Verifichiamo la correzione in condizioni reali, alle distanze che usi ogni giorno.</span></div></li>
  <li><div><b>Scelta della montatura e delle lenti</b><span>Ti aiutiamo a scegliere la montatura e le lenti più adatte alla tua vista e al tuo stile di vita.</span></div></li>
  <li><div><b>Centratura digitalizzata</b><span>Rileviamo le misure sulla montatura scelta, al decimo di millimetro.</span></div></li>
 </ol>
 <div class="head" style="margin:clamp(64px,7vw,100px) 0 30px"><h2>Cosa portare</h2></div>
 <div class="bring">${icon.doc}<p>Porta con te la prescrizione oculistica e/o gli occhiali che utilizzi abitualmente.</p></div>
</div></section>
<section id="form"><div class="wrap book">
 <div><h2>Richiedi un appuntamento</h2><p class="lead muted" style="margin-top:24px">Compila il modulo: si apre WhatsApp o la tua email con il messaggio già pronto. Dopo l’invio, attendi conferma dell’appuntamento da parte del negozio. Se preferisci, chiamaci.</p><div style="margin-top:36px">${contacts()}</div><div style="margin-top:36px">${hoursTable()}</div></div>
 <form class="bk" id="bk" novalidate>
  <div class="f2"><label>Nome e cognome<input name="nome" required autocomplete="name"></label><label>Telefono<input name="tel" type="tel" required autocomplete="tel"></label></div>
  <label>Motivo della visita<select name="motivo"><option>Controllo della vista</option><option>Occhiali nuovi</option><option>Lenti progressive o office</option><option>Progressione miopica (bambini e ragazzi)</option><option>Lenti a contatto</option><option>Occhio secco</option><option>Riparazione o regolazione</option></select></label>
  <div class="f2"><label>Giorno preferito<input name="giorno" type="date"></label><label>Fascia oraria<select name="fascia"><option>Mattina (9:30 – 13:30)</option><option>Pomeriggio (15:30 – 19:30)</option><option>Indifferente</option></select></label></div>
  <label>Note (facoltative)<textarea name="note" placeholder="Per esempio: porto già occhiali progressivi da 3 anni"></textarea></label>
  <div class="fbtns"><button class="btn" type="submit" data-via="wa">Invia su WhatsApp</button><button class="btn ghost" type="submit" data-via="mail">Invia per email</button></div>
  <p class="fmsg" id="fmsg" role="status"></p>
  <p class="fnote">Il lunedì mattina e la domenica il negozio è chiuso. Attendi conferma: ti ricontattiamo per confermare giorno e ora.</p>
 </form>
</div></section>`;

P.notfound = () => `${phead([["Pagina non trovata"]],"Pagina non trovata.","Il link potrebbe essere cambiato. Torna alla home o scegli una voce dal menu.",`<div class="ctas"><a class="btn" href="#/">Torna alla home</a></div>`)}`;


export { P, IMG, POSTS, CURIO, BRANDS, socHTML };
