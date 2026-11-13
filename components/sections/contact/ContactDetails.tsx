import { ArrowUpRight, Clock, Mail, MapPin } from "lucide-react";
import type { ReactNode } from "react";
import { contactPage, site } from "@/content/site";
import { mailtoUrl } from "@/lib/site-url";

function Detail({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-4 border-t border-line py-5 first:border-t-0 first:pt-0">
      <span
        aria-hidden="true"
        className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-on-accent"
      >
        {icon}
      </span>
      <div className="min-w-0">
        <dt className="eyebrow text-fg-soft">{label}</dt>
        <dd className="mt-1 text-fg">{children}</dd>
      </div>
    </div>
  );
}

/** Direct contact options, social links and what happens after a message. */
export function ContactDetails() {
  return (
    <div className="space-y-6 lg:sticky lg:top-[calc(var(--nav-h)+1.5rem)]">
      <div data-tone-fixed="indigo" className="rounded-panel p-7 sm:p-8">
        <h2 className="font-display text-title font-bold">{contactPage.detailsTitle}</h2>
        <dl className="mt-6">
          <Detail icon={<Mail strokeWidth={1.75} className="size-[1.125rem]" />} label={contactPage.emailLabel}>
            <a
              href={mailtoUrl()}
              className="link-slide inline-flex min-h-10 items-center text-title font-semibold [overflow-wrap:anywhere]"
            >
              {site.contact.email}
            </a>
          </Detail>
          <Detail icon={<MapPin strokeWidth={1.75} className="size-[1.125rem]" />} label={contactPage.locationLabel}>
            {site.contact.location}
          </Detail>
          <Detail icon={<Clock strokeWidth={1.75} className="size-[1.125rem]" />} label={contactPage.responseLabel}>
            {site.contact.responseTime}
          </Detail>
        </dl>
        <div className="mt-2 border-t border-line pt-6">
          <p className="eyebrow text-fg-soft">{contactPage.followLabel}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
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
        </div>
      </div>

      <div className="rounded-panel bg-raise p-7 sm:p-8">
        <h2 className="font-display text-title font-bold text-fg">{contactPage.nextTitle}</h2>
        <ol className="mt-5 space-y-4">
          {contactPage.nextSteps.map((step, index) => (
            <li key={step} className="flex gap-4">
              <span className="numeral flex size-7 shrink-0 items-center justify-center rounded-full bg-fg text-[0.75rem] font-semibold text-canvas">
                {index + 1}
              </span>
              <span className="pt-0.5 text-fg-soft">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
