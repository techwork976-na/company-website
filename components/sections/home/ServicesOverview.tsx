import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { home, serviceCategories, type ServiceCategory } from "@/content/site";
import { motion } from "@/lib/tokens";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import AnimatedContent from "@/components/reactbits/AnimatedContent";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ServiceIcon } from "@/components/ui/ServiceIcon";

function ServiceCard({ category, linkLabel }: { category: ServiceCategory; linkLabel: string }) {
  return (
    <SpotlightCard
      theme="light"
      intensity={1}
      spotlightSize={320}
      borderGlow={1}
      className="group flex h-full flex-col p-6 transition-[box-shadow,translate] duration-[var(--dur-base)] ease-brand hover:-translate-y-0.5 hover:shadow-card has-[a:focus-visible]:shadow-card sm:p-8"
    >
      <div className="flex items-center justify-between">
        <span className="flex size-11 items-center justify-center rounded-ui bg-surface text-ink">
          <ServiceIcon name={category.icon} className="size-5" />
        </span>
        <span className="numeral text-[0.875rem] text-ink-soft">{category.index}</span>
      </div>

      <h3 className="mt-8 text-h3 text-ink">{category.title}</h3>
      <p className="mt-3 max-w-[26rem] text-ink2">{category.summary}</p>

      <ul className="mt-6 space-y-2.5 border-t border-line pt-6">
        {category.highlights.map((name) => (
          <li key={name} className="flex items-center gap-2.5 text-ink2">
            <Check aria-hidden="true" strokeWidth={2} className="size-4 shrink-0 text-ink-soft" />
            {name}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8">
        <Link
          href={`/services#${category.id}`}
          className="inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] font-medium text-ink after:absolute after:inset-0 after:z-[2] after:rounded-card"
        >
          <span className="link-slide link-slide-group">{linkLabel}</span>
          <span className="sr-only">{category.title}</span>
          <ArrowRight
            aria-hidden="true"
            strokeWidth={1.75}
            className="size-4 transition-transform duration-[var(--dur-fast)] ease-brand group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </SpotlightCard>
  );
}

export function ServicesOverview() {
  const content = home.services;
  return (
    <section aria-labelledby="services-title" className="section-y">
      <div className="container-wide">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <SectionLabel index={content.index}>{content.label}</SectionLabel>
            <SplitHeading id="services-title" lines={content.title} className="mt-5 text-h2 text-ink" />
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9 lg:self-end" delay={80}>
            <p className="text-lead text-ink2">{content.intro}</p>
            <ArrowLink href={content.link.href} className="mt-3 text-ink">
              {content.link.label}
            </ArrowLink>
          </Reveal>
        </div>

        {/* Cards rise in one after another (React Bits AnimatedContent). */}
        <AnimatedContent
          distance={16}
          duration={motion.duration.reveal}
          stagger={0.06}
          threshold={0.15}
          className="mt-10 grid grid-cols-1 gap-4 md:gap-5 lg:mt-14 lg:grid-cols-3"
        >
          {serviceCategories.map((category) => (
            <ServiceCard key={category.id} category={category} linkLabel={content.cardLink} />
          ))}
        </AnimatedContent>
      </div>
    </section>
  );
}
