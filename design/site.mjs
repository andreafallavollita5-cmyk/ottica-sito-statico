import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {page} from '../build.mjs';
import {P,IMG,POSTS,CURIO,socHTML} from './content.mjs';
import {aliases,articoli,fotoSito,paginaArticolo,paginaBlog} from './articoli.mjs';
import legacySolar from '../pages/blog__occhiali-da-sole-lenti-polarizzate.mjs';
const dimensions=JSON.parse(readFileSync('design/images.json','utf8'));
const DEFAULT_DESC='Ottica Demo a Milano, in via Roma 1. Esperienza e consulenza personalizzata per la vista di tutta la famiglia.';
/* foto sostituite dal pannello: lo stesso rimpiazzo che gestione/lib.php fa sui file online */
const FOTO=fotoSito();
const header=readFileSync('design/header.html','utf8');
const footer=readFileSync('design/footer.html','utf8').replace('<span>Cookie policy · Termini e condizioni</span>','<span><a href="/cookie-policy/">Cookie policy</a> · <button type="button" class="cookie-prefs">Preferenze cookie</button></span>');
const GTAG='G-XXXXXXXXXX';
/* Consent Mode v2 di base: gtag.js si carica solo dopo il consenso (modern.js lo carica al clic su Accetta). */
const consentHead=`<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});gtag('js',new Date());gtag('config','${GTAG}',{anonymize_ip:true});window.loadGtag=function(){if(window.gtagLoaded)return;window.gtagLoaded=true;gtag('consent','update',{analytics_storage:'granted'});var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=${GTAG}';document.head.appendChild(s);};try{if(localStorage.getItem('omr-consent')==='granted')loadGtag();}catch(e){}</script>`;
const cookieBar=`<div class="cookie-bar" id="cookie-bar" role="dialog" aria-labelledby="cookie-title" aria-describedby="cookie-text" hidden><div class="cookie-in"><p id="cookie-text"><b id="cookie-title">Cookie.</b> Usiamo cookie tecnici e, solo se accetti, Google Analytics per contare le visite in forma aggregata. <a href="/cookie-policy/">Leggi la cookie policy</a></p><div class="cookie-actions"><button type="button" data-consent="denied">Rifiuta</button><button type="button" data-consent="granted">Accetta</button></div></div></div>`;
const cookiePolicy=`<section class="phead"><div class="wrap"><nav class="crumb" aria-label="Percorso"><a href="/">Home</a><span>/</span>Cookie policy</nav><h1>Cookie policy</h1><p class="lead">Quali cookie usa il sito di Ottica Demo, a cosa servono e come puoi cambiare idea in qualsiasi momento.</p></div></section>
<section><div class="wrap"><article class="art prose">
<h2>Chi è il titolare</h2><p>Ottica Demo di Mario Rossi, via Roma 1, 20100 Milano. P.IVA 00000000000. Email: <a href="mailto:info@example.com">info@example.com</a>.</p>
<h2>Cookie tecnici</h2><p>Il sito salva sul tuo dispositivo soltanto la tua scelta sui cookie (voce <code>omr-consent</code> nella memoria del browser), per non chiedertela a ogni pagina. Non serve il consenso e non viene usata per altri scopi.</p>
<h2>Google Analytics (solo con il tuo consenso)</h2><p>Se clicchi “Accetta”, usiamo Google Analytics 4, fornito da Google Ireland Limited, per sapere in forma aggregata quante persone visitano il sito e quali pagine leggono. Non usiamo questi dati per pubblicità né per profilarti.</p><ul><li>Cookie: <code>_ga</code> e <code>_ga_*</code>.</li><li>Durata: fino a 2 anni.</li><li>I dati possono essere trattati da Google anche fuori dall’Unione Europea, secondo le garanzie previste dal GDPR.</li><li>Informativa di Google: <a href="https://policies.google.com/privacy?hl=it" target="_blank" rel="noopener">policies.google.com/privacy</a>.</li></ul><p>Se clicchi “Rifiuta”, o chiudi il sito senza scegliere, Google Analytics non viene caricato.</p>
<h2>Come cambiare idea</h2><p>Puoi modificare la scelta in qualsiasi momento con il pulsante “Preferenze cookie” in fondo a ogni pagina. Puoi anche cancellare i cookie dalle impostazioni del browser.</p>
<h2>I tuoi diritti</h2><p>Puoi chiedere accesso, rettifica o cancellazione dei tuoi dati scrivendo all’indirizzo email qui sopra, e puoi presentare reclamo al Garante per la protezione dei dati personali.</p>
<p class="src">Ultimo aggiornamento: novembre 2026.</p>
</article></div></section>`;
function route(value){const parts=value.replace(/^#\//,'').split('/').filter(Boolean);if(!parts.length)return '/';if(parts.length>1&&['blog','curiosita'].includes(parts[0]))return `/${parts[0]}/${aliases[parts[1]]||parts[1]}/`;return '/'+parts[0]+'/'+(parts[1]?'#'+parts[1]:'');}
const photo=(name,alt)=>`<figure class="editorial-photo"><img src="/assets/img/approved/${name}-1600.webp" alt="${alt}"></figure>`;
function enhance(body,key){
 if(key==='orari')body=body.replace(`<img src="${IMG.negozio}" alt="L’interno del negozio Ottica Demo">`,`<img src="/assets/img/approved/insegna-orari-1600.webp" alt="L’ingresso di Ottica Demo in via Roma, con l’insegna sopra la vetrina">`);
 if(key==='dove-siamo')body=body.replace(`<img class="photo" src="${IMG.negozio}" alt="L’interno del negozio Ottica Demo">`,`<img class="photo" src="/assets/img/approved/vetrina-dove-siamo-1600.webp" alt="La vetrina di Ottica Demo in via Roma 1">`);
 if(key==='buono-regalo')body=body.replace(/<section class="phead"><div class="wrap">([\s\S]*?)<\/div><\/section>/,'<section class="phead phead--media"><div class="wrap"><div class="phead-text">$1</div><figure class="phead-photo"><img src="/assets/img/approved/buono-regalo-1600.webp" alt="Il buono regalo di Ottica Demo, con scatola e fiocco dorato accanto a una montatura tartarugata"></figure></div></section>').replace(/\s*<div class="photorow">[\s\S]*?<\/div>/,'');
 if(key==='home')body=body.replace(`src="${IMG.negozio}"`,`src="/assets/img/approved/negozio-orari-1600.webp"`);
 if(key==='chi-siamo')body=body.replace(`src="${IMG.titolare}"`,`src="/assets/img/approved/titolare-restaurato-1600.webp"`);
 if(key==='home')body=body.replace('<div class="cols3">',`<div class="home-reasons-photo">${photo('ottico-laboratorio','L’ottico al banco di lavoro mentre mette a punto una montatura.')}</div><div class="cols3">`);
 if(key==='servizi')body=body.replace(/<div class="labph">[\s\S]*?<div class="labv">/,`<div class="labph">${photo('laboratorio-ai','Il banco di lavorazione delle lenti nel nostro laboratorio.')}${photo('lente-lavorazione','La lavorazione della lente, da vicino.')}</div><div class="lab-details">${photo('forottero-ai','Strumentazione per la prova della correzione.')}${photo('centratura-hoya','Centratura digitale sulla montatura.')}${photo('montatura-tracciatura','Rilevazione della forma della montatura.')}${photo('topografo','Strumentazione per l’analisi visiva.')}</div><div class="labv">`);
 if(key==='prenota')body=body.replace(/(<ol class="visit">[\s\S]*?<\/ol>)/,`<div class="visit-layout">$1${photo('forottero-ai','Un ambiente dedicato alla tua vista.')}</div>`).replace(' novalidate','').replace('<form class="bk"','<noscript><p>Per richiedere un appuntamento, chiamaci oppure usa i collegamenti WhatsApp ed email qui accanto.</p></noscript><form class="bk"').replace('name="nome"','name="nome" maxlength="120"').replace('name="tel"','name="tel" minlength="6" maxlength="30"').replace('name="note"','name="note" maxlength="1000"').replace('<p class="fnote">','<p class="fnote">Il messaggio viene preparato sul tuo dispositivo: dovrai inviarlo nell’app scelta. ');
 if(['uomo','donna','bambino'].includes(key))body=body.replace(/min-height:55vh/g,'').replace(/(<h2>Occhiali da vista<\/h2>)/,'$1'+photo(key==='bambino'?'bimbo':'vista','Montature da vista in negozio.')).replace(/(<h2>Occhiali da sole<\/h2>)/,'$1'+photo('sole','Occhiali da sole in negozio.'));
 if(key==='home')body=body.replace('<div class="mq-wrap">','<div class="wrap motion-controls"><button class="motion-toggle" type="button" aria-pressed="false">Pausa scorrimento brand</button></div><div class="mq-wrap" id="brand-motion">');
 return body;
}
export const entries=Object.keys(P).filter(k=>!['article','curio','notfound','blog'].includes(k)).map(k=>({key:k,path:k==='home'?'':k,body:enhance(P[k](),k)}));
/* blog: pagine riempite dai modelli, come fa il pannello /gestione/ (gestione/lib.php) */
const ARTICOLI=articoli();
export const modelli={};
modelli.blog=modello({key:'blog',path:'blog',body:P.blog().replace(/<div class="posts">[\s\S]*?<\/section>/,'<div class="posts">{{ARTICOLI_HTML}}</div></div></section>')});
IMG.__modello='{{FOTO_SRC}}';
POSTS.push({s:'__modello',cat:'{{CATEGORIA}}',img:'__modello',alt:'',t:'{{TITOLO}}',intro:'{{INTRO}}',body:'{{CORPO_HTML}}',closing:'{{CHIUSURA_HTML}}'});
modelli.articolo=modello({key:'blog',path:'blog/{{SLUG}}',body:P.article('__modello')}).replace('<p class="closing">{{CHIUSURA_HTML}}</p>','{{CHIUSURA_HTML}}').replace('<img class="photo" src="{{FOTO_SRC}}" alt="">','{{FOTO_HTML}}').replace(/<a class="link" href="\/blog\/[^"]+\/">Prossimo:[\s\S]*?<\/a>/,'{{PROSSIMO_HTML}}');
POSTS.pop();delete IMG.__modello;
entries.push({key:'blog',path:'blog',html:paginaBlog(modelli.blog,ARTICOLI)});
for(const a of ARTICOLI.filter(x=>x.stato==='pubblicato'))entries.push({key:'blog',path:'blog/'+a.slug,html:paginaArticolo(modelli.articolo,ARTICOLI,a)});
for(const c of CURIO.filter(x=>x.items))entries.push({key:'curiosita',path:'curiosita/'+c.s,body:P.curio(c.s)});
entries.push({key:'dove-siamo',path:'contatti',body:P['dove-siamo'](),canonical:'/dove-siamo/'});
entries.push({key:'blog',path:'curiosita/occhi-stanchi',body:P.article('vista-e-computer'),canonical:'/blog/vista-e-computer-affaticamento-visivo/'});
entries.push({key:'chi-siamo',path:'sostenibilita',body:P['chi-siamo']().slice(P['chi-siamo']().indexOf('<section class="soft" id="sostenibilita">')).replace('<h2 style="margin-bottom:30px">','<h1 style="margin-bottom:30px">').replace('sostenibilità</h2>','sostenibilità</h1>')});
entries.push({key:'cookie-policy',path:'cookie-policy',body:cookiePolicy});
entries.push({key:'blog',path:'blog/occhiali-da-sole-lenti-polarizzate',body:legacySolar.match(/<main id="main">([\s\S]*?)<\/main>/)[1].replace('class="post-body"','class="post-body prose"')});
export const notFound={key:'notfound',path:'',canonical:'/404.html',body:P.notfound()};
function plain(s){return s.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();}
/* modello per il pannello: descrizione e foto diventano segnaposto; dentro il JSON-LD prendono il suffisso _JSON */
function modello(entry){
 let html=render(entry).replaceAll(DEFAULT_DESC,'{{DESCRIZIONE}}').replaceAll('{{TITOLO}} | Ottica Demo','{{TITOLOBREVE}} | Ottica Demo');
 if(entry.path!=='blog')html=html.replace(/(<meta property="og:image" content=")[^"]+/,'$1{{FOTO_URL}}').replace(/("@type":"BlogPosting"[\s\S]*?"image":")[^"]+/,'$1{{FOTO_URL}}');
 return html.replace(/(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/g,(m,a,b,c)=>a+b.replace(/\{\{([A-Z_]+?)\}\}/g,'{{$1_JSON}}')+c);
}
function sostituisciFoto(html){for(const v of Object.values(FOTO))for(const [da,a] of Object.entries(v.file))html=html.replaceAll(da,a);return html;}
export function render(entry){
 if(entry.html)return sostituisciFoto(entry.html);
 const h1=plain(entry.body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]||'Ottica Demo');
 const title=entry.key==='home'?'Ottica Demo | Ottico a Milano, via Roma':(['uomo','donna','bambino'].includes(entry.key)?'Occhiali '+entry.key:h1.replace(/\.$/,'')).slice(0,43)+' | Ottica Demo';
 let description=plain(entry.body.match(/<p class="lead[^\"]*">([\s\S]*?)<\/p>/)?.[1]||'Ottica Demo a Milano, in via Roma 1. Esperienza e consulenza personalizzata per la vista di tutta la famiglia.');
 if(description.length<70)description+=' Scopri Ottica Demo a Milano, in via Roma 1.';
 if(description.length>160)description=description.slice(0,156).replace(/\s+\S*$/,'')+'…';
 let head=header.replace('<div class="social" id="social-top"></div>',`<div class="social" id="social-top">${socHTML}</div>`).replace('<div class="social" id="social-m"></div>',`<div class="social" id="social-m">${socHTML}</div>`).replace('class="burger"','aria-controls="mnav" class="burger"').replace(/aria-haspopup="true"/g,'aria-haspopup="true" aria-expanded="false"');
 const canonical=entry.canonical||'/'+(entry.path?entry.path+'/':'');
 const base='https://www.example.com',name=title.replace(/ \| Ottica Demo$/,'');
 const parts=canonical.split('/').filter(Boolean),schema=[];
 if(parts.length){
  const crumbs=[['Home','/']];
  if(parts.length>1)crumbs.push([{blog:'Blog',curiosita:'Curiosità'}[parts[0]]||parts[0],`/${parts[0]}/`]);
  crumbs.push([name,canonical]);
  schema.push({'@type':'BreadcrumbList','@id':`${base}${canonical}#breadcrumb`,itemListElement:crumbs.map(([n,u],i)=>({'@type':'ListItem',position:i+1,name:n,item:base+u}))});
 }
 if(parts[0]==='blog'&&parts.length>1){
  const image=[...entry.body.matchAll(/<img[^>]*src="(\/assets\/[^"]+)"/g)].map(m=>m[1]).find(s=>!s.includes('ritratto'))||IMG.negozio;
  schema.push({'@type':'BlogPosting','@id':`${base}${canonical}#article`,headline:h1.replace(/\.$/,''),description,image:base+image,url:base+canonical,mainEntityOfPage:{'@id':`${base}${canonical}#webpage`},author:{'@type':'Person',name:'Mario Rossi',jobTitle:'Ottico'},publisher:{'@id':`${base}/#organization`},inLanguage:'it-IT'});
 }
 let html=page({title,description,canonical,body:'',ogImage:IMG.negozio,schema});
 html=html.replace(/Instrument\+Sans:wght@400;500;600/g,'Inter+Tight:wght@400;500;600;700').replace('<link rel="stylesheet" href="/assets/css/site.css">','<link rel="stylesheet" href="/assets/css/approved.css"><link rel="stylesheet" href="/assets/css/modern.css">');
 html=html.replace(/<body>[\s\S]*?<\/body>/,`<body class="no-js"><a class="skip-link" href="#main">Vai al contenuto</a>${head}<main id="main">${entry.body}</main>${footer}${cookieBar}<nav class="contact-dock" aria-label="Contatti rapidi"><a href="tel:0212345678">Chiama</a><a href="https://wa.me/393330000000" target="_blank" rel="noopener">WhatsApp</a><a href="/prenota/#form">Prenota</a></nav><script src="/assets/js/modern.js" defer></script></body>`);
 html=html.replace('</head>',consentHead+'\n</head>');
 html=html.replace(/href="(#\/[^\"]*)"/g,(_,v)=>`href="${route(v)}"`);
 html=html.replace(/\.((?:<\/span>)?\s*<\/h[1-3]>)/g,'$1');
 let first=true;
 html=html.replace(/<img\b[^>]*>/g,tag=>{const src=tag.match(/src="([^"]+)"/)?.[1];const d=dimensions[src];if(!d)return tag;const eager=first;first=false;const widths=[480,900,1600].filter((v,i,a)=>i===0||d.width>a[i-1]);return tag.replace(/\s(?:loading|decoding|width|height)="[^"]*"/g,'').replace('>',` width="${d.width}" height="${d.height}" loading="${eager?'eager':'lazy'}" decoding="async" ${eager?'fetchpriority="high"':''} srcset="${widths.map(w=>src.replace('-1600.webp',`-${w}.webp`)+` ${Math.min(w,d.width)}w`).join(', ')}" sizes="(max-width: 700px) 92vw, (max-width: 1100px) 80vw, 700px">`);});
 html=html.replace(/(href|src)="(\/assets\/(?:css|js)\/[^"?]+)"/g,(_,attr,path)=>`${attr}="${path}?v=${createHash('sha256').update(readFileSync('.'+path)).digest('hex').slice(0,10)}"`);
 return sostituisciFoto(html);
}
