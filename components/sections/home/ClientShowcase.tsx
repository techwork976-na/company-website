import { home } from "@/content/site";
import { cssVars } from "@/lib/cn";
import { MaskedText } from "@/components/motion/MaskedText";
import { Reveal } from "@/components/motion/Reveal";
import { BrandMark, brandColors } from "@/components/ui/BrandMark";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * Client showcase as a slowly turning dial. Only the top of a very large
 * wheel is visible, so brand wordmarks rise over the horizon and set again,
 * with a precision tick ring turning with them. Pure CSS: it keeps running
 * smoothly without JavaScript. Hover pauses it and lights up a brand.
 */
export function ClientShowcase() {
  const content = home.clients;
  // Two laps of the eight brands around the wheel.
  const items = [...content.brands, ...content.brands];

  return (
    <section data-tone="paper" aria-labelledby="clients-title" className="relative pt-[calc(var(--section-y)*0.5)]">
      <div className="container-wide grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
        <div className="lg:col-span-7">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <MaskedText id="clients-title" lines={content.title} className="mt-6 text-h2 text-fg" />
        </div>
        <Reveal className="lg:col-span-4 lg:col-start-9" delay={120}>
          <p className="text-lead text-fg-soft">{content.description}</p>
        </Reveal>
      </div>

      <Reveal variant="fade" className="dial mt-10 lg:mt-14">
        <div className="dial__wheel">
          <span aria-hidden="true" className="dial__ring" />
          <span aria-hidden="true" className="dial__ticks" />
          <span aria-hidden="true" className="dial__ring dial__ring--inner" />
          <ul aria-label={content.listLabel} className="contents">
            {items.map((brand, index) => {
              const { color, ink } = brandColors(brand);
              const duplicate = index >= content.brands.length;
              return (
                <li
                  key={`${brand}-${index}`}
                  aria-hidden={duplicate ? "true" : undefined}
                  className="dial__item"
                  style={cssVars({ "--i": index, "--n": items.length })}
                >
                  <span
                    className="dial__brand flex items-center gap-3 whitespace-nowrap"
                    style={cssVars({ "--brand": color, "--brand-ink": ink })}
                  >
                    <span
                      className="dial__brand-mark flex size-11 items-center justify-center rounded-[0.875rem] border border-line bg-raise md:size-12"
                      style={{ color }}
                    >
                      <BrandMark name={brand} className="size-6" />
                    </span>
                    <span className="font-display text-[1.375rem] font-bold tracking-[-0.035em] text-fg md:text-[1.75rem]">
                      {brand}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
