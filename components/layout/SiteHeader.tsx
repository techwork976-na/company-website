"use client";

import * as m from "framer-motion/m";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import Magnet from "@/components/reactbits/Magnet";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { MobileMenu } from "./MobileMenu";

/**
 * Sticky navbar that takes the colours of the current journey tone, so it
 * changes with the page. It hides on scroll down and returns on scroll up.
 * A pill slides between links (Framer Motion layoutId) and rests on the
 * current page. Scroll state lives in attributes on <html>, so scrolling
 * never re-renders React.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const isActive = useCallback(
    (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`)),
    [pathname],
  );

  const activeHref = site.nav.find((item) => isActive(item.href))?.href ?? null;
  const highlighted = hovered ?? activeHref;

  useEffect(() => {
    const html = document.documentElement;
    let lastY = window.scrollY;
    let queued = false;

    const update = () => {
      queued = false;
      const y = Math.max(0, window.scrollY);
      html.toggleAttribute("data-header-scrolled", y > 8);
      if (y < 200) {
        html.removeAttribute("data-header-hidden");
        lastY = y;
        return;
      }
      const delta = y - lastY;
      if (Math.abs(delta) < 8) return;
      if (!html.hasAttribute("data-scroll-locked")) html.toggleAttribute("data-header-hidden", delta > 0);
      lastY = y;
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.removeAttribute("data-header-hidden");
  }, [pathname]);

  return (
    <header className="site-header sticky top-0 z-50" style={{ viewTransitionName: "site-header" }}>
      <div className="container-wide flex h-[var(--nav-h)] items-center justify-between gap-6">
        <Link href="/" aria-label={site.ui.homeLabel} className="-ml-1 flex min-h-11 items-center rounded-full px-1">
          <Logo />
        </Link>

        <nav
          aria-label={site.ui.mainNavLabel}
          className="absolute left-1/2 hidden -translate-x-1/2 md:block"
          onMouseLeave={() => setHovered(null)}
        >
          <ul className="flex items-center rounded-full border border-line p-1">
            {site.nav.map((item) => {
              const active = item.href === activeHref;
              const lit = item.href === highlighted;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onMouseEnter={() => setHovered(item.href)}
                    onFocus={() => setHovered(item.href)}
                    onBlur={() => setHovered(null)}
                    className={cn(
                      "relative inline-flex h-10 items-center rounded-full px-5 text-[0.9375rem] font-semibold transition-colors duration-[var(--dur-fast)] ease-brand",
                      lit ? "text-canvas" : "text-fg",
                    )}
                  >
                    {lit ? (
                      <m.span layoutId="nav-pill" aria-hidden="true" className="absolute inset-0 rounded-full bg-fg" />
                    ) : null}
                    <span className="relative">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <Magnet padding={40} magnetStrength={7}>
              <ButtonLink href={site.cta.href} size="sm">
                {site.cta.label}
              </ButtonLink>
            </Magnet>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label={site.ui.menuOpen}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="-mr-1 flex size-11 flex-col items-center justify-center gap-[6px] rounded-full border border-line md:hidden"
          >
            <span aria-hidden="true" className="block h-[2px] w-5 rounded-full bg-fg" />
            <span aria-hidden="true" className="block h-[2px] w-3.5 translate-x-[3px] rounded-full bg-fg" />
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={closeMenu} isActive={isActive} />
    </header>
  );
}
