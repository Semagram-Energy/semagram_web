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
        link.classList.remove("active", "bg-gradient-to-r", "from-accent", "to-accent-deep", "text-white", "shadow-lg");
        link.classList.add("border", "border-border-color", "bg-background-dark", "text-primary", "hover:bg-background-dark/80");
        link.ariaSelected = false;
      });

      activeLink.classList.remove("border", "border-border-color", "bg-background-dark", "text-primary", "hover:bg-background-dark/80");
      activeLink.classList.add("active", "bg-gradient-to-r", "from-accent", "to-accent-deep", "text-white", "shadow-lg");
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
    fleet = section.querySelector("[data-hero-fleet]"),
    fx = section.querySelector("[data-hero-fx]"),
    hud = section.querySelector("[data-hero-hud]"),
    bolts = section.querySelector("[data-hero-bolts]"),
    grid = section.querySelector("[data-hero-grid]"),
    clight = document.querySelector("[data-hero-clight]"),
    core = document.querySelector("[data-hero-core]"),
    reveal = section.querySelector("[data-hero-reveal]"),
    statusEl = section.querySelector("[data-hero-status]"),
    statusText = section.querySelector("[data-hero-status-text]"),
    statusPct = section.querySelector("[data-hero-status-pct]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const STEEL_GREY = "#9aa3b2", STEEL = "#3f4f6b", STEEL_DK = "#1e293b",
    COND_GREY = "#aeb6c2", COND = "#2663EB", INSUL_GREY = "#aeb6c2", INSUL = "#64748b", CY = "#7CA1F4";

  let timers = [], raf = null, running = false;
  let steelEls = [], conductors = [], insulEls = [], currentPaths = [], particles = [], sensors = [], rings = [], packets = [];
  let crackleEls = [], sboltEl = null;
  let mouse = { x: -9999, y: -9999, on: false }, surge = 0, tick = 0;
  let scanDone = false, energized = false, loadEl = null;
  let fleetNodes = [], fleetEdges = [], fleetOrder = [], fleetIdx = 0, fleetClicks = 0, speedMul = 1;

  const T = (fn, ms) => { timers.push(setTimeout(fn, ms)); };
  const rnd = (a, b) => a + Math.random() * (b - a);
  function el(tag, attrs, parent) { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; }
  function mkLine(parent, x1, y1, x2, y2, color, w) { const l = document.createElementNS(NS, "line"); l.setAttribute("x1", x1); l.setAttribute("y1", y1); l.setAttribute("x2", x2); l.setAttribute("y2", y2); l.setAttribute("stroke", color); l.setAttribute("stroke-width", w); l.setAttribute("stroke-linecap", "round"); parent.appendChild(l); return l; }
  function member(x1, y1, x2, y2, w) { const l = mkLine(world, x1, y1, x2, y2, STEEL_GREY, w); const len = Math.hypot(x2 - x1, y2 - y1); l.setAttribute("stroke-dasharray", len); l.setAttribute("stroke-dashoffset", len); l.style.transition = "stroke-dashoffset .28s ease, stroke .7s ease"; steelEls.push({ el: l, mx: (x1 + x2) / 2 }); return { el: l }; }
  function conductor(x1, y1, x2, y2, sag) { const mx = (x1 + x2) / 2, my = Math.max(y1, y2) + sag; const p = document.createElementNS(NS, "path"); p.setAttribute("d", `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`); p.setAttribute("fill", "none"); p.setAttribute("stroke", COND_GREY); p.setAttribute("stroke-width", 1.7); p.setAttribute("stroke-linecap", "round"); world.appendChild(p); const len = p.getTotalLength(); p.setAttribute("stroke-dasharray", len); p.setAttribute("stroke-dashoffset", len); p.style.transition = "stroke-dashoffset .55s ease, stroke .7s ease"; const o = { el: p, len, mx: (x1 + x2) / 2, on: false }; conductors.push(o); return o; }
  function disc(parent, cx2, cy2, r, fill, reg) { const c = document.createElementNS(NS, "circle"); c.setAttribute("cx", cx2); c.setAttribute("cy", cy2); c.setAttribute("r", 0); c.setAttribute("fill", fill); c.dataset.r = r; c.style.transition = "r .3s cubic-bezier(.34,1.56,.64,1)"; parent.appendChild(c); if (reg) insulEls.push({ el: c, mx: cx2 }); return c; }

  const cx = 730;
  const lv = [{ y: 512, hw: 74 }, { y: 446, hw: 62 }, { y: 384, hw: 51 }, { y: 330, hw: 42 }, { y: 286, hw: 34 }, { y: 250, hw: 27 }];
  const arms = [{ y: 236, len: 118 }, { y: 198, len: 98 }, { y: 162, len: 78 }];
  const apex = { x: cx, y: 96 };
  const dx = 150, dlv = [{ y: 500, hw: 42 }, { y: 458, hw: 34 }, { y: 422, hw: 28 }, { y: 392, hw: 23 }, { y: 366, hw: 19 }], dapex = { x: dx, y: 300 };
  const darms = [{ y: 356, len: 58 }, { y: 334, len: 47 }, { y: 312, len: 36 }];

  const draws = [], pops = []; let TT = 0;
  function schedDraw(seg, dt) { draws.push({ seg, t: TT }); TT += dt; }
  function schedPop(e2, dt) { pops.push({ el: e2, t: TT }); TT += dt; }


  // a lattice transmission tower: tapered legs, X-braced body bays, two cross-arms with insulators
  function fleetTower(g, bx, by, h, hw, op) {
    const col = "#6c83a8", w = Math.max(0.6, h * 0.016), ay = by - h, bodyTop = by - h * 0.7, topHw = hw * 0.34;
    el("line", { x1: bx - hw, y1: by, x2: bx - topHw, y2: bodyTop, stroke: col, "stroke-width": w, opacity: op }, g);
    el("line", { x1: bx + hw, y1: by, x2: bx + topHw, y2: bodyTop, stroke: col, "stroke-width": w, opacity: op }, g);
    const bays = 4; let py = by, pw = hw;
    for (let k = 1; k <= bays; k++) {
      const f = k / bays, yy = by - (by - bodyTop) * f, ww = hw + (topHw - hw) * f;
      el("line", { x1: bx - ww, y1: yy, x2: bx + ww, y2: yy, stroke: col, "stroke-width": w * 0.8, opacity: op * 0.92 }, g);
      el("line", { x1: bx - pw, y1: py, x2: bx + ww, y2: yy, stroke: col, "stroke-width": w * 0.55, opacity: op * 0.7 }, g);
      el("line", { x1: bx + pw, y1: py, x2: bx - ww, y2: yy, stroke: col, "stroke-width": w * 0.55, opacity: op * 0.7 }, g);
      py = yy; pw = ww;
    }
    el("line", { x1: bx - topHw, y1: bodyTop, x2: bx, y2: ay, stroke: col, "stroke-width": w, opacity: op }, g);
    el("line", { x1: bx + topHw, y1: bodyTop, x2: bx, y2: ay, stroke: col, "stroke-width": w, opacity: op }, g);
    [[0.82, 1.4], [0.66, 1.05]].forEach(([af, awf]) => {
      const ya = by - h * af, aw = hw * awf;
      el("line", { x1: bx - aw, y1: ya, x2: bx + aw, y2: ya, stroke: col, "stroke-width": w * 0.8, opacity: op }, g);
      [-aw, -aw * 0.5, aw * 0.5, aw].forEach(dx => el("line", { x1: bx + dx, y1: ya, x2: bx + dx, y2: ya + h * 0.05, stroke: col, "stroke-width": w * 0.55, opacity: op * 0.8 }, g));
    });
  }
  const FLEET_COL = "#6c83a8", FLEET_FILL = "#e9f0fb", FLEET_FEED = "#2663EB";
  // a datacenter / compute load — a microchip: square package with pins on all four sides, an
  // inner die and a glowing core. y is the base; the top riser tip is the bus point.
  function fleetChip(g, x, y, s, op) {
    const body = Math.min(0.66, op * 1.9), x0 = x - s / 2, y0 = y - s, pin = s * 0.16;
    [0.28, 0.5, 0.72].forEach(f => {
      const px = x0 + s * f, py = y0 + s * f;
      el("line", { x1: x0 - pin, y1: py, x2: x0, y2: py, stroke: FLEET_COL, "stroke-width": 0.55, opacity: op }, g);
      el("line", { x1: x0 + s, y1: py, x2: x0 + s + pin, y2: py, stroke: FLEET_COL, "stroke-width": 0.55, opacity: op }, g);
      el("line", { x1: px, y1: y0 - pin, x2: px, y2: y0, stroke: FLEET_COL, "stroke-width": 0.55, opacity: op }, g);
      el("line", { x1: px, y1: y0 + s, x2: px, y2: y0 + s + pin, stroke: FLEET_COL, "stroke-width": 0.55, opacity: op }, g);
    });
    el("rect", { x: x0, y: y0, width: s, height: s, rx: s * 0.12, fill: FLEET_FILL, "fill-opacity": op * 0.85, stroke: FLEET_COL, "stroke-width": 0.9, opacity: body }, g);
    const ds = s * 0.5, dx = x - ds / 2, dy = y0 + (s - ds) / 2;
    el("rect", { x: dx, y: dy, width: ds, height: ds, rx: ds * 0.14, fill: "none", stroke: FLEET_COL, "stroke-width": 0.6, opacity: op * 1.1 }, g);
    el("circle", { cx: x, cy: y0 + s / 2, r: 1.5, fill: "#7CA1F4", opacity: Math.min(0.85, op * 2.8) }, g);
    el("line", { x1: x, y1: y0 - pin, x2: x, y2: y0 - pin - 5, stroke: FLEET_COL, "stroke-width": 0.85, opacity: op }, g);
  }
  // a factory load — a hall with a north-light (sawtooth) roof, windows and a smoking chimney
  function fleetFactory(g, x, y, w, op) {
    const h = w * 0.58, x0 = x - w / 2, y0 = y - h, teeth = 3, tw = w / teeth, rh = tw * 0.55, body = Math.min(0.66, op * 1.9);
    el("rect", { x: x0, y: y0, width: w, height: h, rx: 1.1, fill: FLEET_FILL, "fill-opacity": op * 0.85, stroke: FLEET_COL, "stroke-width": 0.85, opacity: body }, g);
    let d = `M ${x0} ${y0}`; for (let i = 0; i < teeth; i++) { const sx = x0 + i * tw; d += ` L ${sx} ${y0 - rh} L ${sx + tw} ${y0}`; }
    el("path", { d, fill: "none", stroke: FLEET_COL, "stroke-width": 0.75, opacity: op }, g);
    const ws = w * 0.13; [0.14, 0.42, 0.7].forEach(f => el("rect", { x: x0 + w * f, y: y0 + h * 0.5, width: ws, height: ws, fill: "none", stroke: FLEET_COL, "stroke-width": 0.45, opacity: op * 0.8 }, g));
    const cw = w * 0.14, cx0 = x0 + w * 0.06, ch = h * 0.7, ctop = y0 - rh - ch;
    el("rect", { x: cx0, y: ctop, width: cw, height: y0 - ctop, fill: FLEET_FILL, "fill-opacity": op * 0.7, stroke: FLEET_COL, "stroke-width": 0.75, opacity: Math.min(0.6, op * 1.8) }, g);
    el("circle", { cx: cx0 + cw / 2, cy: ctop - 2.6, r: 1.3, fill: "#aebbcf", opacity: op * 1.3 }, g);
    el("line", { x1: x, y1: y0 - rh, x2: x, y2: y0 - rh - 5, stroke: FLEET_COL, "stroke-width": 0.8, opacity: op }, g);
  }
  // a city / urban load — a small skyline of buildings, tallest in the centre (feeder lands there)
  function fleetCity(g, x, y, w, op) {
    const body = Math.min(0.66, op * 1.9), x0 = x - w / 2, bw = w / 3, hs = [0.6, 0.95, 0.72];
    hs.forEach((hf, i) => {
      const bh = w * hf, bx0 = x0 + i * bw, by0 = y - bh, bwi = bw * 0.86;
      el("rect", { x: bx0, y: by0, width: bwi, height: bh, fill: FLEET_FILL, "fill-opacity": op * 0.82, stroke: FLEET_COL, "stroke-width": 0.8, opacity: body }, g);
      for (let r = 0; r < 3; r++) for (let c = 0; c < 2; c++) {
        const wy = by0 + bh * (0.2 + r * 0.26);
        if (wy < y - 2) el("circle", { cx: bx0 + bwi * (0.3 + c * 0.42), cy: wy, r: 0.7, fill: FLEET_COL, opacity: op * 0.8 }, g);
      }
    });
    el("circle", { cx: x0 + bw * 1.3, cy: y - w * 0.82, r: 0.9, fill: "#7CA1F4", opacity: Math.min(0.7, op * 2.2) }, g);
    const peakY = y - w * 0.95;
    el("line", { x1: x, y1: peakY, x2: x, y2: peakY - 5, stroke: FLEET_COL, "stroke-width": 0.85, opacity: op }, g);
  }
  // an EV-charging hub — a charger pylon with a screen, a lightning glyph and a plug cable
  function fleetEV(g, x, y, w, op) {
    const body = Math.min(0.66, op * 1.9), pw = w * 0.66, ph = w * 1.3, x0 = x - pw / 2, y0 = y - ph;
    el("line", { x1: x - pw * 0.75, y1: y, x2: x + pw * 0.75, y2: y, stroke: FLEET_COL, "stroke-width": 1, opacity: op }, g);
    el("rect", { x: x0, y: y0, width: pw, height: ph, rx: pw * 0.3, fill: FLEET_FILL, "fill-opacity": op * 0.85, stroke: FLEET_COL, "stroke-width": 0.85, opacity: body }, g);
    el("rect", { x: x0 + pw * 0.2, y: y0 + ph * 0.12, width: pw * 0.6, height: ph * 0.2, rx: 1, fill: "none", stroke: FLEET_COL, "stroke-width": 0.5, opacity: op * 0.9 }, g);
    const cy = y0 + ph * 0.62, bw = pw * 0.34, bh = ph * 0.3;
    el("path", { d: `M ${x + bw * 0.15} ${cy - bh / 2} L ${x - bw * 0.45} ${cy + bh * 0.1} L ${x} ${cy + bh * 0.05} L ${x - bw * 0.15} ${cy + bh / 2} L ${x + bw * 0.45} ${cy - bh * 0.1} L ${x} ${cy - bh * 0.05} Z`, fill: "#7CA1F4", opacity: Math.min(0.85, op * 2.6) }, g);
    el("path", { d: `M ${x0 + pw} ${y0 + ph * 0.3} q ${pw * 0.7} ${ph * 0.1} ${pw * 0.5} ${ph * 0.5}`, fill: "none", stroke: FLEET_COL, "stroke-width": 0.6, opacity: op * 0.85 }, g);
    el("line", { x1: x, y1: y0, x2: x, y2: y0 - 5, stroke: FLEET_COL, "stroke-width": 0.85, opacity: op }, g);
  }
  // a gas generator (genset) — an enclosure with a generator symbol (circle + IEC sine wave),
  // a radiator and an exhaust stack with a gas puff. r sets the scale; the riser tip is the bus.
  function fleetGen(g, x, y, r, op) {
    const body = Math.min(0.66, op * 1.9), w = r * 2.6, h = r * 1.7, x0 = x - w / 2, y0 = y - h;
    el("line", { x1: x0 - 1.5, y1: y, x2: x0 + w + 1.5, y2: y, stroke: FLEET_COL, "stroke-width": 1, opacity: op }, g);
    el("rect", { x: x0, y: y0, width: w, height: h, rx: r * 0.28, fill: FLEET_FILL, "fill-opacity": op * 0.82, stroke: FLEET_COL, "stroke-width": 0.85, opacity: body }, g);
    const gcx = x0 + h * 0.52, gcy = y0 + h * 0.52, gr = h * 0.3;
    el("circle", { cx: gcx, cy: gcy, r: gr, fill: "none", stroke: FLEET_COL, "stroke-width": 0.65, opacity: op * 1.25 }, g);
    el("path", { d: `M ${gcx - gr * 0.62} ${gcy} Q ${gcx - gr * 0.31} ${gcy - gr * 0.6} ${gcx} ${gcy} T ${gcx + gr * 0.62} ${gcy}`, fill: "none", stroke: FLEET_COL, "stroke-width": 0.55, opacity: op * 1.25 }, g);
    [0.58, 0.72, 0.86].forEach(f => el("line", { x1: x0 + w * f, y1: y0 + h * 0.3, x2: x0 + w * f, y2: y0 + h * 0.7, stroke: FLEET_COL, "stroke-width": 0.45, opacity: op * 0.85 }, g));
    const sx = x0 + w * 0.8, stop = y0 - h * 0.55;
    el("rect", { x: sx - r * 0.15, y: stop, width: r * 0.3, height: y0 - stop, fill: FLEET_FILL, "fill-opacity": op * 0.7, stroke: FLEET_COL, "stroke-width": 0.6, opacity: body }, g);
    el("circle", { cx: sx, cy: stop - 2.4, r: 1.3, fill: "#aebbcf", opacity: op * 1.3 }, g);
    el("line", { x1: x, y1: y0, x2: x, y2: y0 - 5, stroke: FLEET_COL, "stroke-width": 0.85, opacity: op }, g);
  }
  // a sagging conductor span between two bus points (catenary-ish), with a bus dot at the far end
  function fleetSpan(g, ax, ay, bx, by, feed, op) {
    const d = Math.hypot(bx - ax, by - ay), mx = (ax + bx) / 2, my = (ay + by) / 2 + d * 0.12;
    el("path", { d: `M ${ax} ${ay} Q ${mx} ${my} ${bx} ${by}`, fill: "none", stroke: feed ? FLEET_FEED : FLEET_COL, "stroke-width": feed ? 0.9 : 0.75, opacity: feed ? op + 0.06 : op }, g);
    el("circle", { cx: bx, cy: by, r: 1.4, fill: "#BFD2FA", opacity: Math.min(0.55, op + 0.22) }, g);
  }
  const FLEET_BATCH = 4, FLEET_MAX_CLICKS = 12;
  const SEED_BUS = { x: 720, y: 300 }; // the main tower ties into the mesh as a source node
  function loadSize(n) {
    const v = n.idx % 2;
    if (n.type === "dc") { n.w = 22 + v * 5; n.by = n.y - n.w - n.w * 0.16 - 5; }
    else if (n.type === "factory") { n.w = 27 + v * 5; const h = n.w * 0.58, rh = (n.w / 3) * 0.55; n.by = n.y - h - rh - 5; }
    else if (n.type === "city") { n.w = 30 + v * 6; n.by = n.y - n.w * 0.95 - 5; }
    else { n.w = 17 + v * 3; n.by = n.y - n.w * 1.3 - 5; } // ev
  }
  // Build a MESHED transmission grid: a scatter of backbone nodes cross-tied to their nearest
  // neighbours (forming loops / redundant paths — not a star), with the main tower wired into
  // the mesh, and loads hung off as radial feeder spurs. Deterministic RNG -> stable layout.
  function buildFleetGraph() {
    let s = 20260605; const R = () => (s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
    const B = { x0: 16, y0: 84, x1: 1024, y1: 508 };
    const inB = (x, y) => x > B.x0 && x < B.x1 && y > B.y0 && y < B.y1;
    const nodes = [], edges = [], back = [];
    // 1) backbone scatter on a jittered grid spanning the whole width (incl. the left)
    const xs = [70, 210, 350, 500, 650, 800, 920, 1000], ys = [120, 250, 380, 480];
    for (let yi = 0; yi < ys.length; yi++) for (let xi = 0; xi < xs.length; xi++) {
      const x = xs[xi] + (R() - 0.5) * 78, y = ys[yi] + (R() - 0.5) * 66;
      if (!inB(x, y)) continue;
      const n = { x, y, role: "back", deg: 0, idx: nodes.length };
      nodes.push(n); back.push(n);
    }
    const key = (a, b) => Math.min(a, b) + ":" + Math.max(a, b);
    const seen = new Set();
    const addEdge = (a, b, feed) => { const k = key(a, b); if (seen.has(k)) return; seen.add(k); edges.push({ a, b, feed, drawn: false }); if (a >= 0) nodes[a].deg++; if (b >= 0) nodes[b].deg++; };
    // 2) mesh: tie each backbone node to its nearest few neighbours (loops emerge)
    const MESH_TH = 240;
    back.forEach(n => {
      const cand = back.filter(m => m !== n).map(m => ({ m, d: Math.hypot(n.x - m.x, n.y - m.y) })).filter(c => c.d < MESH_TH).sort((p, q) => p.d - q.d);
      cand.slice(0, 3).forEach(c => addEdge(n.idx, c.m.idx, false));
    });
    // tie the main tower into its nearest backbone nodes
    back.map(n => ({ n, d: Math.hypot(n.x - SEED_BUS.x, n.y - SEED_BUS.y) })).sort((p, q) => p.d - q.d).slice(0, 3).forEach(c => addEdge(-1, c.n.idx, false));
    // 3) radial load spurs off ~half the backbone nodes
    const loadTypes = ["dc", "factory", "dc", "ev", "dc", "factory", "dc", "city"]; let li = 0;
    back.forEach(n => {
      if (R() >= 0.55) return;
      const ang = Math.atan2(n.y - SEED_BUS.y, n.x - SEED_BUS.x) + (R() - 0.5) * 1.2, dist = 48 + R() * 36;
      const lx = n.x + Math.cos(ang) * dist, ly = n.y + Math.sin(ang) * dist;
      if (!inB(lx, ly)) return;
      const ln = { x: lx, y: ly, role: "load", type: loadTypes[li++ % loadTypes.length], idx: nodes.length };
      nodes.push(ln); addEdge(n.idx, ln.idx, true);
    });
    // 4) classify + size; backbone junctions (deg>=3) become substations, else towers
    nodes.forEach(n => {
      const d = Math.hypot(n.x - SEED_BUS.x, n.y - SEED_BUS.y);
      n.op = Math.min(0.34, 0.16 + (1 - Math.min(1, d / 880)) * 0.18); n.bx = n.x; n.shown = false;
      if (n.role === "load") { loadSize(n); return; }
      // backbone junctions get a varied mix — mostly towers, the rare gas generator, plus a few
      // chip/city hubs; ordinary backbone nodes stay towers.
      const hub = ["tower", "dc", "tower", "dc", "gen", "dc", "tower", "city"];
      n.type = n.deg >= 3 ? hub[(Math.round(n.x) * 3 + Math.round(n.y)) % hub.length] : "tower";
      if (n.type === "gen") { n.r = 10 + (n.idx % 2) * 2; n.by = n.y - n.r * 1.7 - 5; }
      else if (n.type === "tower") { n.h = 46 + (n.idx % 3) * 8; n.hw = n.h * 0.2; n.by = n.y - n.h * 0.82; }
      else loadSize(n); // dc / city hub
    });
    fleetNodes = nodes; fleetEdges = edges;
    fleetOrder = nodes.map(n => n.idx).sort((a, b) => Math.hypot(nodes[a].x - SEED_BUS.x, nodes[a].y - SEED_BUS.y) - Math.hypot(nodes[b].x - SEED_BUS.x, nodes[b].y - SEED_BUS.y));
  }
  function fleetGlyph(n) {
    const tg = el("g", { style: "opacity:0;transition:opacity .55s ease" }, fleet); n.g = tg;
    if (n.type === "dc") fleetChip(tg, n.x, n.y, n.w, n.op);
    else if (n.type === "factory") fleetFactory(tg, n.x, n.y, n.w, n.op);
    else if (n.type === "city") fleetCity(tg, n.x, n.y, n.w, n.op);
    else if (n.type === "ev") fleetEV(tg, n.x, n.y, n.w, n.op);
    else if (n.type === "gen") fleetGen(tg, n.x, n.y, n.r, n.op);
    else fleetTower(tg, n.x, n.y, n.h, n.hw, n.op);
    return tg;
  }
  const shownAt = i => i < 0 || fleetNodes[i].shown; // the main tower (-1) is always present
  function advanceFleet() {
    if (!fleetNodes.length) buildFleetGraph();
    if (fleetClicks >= FLEET_MAX_CLICKS || fleetIdx >= fleetOrder.length) return;
    fleetClicks++;
    const end = Math.min(fleetOrder.length, fleetIdx + FLEET_BATCH);
    for (let k = fleetIdx; k < end; k++) { const n = fleetNodes[fleetOrder[k]]; const tg = fleetGlyph(n), step = (k - fleetIdx) * 70; T(() => { tg.style.opacity = 1; }, step + 80); n.shown = true; }
    fleetIdx = end;
    // draw any spans whose both endpoints are now present (mesh ties + load feeders)
    let s = 0;
    fleetEdges.forEach(e => {
      if (e.drawn || !shownAt(e.a) || !shownAt(e.b)) return;
      e.drawn = true;
      const A = e.a < 0 ? SEED_BUS : fleetNodes[e.a], Bn = fleetNodes[e.b];
      const ax = e.a < 0 ? SEED_BUS.x : A.bx, ay = e.a < 0 ? SEED_BUS.y : A.by;
      const op = e.a < 0 ? Bn.op : Math.max(A.op, Bn.op);
      const eg = el("g", { style: "opacity:0;transition:opacity .55s ease" }, fleet);
      fleetSpan(eg, ax, ay, Bn.bx, Bn.by, e.feed, op);
      T(() => { eg.style.opacity = 1; }, (s++ % FLEET_BATCH) * 60);
    });
  }

  function hudLabel(x, y, txt) { const dx2 = 26;
    const dot = document.createElementNS(NS, "circle"); dot.setAttribute("cx", x); dot.setAttribute("cy", y); dot.setAttribute("r", 2); dot.setAttribute("fill", CY); dot.style.opacity = "0"; dot.style.transition = "opacity .8s"; hud.appendChild(dot);
    const ln = mkLine(hud, x, y, x + dx2, y - 12, CY, 0.8); ln.setAttribute("opacity", 0); ln.style.transition = "opacity .8s";
    const t = document.createElementNS(NS, "text"); t.setAttribute("x", x + dx2 + 3); t.setAttribute("y", y - 14); t.setAttribute("fill", "#1B1B12"); t.setAttribute("font-family", "'JetBrains Mono',monospace"); t.setAttribute("font-size", "10"); t.setAttribute("font-weight", "500"); t.textContent = txt; t.style.opacity = "0"; t.style.transition = "opacity .8s"; hud.appendChild(t);
    return { dot, ln, t };
  }
  function hudShow() { hud.querySelectorAll("circle").forEach(e => e.style.opacity = "1"); hud.querySelectorAll("line").forEach(e => e.style.opacity = ".6"); hud.querySelectorAll("text").forEach(e => e.style.opacity = ".9"); }
  function jag(x1, y1, x2, y2, segs, amp) { let pts = `${x1},${y1}`; for (let i = 1; i < segs; i++) { const f = i / segs, mx = x1 + (x2 - x1) * f, my = y1 + (y2 - y1) * f; pts += ` ${mx + rnd(-amp, amp)},${my + rnd(-amp, amp)}`; } return pts + ` ${x2},${y2}`; }
  function energizeConductor(c) { if (c.on) return; c.on = true; c.el.setAttribute("stroke", COND); c.el.setAttribute("filter", GLOW);
    const cur = el("path", { d: c.el.getAttribute("d"), fill: "none", stroke: CY, "stroke-width": 2, "stroke-linecap": "round", filter: GLOWS, "stroke-dasharray": "5 22", opacity: 0 }, world);
    cur.style.transition = "opacity .7s ease"; T(() => cur.setAttribute("opacity", "1"), 40);
    // flow always reads left -> right: dashes move toward the path end when end.x >= start.x, else reverse
    const a = c.el.getPointAtLength(0), b = c.el.getPointAtLength(c.len), dir = b.x >= a.x ? 1 : -1;
    currentPaths.push({ el: cur, off: Math.random() * 27, sp: rnd(0.8, 1.2) * dir }); }

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
    const dattach = [], sArmHw = [sw.hw - 2, sMidHw, 9];
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
    sensorPts.forEach((s, i) => {
      const c = el("circle", { cx: s.x, cy: s.y, r: 0, fill: CY, filter: GLOWS }, fx);
      sensors.push({ x: s.x, y: s.y, core: c, r: s.big ? 3.2 : 2.4, ph: i * 1.3, on: false }); });

    for (let i = 0; i < 3; i++) { const pl = el("polyline", { fill: "none", stroke: "#BFD2FA", "stroke-width": 1.1, opacity: 0, filter: GLOWS }, bolts); crackleEls.push(pl); }
    sboltEl = el("polyline", { fill: "none", stroke: CY, "stroke-width": 1.3, opacity: 0, filter: GLOW }, bolts);

    if (reduceMotion) {
      if (grid) grid.style.opacity = "1";
      draws.forEach(d => d.seg.el.setAttribute("stroke-dashoffset", 0));
      pops.forEach(p => p.el.setAttribute("r", p.el.dataset.r));
      steelEls.forEach(s => s.el.setAttribute("stroke", STEEL));
      insulEls.forEach(s => s.el.setAttribute("fill", INSUL));
      conductors.forEach(c => { c.on = true; c.el.setAttribute("stroke", COND); });
      sensors.forEach(s => { s.on = true; s.core.setAttribute("r", s.r); });
      if (reveal) reveal.classList.add("is-revealed");
      hudShow();
      return;
    }

    const sf = 0.52; // build-speed factor (<1 = faster on-load construction)
    const lead = 60; // initial lead-in before construction starts (lower = snappier opening)
    T(() => { if (grid) grid.style.opacity = "1"; if (statusEl) statusEl.classList.add("is-on"); }, 50);
    draws.forEach(d => T(() => d.seg.el.setAttribute("stroke-dashoffset", 0), lead + d.t * sf));
    pops.forEach(p => T(() => p.el.setAttribute("r", p.el.dataset.r), lead + p.t * sf));
    const total = lead + TT * sf;
    const phases = ["surveying site", "raising lattice", "mounting cross-arms", "hanging insulators", "stringing conductors", "energizing grid"];
    let pp = 0; const iv = setInterval(() => { pp = Math.min(100, pp + Math.ceil(rnd(2, 8))); if (statusPct) statusPct.textContent = pp + "%"; if (statusText) statusText.textContent = phases[Math.min(phases.length - 1, Math.floor(pp / 100 * phases.length))]; if (pp >= 100) clearInterval(iv); }, Math.max(55, total / 48)); timers.push(iv);
    T(() => energizeAll(), total + 140);
    T(() => { if (statusEl) statusEl.classList.remove("is-on"); }, total + 320);
  }

  // smooth left -> right energize wave (replaces the hard scan sweep): steel darkens, conductors
  // turn blue + start flowing current, sensors light up — all via eased CSS color transitions.
  function energizeAll() {
    if (energized) return;
    energized = true; scanDone = true;
    const span = 1040, dur = 620;
    const delay = mx => Math.max(0, Math.min(span, mx)) / span * dur;
    steelEls.forEach(s => T(() => s.el.setAttribute("stroke", STEEL), delay(s.mx)));
    insulEls.forEach(s => T(() => s.el.setAttribute("fill", INSUL), delay(s.mx)));
    conductors.forEach(c => T(() => energizeConductor(c), delay(c.mx)));
    sensors.forEach(s => T(() => { s.on = true; s.core.setAttribute("r", s.r); }, delay(s.x)));
    if (reveal) reveal.classList.add("is-revealed");
    hudShow();
    startLoop();
  }

  function loop() {
    tick++; const m = mouse;
    const boost = (1 + surge * 2.4) * speedMul;
    currentPaths.forEach(p => { p.off -= p.sp * boost; p.el.setAttribute("stroke-dashoffset", p.off); });
    if (speedMul > 1.001) speedMul = 1 + (speedMul - 1) * 0.992; // clicks rev the current up; it coasts back down
    if (surge > 0.01) { conductors.forEach(c => { if (c.on) { c.el.setAttribute("stroke", surge > 0.5 ? CY : COND); c.el.setAttribute("stroke-width", 1.7 + surge * 1.6); } }); surge *= 0.945; }
    else if (scanDone) conductors.forEach(c => { if (c.on) c.el.setAttribute("stroke-width", 1.7); });
    particles.forEach(p => { p.x += p.vx; p.y += p.vy; if (m.on) { const dx3 = p.x - m.x, dy3 = p.y - m.y, d = Math.hypot(dx3, dy3); if (d < 90 && d > 0) { const force = (90 - d) / 90 * 1.4; p.x += dx3 / d * force; p.y += dy3 / d * force; } } if (p.y < 70) { p.y = 520; p.x = rnd(cx - 220, cx + 220); } if (p.x < cx - 260) p.x = cx + 260; if (p.x > cx + 260) p.x = cx - 260; p.el.setAttribute("cx", p.x); p.el.setAttribute("cy", p.y); });
    for (let i = 0; i < 3; i++) { const pl = crackleEls[i]; if (m.on && scanDone) { const ang = rnd(0, Math.PI * 2), len = rnd(16, 40); pl.setAttribute("points", jag(m.x, m.y, m.x + Math.cos(ang) * len, m.y + Math.sin(ang) * len, 4, 5)); pl.setAttribute("opacity", rnd(0.4, 0.9)); } else pl.setAttribute("opacity", 0); }
    if (sboltEl) { let near = null, nd = 130; sensors.forEach(s => { if (!s.on) return; const d = Math.hypot(s.x - m.x, s.y - m.y); if (d < nd) { nd = d; near = s; } }); if (m.on && near && scanDone) { sboltEl.setAttribute("points", jag(m.x, m.y, near.x, near.y, 6, 7)); sboltEl.setAttribute("opacity", rnd(0.5, 0.95)); near.core.setAttribute("r", 4.5); } else sboltEl.setAttribute("opacity", 0); }
    for (let i = rings.length - 1; i >= 0; i--) { const r = rings[i]; r.rad += r.spd; r.el.setAttribute("r", r.rad); r.el.setAttribute("opacity", Math.max(0, r.life)); r.life -= 0.02; if (r.life <= 0) { r.el.remove(); rings.splice(i, 1); } }
    if (loadEl && scanDone && tick % 30 === 0) loadEl.t.textContent = "LOAD " + Math.round(78 + Math.sin(tick * 0.01) * 6) + "%";
    if (running) raf = requestAnimationFrame(loop);
  }
  function startLoop() { if (running) return; running = true; loop(); }
  function stopLoop() { running = false; if (raf) cancelAnimationFrame(raf); }

  function toVB(clientX, clientY) { const mm = svg.getScreenCTM(); if (!mm) return null; const p = svg.createSVGPoint(); p.x = clientX; p.y = clientY; return p.matrixTransform(mm.inverse()); }

  section.addEventListener("pointermove", e => {
    const v = toVB(e.clientX, e.clientY); if (v) { mouse.x = v.x; mouse.y = v.y; } mouse.on = true;
    if (world) world.style.transform = `translate(${-((mouse.x / VW) - 0.5) * 14}px,${-((mouse.y / VH) - 0.5) * 10}px)`;
  });
  section.addEventListener("pointerleave", () => { mouse.on = false; mouse.x = mouse.y = -9999; if (world) world.style.transform = ""; });
  document.addEventListener("pointermove", e => {
    if (e.pointerType !== "mouse") return; // touch/pen drags fire pointermove too, but never a matching pointerleave
    if (clight) { clight.style.opacity = "1"; clight.style.left = e.clientX + "px"; clight.style.top = e.clientY + "px"; }
    if (core) { core.style.opacity = "1"; core.style.left = e.clientX + "px"; core.style.top = e.clientY + "px"; }
  });
  document.addEventListener("pointerleave", () => { if (clight) clight.style.opacity = "0"; if (core) core.style.opacity = "0"; });
  document.addEventListener("pointerup", e => { if (e.pointerType !== "mouse") { if (clight) clight.style.opacity = "0"; if (core) core.style.opacity = "0"; } });
  section.addEventListener("pointerdown", e => {
    if (!energized) return; if (e.target.closest("a,button")) return;
    const v = toVB(e.clientX, e.clientY); if (!v) return; const mx = v.x, my = v.y;
    surge = 1;
    for (let k = 0; k < 2; k++) { const c = el("circle", { cx: mx, cy: my, fill: "none", stroke: CY, "stroke-width": 2 - k * 0.6, filter: GLOW }, fx); rings.push({ el: c, rad: 4 + k * 8, spd: 6 - k * 1.5, life: 1 }); }
  });
  // grid expansion: every click anywhere on the page grows the background fleet (and pulses current)
  document.addEventListener("pointerdown", () => { if (energized) { advanceFleet(); surge = 1; speedMul = Math.min(5, speedMul + 0.6); } });
  if (world) world.style.transition = "transform .25s ease-out";

  // pause the perpetual loop while the hero is scrolled off-screen (saves battery)
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { if (energized) startLoop(); } else stopLoop(); }); }, { threshold: 0 });
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

