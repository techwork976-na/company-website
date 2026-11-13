import { home, site } from "@/content/site";
import { mailtoUrl } from "@/lib/site-url";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function FinalCta() {
  const content = home.finalCta;
  return (
    <section data-surface="dark" aria-labelledby="cta-title" className="bg-ink text-surface">
      <div className="container-wide section-y">
        <SectionLabel tone="dark">{content.label}</SectionLabel>
        <SplitHeading id="cta-title" lines={content.title} className="mt-6 text-display text-surface" />
        <div className="mt-10 flex flex-col gap-8 lg:mt-14 lg:flex-row lg:items-end lg:justify-between">
          <Reveal as="p" className="max-w-[28rem] text-lead text-surface-soft">
            {content.text}
          </Reveal>
          <Reveal delay={80} className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7">
            <ButtonLink href={content.button.href} className="w-full sm:w-auto">
              {content.button.label}
            </ButtonLink>
            <p className="text-surface-soft">
              {content.emailLabel}{" "}
              <a href={mailtoUrl()} className="link-slide link-inline text-surface">
                {site.contact.email}
              </a>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
