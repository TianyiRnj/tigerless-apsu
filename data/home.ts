import type { HomePageContent } from "@/types/home";

// Mock data standing in for the future homepage API response.
// Copy follows the supplied design except for the fixes logged in the README.

// The two medication cards intentionally share one product image.
const medicationImage = "/images/medications/semaglutide.png";

export const homePageContent = {
  header: {
    brandName: "Apsu",
    navigation: [
      { label: "Weight Loss", href: "#weight-loss" },
      { label: "Birth Control", href: "#birth-control" },
      { label: "Sleep", href: "#sleep" },
      { label: "Contact Us", href: "#contact" },
    ],
    primaryCta: { label: "Get started" },
    secondaryCta: { label: "Login" },
  },

  hero: {
    claims: ["40+ Languages", "US-licensed physicians", "Free expedited shipping"],
    title: "Healthcare that",
    titleHighlight: "speaks your language.",
    description: [
      "Care in the language you think in.",
      "US-licensed physicians, AI translates your consultation.",
    ],
    cta: { label: "Start a free consultation" },
    languages: [
      { label: "Tiếng Việt", lang: "vi" },
      { label: "한국어", lang: "ko" },
      { label: "Tagalog", lang: "tl" },
      { label: "English", lang: "en" },
      { label: "中文", lang: "zh" },
      { label: "Español", lang: "es" },
      { label: "Português", lang: "pt" },
      { label: "हिन्दी", lang: "hi" },
      { label: "Русский", lang: "ru" },
      { label: "العربية", lang: "ar" },
      { label: "Français", lang: "fr" },
    ],
  },

  treatments: [
    {
      id: "weight-management",
      eyebrow: "WEIGHT MANAGEMENT",
      title: "Compounded GLP-1 Semaglutide & Tirzepatide",
      imageSrc: "/images/treatments/weight-loss-medication.png",
      imageAlt: "",
      cta: { label: "See plans", href: "#weight-loss" },
    },
    {
      id: "birth-control",
      eyebrow: "BIRTH CONTROL",
      title: "Prescription birth control, delivered discreetly",
      imageSrc: "/images/treatments/birth-control-medication.png",
      imageAlt: "",
      cta: { label: "See plans", href: "#birth-control" },
    },
    {
      id: "sleep",
      eyebrow: "SLEEP",
      title: "Non-habit-forming formulations for sensitive sleepers",
      imageSrc: "/images/treatments/sleep-medication.png",
      imageAlt: "",
      cta: { label: "See plans", href: "#sleep" },
    },
  ],

  trustItems: [
    { label: "Cash-pay, No Insurance Needed", iconSrc: "/icons/trust/payment-success.svg" },
    { label: "Discreet Shipping", iconSrc: "/icons/trust/truck.svg" },
    { label: "50 States", iconSrc: "/icons/trust/map-location.svg" },
    { label: "US Board Certified MDs", iconSrc: "/icons/trust/stethoscope.svg" },
    { label: "24/7 AI Care Assistant", iconSrc: "/icons/trust/customer-support.svg" },
  ],

  howItWorks: {
    eyebrow: "HOW IT WORKS",
    title: "Real physicians, AI-amplified.",
    description: "Two layers working together — each doing what they do best.",
    steps: [
      {
        id: "physicians",
        number: "01",
        title: "Human physicians",
        description:
          "They handle diagnosis, prescriptions, and every moment that calls for clinical judgment.",
        points: [
          "Diagnosis and treatment decisions.",
          "Prescriptions.",
          "Complex symptom evaluation.",
        ],
      },
      {
        id: "ai-assistant",
        number: "02",
        title: "AI care assistant",
        description:
          "It handles language and instant response — so nothing is lost in communication.",
        points: ["Real-time translation in every message.", "Answers around the clock."],
      },
    ],
    footnote: "The AI handles the language. Your physician makes the medical decisions.",
  },

  weightLoss: {
    id: "weight-loss",
    eyebrow: "WEIGHT LOSS",
    title: "Lose Weight In Your Way.",
    points: [
      "Same-day doctor visits and prescriptions",
      "Dosage personalized",
      "Shipped from licensed USA pharmacies",
    ],
    cta: { label: "See plans", href: "#medications" },
    imageSrc: "/images/weight-loss/weight-loss-woman.png",
    imageAlt: "",
  },

  medications: [
    {
      id: "semaglutide",
      name: "Compounded Semaglutide",
      imageSrc: medicationImage,
      imageAlt: "",
      price: 200,
      cta: { label: "Get started" },
    },
    {
      id: "tirzepatide",
      name: "Compounded Tirzepatide",
      imageSrc: medicationImage,
      imageAlt: "",
      price: 200,
      cta: { label: "Get started" },
    },
  ],

  bmi: {
    eyebrow: "CHECK YOUR ELIGIBILITY",
    badge: "BMI",
    title: "Could a GLP-1 program be right for you?",
    instructions: "Enter your height and weight below",
    unitLabels: { imperial: "ft / lbs", metric: "cm/kg" },
    fieldLabels: { height: "Height", weight: "Weight", sex: "Sex" },
    sexOptions: ["Male", "Female"],
    submitLabel: "Calculate BMI",
    errorMessage: "Please enter your height and weight.",
    scoreLabel: "Your BMI Score",
    scoreLabelShort: "Your Score",
    demoScore: 56,
    legend: [
      { label: "Underweight", range: "<18.5" },
      { label: "Healthy Weight", range: "18.5 - 24.9" },
      { label: "Overweight", range: "25.0 - 29.9" },
      { label: "Obese", range: "≥ 30" },
    ],
    optionsLink: { label: "See your GLP-1 Options", href: "#medications" },
    backgroundSrc: "/images/assessment/assessment-background.png",
  },

  birthControl: {
    id: "birth-control",
    title: "Birth control, without the waiting room.",
    description: [
      "Choose the method that fits your life. A US-licensed physician prescribes online, and your refills arrive automatically.",
    ],
    points: [
      "Prescribed online, delivered to your door",
      "Automatic refills, delivered",
      "Plain, discreet packaging",
    ],
    price: 20,
    cta: { label: "Start your birth control consult" },
    imageSrc: "/images/birth-control/birth-control-woman.png",
    imageAlt: "",
  },

  sleep: {
    id: "sleep",
    title: "Sleep",
    description: [
      "Real rest without the dependency.",
      "Non-habit-forming, physician-prescribed for sensitive sleepers.",
    ],
    points: [
      "Non-controlled, non-habit-forming options",
      "Matched to your sleep pattern by a physician",
      "No controlled sedatives",
      "Cash-pay, no insurance needed",
    ],
    price: 20,
    cta: { label: "Start your sleep consult" },
    imageSrc: "/images/sleep/sleep-woman.png",
    imageAlt: "",
  },

  careFeatures: {
    title: "Completely online on your schedule",
    features: [
      {
        id: "provider-support",
        title: "24/7 Provider Support",
        imageSrc: "/images/care/provider-support.png",
        imageAlt: "A doctor on a video call, shown on a phone screen",
      },
      {
        id: "manager-treatment",
        title: "Easy Manager Treatment",
        imageSrc: "/images/care/manager-treatment.png",
        imageAlt: "A doctor reviewing patient records at a computer",
      },
      {
        id: "fda-options",
        title: "Access to FDA-approved Medication Options",
        imageSrc: "/images/care/fda-options.png",
        imageAlt: "Prescription injection pens",
      },
      {
        id: "free-shipping",
        title: "Free Expedited Shipping",
        imageSrc: "/images/care/free-expedited-shipping.png",
        imageAlt: "A courier holding a delivery package",
      },
    ],
  },

  testimonials: {
    title: "Our",
    titleHighlight: "Success Stories",
    description: "Care that finally made sense.",
    items: [
      {
        kind: "quote",
        id: "maria",
        category: "Weight Loss",
        rating: 5,
        quote:
          "I described my symptoms in my own language and actually felt understood, no translating in my head.",
        author: "Maria R.",
        location: "Houston, TX",
      },
      {
        kind: "photo",
        id: "david",
        author: "David L",
        location: "Queens, NY",
        imageSrc: "/images/testimonials/customer.png",
        imageAlt: "",
      },
      {
        kind: "quote",
        id: "an",
        category: "Sleep",
        rating: 5,
        quote:
          "Private, simple, and in my language the whole way through. It made getting care feel normal again.",
        author: "An N.",
        location: "San Jose, CA",
      },
    ],
  },

  faq: {
    eyebrow: "FAQs",
    title: "Frequently Asked Questions",
    description: "Have more questions? Our care team is here to help in your language.",
    // Answers 2–4 are composed from copy that appears elsewhere in the design.
    items: [
      {
        id: "states",
        question: "What states do you serve in GLP-1 programs?",
        answer: "We are currently able to serve GLP-1 programs in all 50 states.",
      },
      {
        id: "languages",
        question: "Which languages do you support?",
        answer:
          "40+ languages, including Español, Tiếng Việt, 한국어, Tagalog, English, 中文, Français, Português, हिन्दी, Русский and العربية.",
      },
      {
        id: "insurance",
        question: "Do I need insurance?",
        answer: "No. Cash-pay, no insurance needed.",
      },
      {
        id: "compounded",
        question: "What is compounded medication?",
        answer:
          "Apsu offers compounded GLP-1 medication, which is prepared by licensed U.S. compounding pharmacies and is not approved or evaluated by the FDA.",
      },
    ],
  },

  finalCta: {
    title: "Ready For Healthcare In Your Language?",
    highlights: ["No Appointment Needed", "No Insurance Required"],
    cta: { label: "Start a free consultation" },
  },

  footer: {
    tagline: "American medicine, in the language you think in.",
    linkGroups: [
      {
        title: "Products",
        links: [
          { label: "Weight Loss", href: "#weight-loss" },
          { label: "Birth Control", href: "#birth-control" },
          { label: "Sleep", href: "#sleep" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About Apsu" },
          { label: "Blogs" },
          { label: "FAQs", href: "#faq" },
          { label: "Contact Us", href: "#contact" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Terms" },
          { label: "Privacy Policy" },
          { label: "Medication Safety Information" },
        ],
      },
    ],
  },

  legal: {
    disclaimer:
      "The information on this site is for general educational purposes and is not medical advice. Apsu is a technology platform; medical care is provided by independent, licensed providers, and pharmacy services by licensed pharmacies, who decide whether treatment is appropriate. Payment does not guarantee a prescription. Apsu offers compounded GLP-1 medication, which is prepared by licensed U.S. compounding pharmacies and is not approved or evaluated by the FDA. Apsu does not manufacture medication, and product appearance may differ from images shown. Results vary and are not guaranteed. If this is an emergency, call 911.",
    termsNotice: "By using our services, you agree to our Terms & Conditions.",
    copyright: "© 2026 APSU. All rights reserved.",
  },
} satisfies HomePageContent;
