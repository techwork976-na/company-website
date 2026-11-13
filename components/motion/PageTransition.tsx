import { ViewTransition, type ReactNode } from "react";

/**
 * Wraps each page so route changes fade out the old page and fade and rise
 * the new one by 12px over 300ms (View Transitions API). The header is
 * anchored in CSS, so the navbar and footer stay put. Browsers without
 * support simply swap pages instantly.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      {children}
    </ViewTransition>
  );
}
