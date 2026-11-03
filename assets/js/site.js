/* ==========================================================================
   Ottica Demo — script unico, nessuna dipendenza
   1. menu mobile   2. riga trascinabile   3. test visivo
   4. prenotazione  5. ingressi
   ========================================================================== */
(function () {
  "use strict";
  document.documentElement.classList.remove("no-js");

  /* ---------- 1. Menu mobile ---------- */
  var nav = document.getElementById("site-nav");
  var toggle = document.querySelector(".nav-toggle");
  var closeBtn = document.querySelector(".nav-close");

  function setNav(open) {
    if (!nav) return;
    nav.setAttribute("data-open", open ? "true" : "false");
    if (toggle) toggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
    if (open && closeBtn) closeBtn.focus();
    else if (!open && toggle) toggle.focus();
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setNav(nav.getAttribute("data-open") !== "true");
    });
  }
  if (closeBtn) closeBtn.addEventListener("click", function () { setNav(false); });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav && nav.getAttribute("data-open") === "true") setNav(false);
  });

  /* sottomenu a fisarmonica su mobile (vale anche per le voci "in arrivo") */
  document.querySelectorAll(".nav-item").forEach(function (item) {
    var link = item.querySelector(".nav-link");
    var panel = item.querySelector(".dropdown");
    if (!link || !panel) return;
    function togglePanel(e) {
      if (window.matchMedia("(max-width: 900px)").matches) {
        if (e) e.preventDefault();
        var open = item.getAttribute("data-expanded") === "true";
        item.setAttribute("data-expanded", open ? "false" : "true");
        link.setAttribute("aria-expanded", open ? "false" : "true");
      }
    }
    link.addEventListener("click", togglePanel);
    link.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") togglePanel(e);
    });
  });

  /* chiudi cliccando fuori, solo su desktop */
  document.addEventListener("click", function (e) {
    if (!nav || window.matchMedia("(max-width: 900px)").matches) return;
    if (nav.getAttribute("data-open") === "true" && !nav.contains(e.target) && e.target !== toggle) {
      setNav(false);
    }
  });

  /* ---------- 2. Riga trascinabile (mossa firma) ---------- */
  document.querySelectorAll("[data-rail]").forEach(function (wrap) {
    var rail = wrap.querySelector(".rail");
    if (!rail) return;
    var prev = wrap.querySelector("[data-rail-prev]");
    var next = wrap.querySelector("[data-rail-next]");

    function step() {
      var card = rail.querySelector(":scope > *");
      if (!card) return rail.clientWidth * 0.8;
      var gap = parseFloat(getComputedStyle(rail).columnGap) || 16;
      return card.getBoundingClientRect().width + gap;
    }
    function sync() {
      var max = rail.scrollWidth - rail.clientWidth - 2;
      if (prev) prev.disabled = rail.scrollLeft <= 2;
      if (next) next.disabled = rail.scrollLeft >= max;
    }
    if (prev) prev.addEventListener("click", function () { rail.scrollBy({ left: -step(), behavior: "smooth" }); });
    if (next) next.addEventListener("click", function () { rail.scrollBy({ left: step(), behavior: "smooth" }); });
    rail.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync, { passive: true });
    sync();
  });

  /* ---------- 3. Test visivo (la cosa viva) ---------- */
  var test = document.getElementById("eyetest");
  if (test) {
    var stage = test.querySelector(".eyetest-stage");
    var out = test.querySelector(".eyetest-out");
    var range = test.querySelector("#eyetest-distance");
    var rangeOut = test.querySelector("#eyetest-distance-out");
    var lines = Array.prototype.slice.call(test.querySelectorAll(".eyetest-line"));

    /* righe dell'ottotipo Sloan, dalla più grande alla più piccola */
    var data = [
      { dec: "0.5", letters: ["E", "C", "K", "H", "D"], mm: 14.5 },
      { dec: "0.6", letters: ["F", "Z", "D", "K", "V"], mm: 12.1 },
      { dec: "0.7", letters: ["O", "F", "L", "C", "N"], mm: 10.4 },
      { dec: "0.8", letters: ["D", "E", "K", "O", "H"], mm: 9.1 },
      { dec: "0.9", letters: ["H", "N", "Z", "F", "E"], mm: 8.1 },
      { dec: "1.0", letters: ["V", "C", "Z", "D", "O"], mm: 7.3 }
    ];

    /* costruisci le righe: senza JavaScript restano quelle scritte nell'HTML */
    if (lines.length === 0) {
      data.forEach(function (row) {
        var el = document.createElement("p");
        el.className = "eyetest-line";
        el.setAttribute("data-mm", row.mm);
        el.setAttribute("data-dec", row.dec);
        row.letters.forEach(function (ch) {
          var s = document.createElement("span");
          s.textContent = ch;
          el.appendChild(s);
        });
        stage.appendChild(el);
        lines.push(el);
      });
    }

    var distance = 300; /* cm */
    var sizeIndex = 2;  /* riga evidenziata: 0.7 */

    /* l'angolo visivo dipende da dimensione e distanza: ricalcolo i px */
    function render() {
      lines.forEach(function (el, i) {
        var mm = parseFloat(el.getAttribute("data-mm"));
        /* px = mm * (distanza_cm / 600) * fattore_schermo approssimato */
        var px = mm * (distance / 600) * 3.78;
        el.style.setProperty("--sz", Math.max(7, Math.min(96, px)).toFixed(1));
        el.style.opacity = i === sizeIndex ? "1" : "0.42";
        el.style.fontWeight = i === sizeIndex ? "600" : "400";
      });
      if (rangeOut) rangeOut.textContent = (distance / 100).toFixed(1).replace(".", ",") + " m";
      if (out) {
        var dec = data[sizeIndex] ? data[sizeIndex].dec : "0.7";
        out.innerHTML =
          "<strong>Riga " + dec + "</strong> a " +
          (distance / 100).toFixed(1).replace(".", ",") +
          " metri. Se la leggi senza sforzo, la tua vista da lontano è nella norma. " +
          "Se fatichi o indovini le lettere, è il momento di un controllo.";
      }
    }

    if (range) {
      range.addEventListener("input", function () {
        distance = parseInt(range.value, 10);
        render();
      });
    }

    test.querySelectorAll("[data-size]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        sizeIndex = Math.max(0, Math.min(lines.length - 1, sizeIndex + parseInt(btn.getAttribute("data-size"), 10)));
        render();
      });
    });

    render();
  }

  /* ---------- 4. Prenotazione (gestionale Iridex Next) ----------
     Il modulo viene mostrato solo con data-enabled="true", cioè quando in
     build.mjs BOOKING.enabled è true. Se la chiamata fallisce, o se
     l'integrazione non è configurata, restano i canali diretti già in pagina. */
  var form = document.getElementById("booking");
  if (form) {
    var status = form.querySelector(".booking-status");
    var endpoint = form.getAttribute("data-endpoint") || "";
    var enabled = form.getAttribute("data-enabled") === "true";

    var MSG = {
      pending: "Invio in corso…",
      ok: "Richiesta inviata. Ti confermiamo l'appuntamento il prima possibile.",
      off: "La prenotazione online non è ancora attiva. Chiamaci allo 02 12345678 oppure scrivici su WhatsApp: ti rispondiamo subito.",
      err: "Non siamo riusciti a inviare la richiesta. Riprova, oppure chiamaci allo 02 12345678 o scrivici su WhatsApp.",
      bad: "Controlla i campi segnalati: nome, telefono e consenso sono obbligatori."
    };

    function say(text, state) {
      if (!status) return;
      status.textContent = text;
      status.setAttribute("data-state", state);
    }

    /* la richiesta al gestionale sta tutta qui: quando arrivano endpoint,
       token e documentazione Iridex Next si modifica solo questa funzione */
    function postBooking(payload) {
      return fetch(endpoint, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json"
        },
        body: JSON.stringify(payload)
      }).then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json().catch(function () { return {}; });
      });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!enabled || !endpoint) { say(MSG.off, "error"); return; }

      /* validazione minima lato client, con messaggi testuali */
      var invalid = [];
      ["nome", "telefono", "privacy"].forEach(function (name) {
        var el = form.elements[name];
        if (!el) return;
        var bad = el.type === "checkbox" ? !el.checked : !el.value.trim();
        el.setAttribute("aria-invalid", bad ? "true" : "false");
        if (bad) invalid.push(el);
      });
      if (invalid.length) {
        say(MSG.bad, "error");
        invalid[0].focus();
        return;
      }

      var data = new FormData(form);
      var payload = {
        nome: (data.get("nome") || "").toString().trim(),
        telefono: (data.get("telefono") || "").toString().trim(),
        email: (data.get("email") || "").toString().trim(),
        motivo: (data.get("motivo") || "").toString(),
        data: (data.get("data") || "").toString(),
        ora: (data.get("ora") || "").toString(),
        note: (data.get("note") || "").toString().trim(),
        durata: parseInt(form.getAttribute("data-slot"), 10) || 30,
        origine: "sito-ottica-demo"
      };

      var submit = form.querySelector('button[type="submit"]');
      if (submit) submit.disabled = true;
      say(MSG.pending, "pending");

      postBooking(payload)
        .then(function () {
          form.reset();
          say(MSG.ok, "ok");
        })
        .catch(function () {
          say(MSG.err, "error");
        })
        .then(function () {
          if (submit) submit.disabled = false;
        });
    });
  }

  /* ---------- 5. Ingressi scaglionati ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if (reveals.length) {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      reveals.forEach(function (el) { el.classList.add("is-in"); });
    } else {
      var groups = new Map();
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var key = el.closest("[data-reveal-group]") || document.body;
          var n = groups.get(key) || 0;
          groups.set(key, n + 1);
          setTimeout(function () { el.classList.add("is-in"); }, Math.min(n, 5) * 80);
          io.unobserve(el);
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
      reveals.forEach(function (el) { io.observe(el); });
    }
  }
})();
