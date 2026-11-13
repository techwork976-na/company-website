import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "dark" | "secondary" | "inverse";
/** "fluid" keeps the same minimum height but lets a long label wrap on small screens. */
type Size = "md" | "sm" | "fluid";

const base =
  "group relative inline-flex select-none items-center justify-center gap-2 rounded-full text-[0.9375rem] font-medium transition-[background-color,border-color,color,box-shadow,scale] duration-[var(--dur-fast)] ease-brand active:scale-[0.98]";

const sizes: Record<Size, string> = {
  md: "h-12 whitespace-nowrap px-6",
  sm: "h-11 whitespace-nowrap px-5",
  fluid: "min-h-12 px-6 py-3 text-center",
};

const variants: Record<Variant, string> = {
  /** Gold: the one main action on a screen. */
  primary: "bg-accent text-ink shadow-button hover:bg-accent-hover",
  /** Jet Black: strong action where gold is already in use nearby. */
  dark: "bg-ink text-surface hover:bg-ink2",
  secondary: "border border-line-strong bg-bg text-ink hover:border-ink hover:bg-surface",
  /** Outline for dark bands. */
  inverse: "border border-line-inverse-strong text-surface hover:border-surface hover:bg-surface/10",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, sizes[size], variants[variant], className);
}

function Arrow() {
  return (
    <ArrowRight
      aria-hidden="true"
      strokeWidth={1.75}
      className="size-4 shrink-0 transition-transform duration-[var(--dur-fast)] ease-brand group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5"
    />
  );
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

/** A call to action rendered as a link. */
export function ButtonLink({
  variant = "primary",
  size = "md",
  arrow = true,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...rest}>
      <span>{children}</span>
      {arrow ? <Arrow /> : null}
    </Link>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
};

export function Button({
  variant = "primary",
  size = "md",
  arrow = true,
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...rest}>
      <span>{children}</span>
      {arrow ? <Arrow /> : null}
    </button>
  );
}
