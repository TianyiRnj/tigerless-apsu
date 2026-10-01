import type { ReactNode } from "react";

import { ArrowCircleIcon } from "./Icon";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "md" | "lg" | "responsive";

interface ButtonProps {
  children: ReactNode;
  /** Renders a link when set; otherwise a button for an in-page action. */
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  withArrow?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-ink text-white hover:bg-ink-hover active:bg-ink-active",
  secondary: "bg-white text-heading hover:bg-[#eef5f1] active:bg-[#e1ece6]",
  outline: "border border-ink text-ink hover:bg-ink/5 active:bg-ink/10",
};

// [disc color, arrow color] for the arrow icon of each variant
const arrowColors: Record<ButtonVariant, [string, string]> = {
  primary: ["text-white", "text-ink"],
  secondary: ["text-heading", "text-white"],
  outline: ["text-ink", "text-white"],
};

const sizeClasses: Record<ButtonSize, { height: string; arrow: string }> = {
  md: { height: "min-h-12", arrow: "size-8" },
  lg: { height: "min-h-14", arrow: "size-10" },
  responsive: { height: "min-h-12 lg:min-h-14", arrow: "size-8 lg:size-10" },
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  withArrow = false,
  fullWidth = false,
  disabled = false,
  type = "button",
  className = "",
  onClick,
}: ButtonProps) {
  const [discColor, arrowColor] = arrowColors[variant];
  const classes = [
    "group inline-flex max-w-full items-center gap-2 rounded-full py-1 text-base leading-[1.32] font-medium transition active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40 lg:text-lg",
    sizeClasses[size].height,
    withArrow ? `pr-2 ${fullWidth ? "pl-6 lg:pl-8" : "pl-8"}` : "px-8",
    fullWidth ? "w-full" : "",
    fullWidth && withArrow ? "justify-between text-left" : "justify-center text-center",
    variantClasses[variant],
    className,
  ].join(" ");

  const content = (
    <>
      <span>{children}</span>
      {withArrow && (
        <ArrowCircleIcon
          className={`${sizeClasses[size].arrow} shrink-0 transition-transform group-hover:translate-x-0.5 ${discColor}`}
          arrowClassName={arrowColor}
        />
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {content}
    </button>
  );
}
