import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EASE_IO } from "../../lib/motion";
import { LogoMark } from "./Logo";

export const Preloader = ({ onDone }: { onDone: () => void }) => {
  const [n, setN] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    let id = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1100);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) id = requestAnimationFrame(tick);
      else setLeaving(true);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!leaving) return undefined;
    const t = setTimeout(onDone, 260);
    return () => clearTimeout(t);
  }, [leaving, onDone]);

  if (gone) return null;
  return (
    <motion.div
      data-testid="preloader"
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#03060F] p-6 md:p-10"
      initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
      animate={leaving ? { clipPath: "inset(0% 0% 100% 0%)" } : undefined}
      transition={{ duration: 0.95, ease: EASE_IO }}
      onAnimationComplete={() => leaving && setGone(true)}
    >
      <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.2em] text-[#A9B4C8]">
        <span>SOLD AI STUDIO</span>
        <span>SINGAPORE — EST. DESIGN</span>
      </div>
      <div className="flex items-end justify-between">
        <div className="flex items-center gap-4">
          <LogoMark size={44} />
          <span className="text-2xl font-light tracking-tight text-white md:text-4xl">Made human. Made better.</span>
        </div>
        <span className="font-mono text-5xl font-light tabular-nums text-white md:text-8xl">{String(n).padStart(3, "0")}</span>
      </div>
      <div className="absolute bottom-0 left-0 h-[3px] bg-[#2D6BFF]" style={{ width: `${n}%` }} />
    </motion.div>
  );
};
