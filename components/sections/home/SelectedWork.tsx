import { projects } from "@/content/projects";
import { home } from "@/content/site";
import { motion } from "@/lib/tokens";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import FadeContent from "@/components/reactbits/FadeContent";
import { ButtonLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WorkList } from "./WorkList";

export function SelectedWork() {
  const content = home.work;
  return (
    <section data-surface="dark" aria-labelledby="work-title" className="section-y bg-ink text-surface">
      <div className="container-wide">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionLabel index={content.index} tone="dark">
              {content.label}
            </SectionLabel>
            <SplitHeading id="work-title" lines={content.title} className="mt-5 text-h2 text-surface" />
          </div>
          <Reveal delay={80} className="shrink-0">
            <ButtonLink href={content.link.href} variant="inverse">
              {content.link.label}
            </ButtonLink>
          </Reveal>
        </div>
        {/* The list fades in as it scrolls into view (React Bits FadeContent). */}
        <FadeContent duration={motion.duration.reveal} threshold={0.1} className="mt-10 lg:mt-14">
          <WorkList projects={projects.slice(0, 3)} />
        </FadeContent>
      </div>
    </section>
  );
}
