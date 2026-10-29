import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIntro } from "../../lib/intro";
import { EASE } from "../../lib/motion";
import { FloatingTiles } from "../site/FloatingTiles";
import { Btn, MaskLines } from "../site/Primitives";

export const Hero = () => {
  const intro = useIntro();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} className="relative z-10 min-h-[100svh] overflow-hidden" data-chapter="00" data-chapter-name="Welcome" data-testid="home-hero">
      <FloatingTiles progress={scrollYProgress} />
      <motion.div style={{ y, opacity: fade }} className="wrap relative flex min-h-[100svh] flex-col justify-end pb-14 pt-36 md:pb-20 lg:pb-24">
        <motion.p className="mb-4 text-base text-[#D5DBE7] md:mb-6 md:text-xl" initial={{ opacity: 0, y: 14 }} animate={intro ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.8, ease: EASE }} data-testid="hero-kicker">
          Award-winning design studio in Singapore, working AI-first
        </motion.p>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <h1 className="hero-title" data-testid="hero-title">
            <MaskLines lines={["Made human.", "Made better."]} go={intro} delay={0.08} />
            <span className="sr-only"> SOLD AI Studio — AI-first branding and digital design studio in Singapore</span>
          </h1>
          <motion.div className="max-w-sm lg:mb-4" initial={{ opacity: 0, y: 20 }} animate={intro ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}>
            <p className="text-[15px] leading-relaxed text-[#C3CBDA] md:text-base">
              Brand identities, websites and digital experiences — with AI keeping research traceable, brand knowledge close, and delivery clear.
            </p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              <Btn to="/works/" arrow testId="hero-see-work">See our work</Btn>
              <Btn to="/contact/" variant="ghost" testId="hero-start-project">Start a project</Btn>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