// Demo request form — submit to Google Forms without leaving the page
const demoForm = document.getElementById("demo-form");
if (demoForm) {
  demoForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = new FormData(demoForm);
    // no-cors: Google Forms returns an opaque response, so we can't read its
    // status; treat completion as success and swap in the thank-you panel.
    fetch(demoForm.action, { method: "POST", mode: "no-cors", body: data }).finally(() => {
      demoForm.hidden = true;
      const success = document.getElementById("demo-form-success");
      if (success) success.hidden = false;
    });
  });
}

// Page-wide click spark — a small electric burst wherever you click
(function clickSparks() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const NS = "http://www.w3.org/2000/svg";
  const rnd = (a, b) => a + Math.random() * (b - a);
  const elNS = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; };
  const jag = (x1, y1, x2, y2, segs, amp) => { let p = `${x1},${y1}`; for (let i = 1; i < segs; i++) { const f = i / segs; p += ` ${x1 + (x2 - x1) * f + rnd(-amp, amp)},${y1 + (y2 - y1) * f + rnd(-amp, amp)}`; } return p + ` ${x2},${y2}`; };

  const svg = elNS("svg", { "aria-hidden": "true" });
  svg.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:45;overflow:visible";
  const defs = elNS("defs", {}, svg);
  const filter = elNS("filter", { id: "spark-glow", x: "-60%", y: "-60%", width: "220%", height: "220%" }, defs);
  elNS("feGaussianBlur", { stdDeviation: "2", result: "b" }, filter);
  const merge = elNS("feMerge", {}, filter);
  elNS("feMergeNode", { in: "b" }, merge);
  elNS("feMergeNode", { in: "SourceGraphic" }, merge);
  (document.body || document.documentElement).appendChild(svg);

  document.addEventListener("pointerdown", e => {
    const x = e.clientX, y = e.clientY, parts = [];
    const ring = elNS("circle", { cx: x, cy: y, r: 4, fill: "none", stroke: "#2663EB", "stroke-width": 2, filter: "url(#spark-glow)" }, svg);
    parts.push({ ring: true, el: ring, r: 4 });
    const n = 5, base = rnd(0, Math.PI * 2);
    for (let i = 0; i < n; i++) {
      const ang = base + (i / n) * Math.PI * 2 + rnd(-0.3, 0.3), len = rnd(18, 40);
      const pl = elNS("polyline", { points: jag(x, y, x + Math.cos(ang) * len, y + Math.sin(ang) * len, 4, 5), fill: "none", stroke: i % 2 ? "#7CA1F4" : "#2663EB", "stroke-width": rnd(1.2, 2), "stroke-linecap": "round", filter: "url(#spark-glow)" }, svg);
      parts.push({ el: pl, ang, len });
    }
    let life = 1;
    (function step() {
      life -= 0.06; const o = Math.max(0, life);
      parts.forEach(p => { p.el.setAttribute("opacity", o); if (p.ring) { p.r += 3.5; p.el.setAttribute("r", p.r); } else { const g = 1 + (1 - life) * 0.6; p.el.setAttribute("points", jag(x, y, x + Math.cos(p.ang) * p.len * g, y + Math.sin(p.ang) * p.len * g, 4, 4)); } });
      if (life > 0) requestAnimationFrame(step); else parts.forEach(p => p.el.remove());
    })();
  });
})();
