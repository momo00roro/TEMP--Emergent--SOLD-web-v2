import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { METHOD } from "../../lib/content";
import { EASE, useDesktop } from "../../lib/motion";
import { Chip, Reveal, SplitChars } from "../site/Primitives";

const Intro = () => (
  <>
    <Chip n="04" label="Method" />
    <h2 className="section-title mt-8"><SplitChars text="AI-first means better systems for creative work." /></h2>
    <p className="mt-6 max-w-lg text-base leading-relaxed text-[#C3CBDA]">
      We are designers first. AI-first is how we work — practical systems that keep the thinking behind your project clear, consistent, and accountable.
    </p>
  </>
);

const Terminal = ({ i }: { i: number }) => (
  <div className="terminal" data-testid="method-terminal">
    <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
      <span className="h-2.5 w-2.5 rounded-full bg-white/20" /><span className="h-2.5 w-2.5 rounded-full bg-white/20" /><span className="h-2.5 w-2.5 rounded-full bg-[#2D6BFF]" />
      <span className="ml-3 font-mono text-[10px] tracking-widest text-[#A9B4C8]">SOLD / METHOD / {METHOD[i].kicker.toUpperCase()}</span>
    </div>
    <div className="relative min-h-[150px] p-5 font-mono text-[13px] leading-7 text-[#C3CBDA]">
      <AnimatePresence initial={false}>
        <motion.div key={i} className="absolute inset-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          {METHOD[i].term.map((l, k) => (
            <motion.p key={k} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + k * 0.18, duration: 0.5, ease: EASE }} className={k === 0 ? "text-white" : ""}>
              {l}
            </motion.p>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  </div>
);

const Honesty = () => (
  <p className="mt-8 max-w-md border-l-2 border-[#2D6BFF] pl-4 text-sm leading-relaxed text-[#C3CBDA]">
    Where we are today: some of these systems already run inside the studio. Others are still in development, and we say so.
  </p>
);

const Pinned = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  const pct = useTransform(scrollYProgress, (v) => `${Math.max(10, Math.round(Math.min(1, v) * 100))}%`);
  const bar = useTransform(scrollYProgress, [0, 1], ["10%", "100%"]);
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(3, Math.max(0, Math.floor(v * 4)))));
  return (
    <div ref={ref} className="relative" style={{ height: "360vh" }}>
      <div className="sticky top-0 flex h-screen items-center">
        <div className="wrap grid w-full grid-cols-12 gap-10">
          <div className="col-span-5">
            <Intro />
            <ol className="mt-10 space-y-1">
              {METHOD.map((m, i) => (
                <li key={m.n} className={`method-step ${i === active ? "is-on" : ""}`} data-testid={`method-step-${i}`}>
                  <span className="font-mono text-[11px]">{m.n}</span>
                  <span>{m.kicker}</span>
                  <span className="ml-auto text-sm text-[#A9B4C8]">{m.title}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="col-span-6 col-start-7 flex flex-col justify-center">
            <div className="relative h-[150px] overflow-hidden">
              <AnimatePresence initial={false}>
                <motion.div key={active} className="absolute inset-0" initial={{ y: "100%" }} animate={{ y: "0%" }} exit={{ y: "-100%" }} transition={{ duration: 0.8, ease: EASE }}>
                  <p className="font-mono text-xs tracking-[0.2em] text-[#7DA2FF]">{METHOD[active].n} / {METHOD[active].kicker.toUpperCase()}</p>
                  <h3 className="mt-3 text-5xl font-light tracking-tight text-white">{METHOD[active].title}</h3>
                  <p className="mt-3 max-w-md text-base text-[#C3CBDA]">{METHOD[active].body}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-8"><Terminal i={active} /></div>
            <div className="mt-8 flex items-end justify-between">
              <motion.span className="text-7xl font-light tabular-nums tracking-tight text-white" data-testid="method-percent">{pct}</motion.span>
              <span className="pb-3 text-right text-sm text-[#A9B4C8]">The details<br />make the brand.</span>
            </div>
            <div className="mt-4 h-[2px] w-full bg-white/10"><motion.div className="h-full bg-[#2D6BFF]" style={{ width: bar }} /></div>
            <Honesty />
          </div>
        </div>
      </div>
    </div>
  );
};

const Stacked = () => (
  <div className="wrap">
    <Intro />
    <div className="mt-12 space-y-4">
      {METHOD.map((m, i) => (
        <Reveal key={m.n} delay={i * 0.05}>
          <article className="border border-white/10 bg-[#070D1E]/80 p-6" data-testid={`method-card-${i}`}>
            <p className="font-mono text-xs tracking-[0.2em] text-[#7DA2FF]">{m.n} / {m.kicker.toUpperCase()}</p>
            <h3 className="mt-3 text-3xl font-light tracking-tight text-white">{m.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-[#C3CBDA]">{m.body}</p>
            <p className="mt-4 font-mono text-xs text-[#A9B4C8]">{m.term[0]}</p>
          </article>
        </Reveal>
      ))}
    </div>
    <Honesty />
  </div>
);

export const MethodSection = () => {
  const desktop = useDesktop();
  return (
    <section className="relative z-10 py-24 lg:py-0" data-chapter="04" data-chapter-name="Method" id="ai-process" data-testid="method-section">
      {desktop ? <Pinned /> : <Stacked />}
    </section>
  );
};
