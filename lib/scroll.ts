/**
 * Small scroll helpers. Scrolling is native everywhere (no smoothing layer),
 * so the wheel, touch, keyboard and browser find all feel instant.
 */

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function scrollToY(y: number) {
  window.scrollTo({ top: Math.max(0, y), behavior: prefersReducedMotion() ? "auto" : "smooth" });
}

export function scrollToElement(element: Element, offset = 0) {
  scrollToY(element.getBoundingClientRect().top + window.scrollY - offset);
}

/** Reads a CSS length variable from <html> in pixels, for example --nav-h. */
export function cssPixels(variable: string) {
  const probe = document.createElement("div");
  probe.style.cssText = `position:absolute;visibility:hidden;height:var(${variable})`;
  document.body.appendChild(probe);
  const value = probe.getBoundingClientRect().height;
  probe.remove();
  return value;
}

export function lockScroll() {
  document.documentElement.setAttribute("data-scroll-locked", "");
}

export function unlockScroll() {
  document.documentElement.removeAttribute("data-scroll-locked");
}
