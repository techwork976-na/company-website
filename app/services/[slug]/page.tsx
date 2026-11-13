import { Check, Clock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { serviceDetail, site } from "@/content/site";
import { getAdjacentServices, getService, services } from "@/content/services";
import { cn, cssVars } from "@/lib/cn";
import { pageMetadata } from "@/lib/seo";
import { serviceColors, serviceIcons } from "@/lib/service-style";
import { TechIcon } from "@/lib/tech-icons";
import { MaskedText } from "@/components/motion/MaskedText";
import { PageTransition } from "@/components/motion/PageTransition";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ButtonLink } from "@/components/ui/Button";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

/*
 * Every service page is prerendered and the index links prefetch them, so
 * the page may read `params` without a Suspense placeholder, which keeps
 * the title morph from the index intact.
 */
export const instant = false;

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { robots: { index: false } };
  return pageMetadata({ title: service.title, description: service.summary, path: `/services/${service.slug}` });
}

function SectionHeading({ id, index, title }: { id: string; index: string; title: string }) {
  return (
    <div className="lg:col-span-4">
      <div className="lg:sticky lg:top-[calc(var(--nav-h)+2.5rem)]">
        <p className="numeral text-small font-semibold text-fg-soft">{index}</p>
        <MaskedText id={id} lines={[title]} className="mt-3 text-h3 text-fg" />
      </div>
    </div>
  );
}

/**
 * A service's detail view: what we provide, how we deliver, the tools,
 * what you get and who it suits. Text-first and organised for reading,
 * with the service's colour as the only decoration.
 */
