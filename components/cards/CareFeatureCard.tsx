import Image from "next/image";
import type { ReactNode } from "react";

import type { Feature } from "@/types/home";

interface CareFeatureCardProps {
  feature: Feature;
  /** "photo": full-bleed photograph with light title. "cutout": white card with a placed image. */
  variant: "photo" | "cutout";
  /** Position and size of the image box (cutout variant). */
  mediaClassName?: string;
  sizes: string;
  /** Optional decorative overlay rendered above the image. */
  children?: ReactNode;
}

export function CareFeatureCard({
  feature,
  variant,
  mediaClassName = "inset-0",
  sizes,
  children,
}: CareFeatureCardProps) {
  const photo = variant === "photo";

  return (
    <article
      className={`relative isolate h-[509px] w-[333px] overflow-hidden rounded-2xl lg:h-[654px] lg:w-[382px] ${
        photo ? "bg-ink" : "bg-white"
      }`}
    >
      <div className={`absolute -z-20 ${mediaClassName}`}>
        <Image
          src={feature.imageSrc}
          alt={feature.imageAlt}
          fill
          sizes={sizes}
          className={photo ? "object-cover" : "object-contain"}
        />
      </div>
      {photo && (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 -z-10 h-[130px] bg-linear-to-b from-[#102b1cbf] to-[#1c8e7100]"
        />
      )}
      <h3
        className={`px-6 pt-8 text-center text-2xl leading-[1.16] font-medium lg:text-[32px] ${
          photo ? "text-white" : "text-ink"
        }`}
      >
        {feature.title}
      </h3>
      {children}
    </article>
  );
}
