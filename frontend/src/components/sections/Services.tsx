import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SERVICES, Service } from "../../lib/content";
import { EASE, VIEWPORT } from "../../lib/motion";
import { Chip, Reveal, SplitChars } from "../site/Primitives";
import { ServiceIcon } from "../site/ServiceIcon";

const Card = ({ s, i }: { s: Service; i: number }) => (
  <motion.article
    className="svc-card group"
    initial={{ opacity: 0, y: 60, rotateX: 18 }}
    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
    viewport={VIEWPORT}
    transition={{ duration: 1, ease: EASE, delay: (i % 4) * 0.08 }}
    data-testid={`service-card-${s.id}`}
  >
    <div className="svc-art">
      <span className="absolute left-3 top-3 font-mono text-[11px] text-[#2D6BFF]">{s.n}</span>
      <span className="svc-icon"><ServiceIcon name={s.icon} /></span>
    </div>
    <div className="flex flex-1 flex-col p-5">
      <h3 className="text-[22px] font-normal tracking-tight text-[#0B1220]">{s.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#3B4658]">{s.short}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {s.tags.map((t) => <li key={t} className="tag">{t}</li>)}
      </ul>
      <Link to={`/services/#${s.id}`} className="mt-auto flex items-center justify-between border-t border-[#E3E8F2] pt-4 text-sm text-[#0B1220]" data-testid={`service-learn-${s.id}`}>
        <span className="pt-1">Learn more</span>
        <ArrowRight size={16} className="text-[#2D6BFF] transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  </motion.article>
);

export const ServicesGrid = () => (
  <div className="grid gap-4 [perspective:1400px] sm:grid-cols-2 lg:grid-cols-4" data-testid="services-grid">
    {SERVICES.map((s, i) => <Card key={s.id} s={s} i={i} />)}
    <motion.div className="svc-cta" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEWPORT} transition={{ duration: 1, ease: EASE, delay: 0.24 }}>
      <span className="font-mono text-[11px] tracking-[0.2em] text-white/80">NOT SURE YET?</span>
      <p className="mt-4 text-2xl font-light leading-snug tracking-tight text-white">Tell us what you're building. We'll find the right shape for it.</p>
      <Link to="/contact/" className="btn btn-light mt-auto self-start" data-testid="services-not-sure-cta"><span>Start a project</span><ArrowRight className="btn-arrow" size={16} /></Link>
    </motion.div>
  </div>
);

export const ServicesSection = () => (
  <section className="relative z-10 py-28 md:py-40" data-chapter="02" data-chapter-name="Services" id="services" data-testid="services-section">
    <div className="wrap">
      <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <Reveal><Chip n="02" label="Services" /></Reveal>
          <h2 className="section-title mt-8"><SplitChars text="Bringing value to our partners." /></h2>
        </div>
        <Reveal delay={0.15} className="lg:col-span-4">
          <p className="text-base leading-relaxed text-[#C3CBDA]">Every service is delivered by our design team, supported by AI systems that keep research, decisions, and reviews connected.</p>
        </Reveal>
      </div>
      <ServicesGrid />
    </div>
  </section>
);
