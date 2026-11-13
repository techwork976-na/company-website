"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __bfReady?: boolean;
  }
}

const SELECTOR = "[data-reveal], [data-stagger]";
/** A section reveals once about 20% of it (or 20% of the viewport) is visible. */
const THRESHOLD = 0.2;

/**
 * The single engine behind Reveal, Stagger and MaskedText.
 * Those components only render data attributes on the server; this
 * observer marks each one [data-revealed] once, and CSS does the motion.
 *
 * Content first: on boot, anything already on screen is marked revealed
 * before <html data-reveal-ready> switches the hiding styles on, so the
 * first paint never depends on JavaScript. Content added later (client
 * navigation) is picked up automatically and animates in.
 */
export function RevealManager() {
  useEffect(() => {
    const html = document.documentElement;
    let instantUntil = 0;
    const onPopState = () => {
      // Back and forward navigation: show content immediately, no replay.
      instantUntil = performance.now() + 1200;
    };

    const reveal = (element: Element) => {
      if (performance.now() < instantUntil) element.setAttribute("data-reveal-instant", "");
      element.setAttribute("data-revealed", "");
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const viewportHeight = entry.rootBounds?.height ?? window.innerHeight;
          const enoughVisible =
            entry.intersectionRatio >= THRESHOLD ||
            entry.intersectionRect.height >= viewportHeight * THRESHOLD;
          if (!enoughVisible) continue;
          observer.unobserve(entry.target);
          reveal(entry.target);
        }
      },
      { threshold: [0, 0.05, 0.1, 0.15, THRESHOLD] },
    );

    const observeWithin = (root: ParentNode) => {
      root.querySelectorAll(SELECTOR).forEach((element) => {
        if (!element.hasAttribute("data-revealed")) observer.observe(element);
      });
    };

    if (!html.hasAttribute("data-reveal-ready")) {
      // First boot: keep what the visitor can already see exactly as it is.
      const viewportHeight = window.innerHeight;
      document.querySelectorAll(SELECTOR).forEach((element) => {
        if (element.hasAttribute("data-revealed")) return;
        const rect = element.getBoundingClientRect();
        const onScreen = rect.width > 0 && rect.bottom > 0 && rect.top < viewportHeight;
        if (onScreen) element.setAttribute("data-revealed", "");
        else observer.observe(element);
      });
      html.setAttribute("data-reveal-ready", "");
    } else {
      observeWithin(document);
    }

    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches(SELECTOR) && !node.hasAttribute("data-revealed")) observer.observe(node);
          observeWithin(node);
        });
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("popstate", onPopState);
    window.__bfReady = true;

    return () => {
      mutations.disconnect();
      observer.disconnect();
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  return null;
}
