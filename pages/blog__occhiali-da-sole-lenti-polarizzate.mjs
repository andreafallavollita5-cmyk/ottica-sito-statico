/* ==========================================================================
   pages/blog__occhiali-da-sole-lenti-polarizzate.mjs
   Fonte: brochure pag. 10-11 (servizi e marchi solari)
   ========================================================================== */
import { page, img, ICON, SITE } from "../build.mjs";

const body = `
<section class="page-head">
  <div class="wrap">
    <nav class="breadcrumb" aria-label="Percorso">
      <ol><li><a href="/">Home</a></li><li><a href="/blog/">Blog</a></li><li>Lenti polarizzate</li></ol>
    </nav>
    <h1>Lenti polarizzate: a cosa servono.</h1>
    <p>Quando la polarizzazione cambia l'esperienza e quando è solo marketing. Una guida onesta alla scelta degli occhiali da sole.</p>
    <div class="post-meta">
      <span class="post-author">${img("titolare-ritratto", "Mario Rossi", { sizes: "38px" })}<span>di <strong>Mario Rossi</strong>, ottico dal ${SITE.since}</span></span>
      <span>Lettura: 5 minuti</span>
    </div>
  </div>
</section>

<div class="wrap"><div class="post-hero">${img("scaffale-solari", "Scaffale con occhiali da sole, anche con lenti polarizzate", { sizes: "(max-width: 1360px) 100vw, 1360px", lazy: false })}</div></div>

<section class="section section--tight">
  <div class="wrap split" style="align-items:start">
    <div class="post-body" data-reveal-group>
      <h2 class="reveal">Prima cosa: la protezione UV non è la polarizzazione</h2>
      <p class="reveal">Sono due cose diverse, e vengono continuamente confuse. La <strong>protezione UV</strong> è la capacità della lente di bloccare le radiazioni ultraviolette, ed è la funzione che protegge davvero l'occhio dai danni a lungo termine — cristallino, retina, congiuntiva.</p>
      <p class="reveal">La <strong>polarizzazione</strong> è un filtro che elimina la luce riflessa che vibra su un piano orizzontale. Non protegge di più dagli UV: <em>migliora la qualità della visione</em> in determinate condizioni.</p>
      <p class="reveal">Un occhiale da sole senza protezione UV è peggio di nessun occhiale: la pupilla si dilata per la minore luminosità e lascia entrare più radiazione di quanta ne entrerebbe a occhio nudo. È il motivo per cui gli occhiali da tre euro comprati in edicola sono un rischio, non un risparmio.</p>

      <h2 class="reveal">Che cosa fa, in concreto, la polarizzazione</h2>
      <p class="reveal">La luce che si riflette su una superficie orizzontale — l'acqua, l'asfalto, la sabbia, il cofano di un'auto, la neve — tende a polarizzarsi orizzontalmente. È quella luce che crea i riflessi accecanti e la sensazione di "vedo tutto bianco" in riva al mare o guidando controsole.</p>
      <p class="reveal">Un filtro polarizzatore blocca selettivamente quella componente. Il risultato è che i riflessi spariscono, i colori tornano saturi, e il contrasto migliora sensibilmente.</p>

      <div class="stat-row reveal">
        <div class="stat"><strong>−</strong><span>riflessi su acqua e asfalto</span></div>
        <div class="stat"><strong>+</strong><span>contrasto e saturazione dei colori</span></div>
        <div class="stat"><strong>100%</strong><span>UV · requisito minimo di legge</span></div>
      </div>

      <h2 class="reveal">Quando la polarizzazione cambia davvero l'esperienza</h2>
      <ul class="reveal">
        <li><strong>Alla guida.</strong> È il caso in cui la differenza è più evidente: l'asfalto bagnato, il cofano dell'auto che riflette, il cruscotto. Chi guida molto e prova le polarizzate difficilmente torna indietro.</li>
        <li><strong>In barca, al mare, in piscina.</strong> I riflessi sull'acqua sono la condizione ideale per un filtro polarizzatore: si vede dentro l'acqua invece di vedere la superficie che riflette.</li>
        <li><strong>In montagna e sulla neve.</strong> Qui la polarizzazione è quasi obbligatoria: la neve riflette fino all'80% della luce, e il rischio di fotocheratite (la "cecità da neve") è reale.</li>
        <li><strong>Pesca sportiva.</strong> Serve a vedere sotto la superficie dell'acqua, non solo a proteggersi.</li>
        <li><strong>Sport all'aperto</strong> — tennis, ciclismo, vela, golf — dove seguire una palla o una linea richiede contrasto.</li>
      </ul>

      <h2 class="reveal">Quando invece non servono</h2>
      <p class="reveal">La polarizzazione ha anche dei limiti, ed è giusto conoscerli prima di pagarla:</p>
      <ul class="reveal">
        <li><strong>Schermi LCD.</strong> Guardando il display di un telefono, di un navigatore o di alcuni cruscotti attraverso una lente polarizzata, si può vedere l'immagine scurita o "a chiazze". Dipende dall'orientamento dello schermo.</li>
        <li><strong>Uso quotidiano in città.</strong> Se l'occhiale serve per camminare in centro, la polarizzazione aggiunge poco.</li>
        <li><strong>Sci alpino a bassa visibilità.</strong> Alcune lenti polarizzate appiattiscono troppo il contrasto sulla neve in giornate coperte: per lo sci esistono lenti specifiche con trattamento mirato.</li>
        <li><strong>Costo.</strong> A parità di protezione UV, una lente polarizzata costa di più. Vale la pena se usi l'occhiale in una delle situazioni elencate sopra.</li>
      </ul>

      <div class="callout reveal">
        <strong>Il consiglio pratico.</strong> Se usi un solo paio di occhiali da sole per tutto, prendilo polarizzato: gli svantaggi sono marginali e i vantaggi si sentono alla guida. Se ne usi due, tieni il polarizzato per mare, montagna e auto, e un non polarizzato per l'uso urbano quotidiano.
      </div>

      <h2 class="reveal">Se porti occhiali da vista: le tre opzioni</h2>
      <ol class="reveal">
        <li><strong>Occhiali da sole graduati.</strong> La soluzione con la qualità visiva migliore: la prescrizione è quella giusta, la lente è polarizzata, e non si sovrappone nulla.</li>
        <li><strong>Lenti fotocromatiche.</strong> Si scuriscono da sole in presenza di UV. Comode perché un solo paio fa tutto, ma non polarizzano e all'interno dell'auto si scuriscono poco, perché il parabrezza filtra gli UV.</li>
        <li><strong>Clip-on su misura.</strong> La soluzione più economica e la meno conosciuta: si realizza un clip-on sulla vostra montatura da vista, anche con lenti polarizzate. Si aggancia e si toglie in un secondo, e sta in tasca.</li>
      </ol>

      <h2 class="reveal">Come riconoscere una lente polarizzata</h2>
      <p class="reveal">C'è un test semplice: metti due lenti polarizzate una davanti all'altra e ruota una delle due di 90 gradi. Se la zona di sovrapposizione diventa completamente nera, entrambe sono polarizzate. Se resta trasparente, almeno una non lo è.</p>
      <p class="reveal">In negozio lo facciamo davanti a te, su ogni paio che stai valutando: è un modo rapido per verificare anche la qualità della lente, non solo la dichiarazione sull'etichetta.</p>

      <div class="callout reveal">
        <strong>Le lenti graduate o polarizzate si possono montare anche su occhiali da nuoto e sportivi.</strong> Maschere da subacquea, occhialini da nuoto e occhiali sportivi sono disponibili anche con correzione: chiedici quali modelli si prestano.
      </div>

      <p class="reveal"><a class="tlink" href="/blog/multi-equipaggiamento-occhiali/">Leggi anche: multi-equipaggiamento ${ICON.arrowRight}</a></p>
    </div>

    <aside class="reveal" style="position:sticky;top:100px">
      <div class="split-media" style="margin-bottom:1.5rem">
        ${img("scaffale-solari", "Occhiali da sole con lenti polarizzate", { sizes: "(max-width: 1024px) 100vw, 34vw", lazy: false })}
      </div>
      <h3 style="margin-bottom:.75rem">In sintesi</h3>
      <ul class="rows">
        <li><span class="row-k">Polarizzazione ≠ UV</span><span class="row-v">Sono filtri diversi</span></li>
        <li><span class="row-k">Massimo beneficio</span><span class="row-v">Guida, mare, neve</span></li>
        <li><span class="row-k">Limite noto</span><span class="row-v">Alcuni schermi LCD</span></li>
        <li><span class="row-k">Se porti occhiali</span><span class="row-v">Graduati, fotocromatici, clip-on</span></li>
        <li><span class="row-k">Test rapido</span><span class="row-v">Due lenti ruotate di 90°</span></li>
      </ul>
      <p style="margin-top:1.5rem"><a class="btn btn--primary" href="/prenota/">Vieni a provarle</a></p>
    </aside>
  </div>
</section>

<section class="section section--surface" data-reveal-group>
  <div class="wrap">
    <div class="sec-head"><h2 class="reveal">Continua a leggere</h2></div>
    <div class="cards">
      <a class="card reveal" href="/blog/multi-equipaggiamento-occhiali/">
        ${img("scaffale-marchi", "Multi equipaggiamento")}
        <div class="card-body"><h3>Multi-equipaggiamento</h3><p>Perché un occhiale solo non basta.</p><span class="tlink">Leggi ${ICON.arrowRight}</span></div>
      </a>
      <a class="card reveal" href="/blog/centratura-digitale-perche-conta/">
        ${img("sala-esame-forottero", "Centratura digitale")}
        <div class="card-body"><h3>Centratura digitale: perché conta</h3><p>Il fattore che decide se una lente funziona.</p><span class="tlink">Leggi ${ICON.arrowRight}</span></div>
      </a>
      <a class="card reveal" href="/promozioni/">
        ${img("scaffale-solari", "Promozioni")}
        <div class="card-body"><h3>Le nostre promozioni</h3><p>Secondo occhiale, Kasco, multi-equipaggiamento.</p><span class="tlink">Vedi ${ICON.arrowRight}</span></div>
      </a>
    </div>
  </div>
</section>

<section class="section section--tight cta-final" data-reveal-group>
  <div class="wrap">
    <p class="statement reveal">Prova la differenza tra una lente polarizzata e una no.</p>
    <div class="hero-actions reveal">
      <a class="btn btn--primary btn--lg" href="/prenota/">Prenota una valutazione</a>
      <a class="btn btn--ghost btn--lg" href="/contatti/">Vieni in negozio</a>
    </div>
  </div>
</section>
`;

