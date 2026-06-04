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

// ---- Hero: network graph self-construction + cursor-reactive interaction ----
(function heroGraph() {
  const svg = document.querySelector("[data-hero-net]");
  const section = document.getElementById("home");
  if (!svg || !section) return;

  const NS = "http://www.w3.org/2000/svg";
  const VW = 1000, VH = 540;
  const grid = section.querySelector("[data-hero-grid]");
  const spot = section.querySelector("[data-hero-spot]");
  const reveal = section.querySelector("[data-hero-reveal]");
  const status = section.querySelector("[data-hero-status]");
  const statusText = section.querySelector("[data-hero-status-text]");
  const statusPct = section.querySelector("[data-hero-status-pct]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Node positions biased to the right so they clear the left-aligned copy.
  const base = [
    [660,120],[780,180],[870,110],[915,250],[835,340],[720,400],
    [630,290],[710,250],[890,370],[690,200],[600,170],[800,300],
  ];
  const edges = [
    [0,7],[0,10],[10,6],[6,7],[7,1],[1,9],[1,2],[2,3],
    [3,4],[4,11],[11,8],[8,1],[6,5],[5,11],[4,8],
  ];
  const phases = [
    "indexing grid topology",
    "linking interconnection projects",
    "aligning to canonical model",
    "memory layer online",
  ];

  const nodes = base.map(([x, y]) => ({ x, y, ox: x, oy: y, vx: 0, vy: 0 }));
  const dotEls = [];
  const lineEls = [];
  const mouse = { x: -9999, y: -9999 };
  let interactive = false;
  let raf = null;
  let running = false;

  // Build SVG: lines first (under nodes), then nodes.
  edges.forEach((e) => {
    const a = base[e[0]], b = base[e[1]];
    const l = document.createElementNS(NS, "line");
    const len = Math.hypot(a[0] - b[0], a[1] - b[1]);
    l.setAttribute("x1", a[0]); l.setAttribute("y1", a[1]);
    l.setAttribute("x2", b[0]); l.setAttribute("y2", b[1]);
    l.setAttribute("stroke", "#2563eb");
    l.setAttribute("stroke-width", "1.4");
    l.setAttribute("stroke-dasharray", len);
    l.setAttribute("stroke-dashoffset", reduceMotion ? 0 : len);
    l.setAttribute("opacity", reduceMotion ? "0.28" : "0");
    l.style.transition = "stroke-dashoffset 0.5s ease, opacity 0.5s ease";
    svg.appendChild(l);
    lineEls.push({ el: l });
  });
  base.forEach((p, i) => {
    const big = i % 4 === 0;
    const c = document.createElementNS(NS, "circle");
    c.setAttribute("cx", p[0]); c.setAttribute("cy", p[1]);
    c.setAttribute("r", reduceMotion ? (big ? 7 : 4) : 0);
    c.setAttribute("fill", big ? "#1e3a8a" : "#2563eb");
    c.dataset.r = big ? 7 : 4;
    c.style.transition = "r 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)";
    svg.appendChild(c);
    dotEls.push(c);
  });

  // Pointer tracking (used once interactive).
  section.addEventListener("pointermove", (e) => {
    const r = section.getBoundingClientRect();
    mouse.x = ((e.clientX - r.left) / r.width) * VW;
    mouse.y = ((e.clientY - r.top) / r.height) * VH;
    if (interactive && spot) {
      spot.style.opacity = "1";
      spot.style.left = (e.clientX - r.left) + "px";
      spot.style.top = (e.clientY - r.top) + "px";
    }
  });
  section.addEventListener("pointerleave", () => {
    mouse.x = mouse.y = -9999;
    if (spot) spot.style.opacity = "0";
  });

  const dist = (a, b, c, d) => Math.hypot(a - c, b - d);

  // Live cursor-reactive loop.
  let pulseEdge = 0, pulseT = 0, pulseDot = null;
  // Tuning constants below: 200 = cursor attraction radius (viewBox units); 170 = edge
  // highlight radius; 0.02 = spring stiffness toward home; 0.86 = velocity damping;
  // 0.012 = pulse speed (fraction of an edge per frame at ~60fps).
  function loop() {
    nodes.forEach((n) => {
      let ax = (n.ox - n.x) * 0.02, ay = (n.oy - n.y) * 0.02;
      const d = dist(n.x, n.y, mouse.x, mouse.y);
      if (d > 0 && d < 200) {
        const f = ((200 - d) / 200) * 0.55;
        ax += ((mouse.x - n.x) / d) * f;
        ay += ((mouse.y - n.y) / d) * f;
      }
      n.vx = (n.vx + ax) * 0.86; n.vy = (n.vy + ay) * 0.86;
      n.x += n.vx; n.y += n.vy;
    });
    dotEls.forEach((c, i) => { c.setAttribute("cx", nodes[i].x); c.setAttribute("cy", nodes[i].y); });
    edges.forEach((e, i) => {
      const a = nodes[e[0]], b = nodes[e[1]];
      const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      const d = dist(mx, my, mouse.x, mouse.y);
      const near = d < 170;
      const l = lineEls[i].el;
      l.setAttribute("x1", a.x); l.setAttribute("y1", a.y);
      l.setAttribute("x2", b.x); l.setAttribute("y2", b.y);
      l.setAttribute("stroke", near ? "#22d3ee" : "#2563eb");
      l.setAttribute("opacity", near ? (0.28 + ((170 - d) / 170) * 0.55) : 0.28);
      l.setAttribute("stroke-width", near ? "1.9" : "1.4");
    });
    if (!pulseDot) {
      pulseDot = document.createElementNS(NS, "circle");
      pulseDot.setAttribute("r", "3.5");
      pulseDot.setAttribute("fill", "#22d3ee");
      svg.appendChild(pulseDot);
    }
    pulseT += 0.012;
    if (pulseT >= 1) { pulseT = 0; pulseEdge = (pulseEdge + 1) % edges.length; }
    const ea = nodes[edges[pulseEdge][0]], eb = nodes[edges[pulseEdge][1]];
    pulseDot.setAttribute("cx", ea.x + (eb.x - ea.x) * pulseT);
    pulseDot.setAttribute("cy", ea.y + (eb.y - ea.y) * pulseT);
    raf = requestAnimationFrame(loop);
  }

  function startLoop() {
    if (running) return;
    running = true;
    loop();
  }
  function stopLoop() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
  }
  function goInteractive() {
    interactive = true;
    startLoop();
    // Pause the perpetual loop while the hero is scrolled off-screen (saves battery on mobile).
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) startLoop();
          else stopLoop();
        });
      }, { threshold: 0 });
      io.observe(section);
    }
  }

  // Reduced motion: render the finished graph statically — no construction, no perpetual
  // motion loop, no cursor physics (honors prefers-reduced-motion).
  if (reduceMotion) {
    if (grid) grid.style.opacity = "1";
    if (reveal) reveal.classList.add("is-revealed");
    return;
  }

  // Construction timeline (drives the page-load intro).
  const timers = [];
  const T = (fn, ms) => timers.push(setTimeout(fn, ms));

  window.addEventListener("load", () => {
    T(() => { if (grid) grid.style.opacity = "1"; if (status) status.classList.add("is-on"); }, 150);

    // Pop nodes in.
    base.forEach((p, i) => T(() => { dotEls[i].setAttribute("r", dotEls[i].dataset.r); }, 250 + i * 70));

    // Draw edges after nodes.
    const eStart = 250 + base.length * 70 + 150;
    edges.forEach((e, i) => T(() => {
      const l = lineEls[i].el;
      l.setAttribute("opacity", "0.28");
      l.setAttribute("stroke-dashoffset", "0");
    }, eStart + i * 90));

    // Status readout counter.
    const total = eStart + edges.length * 90;
    let p = 0;
    const iv = setInterval(() => {
      p = Math.min(100, p + Math.ceil(Math.random() * 7) + 2);
      if (statusPct) statusPct.textContent = p + "%";
      if (statusText) statusText.textContent = phases[Math.min(phases.length - 1, Math.floor((p / 100) * phases.length))];
      if (p >= 100) clearInterval(iv);
    }, Math.max(60, total / 40));

    // Finish: hide status, reveal copy, hand off to interactive loop.
    T(() => { if (status) status.classList.remove("is-on"); }, total + 200);
    T(() => { if (reveal) reveal.classList.add("is-revealed"); }, total + 450);
    T(() => { goInteractive(); }, total + 700);
  });
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
