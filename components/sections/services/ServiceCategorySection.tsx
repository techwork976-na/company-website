import type { ServiceCategory } from "@/content/site";
import { servicesPage } from "@/content/site";
import { cn } from "@/lib/cn";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ServiceIcon } from "@/components/ui/ServiceIcon";

type ServiceCategorySectionProps = {
  category: ServiceCategory;
  tone: "surface" | "bg";
};

export function ServiceCategorySection({ category, tone }: ServiceCategorySectionProps) {
  const titleId = `${category.id}-title`;
  return (
    <section
      id={category.id}
      tabIndex={-1}
      aria-labelledby={titleId}
      className={cn("anchor-offset section-y outline-none", tone === "surface" ? "bg-surface" : "bg-bg")}
    >
      <div className="container-wide">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <SectionLabel index={category.index}>{`${category.services.length} services`}</SectionLabel>
            <SplitHeading id={titleId} lines={[category.title]} className="mt-5 text-h2 text-ink" />
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9 lg:self-end" delay={80}>
            <p className="text-lead text-ink2">{category.intro}</p>
          </Reveal>
        </div>

        <Stagger as="ul" className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:mt-14 lg:grid-cols-3">
          {category.services.map((service, index) => (
            <StaggerItem as="li" key={service.title} index={index}>
              <SpotlightCard theme="light" intensity={1} spotlightSize={260} className="group flex h-full flex-col p-6 transition-[box-shadow,translate] duration-[var(--dur-base)] ease-brand hover:-translate-y-0.5 hover:shadow-card has-[a:focus-visible]:shadow-card lg:p-7">
                <span className="flex size-11 items-center justify-center rounded-ui bg-surface text-ink">
                  <ServiceIcon name={service.icon} className="size-5" />
                </span>
                <h3 className="mt-6 text-title text-ink">{service.title}</h3>
                <p className="mt-2 text-ink2">{service.description}</p>
                <div className="mt-auto pt-6">
                  <ArrowLink
                    href={`/contact?service=${category.id}`}
                    className="text-ink after:absolute after:inset-0 after:z-[2] after:rounded-card"
                  >
                    {servicesPage.quoteLabel}
                    <span className="sr-only">{` for ${service.title}`}</span>
                  </ArrowLink>
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
