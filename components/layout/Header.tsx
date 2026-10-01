import { Button } from "@/components/ui/Button";
import type { HeaderContent } from "@/types/home";

import { MobileMenu } from "./MobileMenu";

export function Header({ content }: { content: HeaderContent }) {
  return (
    <>
      {/* Static top half of the white Hero frame; its heights mirror the sticky layer below. */}
      <div
        aria-hidden="true"
        className="mx-3 mt-3 h-16 rounded-t-[20px] bg-white lg:mx-7 lg:mt-8 lg:h-[84px] lg:rounded-t-[32px] xl:h-[88px]"
      />

      {/* Transparent sticky layer: only the rounded navigation pill remains visible while scrolling. */}
      <header className="pointer-events-none sticky top-0 z-40 -mt-16 px-5 pt-2 lg:-top-3 lg:-mt-[84px] lg:px-14 lg:pt-7 xl:-mt-[88px]">
        <div className="pointer-events-auto mx-auto flex h-14 max-w-[1320px] items-center justify-between rounded-full bg-page pr-1.5 pl-3 shadow-[0_10px_30px_rgba(2,31,24,0.08)] xl:grid xl:h-15 xl:grid-cols-[1fr_auto_1fr] xl:px-6">
          <a href="/#top" className="-ml-0.5 justify-self-start font-display text-[39px] leading-none font-bold tracking-[-0.055em] text-ink xl:-ml-1 transition-colors hover:text-brand active:text-ink-active">
            {content.brandName}
          </a>

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex gap-4">
              {content.navigation.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="block rounded-md px-2 py-1.5 text-lg leading-[1.32] whitespace-nowrap text-heading underline-offset-[6px] transition-colors hover:text-brand hover:underline active:text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center justify-end gap-4 xl:flex">
            <Button href={content.primaryCta.href}>{content.primaryCta.label}</Button>
            <Button href={content.secondaryCta.href} variant="outline">
              {content.secondaryCta.label}
            </Button>
          </div>

          <MobileMenu content={content} className="xl:hidden" />
        </div>
      </header>
    </>
  );
}
