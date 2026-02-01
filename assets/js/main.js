"use strict";

// Page loading
var pageLoading = document.querySelector(".page-loading");

if (pageLoading) {
  window.addEventListener("load", () => {
    pageLoading.classList.add("hide");

    setTimeout(() => {
      pageLoading.style.display = "none";
    }, 1000);
  });
}

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
  this.ariaExpanded = !isExpanded;
  navbarToggler.innerHTML = navbar.classList.contains("menu-show")
    ? '<i class="lni lni-close"></i>'
    : '<i class="lni lni-menu"></i>';
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
    navbarToggler.innerHTML = navbar.classList.contains("menu-show")
      ? '<i class="lni lni-close"></i>'
      : '<i class="lni lni-menu"></i>';
  });
});

// Close menu on scroll
window.addEventListener("scroll", () => {
  if (navbar.classList.contains("menu-show")) {
    navbar.classList.remove("menu-show");
    navbarToggler.setAttribute("aria-expanded", "false");
    navbarToggler.innerHTML = '<i class="lni lni-menu"></i>';
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
