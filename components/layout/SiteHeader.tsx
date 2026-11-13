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
 * Sticky navbar. It turns translucent with a hairline after scrolling,
 * hides on scroll down and returns on scroll up (transform only). A soft
 * pill slides between links on hover or focus and rests on the current
 * page. Scroll state lives in attributes on <html>, so scrolling never
 * re-renders React.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const isActive = useCallback(
    (href: string) => !href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`)),
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
      if (y < 160) {
        html.removeAttribute("data-header-hidden");
        lastY = y;
        return;
      }
      const delta = y - lastY;
      if (Math.abs(delta) < 8) return;
      if (!html.hasAttribute("data-scroll-locked")) {
        html.toggleAttribute("data-header-hidden", delta > 0);
      }
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

  // Every new page starts with the navbar visible.
  useEffect(() => {
    document.documentElement.removeAttribute("data-header-hidden");
  }, [pathname]);

  return (
    <header className="site-header sticky top-0 z-50" style={{ viewTransitionName: "site-header" }}>
      <div className="container-wide flex h-[var(--nav-h)] items-center justify-between gap-6">
        <Link href="/" aria-label={site.ui.homeLabel} className="-ml-1 flex min-h-11 items-center rounded-full px-1 text-ink">
          <Logo />
        </Link>

        <div className="flex items-center gap-2 lg:gap-4">
          <nav
            aria-label={site.ui.mainNavLabel}
            className="hidden md:block"
            onMouseLeave={() => setHovered(null)}
          >
            <ul className="flex items-center">
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
                        "relative inline-flex h-11 items-center rounded-full px-3.5 text-[0.9375rem] font-medium transition-colors duration-[var(--dur-fast)] ease-brand lg:px-4",
                        active || lit ? "text-ink" : "text-ink-soft",
                      )}
                    >
                      {lit ? (
                        <m.span
                          layoutId="nav-pill"
                          aria-hidden="true"
                          className="absolute inset-x-0 inset-y-1 rounded-full bg-surface"
                        />
                      ) : null}
                      <span className="relative">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden sm:block">
            {/* A light magnetic pull towards the pointer (React Bits Magnet). */}
            <Magnet padding={36} magnetStrength={8}>
              <ButtonLink href={site.cta.href} variant="dark" size="sm">
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
            className="-mr-2 flex size-11 flex-col items-center justify-center gap-[6px] rounded-full md:hidden"
          >
            <span aria-hidden="true" className="block h-[1.5px] w-5 rounded-full bg-ink" />
            <span aria-hidden="true" className="block h-[1.5px] w-5 rounded-full bg-ink" />
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={closeMenu} isActive={isActive} />
    </header>
  );
}
