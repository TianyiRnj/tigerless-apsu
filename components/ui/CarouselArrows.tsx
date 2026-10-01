"use client";

import { ArrowIcon } from "./Icon";
import { IconButton } from "./IconButton";

interface CarouselArrowsProps {
  /** id of the horizontally scrolling list these arrows control. */
  targetId: string;
  className?: string;
}

/** Previous / next buttons for a native scroll-snap row. */
export function CarouselArrows({ targetId, className = "" }: CarouselArrowsProps) {
  function scrollByCard(direction: 1 | -1) {
    const track = document.getElementById(targetId);
    const card = track?.firstElementChild;
    if (!track || !(card instanceof HTMLElement)) return;

    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({
      left: direction * (card.offsetWidth + gap),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  const buttonClasses = "size-[42px] border-2 border-ink lg:size-12";

  return (
    <div className={`flex gap-3.5 lg:gap-2 ${className}`}>
      <IconButton
        label="Scroll to previous card"
        aria-controls={targetId}
        onClick={() => scrollByCard(-1)}
        className={buttonClasses}
      >
        <ArrowIcon direction="left" className="size-6" />
      </IconButton>
      <IconButton
        label="Scroll to next card"
        aria-controls={targetId}
        onClick={() => scrollByCard(1)}
        className={buttonClasses}
      >
        <ArrowIcon className="size-6" />
      </IconButton>
    </div>
  );
}
