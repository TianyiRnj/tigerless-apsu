import Image from "next/image";

import { MedicationCard } from "@/components/cards/MedicationCard";
import { Button } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import type { Medication, ProgramContent } from "@/types/home";

interface WeightLossSectionProps {
  program: ProgramContent;
  medications: Medication[];
}

export function WeightLossSection({ program, medications }: WeightLossSectionProps) {
  return (
    <section id={program.id} aria-labelledby="weight-loss-title" className="page-container">
      <div className="relative overflow-hidden rounded-[20px] bg-tint-mint lg:flex lg:min-h-[619px] lg:items-center lg:overflow-visible lg:rounded-[32px]">
        <div className="relative z-10 p-3 lg:w-[46.5%] lg:py-8 lg:pr-8 lg:pl-16">
          {program.eyebrow && (
            // The mobile design starts directly with the heading.
            <p className="hidden text-base leading-[1.32] tracking-[2px] text-brand lg:block">{program.eyebrow}</p>
          )}
          <h2
            id="weight-loss-title"
            className="text-[32px] leading-[1.24] font-medium text-heading lg:mt-4 lg:max-w-[456px] lg:text-[52px]"
          >
            {program.title}
          </h2>
          <CheckList
            items={program.points}
            gapClassName="gap-1 lg:gap-2"
            className="mt-4 text-base leading-[1.6] lg:mt-5 lg:text-xl"
          />
          <Button
            href={program.cta.href}
            variant="secondary"
            size="responsive"
            withArrow
            fullWidth
            className="mt-6 lg:mt-9 lg:w-auto lg:justify-start"
          >
            {program.cta.label}
          </Button>
        </div>
        <Image
          src={program.imageSrc}
          alt={program.imageAlt}
          width={682}
          height={692}
          sizes="(min-width: 1024px) 52vw, 357px"
          className="mx-auto -mt-5 h-auto w-[357px] max-w-none lg:absolute lg:right-[3.6%] lg:bottom-0 lg:mt-0 lg:w-[51.7%] lg:max-w-[682px]"
        />
      </div>

      <div id="medications" className="mt-8 grid gap-8 md:grid-cols-2">
        {medications.map((medication) => (
          <MedicationCard key={medication.id} medication={medication} />
        ))}
      </div>
    </section>
  );
}
