import { motion } from "framer-motion";
import { IMG, STATS, TEAM } from "../../lib/content";
import { EASE, VIEWPORT } from "../../lib/motion";
import { Btn, Chip, Counter, Highlight, Reveal, SplitChars } from "../site/Primitives";

export const Manifesto = () => (
  <section className="relative z-10 py-28 md:py-44" data-chapter="01" data-chapter-name="Studio" data-testid="manifesto">
    <div className="wrap text-center">
      <Reveal><Chip n="01" label="Studio" /></Reveal>
      <blockquote className="manifesto mx-auto mt-10 max-w-6xl">
        We trade in the currency of <Highlight>meaning</Highlight> — where every pixel is placed with <Highlight delay={0.15}>purpose</Highlight> and every line has a <Highlight delay={0.3}>reason</Highlight>.
      </blockquote>
      <Reveal delay={0.2}><p className="mt-10 font-mono text-xs tracking-[0.2em] text-[#A9B4C8]">— RONNIE CHAN, FOUNDER & DESIGN PARTNER</p></Reveal>
    </div>
  </section>
);

export const Stats = () => (
  <dl className="grid grid-cols-1 border-t border-white/10 sm:grid-cols-3" data-testid="stats">
    {STATS.map((s, i) => (
      <Reveal key={s.label} delay={i * 0.08} className="border-b border-white/10 py-8 sm:border-b-0 sm:border-r sm:px-6 sm:last:border-r-0 sm:first:pl-0">
        <dt className="font-mono text-[11px] tracking-[0.2em] text-[#A9B4C8]">MORE THAN</dt>
        <dd className="mt-2 text-6xl font-light tracking-tight text-white md:text-7xl"><Counter value={s.value} testId={`stat-${i}`} /></dd>
        <dd className="mt-2 text-sm text-[#C3CBDA]">{s.label}</dd>
      </Reveal>
    ))}
  </dl>
);

export const StudioIntro = () => (
  <section className="relative z-10 pb-28 md:pb-40" data-chapter="01" data-chapter-name="Studio" data-testid="studio-intro">
    <div className="wrap grid gap-14 lg:grid-cols-12">
      <div className="lg:col-span-6">
        <h2 className="section-title"><SplitChars text="A studio built on curiosity & craft." /></h2>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-[#C3CBDA] md:text-lg">
            SOLD AI Studio is an award-winning design studio in Singapore. We create thoughtful brand identities, websites, and digital experiences. AI-first is how we run the studio behind that work — our designers set the creative direction, design the final work, and take responsibility for what we deliver.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex items-center gap-5">
            <div className="flex -space-x-3">
              {TEAM.map((t) => <img key={t.name} src={IMG(t.photo)} alt={`Studio SOLD team member: ${t.name}`} className="h-12 w-12 rounded-full border-2 border-[#03060F] object-cover" loading="lazy" />)}
            </div>
            <p className="text-sm text-[#C3CBDA]">10+ years of digital & brand,<br />one accountable team.</p>
          </div>
        </Reveal>
        <div className="mt-10"><Btn to="/studio/" variant="ghost" arrow testId="studio-intro-more">About the studio</Btn></div>
      </div>
      <div className="lg:col-span-6">
        <motion.figure className="frame aspect-[4/3]" initial={{ clipPath: "inset(18% 12% 18% 12%)" }} whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }} viewport={VIEWPORT} transition={{ duration: 1.3, ease: EASE }}>
          <motion.img src={IMG("photo-SOLD-office.webp")} alt="Office of Studio SOLD in Singapore" className="h-full w-full object-cover" initial={{ scale: 1.25 }} whileInView={{ scale: 1 }} viewport={VIEWPORT} transition={{ duration: 1.6, ease: EASE }} loading="lazy" />
          <figcaption className="frame-tag">SOLD STUDIO — PAYA LEBAR, SG</figcaption>
        </motion.figure>
        <div className="mt-10"><Stats /></div>
      </div>
    </div>
  </section>
);
