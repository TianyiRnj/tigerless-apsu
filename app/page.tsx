import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { TrustBar } from "@/components/layout/TrustBar";
import { BirthControlSection } from "@/components/sections/BirthControlSection";
import { BmiAssessmentSection } from "@/components/sections/BmiAssessmentSection";
import { CareFeaturesSection } from "@/components/sections/CareFeaturesSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { SleepSection } from "@/components/sections/SleepSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { WeightLossSection } from "@/components/sections/WeightLossSection";
import { homePageContent as content } from "@/data/home";

export default function HomePage() {
  return (
    <>
      <Header content={content.header} />
      <main id="main-content">
        <HeroSection hero={content.hero} treatments={content.treatments} />
        <TrustBar items={content.trustItems} />
        <HowItWorksSection content={content.howItWorks} />
        <WeightLossSection program={content.weightLoss} medications={content.medications} />
        <BmiAssessmentSection content={content.bmi} />
        <BirthControlSection program={content.birthControl} />
        <SleepSection program={content.sleep} />
        <CareFeaturesSection content={content.careFeatures} />
        <TestimonialsSection content={content.testimonials} />
        <FaqSection content={content.faq} />
        <FinalCtaSection content={content.finalCta} brandName={content.header.brandName} />
      </main>
      <Footer brandName={content.header.brandName} footer={content.footer} legal={content.legal} />
    </>
  );
}
