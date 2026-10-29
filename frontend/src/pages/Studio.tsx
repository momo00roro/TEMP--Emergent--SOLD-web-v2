import { motion } from "framer-motion";
import { IMG, TEAM } from "../lib/content";
import { EASE, VIEWPORT } from "../lib/motion";
import { Seo } from "../components/site/Seo";
import { PageHero } from "../components/site/PageHero";
import { CtaBand } from "../components/site/CtaBand";
import { Chip, Highlight, Reveal, SplitChars } from "../components/site/Primitives";
import { Stats } from "../components/sections/About";
import { MethodSection } from "../components/sections/Method";
import { AwardRow, ClientGrid } from "../components/sections/TrustBar";

export default function Studio() {
  return (
    <>
      <Seo path="/studio/" title="About SOLD AI Studio | AI-First Design Studio in Singapore" description="Meet SOLD AI Studio — an award-winning design studio in Singapore creating brand identities, websites and digital experiences, run AI-first with designers accountable for every deliverable." />
      <PageHero testId="studio-hero" chip={["00", "Studio"]} lines={["A studio built on", "curiosity & craft."]} srTitle="— About SOLD AI Studio, Singapore" lead="SOLD AI Studio is an award-winning design studio in Singapore. We create thoughtful brand identities, websites, and digital experiences. AI-first is how we run the studio behind that work." />

      <section className="relative z-10 py-20 md:py-32" data-chapter="01" data-chapter-name="Story" data-testid="studio-story">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal><Chip n="01" label="Story" /></Reveal>
            <p className="manifesto mt-10 text-left">
              Branding in the digital age is a <Highlight>story</Highlight> unfolding seamlessly across all user <Highlight delay={0.15}>touchpoints</Highlight>.
            </p>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-[#C3CBDA] md:text-lg">
                That's why we work with brands to bring clarity to their message and shape it into memorable stories across digital channels. AI helps us organise project research with sources attached, keep approved brand knowledge easy to find, and review work against the brief before delivery.
              </p>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[#C3CBDA] md:text-lg">For you, that means fewer surprises and more confidence that the work is built on evidence.</p>
              <p className="mt-8 font-mono text-xs tracking-[0.2em] text-[#A9B4C8]">— RONNIE CHAN, FOUNDER & DESIGN PARTNER</p>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <motion.figure className="frame aspect-[4/5]" initial={{ clipPath: "inset(20% 0% 20% 0%)" }} whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }} viewport={VIEWPORT} transition={{ duration: 1.3, ease: EASE }}>
              <img src={IMG("photo-SOLD-office.webp")} alt="Office of Studio SOLD" className="h-full w-full object-cover" loading="lazy" />
              <figcaption className="frame-tag">60 PAYA LEBAR RD — SINGAPORE</figcaption>
            </motion.figure>
            <div className="mt-6 flex items-center gap-4">
              {TEAM.map((t) => (
                <figure key={t.name} className="text-center">
                  <img src={IMG(t.photo)} alt={`Studio SOLD team member: ${t.name}`} className="h-16 w-16 rounded-full object-cover" loading="lazy" />
                  <figcaption className="mt-2 font-mono text-[10px] tracking-widest text-[#A9B4C8]">{t.name.toUpperCase()}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
        <div className="wrap mt-20"><Stats /></div>
      </section>

      <MethodSection />

      <section className="relative z-10 py-24 md:py-36" data-chapter="05" data-chapter-name="Clients" data-testid="studio-clients">
        <div className="wrap">
          <Reveal><Chip n="05" label="Clients" /></Reveal>
          <h2 className="section-title mt-8 max-w-4xl"><SplitChars text="Partnering with more than 124 brands." /></h2>
          <div className="mt-10"><AwardRow /></div>
          <div className="mt-10"><ClientGrid /></div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
