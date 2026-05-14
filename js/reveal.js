(function () {
  var revealSelector = [
    ".hero-copy > *",
    ".hero-visual",
    ".logos-strip span",
    ".section-heading",
    ".feature-card",
    ".workflow-copy",
    ".workflow-list li",
    ".screen-grid figure"
  ].join(",");

  var items = Array.prototype.slice.call(document.querySelectorAll(revealSelector));

  if (!items.length) {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    items.forEach(function (item) {
      item.classList.add("is-visible");
    });
    return;
  }

  items.forEach(function (item, index) {
    item.classList.add("reveal-item");
    item.style.transitionDelay = Math.min(index % 4, 3) * 90 + "ms";
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.18,
    rootMargin: "0px 0px -8% 0px"
  });

  items.forEach(function (item) {
    observer.observe(item);
  });
}());
