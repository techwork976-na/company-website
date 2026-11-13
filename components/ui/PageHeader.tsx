import type { ReactNode } from "react";
import { cssVars } from "@/lib/cn";
import { MaskedText } from "@/components/motion/MaskedText";
import { SectionLabel } from "./SectionLabel";

type PageHeaderProps = {
  label: string;
  title: readonly string[];
  intro?: string;
  children?: ReactNode;
};

/** Opening block of an inner page: label, masked h1 and intro, played on load. */
export function PageHeader({ label, title, intro, children }: PageHeaderProps) {
  return (
    <div className="container-wide pt-12 pb-10 md:pt-16 lg:pt-20 lg:pb-14">
      <div className="hero-anim hero-rise" style={cssVars({ "--d": "0ms" })}>
        <SectionLabel>{label}</SectionLabel>
      </div>
      <MaskedText as="h1" trigger="load" lines={title} delay={40} className="mt-6 text-h1 text-ink" />
      {intro ? (
        <p className="hero-anim hero-rise mt-5 max-w-[36rem] text-lead text-ink2 lg:mt-6" style={cssVars({ "--d": "160ms" })}>
          {intro}
        </p>
      ) : null}
      {children}
    </div>
  );
}
