import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { IMG, WORKS, Work } from "../lib/content";
import { EASE, VIEWPORT } from "../lib/motion";
import { Seo } from "../components/site/Seo";
import { PageHero } from "../components/site/PageHero";
import { CtaBand } from "../components/site/CtaBand";
import { Chip, Reveal } from "../components/site/Primitives";

export const WorkCard = ({ w, i, large = false }: { w: Work; i: number; large?: boolean }) => (
  <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEWPORT} transition={{ duration: 1, ease: EASE, delay: (i % 2) * 0.1 }}>
    <Link to={`/works/${w.slug}/`} className="work-card group block" data-testid={`work-card-${w.slug}`}>
      <div className={`frame spotlight ${large ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
        <img src={IMG(w.image)} alt={`${w.title} — ${w.tagline}`} className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.05]" loading="lazy" />
        {w.awards && <div className="absolute left-4 top-4 flex gap-1.5">{w.awards.map((a) => <span key={a} className="award-pill award-pill-blue">{a}</span>)}</div>}
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] tracking-widest text-[#A9B4C8]">{w.disciplines.join(" | ").toUpperCase()}</p>
          <h3 className="mt-2 text-2xl font-light tracking-tight text-white md:text-3xl">{w.title}</h3>
          <p className="mt-1 text-sm text-[#C3CBDA]">{w.location} | {w.tagline}</p>
        </div>
        <ArrowUpRight size={22} className="mt-6 shrink-0 text-white transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
      </div>
    </Link>
  </motion.div>
);

export default function Works() {
  const winners = WORKS.filter((w) => w.awards);
  const rest = WORKS.filter((w) => !w.awards);
  return (
    <>
      <Seo path="/works/" title="Our Work | Singapore Branding & Digital Design Portfolio | SOLD AI Studio" description="Explore SOLD AI Studio's selected branding, visual identity, UI/UX design, website, and digital experience projects for ambitious brands in Singapore and beyond." />
      <PageHero testId="works-hero" chip={["00", "Works"]} lines={["Selected", "case studies."]} srTitle="— SOLD AI Studio branding & digital design portfolio" lead="Selected case studies showing how Studio SOLD combines brand strategy, digital design, and thoughtful execution to solve real business challenges — in Singapore and beyond." />
      <section className="relative z-10 pb-20 md:pb-32" data-chapter="01" data-chapter-name="Award winners" data-testid="works-winners">
        <div className="wrap">
          <Reveal><Chip n="01" label="Award winners" /></Reveal>
          <div className="mt-10 grid gap-10 md:grid-cols-2">{winners.map((w, i) => <WorkCard key={w.slug} w={w} i={i} large />)}</div>
        </div>
      </section>
      <section className="relative z-10 py-20 md:py-32" data-chapter="02" data-chapter-name="More projects" data-testid="works-more">
        <div className="wrap">
          <Reveal><Chip n="02" label="More projects" /></Reveal>
          <div className="mt-10 grid gap-x-10 gap-y-16 md:grid-cols-2">{rest.map((w, i) => <WorkCard key={w.slug} w={w} i={i} />)}</div>
          <Reveal className="mt-16">
            <a href="https://www.behance.net/studiosold" target="_blank" rel="noreferrer" className="behance-card group" data-testid="works-behance-link">
              <span className="font-mono text-[11px] tracking-[0.2em] text-[#7DA2FF]">VIEW ALL ON BEHANCE</span>
              <span className="mt-2 flex items-center justify-between text-3xl font-light tracking-tight text-white md:text-5xl">Explore our full portfolio <ArrowUpRight size={36} strokeWidth={1.2} className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" /></span>
            </a>
          </Reveal>
        </div>
      </section>
      <CtaBand title="Have a project in mind?" />
    </>
  );
}
