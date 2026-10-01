import { TestimonialCard } from "@/components/cards/TestimonialCard";
import type { TestimonialsContent } from "@/types/home";

export function TestimonialsSection({ content }: { content: TestimonialsContent }) {
  return (
    <section
      aria-labelledby="testimonials-title"
      className="mx-3 rounded-[20px] bg-white px-2 pt-3 pb-2 text-center lg:mx-7 lg:rounded-[32px] lg:px-8 lg:py-[120px]"
    >
      <div className="mx-auto max-w-[1320px]">
        <h2 id="testimonials-title" className="text-[32px] leading-[1.24] font-medium text-ink lg:text-[52px]">
          {content.title} <span className="text-brand">{content.titleHighlight}</span>
        </h2>
        <p className="mt-3 text-base leading-[1.6] lg:mt-4 lg:text-xl">{content.description}</p>
        <div className="mt-6 grid gap-6 text-left lg:mt-12 lg:grid-cols-3">
          {content.items.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
