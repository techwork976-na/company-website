"use client";

import { LazyMotion, MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { motion } from "@/lib/tokens";

/** Framer Motion's animation and layout code, split out and fetched after hydration. */
const loadFeatures = () => import("./motion-features").then((module) => module.default);

/**
 * One place for Framer Motion's settings:
 * - LazyMotion keeps its code out of the first load; `m` components simply
 *   render static until it arrives, so nothing blocks or flashes.
 * - Every animation shares the brand easing and a 0.22s default duration.
 * - reducedMotion="user" switches movement off for people who ask for that.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig
        reducedMotion="user"
        transition={{ duration: motion.duration.base, ease: motion.ease }}
      >
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
