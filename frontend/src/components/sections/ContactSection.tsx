import { CONTACT_STEPS, SITE } from "../../lib/content";
import { EnquiryForm } from "../site/EnquiryForm";
import { Chip, Reveal, SplitChars } from "../site/Primitives";

export const ContactDetails = () => (
  <div className="space-y-8 text-sm" data-testid="contact-details">
    <div>
      <p className="label-mono">Email</p>
      <a href={`mailto:${SITE.email}`} className="link-u mt-2 inline-block text-xl font-light text-white" data-testid="contact-email-link">{SITE.email}</a>
    </div>
    <div>
      <p className="label-mono">Singapore office</p>
      <address className="mt-2 not-italic leading-relaxed text-white">{SITE.address.map((l) => <span key={l} className="block">{l}</span>)}</address>
    </div>
    <div>
      <p className="label-mono">Office hours</p>
      <p className="mt-2 leading-relaxed text-[#C3CBDA]">{SITE.hours.map((h) => <span key={h} className="block">{h}</span>)}</p>
    </div>
  </div>
);

export const ExpectSteps = () => (
  <ol className="grid gap-4 md:grid-cols-3" data-testid="expect-steps">
    {CONTACT_STEPS.map((s, i) => (
      <Reveal key={s.n} delay={i * 0.08}>
        <li className="h-full border border-white/10 bg-[#070D1E]/70 p-6">
          <span className="font-mono text-xs text-[#7DA2FF]">{s.n}</span>
          <h3 className="mt-6 text-2xl font-light tracking-tight text-white">{s.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#C3CBDA]">{s.body}</p>
        </li>
      </Reveal>
    ))}
  </ol>
);

export const ContactSection = () => (
  <section className="relative z-10 py-28 md:py-40" data-chapter="06" data-chapter-name="Contact" id="contact" data-testid="contact-section">
    <div className="wrap grid gap-14 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <Reveal><Chip n="06" label="Contact" /></Reveal>
        <h2 className="section-title mt-8"><SplitChars text="Your next brand, with SOLD." /></h2>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-md text-base leading-relaxed text-[#C3CBDA]">
            Tell us what you are building and where research, consistency, or delivery feels difficult. We'll get back to you within 24 hours.
          </p>
        </Reveal>
        <div className="mt-12"><ContactDetails /></div>
      </div>
      <Reveal className="lg:col-span-7" delay={0.1}>
        <EnquiryForm id="home-enquiry" />
      </Reveal>
    </div>
  </section>
);
