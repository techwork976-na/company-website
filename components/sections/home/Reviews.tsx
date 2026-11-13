import { home } from "@/content/site";
import { cn } from "@/lib/cn";
import { MaskedText } from "@/components/motion/MaskedText";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

/* Google-inspired touches only: the four-colour palette, yellow stars and
   initial avatars. No Google logo, and no claim that reviews are verified. */
const avatarColors = ["#4285F4", "#EA4335", "#34A853", "#FBBC04", "#4285F4", "#EA4335"];
const avatarText = ["text-white", "text-white", "text-white", "text-ink", "text-white", "text-white"];
const STAR = "#FBBC04";

function Stars({ size = "size-4" }: { size?: string }) {
  return (
    <span className="flex gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }, (_, index) => (
        <svg key={index} viewBox="0 0 20 20" className={size} fill={STAR}>
          <path d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6L10 15l-5.4 3 1.2-6L1.3 7.8l6.1-.7z" />
        </svg>
      ))}
    </span>
  );
}

/**
 * Reviews: a rating summary on the left, and the reviews in two offset
 * columns of typography (no photos, no card grid).
 */
export function Reviews() {
  const content = home.reviews;
  const renderReview = (review: (typeof content.items)[number], index: number) => {
    return (
      // Even items sit lower on wide screens, so the two columns are offset.
      <Reveal
        as="li"
        key={review.name}
        delay={(index % 2) * 60 + Math.floor(index / 2) * 80}
        className="md:even:translate-y-20"
      >
        <figure className="rounded-card bg-raise p-6 md:p-7">
          <figcaption className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-full font-display text-[1rem] font-bold",
                avatarText[index],
              )}
              style={{ backgroundColor: avatarColors[index] }}
            >
              {review.name[0]}
            </span>
            <span className="min-w-0">
              <span className="block font-semibold text-fg">{review.name}</span>
              <span className="block text-small text-fg-soft">{review.location}</span>
            </span>
          </figcaption>
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
            <Stars />
            <span className="sr-only">Rated 5 out of 5.</span>
            <span className="text-small text-fg-soft">{review.service}</span>
          </div>
          <blockquote className="mt-3 text-[1.0625rem] leading-relaxed text-fg">
            <p>&ldquo;{review.text}&rdquo;</p>
          </blockquote>
        </figure>
      </Reveal>
    );
  };

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="section-y relative">
      <div className="container-wide grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+3rem)]">
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <MaskedText id="reviews-title" lines={content.title} className="mt-6 text-h2 text-fg" />
            <Reveal delay={100}>
              <p className="mt-6 text-lead text-fg-soft">{content.description}</p>
              <div className="mt-10 rounded-card bg-raise p-6">
                <span aria-hidden="true" className="flex h-1 overflow-hidden rounded-full">
                  <span className="flex-1 bg-[#4285F4]" />
                  <span className="flex-1 bg-[#EA4335]" />
                  <span className="flex-1 bg-[#FBBC04]" />
                  <span className="flex-1 bg-[#34A853]" />
                </span>
                <p className="eyebrow mt-5 text-fg-soft">{content.ratingLabel}</p>
                <div className="mt-2 flex items-center gap-4">
                  <span className="font-display text-[3.5rem] leading-none font-extrabold tracking-[-0.04em] text-fg">
                    5.0
                  </span>
                  <span>
                    <Stars size="size-5" />
                    <span className="sr-only">5 out of 5 stars.</span>
                    <span className="mt-1 block text-small text-fg-soft">{content.basedOn(content.items.length)}</span>
                  </span>
                </div>
                <ul aria-hidden="true" className="mt-5 space-y-1.5">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <li key={stars} className="flex items-center gap-3 text-small text-fg-soft">
                      <span className="numeral w-3">{stars}</span>
                      <span className="h-2 flex-1 overflow-hidden rounded-full bg-line">
                        <span
                          className="block h-full rounded-full"
                          style={{ width: stars === 5 ? "100%" : "0%", backgroundColor: STAR }}
                        />
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-[0.8125rem] text-fg-soft">{content.disclaimer}</p>
              </div>
            </Reveal>
          </div>
        </div>

        <ul className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 md:gap-5 md:pb-20 lg:col-span-8">
          {content.items.map((review, index) => renderReview(review, index))}
        </ul>
      </div>
    </section>
  );
}
