import { MaskIcon } from "@/components/ui/Icon";
import type { TrustItem } from "@/types/home";

// Three copies keep the CSS loop seamless up to very wide screens; only the first is announced.
const copies = [0, 1, 2];

export function TrustBar({ items }: { items: TrustItem[] }) {
  return (
    <div className="group mt-8 overflow-hidden bg-ink py-5 text-white lg:mt-20">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {copies.map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy > 0 || undefined}
            className="flex shrink-0 items-center gap-8 pr-8 lg:gap-14 lg:pr-14"
          >
            {items.map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-2 text-sm leading-[1.6] whitespace-nowrap lg:text-lg"
              >
                <MaskIcon src={item.iconSrc} className="size-5 lg:size-6" />
                {item.label}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
