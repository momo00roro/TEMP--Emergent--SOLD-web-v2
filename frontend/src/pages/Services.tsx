import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SERVICES } from "../lib/content";
import { EASE, VIEWPORT } from "../lib/motion";
import { Seo } from "../components/site/Seo";
import { PageHero } from "../components/site/PageHero";
import { CtaBand } from "../components/site/CtaBand";
import { Chip, Reveal } from "../components/site/Primitives";
import { ServiceIcon } from "../components/site/ServiceIcon";
import { MethodSection } from "../components/sections/Method";
import { ExpectSteps } from "../components/sections/ContactSection";

const ServiceRow = ({ s }: { s: (typeof SERVICES)[number] }) => (
  <motion.article id={s.id} className="svc-row group scroll-mt-24" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEWPORT} transition={{ duration: 0.9, ease: EASE }} data-testid={`service-row-${s.id}`}>
    <div className="flex items-center gap-4 md:col-span-4">
      <span className="font-mono text-xs text-[#7DA2FF]">{s.n}</span>
      <span className="svc-icon svc-icon-sm"><ServiceIcon name={s.icon} size={20} /></span>
      <h2 className="text-3xl font-light tracking-tight text-white md:text-4xl">{s.title}</h2>
    </div>
    <div className="md:col-span-6 md:col-start-6">
      <p className="text-base leading-relaxed text-[#C3CBDA] md:text-lg">{s.body}</p>
      <ul className="mt-5 flex flex-wrap gap-1.5">{s.tags.map((t) => <li key={t} className="tag tag-dark">{t}</li>)}</ul>
    </div>
    <div className="md:col-span-1 md:col-start-12 md:text-right">
      <Link to="/contact/" className="font-mono text-[10px] tracking-widest text-[#7DA2FF] hover:text-white" data-testid={`service-enquire-${s.id}`}>ENQUIRE →</Link>
    </div>
  </motion.article>
);

export default function Services() {
  return (
    <>
      <Seo path="/services/" title="Branding, UI/UX & Web Design Services Singapore | SOLD AI Studio" description="Brand strategy, brand identity, creative direction, UI/UX design, digital experiences and maintenance from SOLD AI Studio — delivered by designers, supported by AI-first systems." />
      <PageHero testId="services-hero" chip={["00", "Services"]} lines={["Bringing value", "to our partners."]} srTitle="— Branding & digital design services in Singapore" lead="Every service is delivered by our design team, supported by AI systems that keep research, decisions, and reviews connected." />
      <section className="relative z-10 pb-24 md:pb-36" data-chapter="02" data-chapter-name="Services" data-testid="services-list">
        <div className="wrap">
          <div className="border-t border-white/10">{SERVICES.map((s) => <ServiceRow key={s.id} s={s} />)}</div>
        </div>
      </section>
      <MethodSection />
      <section className="relative z-10 py-24 md:py-36" data-chapter="05" data-chapter-name="Next steps" data-testid="services-expect">
        <div className="wrap">
          <Reveal><Chip n="05" label="What to expect" /></Reveal>
          <h2 className="section-title mb-12 mt-8">From first message to proposal.</h2>
          <ExpectSteps />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
