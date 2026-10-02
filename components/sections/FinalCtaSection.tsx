import { Button } from "@/components/ui/Button";
import type { FinalCtaContent } from "@/types/home";

interface FinalCtaSectionProps {
  content: FinalCtaContent;
  brandName: string;
}

export function FinalCtaSection({ content, brandName }: FinalCtaSectionProps) {
  return (
    <section
      aria-labelledby="final-cta-title"
      className="mt-0 rounded-t-[20px] bg-white p-5 lg:rounded-t-[32px] lg:px-8 lg:pt-8 lg:pb-[120px]"
    >
      <div className="relative isolate mx-auto flex min-h-[559px] max-w-[1376px] flex-col overflow-hidden rounded-2xl bg-linear-to-br from-ink to-[#d8efe4] p-3 text-center lg:min-h-[250px] lg:flex-row lg:items-end lg:justify-between lg:gap-8 lg:p-8 lg:text-left">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[86px] left-[18px] -z-10 font-display text-[150px] leading-[0.8] font-bold tracking-[-0.06em] text-ink/5 select-none lg:top-0 lg:bottom-auto lg:left-[478px] lg:text-[390px]"
        >
          {brandName}
        </span>
        <div>
          <h2
            id="final-cta-title"
            className="mx-auto max-w-[260px] text-5xl leading-[1.24] font-medium text-white lg:mx-0 lg:max-w-[568px]"
          >
            {content.title}
          </h2>
          <ul className="mt-10 flex flex-col items-center text-xl leading-[1.32] text-[#f4fafa] lg:flex-row lg:gap-3">
            {content.highlights.map((highlight, index) => (
              <li key={highlight} className="flex flex-col items-center lg:flex-row lg:gap-3">
                {index > 0 && <span aria-hidden="true" className="my-[11px] size-1 rounded-full bg-white lg:my-0" />}
                {highlight}
              </li>
            ))}
          </ul>
        </div>
        <Button
          href={content.cta.href}
          size="lg"
          withArrow
          className="mt-auto self-center lg:self-auto lg:shrink-0"
        >
          {content.cta.label}
        </Button>
      </div>
    </section>
  );
}
