// Small inline glyphs that are reused across components. Decorative by default.

interface IconProps {
  className?: string;
}

/** Filled disc with an arrow — used inside CTA buttons. */
export function ArrowCircleIcon({
  className = "",
  arrowClassName = "text-white",
}: IconProps & { arrowClassName?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" focusable="false" className={className}>
      <circle cx="20" cy="20" r="16.67" fill="currentColor" />
      <path
        d="M13 20h13.5M21 14.5l5.5 5.5-5.5 5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={arrowClassName}
      />
    </svg>
  );
}

/** Outlined ring with an arrow — used by text links. */
export function ArrowRingIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <circle cx="12" cy="12" r="10.25" />
      <path d="M7.5 12h8.5M12.5 8.25 16.25 12l-3.75 3.75" />
    </svg>
  );
}

export function ArrowIcon({
  direction = "right",
  className = "",
}: IconProps & { direction?: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={`${direction === "left" ? "rotate-180" : ""} ${className}`}
    >
      <path d="M4.5 12h15M13 5.5l6.5 6.5-6.5 6.5" />
    </svg>
  );
}

export function ChevronIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function CheckCircleIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className}>
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path
        d="m8 12.25 2.75 2.75L16 9.75"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StarIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className}>
      <path
        fill="currentColor"
        d="M12 3.5c.3 0 .6.2.7.5l2.1 4.6 5 .6c.7.1.9.9.4 1.3l-3.7 3.4 1 4.9c.1.7-.6 1.2-1.2.9L12 17.2l-4.3 2.5c-.6.3-1.3-.2-1.2-.9l1-4.9-3.7-3.4c-.5-.4-.3-1.2.4-1.3l5-.6 2.1-4.6c.1-.3.4-.5.7-.5Z"
      />
    </svg>
  );
}

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function XLogoIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className} {...strokeProps}>
      <path d="m3.75 3.75 11.6 16.5h4.9L8.65 3.75h-4.9ZM3.75 20.25l7-7M13.3 10.7l7-6.95" />
    </svg>
  );
}

export function InstagramIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className} {...strokeProps}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.25 6.75h.01" strokeWidth="2" />
    </svg>
  );
}

export function LinkedInIcon({ className = "", outline = false }: IconProps & { outline?: boolean }) {
  if (outline) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className} {...strokeProps}>
        <path d="M4.75 9.75h3.5v10.5h-3.5zM6.5 3.75a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5ZM11 20.25V9.75h3.25v1.5c.6-1 1.8-1.75 3.25-1.75 2.4 0 3.75 1.5 3.75 4.25v6.5h-3.5v-5.75c0-1.25-.5-2-1.6-2s-1.65.75-1.65 2v5.75H11Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className}>
      <path
        fill="currentColor"
        d="M4.5 9h4.5v12.5H4.5V9Zm2.25-6.5a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5ZM11 9h4.3v1.75c.65-1.1 2.05-2.05 4-2.05 3.15 0 4.2 2 4.2 5.1v7.7H19v-6.8c0-1.55-.3-2.85-2-2.85s-2.25 1.3-2.25 2.85v6.8H11V9Z"
      />
    </svg>
  );
}

export function FacebookIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className} {...strokeProps}>
      <path d="M7 10v4h3v7h4v-7h3l1-4h-4V8a1 1 0 0 1 1-1h3V3h-3a5 5 0 0 0-5 5v2H7Z" />
    </svg>
  );
}

/** Renders a supplied single-color SVG as a mask so it takes the current text color. */
export function MaskIcon({ src, className = "" }: IconProps & { src: string }) {
  const mask = `url("${src}") center / contain no-repeat`;
  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{ mask, WebkitMask: mask }}
    />
  );
}
