"use client";

import { ArrowUpRight, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { footer, site } from "@/content/site";
import { cssVars } from "@/lib/cn";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import { mailtoUrl, whatsappUrl } from "@/lib/site-url";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  isActive: (href: string) => boolean;
};

/**
 * Full-screen Jet Black menu built on a native modal <dialog>: focus stays
 * inside, Escape closes it, and the page behind is inert and locked. It
 * fades in quickly and the links follow in a short stagger.
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
    // Close if the viewport grows to the desktop navigation, or on back/forward.
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

  // Never leave the page locked if the header unmounts with the menu open.
  useEffect(() => unlockScroll, []);

  return (
    <dialog
      ref={dialogRef}
      id="mobile-menu"
      aria-label={site.ui.menuTitle}
      className="menu-dialog"
      data-surface="dark"
      onClose={() => {
        unlockScroll();
        onClose();
      }}
    >
      <div className="flex min-h-full flex-col">
        <div className="container-wide flex h-[var(--nav-h)] shrink-0 items-center justify-between">
          <Link href="/" onClick={onClose} aria-label={site.ui.homeLabel} className="-ml-1 flex min-h-11 items-center px-1">
            <Logo />
          </Link>
          <button
            type="button"
            onClick={onClose}
            autoFocus
            aria-label={site.ui.menuClose}
            className="-mr-2 flex size-11 items-center justify-center rounded-full"
          >
            <X aria-hidden="true" strokeWidth={1.5} className="size-6" />
          </button>
        </div>

        <nav aria-label={site.ui.mobileNavLabel} className="container-wide flex-1 pt-6">
          <ol className="border-t border-line-inverse">
            {site.nav.map((item, index) => (
              <li key={item.href} className="border-b border-line-inverse">
                <Link
                  href={item.href}
                  onClick={onClose}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="menu-item flex items-center justify-between gap-4 py-5"
                  style={cssVars({ "--i": index })}
                >
                  <span className="flex items-baseline gap-4">
                    <span className="numeral w-6 shrink-0 text-[0.875rem] text-surface-soft">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[clamp(2rem,9vw,2.75rem)] leading-none font-semibold tracking-[-0.04em]">
                      {item.label}
                    </span>
                  </span>
                  <ArrowUpRight aria-hidden="true" strokeWidth={1.5} className="size-6 shrink-0 text-surface-soft" />
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <div
          className="menu-item container-wide shrink-0 space-y-5 pt-10 pb-[max(2rem,env(safe-area-inset-bottom))]"
          style={cssVars({ "--i": site.nav.length })}
        >
          <ButtonLink href={site.cta.href} onClick={onClose} className="w-full">
            {site.cta.label}
          </ButtonLink>
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
            <a href={mailtoUrl()} className="link-slide inline-flex min-h-11 items-center text-surface">
              {site.contact.email}
            </a>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="link-slide inline-flex min-h-11 items-center text-surface"
            >
              {footer.whatsappLabel}
            </a>
          </div>
        </div>
      </div>
    </dialog>
  );
}
