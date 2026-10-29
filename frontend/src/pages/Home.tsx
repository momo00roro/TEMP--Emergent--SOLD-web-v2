import { Seo } from "../components/site/Seo";
import { Marquee } from "../components/site/Marquee";
import { Hero } from "../components/sections/Hero";
import { TrustBar } from "../components/sections/TrustBar";
import { Manifesto, StudioIntro } from "../components/sections/About";
import { ServicesSection } from "../components/sections/Services";
import { WorksSection } from "../components/sections/Works";
import { MethodSection } from "../components/sections/Method";
import { TestimonialsSection } from "../components/sections/Testimonials";
import { ContactSection } from "../components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Seo
        path="/"
        title="AI-First Branding & Digital Design Studio Singapore | SOLD AI Studio"
        description="SOLD AI Studio is an award-winning, AI-first branding and digital design studio in Singapore. We use AI to improve the systems and processes behind our client work."
      />
      <Hero />
      <TrustBar />
      <Manifesto />
      <StudioIntro />
      <ServicesSection />
      <WorksSection />
      <MethodSection />
      <TestimonialsSection />
      <Marquee />
      <ContactSection />
    </>
  );
}
