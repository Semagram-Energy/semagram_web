"use strict";

// Page loading — the hero graph construction (below) drives the intro.
// If the hero module isn't present (e.g. SVG missing), reveal copy immediately on load.
window.addEventListener("load", () => {
  const reveal = document.querySelector("[data-hero-reveal]");
  if (reveal && !document.querySelector("[data-hero-net]")) {
    reveal.classList.add("is-revealed");
  }
});

// Navbar
const navbar = document.querySelector(".ic-navbar"),
  navbarToggler = navbar.querySelector("[data-web-toggle=navbar-collapse]");

navbarToggler.addEventListener("click", function () {
  const dataTarget = this.dataset.webTarget,
    targetElement = document.getElementById(dataTarget),
    isExpanded = this.ariaExpanded === "true";

  if (!targetElement) {
    return;
  }

  navbar.classList.toggle("menu-show");
  this.setAttribute("aria-expanded", String(!isExpanded));
});

// Sticky Header
const header = document.querySelector(".header");
if (header) {
  window.addEventListener("scroll", function () {
    if (this.scrollY >= 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

// Theme initialization (removed forced dark mode)
const html = document.querySelector("html");

// Scrollspy
function scrollspy(event) {
  var links = document.querySelectorAll(".ic-page-scroll"),
    scrollpos =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;

  for (let i = 0; i < links.length; i++) {
    var currentLink = links[i],
      dataTarget = currentLink.getAttribute("href"),
      targetElement = document.querySelector(dataTarget),
      topminus = scrollpos + 74;

    if (targetElement) {
      if (
        targetElement.offsetTop <= topminus &&
        targetElement.offsetTop + targetElement.offsetHeight > topminus
      ) {
        document.querySelector(".ic-page-scroll").classList.remove("active");
        currentLink.classList.add("active");
      } else {
        currentLink.classList.remove("active");
      }
    }
  }
}

window.document.addEventListener("scroll", scrollspy);

// Menu scroll
const pageLink = document.querySelectorAll(".ic-page-scroll");

pageLink.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetElement = document.querySelector(link.getAttribute("href"));

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        offsetTop: 1 - 74,
      });
    }

    navbar.classList.remove("menu-show");
    navbarToggler.setAttribute("aria-expanded", "false");
  });
});

// Close menu on scroll
window.addEventListener("scroll", () => {
  if (navbar.classList.contains("menu-show")) {
    navbar.classList.remove("menu-show");
    navbarToggler.setAttribute("aria-expanded", "false");
  }
});

// Tabs
const initTabs = () => {
  const tabs = document.querySelectorAll(".tabs");

  tabs.forEach((tab) => {
    const links = tab.querySelectorAll(".tabs-nav .tabs-link"),
      contents = tab.querySelectorAll(".tabs-content");

    if (contents.length === 0) {
      return;
    }

    const activateTab = (activeLink) => {
      const dataTarget = activeLink.dataset.webTarget,
        targetElement = document.getElementById(dataTarget);

      if (!targetElement) return;

      contents.forEach(content => content.classList.add("hidden"));
      links.forEach(link => {
        link.classList.remove("active", "bg-gradient-to-r", "from-accent", "to-blue-600", "text-white", "shadow-lg");
        link.classList.add("bg-background-dark", "text-primary", "hover:bg-background-dark/80");
        link.ariaSelected = false;
      });

      activeLink.classList.remove("bg-background-dark", "text-primary", "hover:bg-background-dark/80");
      activeLink.classList.add("active", "bg-gradient-to-r", "from-accent", "to-blue-600", "text-white", "shadow-lg");
      activeLink.ariaSelected = true;
      targetElement.classList.remove("hidden");
    };

    // Initialize first tab
    activateTab(links[0]);

    links.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        activateTab(link);
      });
    });

    // Add mouse-following glow
    tab.addEventListener("mousemove", (e) => {
      const rect = tab.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;

      tab.querySelectorAll(".interactive-glow").forEach((glow) => {
        glow.style.setProperty("--x", `${x}px`);
        glow.style.setProperty("--y", `${y}px`);
      });
    });
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTabs);
} else {
  initTabs();
}

// Portfolio filter
const portfolioFilters = document.querySelectorAll(".portfolio-menu button");

portfolioFilters.forEach((filter) => {
  filter.addEventListener("click", function () {
    let btn = portfolioFilters[0];

    while (btn) {
      if (btn.tagName === "BUTTON") {
        btn.classList.remove("active");
      }

      btn = btn.nextSibling;
    }

    this.classList.add("active");

    let selected = filter.getAttribute("data-filter"),
      itemsToHide = document.querySelectorAll(
        '.portfolio-grid .portfolio :not([data-filter="' + selected + '"])'
      ),
      itemsToShow = document.querySelectorAll(
        '.portfolio-grid .portfolio [data-filter="' + selected + '"]'
      );

    if (selected == "all") {
      itemsToHide = [];
      itemsToShow = document.querySelectorAll(
        ".portfolio-grid .portfolio [data-filter]"
      );
    }

    itemsToHide.forEach((el) => {
      el.parentElement.classList.add("hide");
      el.parentElement.classList.remove("show");
    });

    itemsToShow.forEach((el) => {
      el.parentElement.classList.remove("hide");
      el.parentElement.classList.add("show");
    });
  });
});

