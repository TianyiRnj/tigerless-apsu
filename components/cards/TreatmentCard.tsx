import Image from "next/image";

import { Button } from "@/components/ui/Button";
import type { Treatment } from "@/types/home";

interface TreatmentCardProps {
  treatment: Treatment;
  /** Background tint, chosen by the section. */
  className?: string;
}

export function TreatmentCard({ treatment, className = "" }: TreatmentCardProps) {
  return (
    <article
      className={`relative isolate flex h-[220px] flex-col overflow-hidden rounded-2xl p-3 sm:h-[300px] sm:p-4 xl:h-[421px] xl:p-6 ${className}`}
    >
      <Image
        src={treatment.imageSrc}
        alt={treatment.imageAlt}
        width={448}
        height={445}
        sizes="(min-width: 1280px) 448px, 269px"
        loading="eager"
        className="absolute -right-3 -bottom-2 -z-10 h-auto w-[269px] max-w-none sm:w-[260px] xl:-bottom-4 xl:w-[448px]"
      />
      <p className="text-sm leading-[1.32] tracking-[2px] text-ink xl:text-lg">{treatment.eyebrow}</p>
      <h2 className="mt-4 max-w-[min(200px,calc(100%-108px))] text-xl leading-[1.16] font-medium text-title min-[480px]:max-w-[min(360px,calc(100%-150px))] sm:max-w-[min(200px,calc(100%-130px))] xl:max-w-[240px] xl:text-2xl">
        {treatment.title}
      </h2>
      <div className="mt-auto flex w-[calc(100%-135px)] justify-center min-[480px]:w-[min(360px,calc(100%-150px))] sm:w-[calc(100%-130px)] xl:w-[240px]">
        <Button href={treatment.cta.href} variant="secondary" withArrow>
          {treatment.cta.label}
        </Button>
      </div>
    </article>
  );
}
