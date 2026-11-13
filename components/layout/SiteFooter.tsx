import { cacheLife } from "next/cache";
import Link from "next/link";
import { footer, site } from "@/content/site";
import { mailtoUrl, whatsappUrl } from "@/lib/site-url";
import { Logo } from "@/components/ui/Logo";
import { BackToTop } from "./BackToTop";

async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function SiteFooter() {
  return (
    <footer data-surface="dark" className="overflow-hidden bg-ink text-surface">
      <div className="container-wide pt-14 lg:pt-20">
        <div className="grid grid-cols-1 gap-12 border-t border-line-inverse pt-12 md:grid-cols-12 md:gap-8 lg:pt-14">
          <div className="md:col-span-12 lg:col-span-5">
            <Link href="/" aria-label={site.ui.homeLabel} className="-ml-1 inline-flex min-h-11 items-center px-1">
              <Logo />
            </Link>
            <p className="mt-4 max-w-[22rem] text-surface-soft">{footer.statement}</p>
          </div>

          <nav aria-label={footer.navLabel} className="md:col-span-4 lg:col-span-3">
            <ul className="space-y-0.5">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-flex min-h-11 min-w-11 items-center text-surface">
                    <span className="link-slide">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-5 md:col-span-8 lg:col-span-4">
            <div>
              <p className="eyebrow text-surface-soft">{footer.emailLabel}</p>
              <a
                href={mailtoUrl()}
                className="link-slide mt-1 inline-flex min-h-11 items-center text-title font-medium [overflow-wrap:anywhere]"
              >
                {site.contact.email}
              </a>
            </div>
            <div>
              <p className="eyebrow text-surface-soft">{footer.whatsappLabel}</p>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="link-slide numeral mt-1 inline-flex min-h-11 items-center text-title font-medium"
              >
                {site.contact.whatsappDisplay}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse gap-2 border-t border-line-inverse py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.875rem] text-surface-soft">
            © <CurrentYear /> {site.name}. {footer.rights}
          </p>
          <BackToTop label={footer.backToTop} />
        </div>
      </div>

      <div aria-hidden="true" className="container-wide select-none">
        <p className="footer-wordmark font-semibold text-surface">{site.name}</p>
      </div>
    </footer>
  );
}
