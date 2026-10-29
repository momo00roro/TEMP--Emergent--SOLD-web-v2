import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { IMG, TESTIMONIALS, WORKS } from "../lib/content";
import { EASE, VIEWPORT } from "../lib/motion";
import { Seo } from "../components/site/Seo";
import { PageHero } from "../components/site/PageHero";
import { CtaBand } from "../components/site/CtaBand";
import { Btn, Chip, Reveal } from "../components/site/Primitives";
import { QuoteCard } from "../components/sections/Testimonials";
import NotFound from "./NotFound";

const Fact = ({ label, value }: { label: string; value: string }) => (
  <div className="border-t border-white/10 pt-4">
    <dt className="label-mono">{label}</dt>
    <dd className="mt-2 text-base text-white">{value}</dd>
  </div>
);

export default function WorkDetail() {
  const { slug } = useParams();
  const idx = WORKS.findIndex((w) => w.slug === slug);
  if (idx < 0) return <NotFound />;
  const w = WORKS[idx];
  const next = WORKS[(idx + 1) % WORKS.length];
  const quote = TESTIMONIALS.find((t) => t.work === w.slug);

  return (
    <>
      <Seo path={`/works/${w.slug}/`} title={`${w.title} — ${w.tagline} | SOLD AI Studio`} description={`${w.title} (${w.location}): ${w.tagline}. ${w.disciplines.join(", ")} by SOLD AI Studio, an award-winning design studio in Singapore.`} />
      <PageHero testId="work-hero" chip={["00", w.location]} lines={[w.title]} lead={w.tagline} />
      <section className="relative z-10" data-chapter="01" data-chapter-name="Project" data-testid="work-media">
        <div className="wrap">
          <motion.figure className="frame spotlight aspect-[16/9]" initial={{ clipPath: "inset(14% 8% 14% 8%)" }} whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }} viewport={VIEWPORT} transition={{ duration: 1.4, ease: EASE }}>
            <motion.img src={IMG(w.image)} alt={`${w.title} — ${w.tagline} — project by SOLD AI Studio`} className="h-full w-full object-cover" initial={{ scale: 1.2 }} whileInView={{ scale: 1 }} viewport={VIEWPORT} transition={{ duration: 1.8, ease: EASE }} />
          </motion.figure>
          <dl className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" data-testid="work-facts">
            <Fact label="Client" value={w.title} />
            <Fact label="Location" value={w.location} />
            <Fact label="Disciplines" value={w.disciplines.join(", ")} />
            <Fact label="Recognition" value={w.awards ? w.awards.join(", ") : "—"} />
          </dl>
        </div>
      </section>
      {quote && (
        <section className="relative z-10 py-24" data-chapter="02" data-chapter-name="Client voice" data-testid="work-quote">
          <div className="wrap grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4"><Reveal><Chip n="02" label="Client voice" /></Reveal></div>
            <div className="lg:col-span-8"><QuoteCard t={quote} i={0} /></div>
          </div>
        </section>
      )}
      <section className="relative z-10 py-24" data-chapter="03" data-chapter-name="Next" data-testid="work-next">
        <div className="wrap flex flex-col gap-8 border-t border-white/10 pt-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label-mono">Next project</p>
            <Link to={`/works/${next.slug}/`} className="group mt-3 flex items-center gap-4 text-4xl font-light tracking-tight text-white md:text-6xl" data-testid="work-next-link">
              {next.title} <ArrowRight className="transition-transform duration-500 group-hover:translate-x-2" size={40} strokeWidth={1.2} />
            </Link>
          </div>
          <Btn to="https://www.behance.net/studiosold" variant="ghost" testId="work-behance">More on Behance</Btn>
        </div>
      </section>
      <CtaBand title="Want results like these?" />
    </>
  );
}
