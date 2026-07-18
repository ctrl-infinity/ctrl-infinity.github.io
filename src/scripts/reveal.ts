// Scroll-reveal as progressive enhancement: elements stay visible without JS.
// Only elements below the fold are hidden, then revealed on intersection.
export function setupReveal() {
  if (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    !('IntersectionObserver' in window)
  ) {
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '-5% 0px' }
  );

  const viewportHeight = window.innerHeight;
  for (const el of document.querySelectorAll('[data-reveal]')) {
    const rect = el.getBoundingClientRect();
    // Already on screen: leave it visible, no animation.
    if (rect.top < viewportHeight * 0.95 && rect.bottom > 0) continue;
    el.classList.add('reveal-init');
    io.observe(el);
  }
}