export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const { previous, next } = getAdjacentServices(service.slug);
  const colors = serviceColors[service.color];
  const Icon = serviceIcons[service.icon];
  const total = String(services.length).padStart(2, "0");

  return (
    <PageTransition>
      <article aria-labelledby="service-title">
        <header className="pt-8 pb-16 md:pt-12 lg:pb-24">
          <div className="container-wide">
            <ArrowLink href="/services" direction="left">
              {serviceDetail.backLabel}
            </ArrowLink>

            <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-8">
                <div className="hero-anim hero-rise flex items-center gap-4" style={cssVars({ "--d": "0ms" })}>
                  <span className={cn("flex size-14 items-center justify-center rounded-2xl", colors.bg, colors.fg)}>
                    <Icon aria-hidden="true" strokeWidth={1.75} className="size-7" />
                  </span>
                  <span className="numeral text-small font-semibold text-fg-soft">
                    {service.index} {serviceDetail.ofLabel} {total}
                  </span>
                </div>
                <ViewTransition name={`service-title-${service.slug}`} share="morph" default="none">
                  <h1 id="service-title" className="mt-8 w-fit text-h1 text-fg">
                    {service.title}
                  </h1>
                </ViewTransition>
                <p
                  className="hero-anim hero-rise mt-8 max-w-[44rem] text-lead text-fg-soft"
                  style={cssVars({ "--d": "200ms" })}
                >
                  {service.intro}
                </p>
              </div>

              <dl
                className="hero-anim hero-rise grid grid-cols-2 gap-px self-end overflow-hidden rounded-card bg-line lg:col-span-4 lg:grid-cols-1"
                style={cssVars({ "--d": "300ms" })}
              >
                <div className="bg-raise p-5">
                  <dt className="eyebrow flex items-center gap-2 text-fg-soft">
                    <Clock aria-hidden="true" className="size-3.5" />
                    {serviceDetail.timelineLabel}
                  </dt>
                  <dd className="mt-2 font-display text-title font-bold text-fg">{service.timeline}</dd>
                </div>
                <div className="bg-raise p-5">
                  <dt className="eyebrow text-fg-soft">{serviceDetail.provideTitle}</dt>
                  <dd className="mt-2 font-display text-title font-bold text-fg">
                    {service.offerings.length} capabilities · {service.delivery.length} steps
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </header>

        {/* What we provide */}
        <section aria-labelledby="provide-title" className="pb-[var(--section-y)]">
          <div className="container-wide">
            <div className="grid grid-cols-1 gap-10 border-t border-line pt-12 lg:grid-cols-12 lg:gap-10 lg:pt-16">
              <SectionHeading id="provide-title" index="01" title={serviceDetail.provideTitle} />
              <Stagger as="ul" stagger={50} className="grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:col-span-8">
                {service.offerings.map((offering, index) => (
                  <StaggerItem
                    as="li"
                    key={offering.title}
                    index={index}
                    className="border-t border-line py-6 first:border-t-0 sm:[&:nth-child(2)]:border-t-0"
                  >
                    <span aria-hidden="true" className={cn("block h-1 w-8 rounded-full", colors.bg)} />
                    <h3 className="mt-4 font-display text-title font-bold text-fg">{offering.title}</h3>
                    <p className="mt-2 text-fg-soft">{offering.text}</p>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </section>

        {/* How we deliver */}
        <section aria-labelledby="deliver-title" className="section-y">
          <div className="container-wide grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-10">
            <SectionHeading id="deliver-title" index="02" title={serviceDetail.deliverTitle} />
            <ol className="lg:col-span-8">
              {service.delivery.map((step, index) => (
                <Reveal
                  as="li"
                  key={step.title}
                  delay={index * 60}
                  className="grid grid-cols-[3.5rem_1fr] gap-x-5 border-t border-line py-8 first:border-t-0 first:pt-0 md:grid-cols-[6rem_1fr]"
                >
                  <span className="font-display text-[clamp(2.5rem,1.8rem+2.4vw,4rem)] leading-[0.85] font-extrabold tracking-[-0.05em] text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-h3 text-fg">{step.title}</h3>
                    <p className="mt-3 max-w-[36rem] text-lead text-fg-soft">{step.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* Technologies, deliverables and fit */}
        <section aria-labelledby="stack-title" className="section-y">
          <div className="container-wide grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-10">
            <SectionHeading id="stack-title" index="03" title={serviceDetail.stackTitle} />
            <div className="lg:col-span-8">
              <Stagger as="ul" stagger={40} className="flex flex-wrap gap-2.5">
                {service.stack.map((tool, index) => (
                  <StaggerItem
                    as="li"
                    key={tool}
                    index={index}
                    className="inline-flex h-12 items-center gap-2.5 rounded-full border border-line bg-raise pr-5 pl-1.5 font-semibold text-fg"
                  >
                    <span className="flex size-9 items-center justify-center rounded-full bg-canvas">
                      <TechIcon name={tool} />
                    </span>
                    {tool}
                  </StaggerItem>
                ))}
              </Stagger>

              <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-10">
                <Reveal>
                  <h2 className="font-display text-title font-bold text-fg">{serviceDetail.getTitle}</h2>
                  <ul className="mt-5 space-y-3">
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex gap-3 text-fg">
                        <span
                          className={cn(
                            "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full",
                            colors.bg,
                            colors.fg,
                          )}
                        >
                          <Check aria-hidden="true" strokeWidth={2.5} className="size-3.5" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal delay={80}>
                  <h2 className="font-display text-title font-bold text-fg">{serviceDetail.fitTitle}</h2>
                  <ul className="mt-5 space-y-3">
                    {service.idealFor.map((item) => (
                      <li key={item} className="flex gap-3 text-fg-soft">
                        <span aria-hidden="true" className="mt-2.5 h-0.5 w-4 shrink-0 bg-fg" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Call to action and neighbours */}
        <section aria-labelledby="service-cta-title" className="pt-[var(--section-y)] pb-10">
          <div className="container-wide">
            <MaskedText
              id="service-cta-title"
              lines={[serviceDetail.ctaTitle(service.title)]}
              className="max-w-[20ch] text-h2 text-fg"
            />
            <Reveal className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <p className="max-w-[34rem] text-lead text-fg-soft">{serviceDetail.ctaText}</p>
              <ButtonLink href={`/contact?service=${service.slug}`} className="w-full justify-between sm:w-auto">
                {serviceDetail.ctaLabel}
              </ButtonLink>
            </Reveal>

            <nav
              aria-label={site.ui.mainNavLabel}
              className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-card bg-line"
            >
              {[
                { label: serviceDetail.previousLabel, item: previous, align: "text-left" },
                { label: serviceDetail.nextLabel, item: next, align: "text-right" },
              ].map(({ label, item, align }) => (
                <Link
                  key={label}
                  href={`/services/${item.slug}`}
                  prefetch
                  className={cn(
                    "group bg-raise p-5 transition-colors duration-[var(--dur-base)] hover:bg-accent hover:text-on-accent md:p-7",
                    align,
                  )}
                >
                  <span className="eyebrow block opacity-75">{label}</span>
                  <span className="mt-2 block font-display text-[clamp(1.125rem,0.9rem+1vw,1.75rem)] leading-tight font-bold">
                    {item.title}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </section>
      </article>
    </PageTransition>
  );
}
