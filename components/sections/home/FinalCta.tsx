import { home } from "@/content/site";
import { services } from "@/content/services";
import { cssVars } from "@/lib/cn";
import { MaskedText } from "@/components/motion/MaskedText";
import { Reveal } from "@/components/motion/Reveal";
import Magnet from "@/components/reactbits/Magnet";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

function ServiceRun({ hidden }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden ? "true" : undefined} className="flex shrink-0 items-center">
      {services.map((service) => (
        <li key={service.slug} className="flex items-center">
          <span className="px-6 font-display text-[clamp(2.5rem,1.5rem+4vw,5.5rem)] leading-none font-extrabold tracking-[-0.045em] whitespace-nowrap md:px-10">
            {service.shortTitle}
          </span>
          <span aria-hidden="true" className="size-3 rotate-45 rounded-[2px] bg-accent md:size-4" />
        </li>
      ))}
    </ul>
  );
}

/** The closing invitation on violet, with a slow river of service names underneath. */
export function FinalCta() {
  const content = home.finalCta;
  return (
    <section
     
      aria-labelledby="cta-title"
      className="relative overflow-hidden pt-[var(--section-y)] pb-12 md:pb-16"
    >
      <div className="container-wide">
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <MaskedText id="cta-title" lines={content.title} className="mt-6 text-h1 text-fg" />
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-6">
            <p className="text-lead text-fg-soft">{content.description}</p>
            <p className="mt-4 text-small font-medium text-fg-soft">{content.support}</p>
          </Reveal>
          <Reveal className="flex flex-col gap-3 sm:flex-row lg:col-span-6 lg:justify-end" delay={100}>
            <Magnet padding={50} magnetStrength={6} wrapperClassName="w-full sm:w-auto">
              <ButtonLink href={content.primary.href} className="w-full justify-between sm:w-auto">
                {content.primary.label}
              </ButtonLink>
            </Magnet>
            <ButtonLink href={content.secondary.href} variant="outline" className="w-full justify-between sm:w-auto">
              {content.secondary.label}
            </ButtonLink>
          </Reveal>
        </div>
      </div>

      <div
        className="marquee mt-20 border-y border-line py-8 md:mt-28 md:py-10"
        style={cssVars({ "--marquee-duration": "70s" })}
      >
        <div className="marquee__track text-fg">
          <ServiceRun />
          <ServiceRun hidden />
        </div>
      </div>
    </section>
  );
}
