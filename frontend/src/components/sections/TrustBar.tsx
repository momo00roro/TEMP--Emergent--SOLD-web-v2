import { motion } from "framer-motion";
import { AWARDS, CLIENTS, IMG } from "../../lib/content";
import { EASE, VIEWPORT } from "../../lib/motion";

export const ClientGrid = () => (
  <ul className="client-grid" data-testid="client-grid">
    {CLIENTS.map((c, i) => (
      <motion.li key={c.name} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={VIEWPORT} transition={{ duration: 0.8, ease: EASE, delay: i * 0.05 }}>
        <img src={IMG(c.file)} alt={`${c.name} — client of SOLD AI Studio`} loading="lazy" width={132} height={60} />
      </motion.li>
    ))}
  </ul>
);

export const AwardRow = () => (
  <div className="flex flex-wrap items-center gap-2" data-testid="award-row">
    <span className="mr-3 font-mono text-[11px] tracking-[0.2em] text-[#A9B4C8]">AWARDS & FEATURES</span>
    {AWARDS.map((a) => (
      <span key={a} className="award-pill">{a}</span>
    ))}
  </div>
);

export const TrustBar = () => (
  <section className="relative z-10 border-y border-white/10 bg-[#03060F]/80 backdrop-blur-md" aria-label="Clients and awards" data-testid="trust-bar">
    <div className="wrap py-10 md:py-14">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <p className="max-w-md text-lg font-light leading-snug text-white md:text-2xl">
          Trusted by more than <span className="text-[#7DA2FF]">124 brands</span> — from banks to healthcare to household names.
        </p>
        <AwardRow />
      </div>
      <ClientGrid />
    </div>
  </section>
);
