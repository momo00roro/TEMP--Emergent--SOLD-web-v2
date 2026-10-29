import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IMG, TESTIMONIALS, Testimonial } from "../../lib/content";
import { EASE, VIEWPORT } from "../../lib/motion";
import { AwardRow } from "./TrustBar";
import { Chip, Reveal, SplitChars } from "../site/Primitives";

export const QuoteCard = ({ t, i }: { t: Testimonial; i: number }) => (
  <motion.figure
    className="quote-card"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={VIEWPORT}
    transition={{ duration: 0.9, ease: EASE, delay: (i % 3) * 0.08 }}
    data-testid={`testimonial-${i}`}
  >
    <span className="font-mono text-4xl leading-none text-[#2D6BFF]">“</span>
    <blockquote className="mt-2 flex-1 text-[15px] leading-relaxed text-[#DCE2EC]">{t.quote}</blockquote>
    <figcaption className="mt-8 flex items-center gap-3 border-t border-white/10 pt-5">
      <img src={IMG(t.photo)} alt={t.name} className="h-11 w-11 rounded-full object-cover grayscale" loading="lazy" />
      <span className="flex-1">
        <span className="block text-sm text-white">{t.name}</span>
        <span className="block text-xs text-[#A9B4C8]">{t.role}</span>
      </span>
      {t.work && <Link to={`/works/${t.work}/`} className="font-mono text-[10px] tracking-widest text-[#7DA2FF] hover:text-white" data-testid={`testimonial-${i}-project`}>PROJECT →</Link>}
    </figcaption>
  </motion.figure>
);

export const TestimonialsSection = () => (
  <section className="relative z-10 py-28 md:py-40" data-chapter="05" data-chapter-name="Voices" data-testid="testimonials-section">
    <div className="wrap">
      <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Reveal><Chip n="05" label="Voices" /></Reveal>
          <h2 className="section-title mt-8"><SplitChars text="What clients say about us." /></h2>
        </div>
        <Reveal delay={0.1}><AwardRow /></Reveal>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((t, i) => <QuoteCard key={t.name} t={t} i={i} />)}
      </div>
    </div>
  </section>
);
