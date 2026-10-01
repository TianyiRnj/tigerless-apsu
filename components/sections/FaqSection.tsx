import { Accordion } from "@/components/ui/Accordion";
import type { FaqContent } from "@/types/home";

export function FaqSection({ content }: { content: FaqContent }) {
  return (
    <section id="faq" aria-labelledby="faq-title" className="page-container py-14 lg:py-[120px]">
      <div className="grid gap-6 lg:grid-cols-[512fr_760fr] lg:gap-12">
        <div>
          {/* The mobile design shows no eyebrow here. */}
          <p className="hidden text-base leading-[1.32] tracking-[2px] text-brand lg:block">{content.eyebrow}</p>
          <h2
            id="faq-title"
            className="max-w-[8.4em] text-[32px] leading-[1.24] font-medium text-ink lg:mt-4 lg:text-[52px]"
          >
            {content.title}
          </h2>
          <p className="mt-3 text-base leading-[1.6] lg:mt-4 lg:text-xl">{content.description}</p>
        </div>
        <Accordion items={content.items} />
      </div>
    </section>
  );
}
