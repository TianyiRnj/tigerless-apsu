// Content contract for the homepage. These shapes stand in for a future
// backend response, so they only describe content — never layout or styling.

/** A link whose destination is guaranteed, so it always renders as an anchor. */
export interface LinkItem {
  label: string;
  href: string;
}

/** A footer entry. `href` is omitted when the design shows the item but no destination exists yet, so it renders as plain text. */
export interface NavItem {
  label: string;
  href?: string;
}

/** A call to action. Without `href` it is an action whose flow is not implemented yet. */
export interface Cta {
  label: string;
  href?: string;
}

export interface TrustItem {
  label: string;
  iconSrc: string;
}

export interface Language {
  label: string;
  /** BCP 47 language tag, e.g. "es" or "zh". */
  lang: string;
}

export interface Treatment {
  id: string;
  eyebrow: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  cta: Cta;
}

export interface Medication {
  id: string;
  name: string;
  imageSrc: string;
  imageAlt: string;
  /** Monthly starting price in USD. */
  price: number;
  cta: Cta;
}

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
  points: string[];
}

export interface Feature {
  id: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
}

export type Testimonial =
  | {
      kind: "quote";
      id: string;
      category: string;
      rating: number;
      quote: string;
      author: string;
      location: string;
    }
  | {
      kind: "photo";
      id: string;
      author: string;
      location: string;
      imageSrc: string;
      imageAlt: string;
    };

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FooterLinkGroup {
  title: string;
  links: NavItem[];
}

export interface HeaderContent {
  brandName: string;
  navigation: LinkItem[];
  primaryCta: Cta;
  secondaryCta: Cta;
}

export interface HeroContent {
  claims: string[];
  title: string;
  titleHighlight: string;
  description: string[];
  cta: Cta;
  languages: Language[];
}

export interface HowItWorksContent {
  eyebrow: string;
  title: string;
  description: string;
  steps: ProcessStep[];
  footnote: string;
}

/** Shared by the Weight Loss, Birth Control and Sleep program panels. */
export interface ProgramBaseContent {
  id: string;
  title: string;
  points: string[];
  cta: Cta;
  imageSrc: string;
  imageAlt: string;
}

export interface WeightLossProgramContent extends ProgramBaseContent {
  eyebrow: string;
}

/** Birth Control and Sleep: panels that show a description and a starting price. */
export interface PricedProgramContent extends ProgramBaseContent {
  description: string[];
  /** Monthly starting price in USD. */
  price: number;
}

export interface BmiContent {
  eyebrow: string;
  badge: string;
  title: string;
  instructions: string;
  unitLabels: { imperial: string; metric: string };
  fieldLabels: { height: string; weight: string; sex: string };
  sexOptions: string[];
  submitLabel: string;
  errorMessage: string;
  scoreLabel: string;
  /** Shorter wording used by the mobile design. */
  scoreLabelShort: string;
  /** Fixed result shown by the UI demo; it is not calculated from the inputs. */
  demoScore: number;
  legend: { label: string; range: string }[];
  optionsLink: LinkItem;
  backgroundSrc: string;
}

export interface CareFeaturesContent {
  title: string;
  features: Feature[];
}

export interface TestimonialsContent {
  title: string;
  titleHighlight: string;
  description: string;
  items: Testimonial[];
}

export interface FaqContent {
  eyebrow: string;
  title: string;
  description: string;
  items: FaqItem[];
}

export interface FinalCtaContent {
  title: string;
  highlights: string[];
  cta: Cta;
}

export interface FooterContent {
  tagline: string;
  linkGroups: FooterLinkGroup[];
}

export interface LegalContent {
  disclaimer: string;
  termsNotice: string;
  copyright: string;
}

export interface HomePageContent {
  header: HeaderContent;
  hero: HeroContent;
  treatments: Treatment[];
  trustItems: TrustItem[];
  howItWorks: HowItWorksContent;
  weightLoss: WeightLossProgramContent;
  medications: Medication[];
  bmi: BmiContent;
  birthControl: PricedProgramContent;
  sleep: PricedProgramContent;
  careFeatures: CareFeaturesContent;
  testimonials: TestimonialsContent;
  faq: FaqContent;
  finalCta: FinalCtaContent;
  footer: FooterContent;
  legal: LegalContent;
}