export default page({
  title: "Lenti polarizzate: a cosa servono | Ottica Demo Milano",
  description: "La polarizzazione elimina i riflessi su acqua e asfalto, ma non è la protezione UV: quando serve davvero e le opzioni per chi porta occhiali.",
  canonical: "/blog/occhiali-da-sole-lenti-polarizzate/",
  active: "/blog/",
  body,
  ogImage: "/assets/img/scaffale-solari.webp",
  schema: [
    {
      "@type": "BlogPosting",
      "@id": `${SITE.url}/blog/occhiali-da-sole-lenti-polarizzate/#article`,
      headline: "Lenti polarizzate: a cosa servono davvero",
      description: "Guida alle lenti polarizzate: differenza dalla protezione UV, quando servono e le opzioni per chi porta occhiali da vista.",
      author: { "@id": `${SITE.url}/#titolare-rossi` },
      publisher: { "@id": `${SITE.url}/#organization` },
      inLanguage: "it-IT",
      articleSection: "Occhiali da sole",
      wordCount: 1100
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE.url}/blog/occhiali-da-sole-lenti-polarizzate/#faq`,
      mainEntity: [
        ["Le lenti polarizzate proteggono dagli UV?", "Sono due cose diverse. La polarizzazione elimina i riflessi; la protezione UV è la capacità di bloccare le radiazioni ultraviolette, ed è indispensabile in ogni occhiale da sole."],
        ["Si può guidare con lenti polarizzate?", "Sì, ed è una delle situazioni in cui il vantaggio è più evidente: elimina i riflessi dell'asfalto bagnato e del cruscotto."],
        ["Perché con le lenti polarizzate vedo male lo schermo del telefono?", "Alcuni display LCD emettono luce polarizzata: attraverso una lente polarizzata l'immagine può risultare scurita o a chiazze. Dipende dall'orientamento dello schermo."],
        ["Meglio lenti polarizzate o fotocromatiche?", "Le polarizzate offrono qualità visiva superiore ed eliminano i riflessi; le fotocromatiche offrono comodità perché un solo paio fa tutto, ma non polarizzano."],
        ["Come si riconosce una lente polarizzata?", "Sovrapponendo due lenti e ruotandone una di 90 gradi: se la zona di sovrapposizione diventa nera, entrambe sono polarizzate."]
      ].map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } }))
    }
  ]
});