// Scroll to top
var st = document.querySelector("[data-web-trigger=scroll-top]");

if (st) {
  window.onscroll = function () {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      st.classList.remove("is-hided");
    } else {
      st.classList.add("is-hided");
    }
  };

  st.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ---- Hero: transmission-tower digital-twin intro (build -> single colorizing scan -> energize + cursor/click/fleet) ----
(function heroTower() {
  const section = document.getElementById("home");
  const svg = section && section.querySelector("[data-hero-net]");
  if (!section || !svg) return;

  const NS = "http://www.w3.org/2000/svg";
  const VW = 1040, VH = 560;
  const GLOW = "url(#hg-glow)", GLOWS = "url(#hg-glowS)";
  const world = section.querySelector("[data-hero-world]"),
    twin = section.querySelector("[data-hero-twin]"),
    fleet = section.querySelector("[data-hero-fleet]"),
    fx = section.querySelector("[data-hero-fx]"),
    hud = section.querySelector("[data-hero-hud]"),
    bolts = section.querySelector("[data-hero-bolts]"),
    scanBand = section.querySelector("[data-hero-scanband]"),
    scanLine = section.querySelector("[data-hero-scanline]"),
    grid = section.querySelector("[data-hero-grid]"),
    clight = section.querySelector("[data-hero-clight]"),
    core = section.querySelector("[data-hero-core]"),
    reveal = section.querySelector("[data-hero-reveal]"),
    statusEl = section.querySelector("[data-hero-status]"),
    statusText = section.querySelector("[data-hero-status-text]"),
    statusPct = section.querySelector("[data-hero-status-pct]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const STEEL_GREY = "#9aa3b2", STEEL = "#3f4f6b", STEEL_DK = "#1e293b",
    COND_GREY = "#aeb6c2", COND = "#3b6fe0", INSUL_GREY = "#aeb6c2", INSUL = "#64748b", CY = "#22d3ee";

  let timers = [], raf = null, running = false;
  let steelEls = [], conductors = [], insulEls = [], flows = [], particles = [], sensors = [], rings = [], packets = [];
  let crackleEls = [], sboltEl = null, btnRect = null;
  let mouse = { x: -9999, y: -9999, on: false }, surge = 0, tick = 0;
  let scanX = -300, scanning = false, scanDone = false, energized = false, loadEl = null;
  let fleetNodes = [], fleetIdx = 0, fleetClicks = 0, speedMul = 1, twinBtnText = null, twinBtnCap = null;

  const T = (fn, ms) => { timers.push(setTimeout(fn, ms)); };
  const rnd = (a, b) => a + Math.random() * (b - a);
  function el(tag, attrs, parent) { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; }
  function mkLine(parent, x1, y1, x2, y2, color, w) { const l = document.createElementNS(NS, "line"); l.setAttribute("x1", x1); l.setAttribute("y1", y1); l.setAttribute("x2", x2); l.setAttribute("y2", y2); l.setAttribute("stroke", color); l.setAttribute("stroke-width", w); l.setAttribute("stroke-linecap", "round"); parent.appendChild(l); return l; }
  function member(x1, y1, x2, y2, w) { const l = mkLine(world, x1, y1, x2, y2, STEEL_GREY, w); const len = Math.hypot(x2 - x1, y2 - y1); l.setAttribute("stroke-dasharray", len); l.setAttribute("stroke-dashoffset", len); l.style.transition = "stroke-dashoffset .35s ease"; steelEls.push({ el: l, mx: (x1 + x2) / 2 }); return { el: l }; }
  function conductor(x1, y1, x2, y2, sag) { const mx = (x1 + x2) / 2, my = Math.max(y1, y2) + sag; const p = document.createElementNS(NS, "path"); p.setAttribute("d", `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`); p.setAttribute("fill", "none"); p.setAttribute("stroke", COND_GREY); p.setAttribute("stroke-width", 1.7); p.setAttribute("stroke-linecap", "round"); world.appendChild(p); const len = p.getTotalLength(); p.setAttribute("stroke-dasharray", len); p.setAttribute("stroke-dashoffset", len); p.style.transition = "stroke-dashoffset .7s ease"; const o = { el: p, len, mx: (x1 + x2) / 2, on: false }; conductors.push(o); return o; }
  function disc(parent, cx2, cy2, r, fill, reg) { const c = document.createElementNS(NS, "circle"); c.setAttribute("cx", cx2); c.setAttribute("cy", cy2); c.setAttribute("r", 0); c.setAttribute("fill", fill); c.dataset.r = r; c.style.transition = "r .3s cubic-bezier(.34,1.56,.64,1)"; parent.appendChild(c); if (reg) insulEls.push({ el: c, mx: cx2 }); return c; }

  const cx = 730;
  const lv = [{ y: 512, hw: 74 }, { y: 446, hw: 62 }, { y: 384, hw: 51 }, { y: 330, hw: 42 }, { y: 286, hw: 34 }, { y: 250, hw: 27 }];
  const arms = [{ y: 236, len: 118 }, { y: 198, len: 98 }, { y: 162, len: 78 }];
  const apex = { x: cx, y: 96 };
  const dx = 150, dlv = [{ y: 500, hw: 42 }, { y: 458, hw: 34 }, { y: 422, hw: 28 }, { y: 392, hw: 23 }, { y: 366, hw: 19 }], dapex = { x: dx, y: 300 };
  const darms = [{ y: 352, len: 58 }, { y: 326, len: 46 }];

  const draws = [], pops = []; let TT = 0;
  function schedDraw(seg, dt) { draws.push({ seg, t: TT }); TT += dt; }
  function schedPop(e2, dt) { pops.push({ el: e2, t: TT }); TT += dt; }

  function miniTower(g, bx, by, h, hw) { const ax = bx, ay = by - h;
    el("line", { x1: bx - hw, y1: by, x2: ax - hw * 0.28, y2: ay + h * 0.18, stroke: "#7dd3fc", "stroke-width": 0.8 }, g);
    el("line", { x1: bx + hw, y1: by, x2: ax + hw * 0.28, y2: ay + h * 0.18, stroke: "#7dd3fc", "stroke-width": 0.8 }, g);
    el("line", { x1: ax - hw * 0.28, y1: ay + h * 0.18, x2: ax, y2: ay, stroke: "#7dd3fc", "stroke-width": 0.8 }, g);
    el("line", { x1: ax + hw * 0.28, y1: ay + h * 0.18, x2: ax, y2: ay, stroke: "#7dd3fc", "stroke-width": 0.8 }, g);
    [0, 0.4, 0.72].forEach(f => { const yy = by - h * f, ww = hw * (1 - f * 0.6); el("line", { x1: bx - ww, y1: yy, x2: bx + ww, y2: yy, stroke: "#38bdf8", "stroke-width": 0.6, opacity: 0.8 }, g); });
    el("line", { x1: bx, y1: by, x2: bx, y2: ay, stroke: "#38bdf8", "stroke-width": 0.5, opacity: 0.5 }, g);
    el("line", { x1: bx - hw * 0.9, y1: by - h * 0.78, x2: bx + hw * 0.9, y2: by - h * 0.78, stroke: "#7dd3fc", "stroke-width": 0.7 }, g);
  }
  function buildTwinScreen() {
    twin.innerHTML = "";
    const g = el("g", { transform: "translate(250,404)" }, twin);
    el("rect", { x: 0, y: 0, width: 300, height: 92, rx: 8, fill: "#0c1730", "fill-opacity": 0.92, stroke: "#22d3ee", "stroke-width": 1, opacity: 0.9 }, g);
    el("rect", { x: 0, y: 0, width: 300, height: 15, rx: 8, fill: "#22d3ee", "fill-opacity": 0.14 }, g);
    [283, 290, 297].forEach((cxx, i) => el("circle", { cx: cxx, cy: 7.5, r: 1.6, fill: i === 0 ? "#22d3ee" : "#2dd4bf", opacity: 0.85 }, g));
    miniTower(g, 128, 82, 52, 18);
    miniTower(g, 58, 82, 38, 12);
    el("path", { d: "M 66 50 Q 96 58 116 42", fill: "none", stroke: "#22d3ee", "stroke-width": 0.8, opacity: 0.85 }, g);
    el("path", { d: "M 66 56 Q 96 64 116 50", fill: "none", stroke: "#22d3ee", "stroke-width": 0.8, opacity: 0.85 }, g);
    el("circle", { cx: 128, cy: 32, r: 1.5, fill: "#bdf5ff" }, g);
    const bxp = 196, byp = 33, bw = 90, bh = 26;
    const btn = el("g", {}, g);
    btnRect = el("rect", { x: bxp, y: byp, width: bw, height: bh, rx: 6, fill: "#22d3ee", "fill-opacity": 0.2, stroke: "#22d3ee", "stroke-width": 1.2 }, btn);
    el("path", { d: `M ${bxp + 16} ${byp + 8} l 9 5 l -9 5 z`, fill: "#bdf5ff" }, btn);
    twinBtnText = el("text", { x: bxp + 32, y: byp + 17, fill: "#bdf5ff", "font-family": "'JetBrains Mono',monospace", "font-size": 9.5, "font-weight": 600, "letter-spacing": 0.5 }, btn);
    twinBtnText.textContent = "SPEED UP";
    twinBtnCap = el("text", { x: bxp, y: byp + 38, fill: "#7fb5cf", "font-family": "'JetBrains Mono',monospace", "font-size": 6.5 }, g);
    twinBtnCap.textContent = "scale the grid →";
  }
  function flashBtn() { if (btnRect) { btnRect.setAttribute("fill-opacity", 0.5); setTimeout(() => btnRect.setAttribute("fill-opacity", 0.2), 180); } }

  function fleetTower(g, bx, by, h, hw, op) { const col = "#6f86ad", ax = bx, ay = by - h, w = Math.max(0.5, hw * 0.09);
    el("line", { x1: bx - hw, y1: by, x2: ax, y2: ay, stroke: col, "stroke-width": w, opacity: op }, g);
    el("line", { x1: bx + hw, y1: by, x2: ax, y2: ay, stroke: col, "stroke-width": w, opacity: op }, g);
    [0.14, 0.44, 0.72].forEach(f => { const yy = by - h * f, ww = hw * (1 - f * 0.7); el("line", { x1: bx - ww, y1: yy, x2: bx + ww, y2: yy, stroke: col, "stroke-width": w * 0.8, opacity: op * 0.9 }, g); });
    el("line", { x1: bx - hw, y1: by, x2: bx + hw * 0.55, y2: by - h * 0.44, stroke: col, "stroke-width": w * 0.6, opacity: op * 0.6 }, g);
    el("line", { x1: bx + hw, y1: by, x2: bx - hw * 0.55, y2: by - h * 0.44, stroke: col, "stroke-width": w * 0.6, opacity: op * 0.6 }, g);
    el("line", { x1: bx - hw * 0.95, y1: ay + h * 0.2, x2: bx + hw * 0.95, y2: ay + h * 0.2, stroke: col, "stroke-width": w * 0.8, opacity: op }, g);
  }
  const FLEET_TH = 205;
  function initFleetNodes() {
    const pos = [
      { x: 556, y: 300 }, { x: 610, y: 132 }, { x: 520, y: 368 }, { x: 468, y: 206 }, { x: 600, y: 430 },
      { x: 300, y: 248 }, { x: 250, y: 338 }, { x: 230, y: 250 }, { x: 910, y: 150 }, { x: 900, y: 332 },
      { x: 986, y: 244 }, { x: 982, y: 392 }, { x: 872, y: 452 }, { x: 560, y: 90 }, { x: 300, y: 470 }
    ];
    const seed = { x: 730, y: 300 };
    pos.forEach(n => { n.d = Math.hypot(n.x - seed.x, n.y - seed.y); });
    pos.sort((a, b) => a.d - b.d);
    pos.forEach((n, i) => { const sc = 0.2 + (i % 3) * 0.025; n.h = 160 * sc; n.hw = 30 * sc; n.arY = n.y - n.h * 0.8; n.op = Math.min(0.3, 0.14 + (1 - Math.min(1, n.d / 720)) * 0.16); n.shown = false; });
    fleetNodes = pos;
  }
  function advanceFleet() {
    if (fleetClicks >= 5) return;
    if (!fleetNodes.length) initFleetNodes();
    fleetClicks++; speedMul = Math.min(3, 1 + fleetClicks * 0.42);
    const batch = 3, start = fleetIdx, end = Math.min(fleetNodes.length, start + batch);
    for (let i = start; i < end; i++) { const n = fleetNodes[i]; const tg = el("g", { style: "opacity:0;transition:opacity .5s ease" }, fleet); n.g = tg;
      fleetTower(tg, n.x, n.y, n.h, n.hw, n.op);
      T(() => { tg.style.opacity = 1; }, (i - start) * 70);
      for (let j = 0; j < i; j++) { const a = fleetNodes[j]; if (!a.shown) continue; const d = Math.hypot(a.x - n.x, a.y - n.y);
        if (d < FLEET_TH) { const cg = el("g", { style: "opacity:0;transition:opacity .5s ease" }, fleet);
          el("path", { d: `M ${a.x} ${a.arY} Q ${(a.x + n.x) / 2} ${(a.arY + n.arY) / 2 + d * 0.06} ${n.x} ${n.arY}`, fill: "none", stroke: "#5b8fd6", "stroke-width": 0.8, opacity: 0.15 }, cg);
          el("circle", { cx: n.x, cy: n.arY, r: 1.4, fill: "#7dd3fc", opacity: 0.4 }, cg);
          T(() => { cg.style.opacity = 1; }, (i - start) * 70 + 130); } }
      n.shown = true;
    }
    fleetIdx = end;
    if (twinBtnCap) twinBtnCap.textContent = fleetClicks >= 5 ? "grid maxed ✓" : ("expand · " + fleetClicks + "/5");
    if (fleetClicks >= 5 && twinBtnText) twinBtnText.textContent = "GRID ↑";
  }

  function hudLabel(x, y, txt) { const dx2 = 26;
    const dot = document.createElementNS(NS, "circle"); dot.setAttribute("cx", x); dot.setAttribute("cy", y); dot.setAttribute("r", 2); dot.setAttribute("fill", CY); dot.style.opacity = "0"; dot.style.transition = "opacity .8s"; hud.appendChild(dot);
    const ln = mkLine(hud, x, y, x + dx2, y - 12, CY, 0.8); ln.setAttribute("opacity", 0); ln.style.transition = "opacity .8s";
    const t = document.createElementNS(NS, "text"); t.setAttribute("x", x + dx2 + 3); t.setAttribute("y", y - 14); t.setAttribute("fill", "#0f172a"); t.setAttribute("font-family", "'JetBrains Mono',monospace"); t.setAttribute("font-size", "10"); t.setAttribute("font-weight", "500"); t.textContent = txt; t.style.opacity = "0"; t.style.transition = "opacity .8s"; hud.appendChild(t);
    return { dot, ln, t };
  }
  function hudShow() { hud.querySelectorAll("circle").forEach(e => e.style.opacity = "1"); hud.querySelectorAll("line").forEach(e => e.style.opacity = ".6"); hud.querySelectorAll("text").forEach(e => e.style.opacity = ".9"); }
  function jag(x1, y1, x2, y2, segs, amp) { let pts = `${x1},${y1}`; for (let i = 1; i < segs; i++) { const f = i / segs, mx = x1 + (x2 - x1) * f, my = y1 + (y2 - y1) * f; pts += ` ${mx + rnd(-amp, amp)},${my + rnd(-amp, amp)}`; } return pts + ` ${x2},${y2}`; }
  function energizeConductor(c) { if (c.on) return; c.on = true; c.el.setAttribute("stroke", COND); c.el.setAttribute("filter", GLOW); for (let i = 0; i < 2; i++) { const dot = el("circle", { r: 2.6, fill: CY, filter: GLOWS }, fx); flows.push({ path: c.el, len: c.len, dot, t: Math.random(), sp: rnd(0.0014, 0.0022) }); } }
  function particlesInit() { for (let i = 0; i < 13; i++) { const r = rnd(0.6, 1.5); const p = el("circle", { r, fill: Math.random() < 0.5 ? CY : "#60a5fa", opacity: rnd(0.1, 0.32) }, fx); particles.push({ el: p, x: rnd(cx - 220, cx + 220), y: rnd(80, 520), vx: rnd(-0.1, 0.1), vy: rnd(-0.26, -0.05), r }); } }

  function build() {
    const ground = mkLine(world, 0, 524, 1040, 524, "#cbd5e1", 2); ground.setAttribute("stroke-dasharray", 1040); ground.setAttribute("stroke-dashoffset", 1040); ground.style.transition = "stroke-dashoffset .5s ease"; draws.push({ seg: { el: ground }, t: 0 });
    [cx - lv[0].hw, cx + lv[0].hw].forEach(x => { schedDraw(member(x - 12, 524, x + 12, 524, 5), 20); schedDraw(member(x, 524, x, 505, 4), 20); });
    TT = 180;
    for (let i = 0; i < lv.length - 1; i++) { const a = lv[i], b = lv[i + 1];
      schedDraw(member(cx - a.hw, a.y, cx - b.hw, b.y, 2.4), 58);
      schedDraw(member(cx + a.hw, a.y, cx + b.hw, b.y, 2.4), 58);
      schedDraw(member(cx - a.hw, a.y, cx + a.hw, a.y, 1.7), 38);
      schedDraw(member(cx - a.hw, a.y, cx + b.hw, b.y, 1.3), 28);
      schedDraw(member(cx + a.hw, a.y, cx - b.hw, b.y, 1.3), 86); }
    const w = lv[lv.length - 1]; schedDraw(member(cx - w.hw, w.y, cx + w.hw, w.y, 1.7), 58);
    const headTopHw = 11, midY = (w.y + apex.y) / 2, midHw = (w.hw + headTopHw) / 2;
    schedDraw(member(cx - w.hw, w.y, cx - midHw, midY, 2.2), 48);
    schedDraw(member(cx + w.hw, w.y, cx + midHw, midY, 2.2), 48);
    schedDraw(member(cx - midHw, midY, cx + midHw, midY, 1.5), 38);
    schedDraw(member(cx - w.hw, w.y, cx + midHw, midY, 1.1), 28);
    schedDraw(member(cx + w.hw, w.y, cx - midHw, midY, 1.1), 38);
    schedDraw(member(cx - midHw, midY, apex.x, apex.y, 2.2), 48);
    schedDraw(member(cx + midHw, midY, apex.x, apex.y, 2.2), 58);
    const armAttachHw = [w.hw, (w.hw + midHw) / 2, midHw];
    arms.forEach((arm, k) => { const ah = armAttachHw[k] || midHw;
      schedDraw(member(cx - ah, arm.y, cx - arm.len, arm.y, 2), 44);
      schedDraw(member(cx + ah, arm.y, cx + arm.len, arm.y, 2), 44);
      schedDraw(member(cx - ah, arm.y - 22, cx - arm.len, arm.y, 1.2), 28);
      schedDraw(member(cx + ah, arm.y - 22, cx + arm.len, arm.y, 1.2), 48); });
    schedPop(disc(world, apex.x, apex.y - 2, 2.5, STEEL_DK), 40);

    const attach = [];
    arms.forEach(arm => { [[cx - arm.len, -1], [cx + arm.len, 1]].forEach(([tx, side]) => {
      schedDraw(member(tx, arm.y, tx, arm.y + 22, 1.4), 26);
      for (let d = 0; d < 3; d++) schedPop(disc(world, tx, arm.y + 8 + d * 6, 2.4, INSUL_GREY, true), 18);
      attach.push({ x: tx, y: arm.y + 24, side }); }); });

    TT += 60;
    [dx - dlv[0].hw, dx + dlv[0].hw].forEach(x => { schedDraw(member(x - 7, 500, x + 7, 500, 3.2), 12); schedDraw(member(x, 500, x, 488, 2.6), 12); });
    for (let i = 0; i < dlv.length - 1; i++) { const a = dlv[i], b = dlv[i + 1];
      schedDraw(member(dx - a.hw, a.y, dx - b.hw, b.y, 1.7), 26);
      schedDraw(member(dx + a.hw, a.y, dx + b.hw, b.y, 1.7), 26);
      schedDraw(member(dx - a.hw, a.y, dx + a.hw, a.y, 1.2), 16);
      schedDraw(member(dx - a.hw, a.y, dx + b.hw, b.y, 0.9), 12);
      schedDraw(member(dx + a.hw, a.y, dx - b.hw, b.y, 0.9), 20); }
    const sw = dlv[dlv.length - 1]; schedDraw(member(dx - sw.hw, sw.y, dx + sw.hw, sw.y, 1.2), 20);
    const sMidY = (sw.y + dapex.y) / 2, sMidHw = (sw.hw + 7) / 2;
    schedDraw(member(dx - sw.hw, sw.y, dx - sMidHw, sMidY, 1.5), 18);
    schedDraw(member(dx + sw.hw, sw.y, dx + sMidHw, sMidY, 1.5), 18);
    schedDraw(member(dx - sMidHw, sMidY, dx + sMidHw, sMidY, 1), 14);
    schedDraw(member(dx - sw.hw, sw.y, dx + sMidHw, sMidY, 0.8), 12);
    schedDraw(member(dx + sw.hw, sw.y, dx - sMidHw, sMidY, 0.8), 14);
    schedDraw(member(dx - sMidHw, sMidY, dapex.x, dapex.y, 1.5), 18);
    schedDraw(member(dx + sMidHw, sMidY, dapex.x, dapex.y, 1.5), 22);
    schedPop(disc(world, dapex.x, dapex.y - 2, 2, STEEL_DK), 20);
    const dattach = [], sArmHw = [sw.hw, sMidHw];
    darms.forEach((arm, k) => { const ah = sArmHw[k] || sMidHw;
      schedDraw(member(dx - ah, arm.y, dx - arm.len, arm.y, 1.5), 18);
      schedDraw(member(dx + ah, arm.y, dx + arm.len, arm.y, 1.5), 18);
      schedDraw(member(dx - ah, arm.y - 14, dx - arm.len, arm.y, 1), 12);
      schedDraw(member(dx + ah, arm.y - 14, dx + arm.len, arm.y, 1), 16);
      [[dx - arm.len, -1], [dx + arm.len, 1]].forEach(([tx, side]) => {
        schedDraw(member(tx, arm.y, tx, arm.y + 12, 1.1), 12);
        for (let d = 0; d < 2; d++) schedPop(disc(world, tx, arm.y + 5 + d * 5, 1.8, INSUL_GREY, true), 12);
        dattach.push({ x: tx, y: arm.y + 13, side }); }); });

    TT += 110;
    const leftPts = attach.filter(a => a.side < 0), rightPts = attach.filter(a => a.side > 0);
    const dRight = dattach.filter(a => a.side > 0); dRight.push({ x: dapex.x, y: dapex.y + 16 });
    leftPts.forEach((p, i) => { const tgt = dRight[i] || dRight[dRight.length - 1]; const seg = conductor(p.x, p.y, tgt.x, tgt.y, 46 + i * 6); schedDraw(seg, 66); });
    rightPts.forEach((p, i) => { const seg = conductor(p.x, p.y, 1040, p.y + 40 + i * 10, 70 + i * 8); schedDraw(seg, 66); });

    const sensorPts = [{ x: cx, y: apex.y, big: 1 }, { x: cx - arms[0].len, y: arms[0].y + 24 }, { x: cx + arms[1].len, y: arms[1].y + 24 }, { x: cx, y: lv[3].y }, { x: dx, y: dapex.y }];
    sensorPts.forEach((s, i) => { const ring = el("circle", { cx: s.x, cy: s.y, fill: "none", stroke: CY, "stroke-width": 1.2, opacity: 0 }, fx);
      const c = el("circle", { cx: s.x, cy: s.y, r: 0, fill: CY, filter: GLOWS }, fx);
      sensors.push({ x: s.x, y: s.y, ring, core: c, r: s.big ? 3.2 : 2.4, ph: i * 1.3, on: false }); });

    for (let i = 0; i < 3; i++) { const pl = el("polyline", { fill: "none", stroke: "#aef3ff", "stroke-width": 1.1, opacity: 0, filter: GLOWS }, bolts); crackleEls.push(pl); }
    sboltEl = el("polyline", { fill: "none", stroke: CY, "stroke-width": 1.3, opacity: 0, filter: GLOW }, bolts);

    hudLabel(cx + arms[2].len - 2, arms[2].y - 6, "500 kV");
    loadEl = hudLabel(cx + lv[3].hw + 6, lv[3].y, "LOAD 82%");
    buildTwinScreen();

    if (reduceMotion) {
      if (grid) grid.style.opacity = "1";
      draws.forEach(d => d.seg.el.setAttribute("stroke-dashoffset", 0));
      pops.forEach(p => p.el.setAttribute("r", p.el.dataset.r));
      steelEls.forEach(s => s.el.setAttribute("stroke", STEEL));
      insulEls.forEach(s => s.el.setAttribute("fill", INSUL));
      conductors.forEach(c => { c.on = true; c.el.setAttribute("stroke", COND); });
      sensors.forEach(s => { s.on = true; s.core.setAttribute("r", s.r); });
      if (reveal) reveal.classList.add("is-revealed");
      twin.style.opacity = "0.45"; hudShow();
      return;
    }

    const sf = 0.66; // build-speed factor (<1 = faster on-load construction)
    T(() => { if (grid) grid.style.opacity = "1"; if (statusEl) statusEl.classList.add("is-on"); }, 120);
    draws.forEach(d => T(() => d.seg.el.setAttribute("stroke-dashoffset", 0), 150 + d.t * sf));
    pops.forEach(p => T(() => p.el.setAttribute("r", p.el.dataset.r), 150 + p.t * sf));
    const total = 150 + TT * sf;
    const phases = ["surveying site", "raising lattice", "mounting cross-arms", "hanging insulators", "stringing conductors", "syncing digital twin"];
    let pp = 0; const iv = setInterval(() => { pp = Math.min(100, pp + Math.ceil(rnd(2, 8))); if (statusPct) statusPct.textContent = pp + "%"; if (statusText) statusText.textContent = phases[Math.min(phases.length - 1, Math.floor(pp / 100 * phases.length))]; if (pp >= 100) clearInterval(iv); }, Math.max(55, total / 48)); timers.push(iv);
    T(() => { particlesInit(); scanning = true; scanX = -160; scanBand.setAttribute("opacity", 1); scanLine.setAttribute("opacity", 0.7); startLoop(); }, total + 120);
    T(() => { if (statusEl) statusEl.classList.remove("is-on"); }, total + 260);
  }

  function loop() {
    tick++; const m = mouse;
    if (scanning) {
      scanX += 8; scanBand.setAttribute("x", scanX - 60); scanLine.setAttribute("x1", scanX); scanLine.setAttribute("x2", scanX);
      steelEls.forEach(s => { if (s.mx <= scanX) s.el.setAttribute("stroke", s.mx > scanX - 44 ? CY : STEEL); });
      insulEls.forEach(s => { if (s.mx <= scanX) s.el.setAttribute("fill", INSUL); });
      conductors.forEach(c => { if (c.mx <= scanX) energizeConductor(c); });
      sensors.forEach(s => { if (s.x <= scanX && !s.on) { s.on = true; s.core.setAttribute("r", s.r); } });
      if (scanX > 1230) { scanning = false; scanDone = true; energized = true; scanLine.setAttribute("opacity", 0); scanBand.setAttribute("opacity", 0);
        steelEls.forEach(s => s.el.setAttribute("stroke", STEEL)); if (reveal) reveal.classList.add("is-revealed"); hudShow(); twin.style.opacity = "0.45"; }
    }
    const boost = (1 + surge * 2.4) * speedMul;
    flows.forEach(f => { f.t += f.sp * boost; if (f.t > 1) f.t -= 1; const pt = f.path.getPointAtLength(f.t * f.len); f.dot.setAttribute("cx", pt.x); f.dot.setAttribute("cy", pt.y); f.dot.setAttribute("r", 2.6 + surge * 2.2); });
    if (surge > 0.01) { conductors.forEach(c => { if (c.on) { c.el.setAttribute("stroke", surge > 0.5 ? CY : COND); c.el.setAttribute("stroke-width", 1.7 + surge * 1.6); } }); surge *= 0.945; }
    else if (scanDone) conductors.forEach(c => { if (c.on) c.el.setAttribute("stroke-width", 1.7); });
    particles.forEach(p => { p.x += p.vx; p.y += p.vy; if (m.on) { const dx3 = p.x - m.x, dy3 = p.y - m.y, d = Math.hypot(dx3, dy3); if (d < 90 && d > 0) { const force = (90 - d) / 90 * 1.4; p.x += dx3 / d * force; p.y += dy3 / d * force; } } if (p.y < 70) { p.y = 520; p.x = rnd(cx - 220, cx + 220); } if (p.x < cx - 260) p.x = cx + 260; if (p.x > cx + 260) p.x = cx - 260; p.el.setAttribute("cx", p.x); p.el.setAttribute("cy", p.y); });
    sensors.forEach(s => { if (!s.on) return; const pr = 4 + Math.sin(tick * 0.05 + s.ph) * 2.5 + (m.on && Math.hypot(s.x - m.x, s.y - m.y) < 120 ? 3 : 0); s.ring.setAttribute("r", pr); s.ring.setAttribute("opacity", 0.5 - (pr - 4) / 14); });
    for (let i = 0; i < 3; i++) { const pl = crackleEls[i]; if (m.on && scanDone) { const ang = rnd(0, Math.PI * 2), len = rnd(16, 40); pl.setAttribute("points", jag(m.x, m.y, m.x + Math.cos(ang) * len, m.y + Math.sin(ang) * len, 4, 5)); pl.setAttribute("opacity", rnd(0.4, 0.9)); } else pl.setAttribute("opacity", 0); }
    if (sboltEl) { let near = null, nd = 130; sensors.forEach(s => { if (!s.on) return; const d = Math.hypot(s.x - m.x, s.y - m.y); if (d < nd) { nd = d; near = s; } }); if (m.on && near && scanDone) { sboltEl.setAttribute("points", jag(m.x, m.y, near.x, near.y, 6, 7)); sboltEl.setAttribute("opacity", rnd(0.5, 0.95)); near.core.setAttribute("r", 4.5); } else sboltEl.setAttribute("opacity", 0); }
    for (let i = rings.length - 1; i >= 0; i--) { const r = rings[i]; r.rad += r.spd; r.el.setAttribute("r", r.rad); r.el.setAttribute("opacity", Math.max(0, r.life)); r.life -= 0.02; if (r.life <= 0) { r.el.remove(); rings.splice(i, 1); } }
    if (energized && tick % 70 === 0 && conductors.length) { const c = conductors[Math.floor(Math.random() * conductors.length)]; if (c.on) { const dot = el("circle", { r: 3.4, fill: "#bdf5ff", filter: GLOW }, fx); packets.push({ path: c.el, len: c.len, dot, t: 0, sp: 0.006 }); } }
    for (let i = packets.length - 1; i >= 0; i--) { const p = packets[i]; p.t += p.sp; if (p.t >= 1) { p.dot.remove(); packets.splice(i, 1); continue; } const pt = p.path.getPointAtLength(p.t * p.len); p.dot.setAttribute("cx", pt.x); p.dot.setAttribute("cy", pt.y); }
    if (loadEl && scanDone && tick % 30 === 0) loadEl.t.textContent = "LOAD " + Math.round(78 + Math.sin(tick * 0.01) * 6) + "%";
    if (scanDone) { const hov = m.on && m.x >= TWIN_BOX.x && m.x <= TWIN_BOX.x + TWIN_BOX.w && m.y >= TWIN_BOX.y && m.y <= TWIN_BOX.y + TWIN_BOX.h; twin.style.opacity = hov ? "0.95" : "0.42"; }
    if (running) raf = requestAnimationFrame(loop);
  }
  function startLoop() { if (running) return; running = true; loop(); }
  function stopLoop() { running = false; if (raf) cancelAnimationFrame(raf); }

  const TWIN_BOX = { x: 250, y: 404, w: 300, h: 92 };
  const BTN_BOX = { x: 446, y: 437, w: 90, h: 26 };
  function toVB(clientX, clientY) { const mm = svg.getScreenCTM(); if (!mm) return null; const p = svg.createSVGPoint(); p.x = clientX; p.y = clientY; return p.matrixTransform(mm.inverse()); }

  section.addEventListener("pointermove", e => {
    const r = section.getBoundingClientRect(); const v = toVB(e.clientX, e.clientY); if (v) { mouse.x = v.x; mouse.y = v.y; } mouse.on = true;
    if (world) world.style.transform = `translate(${-((mouse.x / VW) - 0.5) * 14}px,${-((mouse.y / VH) - 0.5) * 10}px)`;
    if (clight) { clight.style.opacity = "1"; clight.style.left = (e.clientX - r.left) + "px"; clight.style.top = (e.clientY - r.top) + "px"; }
    if (core) { core.style.opacity = "1"; core.style.left = (e.clientX - r.left) + "px"; core.style.top = (e.clientY - r.top) + "px"; }
  });
  section.addEventListener("pointerleave", () => { mouse.on = false; mouse.x = mouse.y = -9999; if (world) world.style.transform = ""; if (clight) clight.style.opacity = "0"; if (core) core.style.opacity = "0"; });
  section.addEventListener("pointerdown", e => {
    if (!energized) return; if (e.target.closest("a,button")) return;
    const v = toVB(e.clientX, e.clientY); if (!v) return; const mx = v.x, my = v.y;
    if (scanDone && mx >= BTN_BOX.x && mx <= BTN_BOX.x + BTN_BOX.w && my >= BTN_BOX.y && my <= BTN_BOX.y + BTN_BOX.h) { advanceFleet(); flashBtn(); return; }
    surge = 1;
    for (let k = 0; k < 2; k++) { const c = el("circle", { cx: mx, cy: my, fill: "none", stroke: CY, "stroke-width": 2 - k * 0.6, filter: GLOW }, fx); rings.push({ el: c, rad: 4 + k * 8, spd: 6 - k * 1.5, life: 1 }); }
  });
  if (world) world.style.transition = "transform .25s ease-out";

  // pause the perpetual loop while the hero is scrolled off-screen (saves battery)
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { if (energized || scanning) startLoop(); } else stopLoop(); }); }, { threshold: 0 });
    io.observe(section);
  }

  build();
})();

// Pillar card cursor glow (reuses .interactive-glow --x/--y vars)
document.querySelectorAll(".pillar-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const glow = card.querySelector(".interactive-glow");
    if (!glow) return;
    glow.style.setProperty("--x", (e.clientX - rect.left) + "px");
    glow.style.setProperty("--y", (e.clientY - rect.top) + "px");
  });
});
