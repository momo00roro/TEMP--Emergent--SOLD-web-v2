import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useIntro } from "../../lib/intro";
import { EASE } from "../../lib/motion";
import { Chip, MaskLines } from "./Primitives";

type Props = { chip: [string, string]; lines: string[]; srTitle?: string; lead: string; children?: ReactNode; testId: string };

export const PageHero = ({ chip, lines, srTitle, lead, children, testId }: Props) => {
  const intro = useIntro();
  return (
    <section className="relative z-10 pb-16 pt-36 md:pb-24 md:pt-48" data-chapter="00" data-chapter-name={chip[1]} data-testid={testId}>
      <div className="wrap">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={intro ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.7, ease: EASE }}>
          <Chip n={chip[0]} label={chip[1]} />
        </motion.div>
        <h1 className="page-title mt-8">
          <MaskLines lines={lines} go={intro} delay={0.1} />
          {srTitle && <span className="sr-only"> {srTitle}</span>}
        </h1>
        <motion.p className="mt-10 max-w-2xl text-base leading-relaxed text-[#C3CBDA] md:text-lg" initial={{ opacity: 0, y: 16 }} animate={intro ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.9, ease: EASE, delay: 0.45 }}>
          {lead}
        </motion.p>
        {children}
      </div>
    </section>
  );
};
