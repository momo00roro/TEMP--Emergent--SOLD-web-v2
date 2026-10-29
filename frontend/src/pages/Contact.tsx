import { SITE } from "../lib/content";
import { Seo } from "../components/site/Seo";
import { PageHero } from "../components/site/PageHero";
import { EnquiryForm } from "../components/site/EnquiryForm";
import { Chip, Reveal } from "../components/site/Primitives";
import { ContactDetails, ExpectSteps } from "../components/sections/ContactSection";

export default function Contact() {
  return (
    <>
      <Seo path="/contact/" title="Contact an AI-First Branding & Digital Design Studio | SOLD AI Studio" description="Start a brand or digital project with SOLD AI Studio, an AI-first design studio in Singapore using AI to improve research, brand knowledge and delivery." />
      <PageHero testId="contact-hero" chip={["00", "Contact"]} lines={["Let us", "build together."]} srTitle="— Contact SOLD AI Studio" lead="Ready to discuss a brand or digital project? Tell us what you are building and where AI could help your team understand the work, keep brand knowledge connected or improve delivery." />
      <section className="relative z-10 pb-24 md:pb-36" data-chapter="01" data-chapter-name="Enquiry" id="contact" data-testid="contact-form-section">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-8"><EnquiryForm id="contact-enquiry" /></Reveal>
          <div className="lg:col-span-4">
            <ContactDetails />
            <div className="mt-8">
              <p className="label-mono">Follow us</p>
              <div className="mt-2 flex gap-4 text-sm">
                {SITE.socials.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="link-u text-white" data-testid={`contact-social-${s.label.toLowerCase()}`}>{s.label}</a>)}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative z-10 pb-28 md:pb-40" data-chapter="02" data-chapter-name="What to expect" data-testid="contact-expect">
        <div className="wrap">
          <Reveal><Chip n="02" label="What to expect" /></Reveal>
          <div className="mt-10"><ExpectSteps /></div>
        </div>
      </section>
    </>
  );
}
