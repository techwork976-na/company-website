"use client";

import { ArrowUpRight, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import { cssVars } from "@/lib/cn";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import { mailtoUrl } from "@/lib/site-url";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  isActive: (href: string) => boolean;
};

/**
 * Full-screen indigo menu on a native modal <dialog>: focus stays inside,
 * Escape closes it and the page behind is inert and locked.
 */
export function MobileMenu({ open, onClose, isActive }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      lockScroll();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 48rem)");
    const onDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) onClose();
    };
    desktop.addEventListener("change", onDesktop);
    window.addEventListener("popstate", onClose);
    return () => {
      desktop.removeEventListener("change", onDesktop);
      window.removeEventListener("popstate", onClose);
    };
  }, [onClose]);

  useEffect(() => unlockScroll, []);

  return (
    <dialog
      ref={dialogRef}
      id="mobile-menu"
      aria-label={site.ui.menuTitle}
      className="menu-dialog"
      data-tone-fixed="indigo"
      onClose={() => {
        unlockScroll();
        onClose();
      }}
    >
      <div className="flex min-h-full flex-col">
        <div className="container-wide flex h-[var(--nav-h)] shrink-0 items-center justify-between">
          <Link
            href="/"
            onClick={onClose}
            aria-label={site.ui.homeLabel}
            className="-ml-1 flex min-h-11 items-center px-1"
          >
            <Logo />
          </Link>
          <button
            type="button"
            onClick={onClose}
            autoFocus
            aria-label={site.ui.menuClose}
            className="-mr-1 flex size-11 items-center justify-center rounded-full border border-line"
          >
            <X aria-hidden="true" strokeWidth={2} className="size-5" />
          </button>
        </div>

        <nav aria-label={site.ui.mobileNavLabel} className="container-wide flex-1 pt-8">
          <ol>
            {site.nav.map((item, index) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  onClick={onClose}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="menu-item flex items-center justify-between gap-4 py-5 aria-[current=page]:text-accent"
                  style={cssVars({ "--i": index })}
                >
                  <span className="flex items-baseline gap-4">
                    <span className="numeral w-6 shrink-0 text-small text-fg-soft">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[clamp(2.5rem,12vw,3.5rem)] leading-none font-bold tracking-[-0.045em]">
                      {item.label}
                    </span>
                  </span>
                  <ArrowUpRight aria-hidden="true" strokeWidth={1.75} className="size-7 shrink-0" />
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <div
          className="menu-item container-wide shrink-0 space-y-6 pt-10 pb-[max(2rem,env(safe-area-inset-bottom))]"
          style={cssVars({ "--i": site.nav.length })}
        >
          <ButtonLink href={site.cta.href} onClick={onClose} className="w-full justify-between">
            {site.cta.label}
          </ButtonLink>
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
            <a href={mailtoUrl()} className="link-slide inline-flex min-h-11 items-center font-medium">
              {site.contact.email}
            </a>
            <span className="text-fg-soft">{site.contact.location}</span>
          </div>
        </div>
      </div>
    </dialog>
  );
}
