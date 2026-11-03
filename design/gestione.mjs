/* File per il pannello /gestione/, rigenerati da generate.mjs:
   - gestione/modelli/articolo.html e blog.html  modelli delle pagine del blog
   - gestione/modelli/catalogo-foto.json         le foto del sito, le loro misure e dove compaiono
   - gestione/modelli/marchi.json                i marchi trattati, per la tendina delle montature
   - contenuti/ (solo se manca)                  dati iniziali: montature, avvisi, articoli */
import {readFileSync,writeFileSync,mkdirSync,existsSync,openSync,readSync,closeSync} from 'node:fs';
import {BRANDS} from './content.mjs';
import {FILE_ARTICOLI,daPosts,fotoSito} from './articoli.mjs';

/* larghezza e altezza di un WebP, dall'intestazione del file */
export function misureWebp(file){
 const b=Buffer.alloc(30),fd=openSync(file,'r');readSync(fd,b,0,30,0);closeSync(fd);
 const tipo=b.toString('latin1',12,16);
 if(tipo==='VP8 ')return {w:b.readUInt16LE(26)&0x3fff,h:b.readUInt16LE(28)&0x3fff};
 if(tipo==='VP8L')return {w:1+(((b[22]&0x3f)<<8)|b[21]),h:1+(((b[24]&0xf)<<10)|(b[23]<<2)|((b[22]&0xc0)>>6))};
 if(tipo==='VP8X')return {w:1+b.readUIntLE(24,3),h:1+b.readUIntLE(27,3)};
 throw new Error('WebP non riconosciuto: '+file);
}

const RE=/\/assets\/img\/(?:approved\/)?[a-z0-9_-]+?(?:-(?:480|900|1600))?\.webp/gi;
function catalogo(pagine){
 /* le pagine arrivano già con le foto sostituite: si torna ai nomi originali */
 const inverso={};for(const [base,v] of Object.entries(fotoSito()))for(const [da,a] of Object.entries(v.file))inverso[a]=da;
 const foto={};
 for(const {path,html} of pagine){
  const titolo=(html.match(/<title>([^<]*)<\/title>/)?.[1]||path).replace(/ \| Ottica Demo$/,'');
  const testo=html.replace(/\/contenuti\/foto-sito\/[^"' ,]+\.webp/g,m=>inverso[m]||m);
  for(const [m] of testo.matchAll(RE)){
   const base=m.replace(/(?:-(?:480|900|1600))?\.webp$/,'');
   const f=foto[base]||=(()=>{const g=`${base}-1600.webp`,file={'480':`${base}-480.webp`,'900':`${base}-900.webp`,'1600':existsSync('.'+g)?g:`${base}.webp`};
    if(!Object.values(file).every(p=>existsSync('.'+p)))return null;
    return {base,file,...misureWebp('.'+file['1600']),pagine:[]};})();
   if(f&&!f.pagine.some(p=>p.url==='/'+(path?path+'/':'')))f.pagine.push({url:'/'+(path?path+'/':''),titolo});
  }
 }
 return Object.values(foto).filter(Boolean).sort((a,b)=>a.base.localeCompare(b.base));
}

export function scriviGestione(pagine,modelli){
 mkdirSync('gestione/modelli',{recursive:true});
 writeFileSync('gestione/modelli/articolo.html',modelli.articolo);
 writeFileSync('gestione/modelli/blog.html',modelli.blog);
 const cat=catalogo(pagine);
 writeFileSync('gestione/modelli/catalogo-foto.json',JSON.stringify(cat,null,1));
 writeFileSync('gestione/modelli/marchi.json',JSON.stringify(BRANDS.find(([g])=>/Montature/.test(g))[1]));
 mkdirSync('contenuti/privato',{recursive:true});
 for(const f of ['montature','avvisi'])if(!existsSync(`contenuti/${f}.json`))writeFileSync(`contenuti/${f}.json`,'[]');
 if(!existsSync(FILE_ARTICOLI))writeFileSync(FILE_ARTICOLI,JSON.stringify(daPosts(),null,1));
 return cat.length;
}
