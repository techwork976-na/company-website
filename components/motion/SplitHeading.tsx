import SplitText from "@/components/reactbits/SplitText";
import { motion } from "@/lib/tokens";

type SplitHeadingProps = {
  /** Each entry is one line of the heading, so the line breaks stay designed. */
  lines: readonly string[];
  as?: "h2" | "h3";
  id?: string;
  className?: string;
};

/**
 * Section heading that reveals word by word as it scrolls into view
 * (React Bits SplitText on GSAP). It is a real heading element with one
 * block per line. Site defaults: a short rise, 0.4s per word, 35ms apart.
 * Headings already on screen at load are left alone.
 */
export function SplitHeading({ lines, as: Tag = "h2", id, className }: SplitHeadingProps) {
  return (
    <Tag id={id} className={className}>
      {lines.map((line, index) => (
        <SplitText
          key={`${index}-${line}`}
          tag="span"
          text={line}
          splitType="words"
          textAlign="left"
          delay={35}
          duration={motion.duration.reveal}
          ease="power3.out"
          from={{ opacity: 0, y: 14 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.15}
          rootMargin="0px"
        />
      ))}
    </Tag>
  );
}
