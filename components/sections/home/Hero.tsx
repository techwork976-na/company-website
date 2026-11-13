import { home, serviceCategories } from "@/content/site";
import { cssVars } from "@/lib/cn";
import { MaskedText } from "@/components/motion/MaskedText";
import Magnet from "@/components/reactbits/Magnet";
import { ButtonLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { HeroShowcase } from "./HeroShowcase";

export function Hero() {
  const { hero } = home;
  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="container-wide grid grid-cols-12 gap-x-4 pt-10 pb-16 md:gap-x-6 md:pt-14 lg:min-h-[calc(100svh-var(--nav-h))] lg:content-center lg:gap-x-8 lg:py-14">
        <div className="col-span-12 flex flex-col items-start lg:col-span-7 lg:self-center">
          <div className="hero-anim hero-rise" style={cssVars({ "--d": "0ms" })}>
            <SectionLabel>{hero.label}</SectionLabel>
          </div>
          {/* The headline stays pure CSS so the largest paint never waits for JavaScript. */}
          <MaskedText
            as="h1"
            id="hero-title"
            trigger="load"
            lines={hero.headline}
            delay={40}
            className="mt-6 text-display text-ink lg:text-[clamp(3.5rem,0.6rem+5.4vw,5.75rem)]"
          />
          <p
            className="hero-anim hero-rise mt-6 max-w-[34rem] text-lead text-ink2 lg:mt-8"
            style={cssVars({ "--d": "200ms" })}
          >
            {hero.subtext}
          </p>
          <div
            className="hero-anim hero-rise mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
            style={cssVars({ "--d": "260ms" })}
          >
            <Magnet padding={48} magnetStrength={7} wrapperClassName="w-full sm:w-auto" innerClassName="w-full">
              <ButtonLink href={hero.primaryCta.href} className="w-full sm:w-auto">
                {hero.primaryCta.label}
              </ButtonLink>
            </Magnet>
            <ButtonLink href={hero.secondaryCta.href} variant="secondary" className="w-full sm:w-auto">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
          <ul
            className="hero-anim hero-fade mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-5 text-[0.875rem] text-ink-soft lg:mt-12"
            style={cssVars({ "--d": "340ms" })}
          >
            {serviceCategories.map((category) => (
              <li key={category.id} className="inline-flex items-center gap-2">
                <ServiceIcon name={category.icon} className="size-4 text-ink" />
                {category.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-12 mt-12 sm:mx-auto sm:w-full sm:max-w-xl lg:col-span-5 lg:mx-0 lg:mt-0 lg:max-w-none lg:self-center">
          <HeroShowcase index={hero.figure.index} caption={hero.figure.caption} />
        </div>
      </div>
    </section>
  );
}
