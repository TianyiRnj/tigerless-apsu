import type { ComponentProps } from "react";

interface IconButtonProps extends ComponentProps<"button"> {
  /** Accessible name — icon buttons have no visible text. */
  label: string;
}

export function IconButton({
  label,
  className = "",
  type = "button",
  children,
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={`inline-flex shrink-0 items-center justify-center rounded-full text-ink transition hover:bg-ink hover:text-white active:scale-[0.94] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
