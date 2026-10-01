import { CheckList } from "@/components/ui/CheckList";
import type { HowItWorksContent } from "@/types/home";

export function HowItWorksSection({ content }: { content: HowItWorksContent }) {
  return (
    <section aria-labelledby="how-it-works-title" className="page-container py-[60px] text-center lg:py-[120px]">
      <p className="text-base leading-[1.32] tracking-[2px] text-brand">{content.eyebrow}</p>
      <h2
        id="how-it-works-title"
        className="mt-4 text-[32px] leading-[1.2] font-medium text-balance text-ink lg:text-[52px] lg:leading-[1.24]"
      >
        {content.title}
      </h2>
      <p className="mx-auto mt-4 max-w-[362px] text-base leading-[1.6] lg:text-xl">{content.description}</p>

      <ol className="mx-auto mt-8 grid max-w-[1120px] gap-8 text-left md:grid-cols-2 lg:mt-12 lg:gap-6">
        {content.steps.map((step) => (
          <li
            key={step.id}
            className="flex min-h-[400px] flex-col rounded-2xl bg-white p-3 lg:min-h-[529px] lg:px-6 lg:pt-10 lg:pb-[60px]"
          >
            <span aria-hidden="true" className="self-end text-[56px] leading-[1.2] text-[#21ac8847] lg:text-[80px]">
              {step.number}
            </span>
            <div className="mt-6 lg:mt-auto lg:pt-8">
              <h3 className="text-[32px] leading-[1.24] font-medium text-ink lg:text-[40px]">{step.title}</h3>
              <p className="mt-8 text-base leading-[1.6] lg:text-xl">{step.description}</p>
              <CheckList items={step.points} className="mt-4 text-base leading-[1.6] lg:text-xl" />
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-8 text-base leading-[1.32] font-medium text-ink lg:mt-12 lg:text-xl">{content.footnote}</p>
    </section>
  );
}
