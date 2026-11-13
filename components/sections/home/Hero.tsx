import { Fragment } from "react";
import { home } from "@/content/site";
import { cssVars } from "@/lib/cn";
import Magnet from "@/components/reactbits/Magnet";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { IsoBlocks } from "./IsoBlocks";

/** Splits a line so the highlight word can be drawn in the accent colour. */
function Line({ line, highlight }: { line: string; highlight: string }) {
  const parts = line.split(highlight);
  if (parts.length === 1) return <>{line}</>;
  return (
    <>
      {parts.map((part, index) => (
        <Fragment key={index}>
          {part}
          {index < parts.length - 1 ? (
            <span className="relative inline-block text-violet">
              {highlight}
              <span
                aria-hidden="true"
                className="absolute inset-x-[0.04em] bottom-[0.04em] -z-10 h-[0.22em] rounded-[2px] bg-lime"
              />
            </span>
          ) : null}
        </Fragment>
      ))}
    </>
  );
}

/**
 * Hero: one strong headline, a short promise, two actions, and the
 * isometric building blocks. Everything enters with CSS on page load,
 * so it never waits for JavaScript.
 */
export function Hero() {
  const content = home.hero;
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div className="container-wide grid grid-cols-1 items-center gap-x-10 gap-y-12 pt-10 pb-16 md:pt-16 lg:min-h-[calc(100svh-var(--nav-h))] lg:grid-cols-12 lg:pt-8 lg:pb-20">
        <div className="lg:col-span-8">
          <div className="hero-anim hero-rise" style={cssVars({ "--d": "0ms" })}>
            <Eyebrow>{content.eyebrow}</Eyebrow>
          </div>

          <h1
            id="hero-title"
            className="mt-7 font-display text-[clamp(2.75rem,1rem+5vw,6.25rem)] leading-[0.94] font-extrabold tracking-[-0.05em] text-fg"
          >
            {content.title.map((line, index) => (
              <Fragment key={line}>
                <span className="mask-line hero-line">
                  <span className="hero-anim" style={cssVars({ "--i": index })}>
                    <Line line={line} highlight={content.highlight} />
                  </span>
                </span>
                {index < content.title.length - 1 ? " " : null}
              </Fragment>
            ))}
          </h1>

          <p
            className="hero-anim hero-rise mt-8 max-w-[34rem] text-lead text-fg-soft"
            style={cssVars({ "--d": "320ms" })}
          >
            {content.description}
          </p>

          <div
            className="hero-anim hero-rise mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={cssVars({ "--d": "420ms" })}
          >
            <Magnet padding={50} magnetStrength={6} wrapperClassName="w-full sm:w-auto">
              <ButtonLink href={content.primary.href} className="w-full justify-between sm:w-auto">
                {content.primary.label}
              </ButtonLink>
            </Magnet>
            <ButtonLink
              href={content.secondary.href}
              variant="outline"
              arrow="down"
              className="w-full justify-between sm:w-auto"
            >
              {content.secondary.label}
            </ButtonLink>
          </div>

          <p
            className="hero-anim hero-fade mt-10 flex items-center gap-3 text-small font-medium text-fg-soft"
            style={cssVars({ "--d": "560ms" })}
          >
            <span aria-hidden="true" className="h-px w-10 bg-line-strong" />
            {content.support}
          </p>
        </div>

        <div className="mx-auto w-full max-w-[30rem] lg:col-span-4 lg:max-w-none lg:translate-x-4 xl:scale-110">
          <IsoBlocks label={content.visualLabel} />
        </div>
      </div>
    </section>
  );
}
