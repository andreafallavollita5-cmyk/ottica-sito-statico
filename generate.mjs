/* Static pages based on the user's approved HTML. */
import {writeFileSync,mkdirSync} from 'node:fs';
import {join} from 'node:path';
import {entries,render,notFound,modelli} from './design/site.mjs';
import {scriviGestione} from './design/gestione.mjs';
const pagine=[];
for(const entry of entries){
 const dir=entry.path||'.';
 mkdirSync(dir,{recursive:true});
 const html=render(entry);
 writeFileSync(join(dir,'index.html'),html,'utf8');
 pagine.push({path:entry.path,html});
 console.log(`✓ ${dir}/index.html`);
}
/* pagina 404 servita dal server (ErrorDocument): fuori dalla sitemap e non indicizzabile */
writeFileSync('404.html',render(notFound).replace(/<meta name="robots"[^>]*>/,'<meta name="robots" content="noindex, follow">').replace(/<link rel="canonical"[^>]*>\n?/,''),'utf8');
console.log('✓ 404.html');
console.log(`${entries.length} pagine generate.`);
/* modelli e catalogo per il pannello /gestione/ */
console.log(`✓ gestione/modelli: modelli del blog e ${scriviGestione(pagine,modelli)} foto nel catalogo`);
