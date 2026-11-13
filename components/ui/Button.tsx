import { ArrowDown, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "accent" | "solid" | "outline";
type Size = "md" | "sm";
type Arrow = "up-right" | "down" | "none";

const base =
  "group relative inline-flex select-none items-center justify-center gap-3 rounded-full font-semibold tracking-[-0.01em] transition-[background-color,border-color,color,scale] duration-[var(--dur-fast)] ease-brand active:scale-[0.98]";

const sizes: Record<Size, string> = {
  md: "h-14 pl-7 pr-2 text-[1rem]",
  sm: "h-11 pl-5 pr-1.5 text-[0.9375rem]",
};

/** Colours come from the current journey tone, so a button fits any section. */
const variants: Record<Variant, string> = {
  accent: "bg-accent text-on-accent hover:bg-[color-mix(in_srgb,var(--c-accent)_86%,var(--c-fg))]",
  solid: "bg-fg text-canvas hover:bg-[color-mix(in_srgb,var(--c-fg)_86%,var(--c-bg))]",
  outline: "border-[1.5px] border-line-strong text-fg hover:border-fg",
};

/** The small round badge that carries the arrow. */
const badges: Record<Variant, string> = {
  accent: "bg-on-accent text-accent",
  solid: "bg-canvas text-fg",
  outline: "bg-fg text-canvas",
};

const badgeSizes: Record<Size, string> = { md: "size-10", sm: "size-8" };

export function buttonClasses(variant: Variant = "accent", size: Size = "md", className?: string) {
  return cn(base, sizes[size], variants[variant], className);
}

function ArrowBadge({ arrow, variant, size }: { arrow: Arrow; variant: Variant; size: Size }) {
  if (arrow === "none") return null;
  const Icon = arrow === "down" ? ArrowDown : ArrowUpRight;
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-full",
        badges[variant],
        badgeSizes[size],
      )}
    >
      <Icon
        strokeWidth={2}
        className={cn(
          "size-[1.0625rem] transition-transform duration-[var(--dur-slow)] ease-brand",
          arrow === "down"
            ? "group-hover:translate-y-0.5 group-focus-visible:translate-y-0.5"
            : "group-hover:rotate-45 group-focus-visible:rotate-45",
        )}
      />
    </span>
  );
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  size?: Size;
  arrow?: Arrow;
  className?: string;
  children: ReactNode;
};

/** A call to action rendered as a link. */
export function ButtonLink({
  variant = "accent",
  size = "md",
  arrow = "up-right",
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link className={buttonClasses(variant, size, cn(arrow === "none" && "pr-7", className))} {...rest}>
      <span>{children}</span>
      <ArrowBadge arrow={arrow} variant={variant} size={size} />
    </Link>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  arrow?: Arrow;
};

export function Button({
  variant = "accent",
  size = "md",
  arrow = "up-right",
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={buttonClasses(variant, size, cn(arrow === "none" && "pr-7", className))} {...rest}>
      <span>{children}</span>
      <ArrowBadge arrow={arrow} variant={variant} size={size} />
    </button>
  );
}
