import Image from "next/image";

import { InstagramIcon, LinkedInIcon, StarIcon, XLogoIcon } from "@/components/ui/Icon";
import type { Testimonial } from "@/types/home";

const socialIcons = [XLogoIcon, InstagramIcon, LinkedInIcon];

/** Decorative social badges — no profile links exist for testimonial authors. */
function SocialBadges({ light = false }: { light?: boolean }) {
  return (
    <div aria-hidden="true" className="flex shrink-0 gap-2">
      {socialIcons.map((Icon, index) => (
        <span
          key={index}
          className={`flex size-9 items-center justify-center rounded-full ${
            light ? "bg-white text-ink" : "bg-ink text-white"
          }`}
        >
          <Icon className="size-5" />
        </span>
      ))}
    </div>
  );
}

function Author({ name, location, light = false }: { name: string; location: string; light?: boolean }) {
  return (
    <div className="min-w-0">
      <p className={`text-xl leading-[1.6] font-medium ${light ? "text-white" : "text-heading"}`}>{name}</p>
      <p className={`text-base leading-[1.6] ${light ? "text-page" : "text-body"}`}>{location}</p>
    </div>
  );
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  if (testimonial.kind === "photo") {
    return (
      <figure className="relative isolate flex min-h-[399px] flex-col justify-end overflow-hidden rounded-2xl bg-[#eafff3] p-6 shadow-[0_8px_32px_rgba(2,34,39,0.08)] lg:min-h-[530px]">
        {/* The supplied photo has its caption baked in near the bottom; the box ends above it. */}
        <div className="absolute inset-x-0 top-0 -z-20 aspect-[468/470] [mask-image:linear-gradient(to_bottom,#000_80%,transparent)]">
          <Image
            src={testimonial.imageSrc}
            alt={testimonial.imageAlt}
            fill
            sizes="(min-width: 1024px) 424px, 335px"
            className="object-cover object-top"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#75bc9500_45%,#1132205c_70%,#113220)]"
        />
        <figcaption className="flex items-center justify-between gap-4">
          <Author name={testimonial.author} location={testimonial.location} light />
          <SocialBadges light />
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className="flex min-h-[399px] flex-col rounded-2xl bg-page p-6 lg:min-h-[530px]">
      <h3 className="text-2xl leading-[1.16] font-medium text-brand lg:text-[32px]">
        {testimonial.category}
      </h3>
      <div role="img" aria-label={`Rated ${testimonial.rating} out of 5`} className="mt-5 flex gap-1">
        {Array.from({ length: testimonial.rating }, (_, index) => (
          <StarIcon key={index} className="size-6 text-star" />
        ))}
      </div>
      <blockquote className="mt-3 text-base leading-[1.6] text-body lg:text-lg">
        <p>{testimonial.quote}</p>
      </blockquote>
      <figcaption className="mt-auto flex items-center justify-between gap-4 pt-6">
        <Author name={testimonial.author} location={testimonial.location} />
        <SocialBadges />
      </figcaption>
    </figure>
  );
}
