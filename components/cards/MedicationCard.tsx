import Image from "next/image";

import { Button } from "@/components/ui/Button";
import type { Medication } from "@/types/home";

export function MedicationCard({ medication }: { medication: Medication }) {
  return (
    <article className="flex flex-col rounded-2xl bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.05)] lg:rounded-3xl">
      <div className="relative h-[225px] overflow-hidden lg:h-[332px]">
        <Image
          src={medication.imageSrc}
          alt={medication.imageAlt}
          width={287}
          height={225}
          className="absolute top-1/2 left-1/2 h-[225px] w-auto max-w-none -translate-1/2 lg:h-[358px]"
        />
      </div>
      <h3 className="mt-5 text-xl leading-[1.16] font-medium text-forest lg:mt-8 lg:text-[32px]">
        {medication.name}
      </h3>
      <div className="mt-4 flex flex-col gap-2.5 border-t border-rule pt-3.5 lg:mt-8 lg:flex-row lg:items-center lg:justify-between lg:pt-6">
        <p className="text-2xl leading-[1.16] font-medium text-heading">
          From <span className="text-[32px] leading-[1.24]">${medication.price}</span>/mo
        </p>
        <Button
          href={medication.cta.href}
          withArrow
          fullWidth
          className="lg:w-auto lg:justify-start"
        >
          {medication.cta.label}
        </Button>
      </div>
    </article>
  );
}
