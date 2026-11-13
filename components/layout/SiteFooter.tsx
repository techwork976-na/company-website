import { ArrowUpRight } from "lucide-react";
import { cacheLife } from "next/cache";
import Link from "next/link";
import { footer, site } from "@/content/site";
import { getService } from "@/content/services";
import { mailtoUrl } from "@/lib/site-url";
import { Logo } from "@/components/ui/Logo";
import { BackToTop } from "./BackToTop";

async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="eyebrow text-fg-soft">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export function SiteFooter() {
  const services = footer.services.map((slug) => getService(slug)).filter((service) => service !== undefined);

  return (
    <footer data-tone-fixed="deep" className="relative overflow-hidden">
      <div className="container-wide pt-16 lg:pt-24">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-4">
            <Link href="/" aria-label={site.ui.homeLabel} className="-ml-1 inline-flex min-h-11 items-center px-1">
              <Logo />
            </Link>
            <p className="mt-5 max-w-[22rem] text-lead text-fg-soft">{footer.statement}</p>
          </div>

          <nav aria-label={footer.exploreTitle} className="lg:col-span-2">
            <Column title={footer.exploreTitle}>
              <ul>
                {site.nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="inline-flex min-h-10 items-center">
                      <span className="link-slide">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Column>
          </nav>

          <nav aria-label={footer.servicesTitle} className="lg:col-span-3">
            <Column title={footer.servicesTitle}>
              <ul>
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link href={`/services/${service.slug}`} className="inline-flex min-h-10 items-center">
                      <span className="link-slide">{service.shortTitle}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Column>
          </nav>

          <div className="space-y-10 sm:col-span-2 sm:grid sm:grid-cols-2 sm:gap-8 sm:space-y-0 lg:col-span-3 lg:block lg:space-y-10">
            <Column title={footer.contactTitle}>
              <a href={mailtoUrl()} className="inline-flex min-h-10 items-center text-title font-semibold text-accent">
                <span className="link-slide">{site.contact.email}</span>
              </a>
              <p className="mt-1 text-fg-soft">{site.contact.location}</p>
            </Column>
            <Column title={footer.followTitle}>
              <ul className="flex flex-wrap gap-2">
                {site.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex h-10 items-center gap-1.5 rounded-full border border-line-strong px-4 text-small font-semibold transition-colors duration-[var(--dur-fast)] ease-brand hover:border-accent hover:bg-accent hover:text-on-accent"
                    >
                      {social.label}
                      <ArrowUpRight
                        aria-hidden="true"
                        strokeWidth={2}
                        className="size-3.5 transition-transform duration-[var(--dur-slow)] ease-brand group-hover:rotate-45"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </Column>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line py-5 text-small text-fg-soft md:flex-row md:items-center md:justify-between">
          <p>
            © <CurrentYear /> {site.name}. {footer.rights}
          </p>
          <p>{footer.signoff}</p>
          <BackToTop label={footer.backToTop} />
        </div>
      </div>

      <div aria-hidden="true" className="container-wide select-none">
        <p className="footer-wordmark font-display font-extrabold text-lime">
          {site.name}
          <span className="align-top text-[0.22em]">{site.mark}</span>
        </p>
      </div>
    </footer>
  );
}
