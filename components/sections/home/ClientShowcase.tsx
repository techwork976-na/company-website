import { home } from "@/content/site";
import { MaskedText } from "@/components/motion/MaskedText";
import { Reveal } from "@/components/motion/Reveal";
import { BrandLogo } from "@/components/ui/BrandMark";
import { Eyebrow } from "@/components/ui/Eyebrow";

/** Solid NOVARY colours for the cards, with a logo colour that reads on each. */
const cardColors: Record<string, string> = {
  Nexora: "bg-violet text-white",
  "Vertex Labs": "bg-coral text-ink",
  "Orbit Solutions": "bg-sky text-ink",
  "Elevate Digital": "bg-emerald text-white",
  Cloudnest: "bg-periwinkle text-ink",
  PixelCraft: "bg-rose text-ink",
  "Flux Technologies": "bg-sun text-ink",
  "Beyond Commerce": "bg-lime text-ink",
};

/**
 * Client showcase as an accordion of brand cards. Each card is a fixed,
 * rectangular colour block holding only the brand's logo, centred. On
 * hover a card widens smoothly (to about w-72) while the others narrow, and
 * its logo scales up slightly. Pure CSS (globals.css, "Client showcase"):
 * no scroll animation and no JavaScript. On small screens the cards sit in
 * a swipeable row at a fixed size.
 */
export function ClientShowcase() {
  const content = home.clients;

  return (
    <section aria-labelledby="clients-title" className="relative pt-[calc(var(--section-y)*0.5)]">
      <div className="container-wide">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <MaskedText id="clients-title" lines={content.title} className="mt-6 text-h2 text-fg" />
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={120}>
            <p className="text-lead text-fg-soft">{content.description}</p>
          </Reveal>
        </div>

        <div className="client-cards-scroller -mx-[var(--gutter)] mt-12 overflow-x-auto px-[var(--gutter)] lg:mx-0 lg:mt-16 lg:overflow-visible lg:px-0">
          <ul aria-label={content.listLabel} className="flex gap-3 lg:h-80">
            {content.brands.map((brand) => (
              <li
                key={brand}
                className={`client-card flex h-72 w-36 shrink-0 snap-start items-center justify-center overflow-hidden rounded-card p-4 lg:h-full lg:w-auto lg:min-w-0 lg:shrink lg:p-5 ${cardColors[brand] ?? "bg-violet text-white"}`}
              >
                <BrandLogo name={brand} className="client-card__logo h-auto w-full max-w-[7.5rem]" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
