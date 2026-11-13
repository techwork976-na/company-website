import { Clock, Mail, Timer } from "lucide-react";
import type { ReactNode } from "react";
import { contactPage, site } from "@/content/site";
import { mailtoUrl, whatsappUrl } from "@/lib/site-url";
import { buttonClasses } from "@/components/ui/Button";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="size-[1.125rem] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 20.5l1.3-4.1A8.5 8.5 0 1 1 8 19.4z" />
      <path d="M9 8.6c.2-.5.6-.6.9-.6h.5c.2 0 .4.1.5.4l.7 1.6c.1.2 0 .5-.1.7l-.5.6c.6 1.2 1.6 2.2 2.8 2.8l.6-.5c.2-.1.5-.2.7-.1l1.6.7c.3.1.4.3.4.5v.5c0 .3-.1.7-.6.9-.8.4-1.8.4-3-.1a9.3 9.3 0 0 1-4.7-4.7c-.5-1.2-.5-2.2-.1-3z" />
    </svg>
  );
}

/* A <dl> group may only contain <dt> and <dd>, so the icon lives inside the <dt>. */
function Detail({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="relative min-h-10 pl-14">
      <dt className="eyebrow text-ink-soft">
        <span
          aria-hidden="true"
          className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-ui border border-line bg-bg text-ink"
        >
          {icon}
        </span>
        {label}
      </dt>
      <dd className="mt-0.5 text-ink">{children}</dd>
    </div>
  );
}

/** Direct contact options shown beside the form (below it on mobile). */
export function ContactDetails() {
  return (
    <div className="rounded-card border border-line bg-surface p-6 sm:p-7 lg:sticky lg:top-[calc(var(--nav-h)+1.5rem)]">
      <h2 className="text-title text-ink">{contactPage.detailsTitle}</h2>
      <dl className="mt-6 space-y-5">
        <Detail icon={<Mail strokeWidth={1.5} className="size-[1.125rem]" />} label={contactPage.emailLabel}>
          <a href={mailtoUrl()} className="link-slide inline-flex min-h-11 items-center font-medium [overflow-wrap:anywhere]">
            {site.contact.email}
          </a>
        </Detail>
        <Detail icon={<Clock strokeWidth={1.5} className="size-[1.125rem]" />} label={contactPage.hoursLabel}>
          {site.contact.hours}
        </Detail>
        <Detail icon={<Timer strokeWidth={1.5} className="size-[1.125rem]" />} label={contactPage.responseLabel}>
          {site.contact.responseTime}
        </Detail>
      </dl>
      <div className="mt-6 border-t border-line pt-6">
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses("dark", "fluid", "w-full")}
        >
          <WhatsAppIcon />
          <span>{contactPage.whatsappButton}</span>
        </a>
        <p className="numeral mt-3 text-center text-[0.875rem] text-ink-soft">{site.contact.whatsappDisplay}</p>
      </div>
    </div>
  );
}
