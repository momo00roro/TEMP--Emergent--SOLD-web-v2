import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { IMG, WORKS } from "../../lib/content";
import { EASE, VIEWPORT, useDesktop } from "../../lib/motion";
import { Btn, Chip, Highlight, Reveal } from "../site/Primitives";

const FEATURED = ["koba", "radiant-health", "moms-up", "quotz", "nippon-paint-b2b", "sunwheel"].map((s) => WORKS.find((w) => w.slug === s)!);

const Preview = ({ active }: { active: number }) => (
  <div className="frame spotlight sticky top-24 aspect-[4/3]" data-testid="works-preview">
    {FEATURED.map((w, i) => (
      <motion.img
        key={w.slug}
        src={IMG(w.image)}
        alt={`${w.title} — ${w.tagline}`}
        className="absolute inset-0 h-full w-full object-cover"
        initial={false}
        animate={{ clipPath: i === active ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)", scale: i === active ? 1 : 1.12 }}
        transition={{ duration: 0.9, ease: EASE }}
        loading="lazy"
      />
    ))}
    <span className="frame-tag">{FEATURED[active].location.toUpperCase()} — {String(active + 1).padStart(2, "0")}/{String(FEATURED.length).padStart(2, "0")}</span>
  </div>
);

export const WorksSection = () => {
  const [active, setActive] = useState(0);
  const desktop = useDesktop();
  return (
    <section className="relative z-10 py-28 md:py-40" data-chapter="03" data-chapter-name="Work" id="work" data-testid="works-section">
      <div className="wrap">
        <Reveal><Chip n="03" label="Work" /></Reveal>
        <h2 className="section-title mt-8 max-w-5xl">
          Award-winning work for brands in <Highlight>Singapore</Highlight>, Japan, Malaysia and <Highlight delay={0.15}>Norway</Highlight>.
        </h2>
        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <ol className="lg:col-span-6">
            {FEATURED.map((w, i) => (
              <motion.li key={w.slug} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEWPORT} transition={{ duration: 0.8, ease: EASE, delay: i * 0.05 }}>
                <Link to={`/works/${w.slug}/`} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} className={`work-row group ${active === i && desktop ? "is-active" : ""}`} data-testid={`work-row-${w.slug}`}>
                  {!desktop && <img src={IMG(w.image)} alt={`${w.title} — ${w.tagline}`} className="mb-5 aspect-[4/3] w-full object-cover" loading="lazy" />}
                  <div className="flex items-start gap-5">
                    <span className="pt-2 font-mono text-[11px] text-[#7DA2FF]">{String(i + 1).padStart(2, "0")}</span>
                    <div className="flex-1">
                      <h3 className="text-3xl font-light tracking-tight text-white md:text-4xl">{w.title}</h3>
                      <p className="mt-1 text-sm text-[#C3CBDA]">{w.location} — {w.tagline}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {w.awards?.map((a) => <span key={a} className="award-pill award-pill-blue">{a}</span>)}
                        <span className="font-mono text-[10px] tracking-widest text-[#A9B4C8]">{w.disciplines.join(" · ").toUpperCase()}</span>
                      </div>
                    </div>
                    <ArrowUpRight className="mt-2 text-white transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" size={22} strokeWidth={1.5} />
                  </div>
                </Link>
              </motion.li>
            ))}
          </ol>
          {desktop && <div className="lg:col-span-6"><Preview active={active} /></div>}
        </div>
        <div className="mt-14"><Btn to="/works/" arrow testId="works-view-all">View all works</Btn></div>
      </div>
    </section>
  );
};
