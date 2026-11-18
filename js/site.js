/* ===== EDIT YOUR LINKS HERE ===== */
const LINKS = {
  facebook: "https://www.facebook.com/search/top?q=Najjuuko%20Joanitta",
  twitter: "https://x.com/NJoanitta05",
  linkedin:
    "https://www.linkedin.com/search/results/all/?keywords=Najjuuko%20Joanitta",
  whatsapp: "256705163258",
};
const DEV = { whatsapp: "256704289284", twitter: "lumutweets" }; 
const EMAIL = "hello@nourishlivelihoods.org";
/* ================================ */
const $ = (s, c = document) => c.querySelector(s),
  $$ = (s, c = document) => [...c.querySelectorAll(s)];
document.addEventListener("DOMContentLoaded", () => {
  // social + WhatsApp links
  const wa = LINKS.whatsapp.replace(/\D/g, "");
  const waUrl = wa
    ? `https://wa.me/${wa}?text=${encodeURIComponent("Hello Nourish Livelihoods, I would like to know more.")}`
    : "";
  $$("[data-social]").forEach((a) => {
    const n = a.dataset.social,
      u = n === "whatsapp" ? waUrl : LINKS[n];
    if (u) a.href = u;
    else a.addEventListener("click", (e) => e.preventDefault());
  });
  $$("[data-wa]").forEach((a) => {
    if (waUrl) a.href = waUrl;
    else a.addEventListener("click", (e) => e.preventDefault());
  });
  const gm = $("#gmore");
  gm.onclick = () => {
    const o = $("#gallery").classList.toggle("open");
    gm.firstChild.textContent = o ? "Show fewer photos " : "View more photos ";
  };
    const dm = $("#devmodal"), dw = DEV.whatsapp.replace(/\D/g, ""), dt = DEV.twitter.replace("@", "");
  const devUrl = { whatsapp: dw ? `https://wa.me/${dw}?text=${encodeURIComponent("Hello, I saw your work on the Nourish Livelihoods website.")}` : "", twitter: dt ? `https://x.com/${dt}` : "" };
  $$("[data-dev]").forEach(a => { const u = devUrl[a.dataset.dev]; if (u) a.href = u; else a.addEventListener("click", e => e.preventDefault()); });
  $("#credit").onclick = () => dm.hidden = false;
  $("#devclose").onclick = () => dm.hidden = true;
  dm.onclick = e => { if (e.target === dm) dm.hidden = true; };
  addEventListener("keydown", e => { if (e.key === "Escape") dm.hidden = true; });
  $("#yr").textContent = new Date().getFullYear();
  // mobile menu
  const burger = $(".burger"),
    nav = $(".nav");
  const closeNav = () => {
    nav.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  };
  burger.addEventListener("click", () =>
    burger.setAttribute("aria-expanded", nav.classList.toggle("open")),
  );
  $$(".nav a").forEach((a) => a.addEventListener("click", closeNav));
  // hero slider (auto, arrows, dots, swipe)
  const slides = $$(".slide"),
    dots = $$(".dots i");
  let i = 0,
    t;
  const show = (n) => {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle("on", k === i));
    dots.forEach((d, k) => d.classList.toggle("on", k === i));
  };
  const auto = () => {
    clearInterval(t);
    t = setInterval(() => show(i + 1), 6500);
  };
  $(".hp").onclick = () => {
    show(i - 1);
    auto();
  };
  $(".hn").onclick = () => {
    show(i + 1);
    auto();
  };
  dots.forEach(
    (d, k) =>
      (d.onclick = () => {
        show(k);
        auto();
      }),
  );
  let sx = 0;
  const hero = $(".hero");
  hero.addEventListener("touchstart", (e) => (sx = e.touches[0].clientX), {
    passive: true,
  });
  hero.addEventListener("touchend", (e) => {
    const d = e.changedTouches[0].clientX - sx;
    if (Math.abs(d) > 50) {
      show(i + (d < 0 ? 1 : -1));
      auto();
    }
  });
  auto();
  // reveal + counters
  const io = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("vis");
        io.unobserve(e.target);
      }),
    { threshold: 0.12 },
  );
  $$(".reveal").forEach((el) => io.observe(el));
  const co = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        co.unobserve(e.target);
        const end = +e.target.dataset.count,
          s = performance.now();
        const f = (n) => {
          const p = Math.min((n - s) / 1400, 1);
          e.target.textContent = Math.round(end * p);
          if (p < 1) requestAnimationFrame(f);
        };
        requestAnimationFrame(f);
      }),
    { threshold: 0.6 },
  );
  $$("[data-count]").forEach((el) => co.observe(el));
  // marquee: duplicate for seamless loop
  const tr = $(".track");
  tr.innerHTML += tr.innerHTML;
  // active nav link + back to top
  const links = $$(".nav a:not(.btn)"),
    secs = links.map((a) => $(a.getAttribute("href")));
  const top = $(".totop");
  addEventListener(
    "scroll",
    () => {
      top.classList.toggle("show", scrollY > 600);
      const y = scrollY + 140;
      let cur = 0;
      secs.forEach((s, k) => {
        if (s && s.offsetTop <= y) cur = k;
      });
      links.forEach((a, k) => a.classList.toggle("on", k === cur));
    },
    { passive: true },
  );
  top.onclick = () => scrollTo({ top: 0, behavior: "smooth" });
  // lightbox
  const lb = $("#lb"),
    lbi = $("img", lb),
    imgs = $$("#gallery img");
  let li = 0;
  const open = (n) => {
    li = (n + imgs.length) % imgs.length;
    lbi.src = imgs[li].src;
    lbi.alt = imgs[li].alt;
    lb.hidden = false;
  };
  imgs.forEach((im, k) => (im.parentElement.onclick = () => open(k)));
  $(".lb-p").onclick = (e) => {
    e.stopPropagation();
    open(li - 1);
  };
  $(".lb-n").onclick = (e) => {
    e.stopPropagation();
    open(li + 1);
  };
  lb.onclick = (e) => {
    if (e.target !== lbi) lb.hidden = true;
  };
  addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") lb.hidden = true;
    if (e.key === "ArrowRight") open(li + 1);
    if (e.key === "ArrowLeft") open(li - 1);
  });
  // contact form: validate, open email app, show thank-you
  const modal = $("#modal");
  $("#mok").onclick = () => (modal.hidden = true);
  $("#cform").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target;
    let ok = true;
    $$("[required]", f).forEach((x) => {
      const bad = !x.value.trim() || (x.type === "email" && !x.validity.valid);
      x.classList.toggle("err", bad);
      if (bad) ok = false;
    });
    if (!ok) return;
    const b = `Name: ${f.name.value}\nEmail: ${f.email.value}\nInterest: ${f.interest.value}\n\n${f.message.value}`;
    modal.hidden = false;
    f.reset();
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Website enquiry: " + f.interest.value)}&body=${encodeURIComponent(b)}`;
  });
  $("#sform").addEventListener("submit", (e) => {
    e.preventDefault();
    location.href = `mailto:${EMAIL}?subject=Subscribe&body=${encodeURIComponent("Please add me to updates: " + e.target.querySelector("input").value)}`;
  });
});
