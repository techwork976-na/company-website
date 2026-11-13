"use client";

import { useEffect, type RefObject } from "react";
import { REDUCED_MOTION } from "./use-media-query";

type Gsap = typeof import("gsap").gsap;
type ScrollTriggerType = typeof import("gsap/ScrollTrigger").ScrollTrigger;

/**
 * Runs a GSAP setup for one section. GSAP and ScrollTrigger are only
 * downloaded when the section comes within `margin` of the viewport, and
 * never with reduced motion. Everything created inside `setup` is reverted
 * on unmount through gsap.context. `setup` may return extra cleanup.
 */
export function useLazyGsap(
  ref: RefObject<HTMLElement | null>,
  setup: (gsap: Gsap, ScrollTrigger: ScrollTriggerType, root: HTMLElement) => void | (() => void),
  options: { margin?: string; media?: string } = {},
) {
  const { margin = "600px 0px", media } = options;

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia(REDUCED_MOTION).matches) return;
    if (media && !window.matchMedia(media).matches) return;

    let cancelled = false;
    let revert: (() => void) | undefined;

    const enhance = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      let extra: void | (() => void);
      const context = gsap.context(() => {
        extra = setup(gsap, ScrollTrigger, root);
      }, root);
      revert = () => {
        extra?.();
        context.revert();
      };
    };

    const nearby = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        nearby.disconnect();
        void enhance();
      },
      { rootMargin: margin },
    );
    nearby.observe(root);

    return () => {
      cancelled = true;
      nearby.disconnect();
      revert?.();
    };
    // setup is defined inline by callers; the effect is meant to run once per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, margin, media]);
}
