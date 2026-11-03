/* pannello di gestione: conferme, editor degli articoli, invio una volta sola */
/* conferma nel pulsante stesso (niente finestre del browser, che alcuni browser bloccano):
   il primo tocco chiede «Sicuro? Tocca di nuovo», il secondo entro 5 secondi esegue */
document.addEventListener('click',e=>{const b=e.target.closest('button[data-conferma]');if(!b)return;
 if(b.dataset.armato){return;}
 e.preventDefault();b.dataset.armato='1';b.dataset.testo=b.textContent;b.textContent=b.dataset.conferma+' Tocca di nuovo per confermare';b.classList.add('armato');
 setTimeout(()=>{delete b.dataset.armato;b.textContent=b.dataset.testo;b.classList.remove('armato');},5000);});
document.querySelectorAll('form').forEach(f=>f.addEventListener('submit',e=>{
 const b=e.submitter;
 if(b&&f.enctype==='multipart/form-data'&&f.querySelector('input[type=file]')?.files.length)setTimeout(()=>{b.disabled=true;b.textContent='Caricamento in corso…';});
}));
/* editor: barra semplice sopra un'area modificabile; il testo torna nella textarea all'invio */
const ed=document.querySelector('.editor');
if(ed){const area=ed.querySelector('.area'),txt=ed.querySelector('textarea'),bar=ed.querySelector('.strumenti');
 area.innerHTML=txt.value||'<p><br></p>';area.hidden=false;bar.hidden=false;txt.hidden=true;
 document.execCommand('defaultParagraphSeparator',false,'p');
 bar.addEventListener('click',e=>{const b=e.target.closest('[data-cmd]');if(!b)return;const c=b.dataset.cmd;area.focus();
  if(c==='h2'||c==='p')document.execCommand('formatBlock',false,c);
  else if(c==='link'){const u=prompt('Indirizzo del link (https://… oppure /pagina/)');if(u)document.execCommand('createLink',false,u.trim());}
  else document.execCommand(c,false,null);});
 /* incollando da Word o da altri siti si tiene solo il testo */
 const escHtml=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
 area.addEventListener('paste',e=>{e.preventDefault();const t=e.clipboardData.getData('text/plain');document.execCommand('insertHTML',false,t.split(/\n{2,}/).map(p=>'<p>'+escHtml(p).replace(/\n/g,'<br>')+'</p>').join(''));});
 ed.closest('form').addEventListener('submit',()=>{txt.value=area.innerHTML;},true);}
/* conta caratteri del riassunto */
document.querySelectorAll('[data-conta]').forEach(t=>{const n=document.createElement('span');n.className='nota conta';t.after(n);const up=()=>{n.textContent=t.value.length+' / '+t.dataset.conta+' caratteri consigliati';n.classList.toggle('troppo',t.value.length>t.dataset.conta);};t.addEventListener('input',up);up();});
/* inquadratura: anteprima della foto scelta nelle proporzioni finali; si trascina per spostarla
   (con due dita si ingrandisce) e la barra ingrandisce. Al server vanno zoom e centro (0-1 sulla foto) */
document.querySelectorAll('.inquadra').forEach(q=>{
 const form=q.closest('form'),file=form.querySelector('input[type=file]'),fuoco=form.querySelector('.fuoco'),
  [iz,ix,iy]=['zoom','cx','cy'].map(n=>q.querySelector('[name='+n+']')),minimo=+q.dataset.min||700;
 q.insertAdjacentHTML('beforeend','<div class="cornice" tabindex="0" aria-label="Anteprima: trascina per spostare la foto, frecce della tastiera per spostarla" style="aspect-ratio:'+q.dataset.w+'/'+q.dataset.h+'"><img alt="" draggable="false"></div>'
  +'<label>Ingrandisci<input type="range" min="1" max="4" step="0.01" value="1"></label>'
  +'<p class="nota">Trascina la foto per scegliere la parte da tenere. <button type="button" class="btn-link">Rimetti al centro</button></p>'
  +'<p class="nota pericolo" hidden>Ingrandita molto: sul sito potrebbe sembrare sgranata.</p>');
 const cor=q.querySelector('.cornice'),img=cor.querySelector('img'),zoom=q.querySelector('[type=range]'),
  avviso=q.querySelector('.pericolo'),dita=new Map();
 let z=1,cx=.5,cy=.5,url,distanza=0;
 const scala=()=>Math.max(cor.clientWidth/img.naturalWidth,cor.clientHeight/img.naturalHeight)*z;
 const disegna=()=>{if(!img.naturalWidth||!cor.clientWidth)return;const s=scala(),w=img.naturalWidth*s,h=img.naturalHeight*s,
   mx=cor.clientWidth/2/w,my=cor.clientHeight/2/h;
  cx=Math.min(1-mx,Math.max(mx,cx));cy=Math.min(1-my,Math.max(my,cy));
  img.style.width=w+'px';img.style.height=h+'px';
  img.style.transform='translate('+(cor.clientWidth/2-cx*w)+'px,'+(cor.clientHeight/2-cy*h)+'px)';
  iz.value=z.toFixed(3);ix.value=cx.toFixed(4);iy.value=cy.toFixed(4);zoom.value=z;
  /* larghezza in pixel della parte tenuta, sulla foto originale */
  avviso.hidden=cor.clientWidth/s>=minimo;};
 const ingrandisci=v=>{z=Math.min(4,Math.max(1,v));disegna();};
 const togli=()=>{q.hidden=true;if(fuoco)fuoco.hidden=false;[iz,ix,iy].forEach(i=>i.value='');if(url)URL.revokeObjectURL(url);url=null;};
 file.addEventListener('change',()=>{const f=file.files[0];togli();if(!f)return;
  url=URL.createObjectURL(f);img.onload=()=>{z=1;cx=cy=.5;q.hidden=false;if(fuoco)fuoco.hidden=true;disegna();};img.onerror=togli;img.src=url;});
 zoom.addEventListener('input',()=>ingrandisci(+zoom.value));
 q.querySelector('.btn-link').addEventListener('click',()=>{z=1;cx=cy=.5;disegna();});
 cor.addEventListener('pointerdown',e=>{try{cor.setPointerCapture(e.pointerId);}catch(_){}dita.set(e.pointerId,[e.clientX,e.clientY]);distanza=0;});
 cor.addEventListener('pointermove',e=>{const p=dita.get(e.pointerId);if(!p)return;
  if(dita.size===1){const s=scala();cx-=(e.clientX-p[0])/(img.naturalWidth*s);cy-=(e.clientY-p[1])/(img.naturalHeight*s);}
  dita.set(e.pointerId,[e.clientX,e.clientY]);
  if(dita.size===2){const[a,b]=[...dita.values()],d=Math.hypot(a[0]-b[0],a[1]-b[1]);if(distanza)z*=d/distanza;distanza=d;z=Math.min(4,Math.max(1,z));}
  disegna();});
 const fine=e=>{dita.delete(e.pointerId);distanza=0;};
 cor.addEventListener('pointerup',fine);cor.addEventListener('pointercancel',fine);
 cor.addEventListener('keydown',e=>{const k={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[e.key];
  if(k){e.preventDefault();const s=scala();cx+=k[0]*cor.clientWidth*.04/(img.naturalWidth*s);cy+=k[1]*cor.clientHeight*.04/(img.naturalHeight*s);disegna();}
  else if(e.key==='+'||e.key==='-'){e.preventDefault();ingrandisci(z+(e.key==='+'?.1:-.1));}});
 new ResizeObserver(disegna).observe(cor);
});
