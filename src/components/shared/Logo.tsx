import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { AnchorHTMLAttributes } from "react";

type SizeKey = "xs" | "sm" | "md" | "lg" | "xl";

export type LogoProps = {
  /** show/hide the wordmark */
  showText?: boolean;
  /** size preset */
  size?: SizeKey;
  /** extra classes for the root element */
  className?: string;
  /** aria-label override (defaults to "StackFlow") */
  ariaLabel?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const SIZE_MAP: Record<SizeKey, { icon: string; text: string; gap: string }> = {
  xs: { icon: "h-5 w-5", text: "text-sm", gap: "gap-1" },
  sm: { icon: "h-6 w-6", text: "text-sm", gap: "gap-2" },
  md: { icon: "h-8 w-8", text: "text-base", gap: "gap-3" },
  lg: { icon: "h-10 w-10", text: "text-lg", gap: "gap-3" },
  xl: { icon: "h-12 w-12", text: "text-xl", gap: "gap-4" },
};

const Logo = React.forwardRef<HTMLAnchorElement, LogoProps>(
  (
    { showText = true, size = "md", className, ariaLabel = "StackFlow", ...props },
    ref
  ) => {
    const sizes = SIZE_MAP[size] ?? SIZE_MAP.md;

    return (
      <Link
        href="/"
        ref={ref}
        aria-label={ariaLabel}
        className={cn(
          "inline-flex items-center font-semibold leading-none select-none no-underline",
          sizes.gap,
          className
        )}
        {...props}
      >
        {/* SVG mark: geometric S+F stack - simple, scalable */}
        <svg
          viewBox="0 0 64 64"
          role="img"
          aria-hidden={ariaLabel ? "false" : "true"}
          className={cn("flex-none", sizes.icon)}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="64" height="64" rx="12" fill="currentColor" opacity="0.08" />

          {/* Stylized S */}
          <path
            d="M20 22c0-3.314 2.686-6 6-6h12c3.314 0 6 2.686 6 6v0c0 3.314-2.686 6-6 6H30c-3.314 0-6 2.686-6 6v0c0 3.314 2.686 6 6 6h12"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Small stack line to suggest "flow" */}
          <path
            d="M16 44h32"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>

        {/* Wordmark */}
        {showText && (
          <span className={cn("ml-1 text-slate-900 dark:text-slate-100", sizes.text)}>
            <span className="sr-only">StackFlow —</span>
            <span className="inline-block">Stack</span>
            <span className="inline-block text-foreground/60 ml-1">Flow</span>
          </span>
        )}
      </Link>
    );
  }
);

Logo.displayName = "Logo";

export default Logo;
