import { home } from "@/content/site";
import { CountUp } from "@/components/motion/CountUp";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";

export function TrustStrip() {
  const { stats } = home;
  return (
    <section aria-label={stats.label} className="border-y border-line bg-surface">
      <div className="container-wide py-12 lg:py-16">
        <Reveal>
          <dl className="grid grid-cols-3 divide-x divide-line overflow-hidden rounded-card border border-line bg-bg">
            {stats.items.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse justify-end gap-2 p-4 sm:p-6 lg:p-8">
                <dt className="text-[0.875rem] leading-snug text-ink-soft sm:text-body">{stat.label}</dt>
                <dd className="text-[clamp(2rem,1.3rem+3.2vw,4rem)] leading-none font-semibold tracking-[-0.045em] text-ink">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </dd>
              </div>
            ))}
          </dl>
          {stats.placeholder ? <p className="mt-4 text-[0.875rem] text-ink-soft">{stats.note}</p> : null}
        </Reveal>
      </div>
      <div className="border-t border-line">
        <Marquee
          items={home.marquee.items}
          label={home.marquee.label}
          pauseLabel={home.marquee.pauseLabel}
          playLabel={home.marquee.playLabel}
          className="text-[1.0625rem] font-medium tracking-[-0.01em] text-ink2 lg:text-[1.125rem]"
        />
      </div>
    </section>
  );
}
