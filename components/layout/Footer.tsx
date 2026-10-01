import Image from "next/image";

import { FacebookIcon, InstagramIcon, LinkedInIcon, XLogoIcon } from "@/components/ui/Icon";
import type { FooterContent, LegalContent } from "@/types/home";

function LinkedInOutlineIcon({ className }: { className?: string }) {
  return <LinkedInIcon className={className} outline />;
}

const socialIcons = [XLogoIcon, FacebookIcon, InstagramIcon, LinkedInOutlineIcon];

interface FooterProps {
  brandName: string;
  footer: FooterContent;
  legal: LegalContent;
}

export function Footer({ brandName, footer, legal }: FooterProps) {
  return (
    <footer id="contact" className="overflow-hidden bg-ink text-page">
      <div className="mx-auto max-w-[1440px] px-5 pt-10 lg:px-8 lg:pt-[120px]">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-8">
          <div className="lg:max-w-[424px]">
            <p className="font-display text-[103px] leading-[0.82] font-bold tracking-[-0.06em]">
              {brandName}
            </p>
            <p className="mt-7 text-lg leading-[1.32] lg:max-w-[390px]">{footer.tagline}</p>
          </div>

          <nav aria-label="Footer" className="flex shrink-0 flex-col gap-8 lg:flex-row lg:gap-16 xl:w-[724px] xl:gap-32">
            {footer.linkGroups.map((group) => (
              <div key={group.title} className="shrink-0 lg:min-w-[117px]">
                <h2 className="text-lg leading-[1.32] text-white">{group.title}</h2>
                <ul className="mt-4 flex flex-col gap-3 text-base leading-none">
                  {group.links.map((link) => (
                    <li key={link.label} className="whitespace-nowrap">
                      {link.href ? (
                        <a
                          href={link.href}
                          className="rounded-sm underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-white active:text-chip"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <span>{link.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-10 border-b border-line pb-8 text-lg leading-[1.6] lg:mt-8 lg:max-w-[1320px]">
          <p>{legal.disclaimer}</p>
          <p className="mt-4">{legal.termsNotice}</p>
        </div>

        <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div aria-hidden="true" className="flex gap-2">
            {socialIcons.map((Icon, index) => (
              <span key={index} className="flex size-9 items-center justify-center rounded-full bg-forest text-white">
                <Icon className="size-5" />
              </span>
            ))}
          </div>
          <p className="text-base leading-[1.6]">{legal.copyright}</p>
        </div>
      </div>

      <div aria-hidden="true" className="relative mt-[70px] lg:mt-[120px]">
        <Image
          src="/images/footer/apsu-logo.png"
          alt=""
          width={1376}
          height={318}
          sizes="(min-width: 1024px) 96vw, 100vw"
          className="block h-auto w-full lg:ml-[1%] lg:w-[95.6%]"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-b from-[#386b4f00] to-ink lg:h-[70%]" />
      </div>
    </footer>
  );
}
