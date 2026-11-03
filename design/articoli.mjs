/* Articoli del blog gestiti dal pannello /gestione/.
   La fonte è contenuti/privato/articoli.json (scaricato dal pannello con "Scarica copia
   dei contenuti"); se manca, gli articoli vengono ricavati da POSTS di content.mjs.
   Le funzioni qui sotto hanno un gemello in gestione/lib.php: se ne cambi una,
   cambia anche l'altra, altrimenti il sito rigenerato in locale e quello aggiornato
   dal pannello divergono. */
import {readFileSync,existsSync} from 'node:fs';
import {IMG,POSTS} from './content.mjs';

export const FILE_ARTICOLI='contenuti/privato/articoli.json';
export const FILE_FOTO='contenuti/privato/foto-sito.json';
const dimensions=JSON.parse(readFileSync('design/images.json','utf8'));
export const aliases={'miopia-nei-bambini':'miopia-bambini-come-rallentarla','lenti-progressive':'lenti-progressive-come-sceglierle','multi-equipaggiamento':'multi-equipaggiamento-occhiali','vista-e-computer':'vista-e-computer-affaticamento-visivo','centratura-digitale':'centratura-digitale-perche-conta'};

/* migrazione: da POSTS al formato del pannello */
export function daPosts(){
 return POSTS.map(p=>{const src=IMG[p.img],d=dimensions[src]||{width:1600,height:1067};
  return {slug:aliases[p.s]||p.s,titolo:p.t,categoria:p.cat,riassunto:p.ex,intro:p.intro,corpo:p.body.replace(/\n\s*/g,'\n'),chiusura:p.closing||'',
   foto:{src,w:d.width,h:d.height,alt:p.alt},stato:'pubblicato',aggiornato:'2026-10-20'};});
}
export function articoli(){return existsSync(FILE_ARTICOLI)?JSON.parse(readFileSync(FILE_ARTICOLI,'utf8')):daPosts();}
export function fotoSito(){return existsSync(FILE_FOTO)?JSON.parse(readFileSync(FILE_FOTO,'utf8')):{};}

const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
const json=s=>JSON.stringify(String(s??'')).slice(1,-1).replace(/</g,'\\u003C').replace(/>/g,'\\u003E');
/* {{CHIAVE}} testo · {{CHIAVE_HTML}} html già pronto · {{CHIAVE_JSON}} dentro il JSON-LD */
export function riempi(tpl,v){return tpl.replace(/\{\{([A-Z]+(?:_[A-Z]+)*?)(_JSON|_HTML)?\}\}/g,(m,k,mode)=>mode==='_HTML'?String(v[k]??''):mode==='_JSON'?json(v[k]):esc(v[k]));}
/* come render(): niente punto finale nei titoli */
const senzaPunto=h=>h.replace(/\.((?:<\/span>)?\s*<\/h[1-3]>)/g,'$1');

/* stessa resa di render() per le foto in WebP 480/900/1600 */
export function imgTag(f,cls='',lazy=true){
 const widths=[480,900,1600].filter((v,i,a)=>i===0||f.w>a[i-1]);
 const srcset=widths.map(w=>f.src.replace('-1600.webp',`-${w}.webp`)+` ${Math.min(w,f.w)}w`).join(', ');
 return `<img${cls?` class="${cls}"`:''} src="${esc(f.src)}" alt="${esc(f.alt)}" width="${f.w}" height="${f.h}" loading="${lazy?'lazy':'eager'}" decoding="async"${lazy?'':' fetchpriority="high"'} srcset="${srcset}" sizes="(max-width: 700px) 92vw, (max-width: 1100px) 80vw, 700px">`;
}
const ARR='<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10h13M11 5l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';
export function card(a){return `<a class="post" href="/blog/${a.slug}/"><div class="il-wrap">${imgTag(a.foto,'photo')}</div><div class="body"><p class="cat">${esc(a.categoria)}</p><h3>${esc(a.titolo)}</h3><p>${esc(a.riassunto)}</p><span class="link">Leggi ${ARR}</span></div></a>`;}

export function paginaArticolo(tpl,lista,a){
 const pub=lista.filter(x=>x.stato==='pubblicato'),i=pub.findIndex(x=>x.slug===a.slug),nx=pub.length>1?pub[(i+1)%pub.length]:null;
 return riempi(tpl,{SLUG:a.slug,TITOLO:a.titolo,TITOLOBREVE:breve(a.titolo),CATEGORIA:a.categoria,INTRO:a.intro,DESCRIZIONE:descrizione(a),
  FOTO:imgTag(a.foto,'photo',false),FOTO_URL:'https://www.example.com'+a.foto.src,
  CORPO:senzaPunto(a.corpo),CHIUSURA:a.chiusura?`<p class="closing">${esc(a.chiusura)}</p>`:'',
  PROSSIMO:nx?`<a class="link" href="/blog/${nx.slug}/">Prossimo: ${esc(nx.titolo)} ${ARR}</a>`:''});
}
export function paginaBlog(tpl,lista){return riempi(tpl,{ARTICOLI:lista.filter(x=>x.stato==='pubblicato').map(card).join('')});}
/* il <title> resta sotto i 65 caratteri con " | Ottica Demo": si taglia all'ultima parola intera */
export function breve(t){t=String(t||'').replace(/\.$/,'');return t.length<=46?t:t.slice(0,47).replace(/[\s:,;–-]+\S*$/,'');}
export function descrizione(a){let d=String(a.riassunto||a.intro||'').trim();if(d.length>160)d=d.slice(0,156).replace(/\s+\S*$/,'')+'…';return d;}
