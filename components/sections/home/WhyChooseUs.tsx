import { home } from "@/content/site";
import { cn } from "@/lib/cn";
import { MaskedText } from "@/components/motion/MaskedText";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

const accents = ["bg-violet", "bg-coral", "bg-emerald", "bg-sky", "bg-sun"];
/** Each point steps further in, so the list rises like a ladder towards "Designed to Grow". */
const steps = ["lg:ml-0", "lg:ml-[8%]", "lg:ml-[16%]", "lg:ml-[24%]", "lg:ml-[32%]"];

/**
 * Why choose us: five points as a rising ladder of typography instead of
 * cards. Each point has its own colour block, and they step diagonally
 * across the page in reading order.
 */
export function WhyChooseUs() {
  const content = home.why;
  return (
    <section id="difference" aria-labelledby="why-title" className="section-y relative">
      <div className="container-wide">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <MaskedText id="why-title" lines={content.title} className="mt-6 text-h2 text-fg" />
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={120}>
            <p className="text-lead text-fg-soft">{content.description}</p>
          </Reveal>
        </div>

        <ol className="mt-16 space-y-4 lg:mt-24 lg:space-y-5">
          {content.points.map((point, index) => (
            <li key={point.title} className={cn("lg:max-w-[68%]", steps[index])}>
              <Reveal delay={index * 70}>
                <div className="grid grid-cols-[auto_1fr] items-start gap-x-5 rounded-card bg-raise p-6 transition-transform duration-[var(--dur-slow)] ease-brand hover:-translate-y-1 md:grid-cols-[auto_1fr_1fr] md:items-center md:gap-x-8 md:p-7">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex size-12 items-center justify-center rounded-[0.875rem] font-display text-[1.25rem] font-extrabold md:size-14",
                      accents[index],
                      index === 0 || index === 2 ? "text-white" : "text-ink",
                    )}
                  >
                    {index + 1}
                  </span>
                  <h3 className="font-display text-title font-bold text-fg md:text-[1.75rem] md:leading-[1.1] md:tracking-[-0.03em]">
                    {point.title}
                  </h3>
                  <p className="col-start-2 mt-2 text-fg-soft md:col-start-3 md:mt-0">{point.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
