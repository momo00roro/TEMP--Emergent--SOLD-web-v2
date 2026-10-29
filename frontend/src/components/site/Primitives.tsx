import { ReactNode, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { animate, motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { DUR, EASE, STAGGER, VIEWPORT } from "../../lib/motion";

export const Chip = ({ n, label, light = false }: { n: string; label: string; light?: boolean }) => (
  <span className="chip" data-light={light}>
    <span className="chip-n">{n}</span>
    <span className="chip-l">{label}</span>
  </span>
);

type BtnProps = { to: string; children: ReactNode; testId: string; variant?: "primary" | "ghost" | "light"; arrow?: boolean };

export const Btn = ({ to, children, testId, variant = "primary", arrow = false }: BtnProps) => {
  const cls = `btn btn-${variant}`;
  const inner = (
    <>
      <span>{children}</span>
      {arrow && <ArrowRight className="btn-arrow" size={16} strokeWidth={1.75} />}
    </>
  );
  if (to.startsWith("http") || to.startsWith("mailto:")) {
    return <a href={to} className={cls} data-testid={testId} target={to.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{inner}</a>;
  }
  return <Link to={to} className={cls} data-testid={testId}>{inner}</Link>;
};

export const Reveal = ({ children, delay = 0, className = "", y = 28 }: { children: ReactNode; delay?: number; className?: string; y?: number }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={VIEWPORT}
    transition={{ duration: DUR.base, ease: EASE, delay }}
  >
    {children}
  </motion.div>
);

export const MaskLines = ({ lines, go, delay = 0, className = "" }: { lines: string[]; go?: boolean; delay?: number; className?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, VIEWPORT);
  const run = go === undefined ? inView : go && inView;
  return (
    <span ref={ref} className={`block ${className}`}>
      {lines.map((line, i) => (
        <span key={line + i} className="mask-line">
          <motion.span
            className="block will-change-transform"
            initial={{ y: "110%", rotate: 2 }}
            animate={run ? { y: "0%", rotate: 0 } : undefined}
            transition={{ duration: DUR.slow, ease: EASE, delay: delay + i * STAGGER.lines }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

export const SplitChars = ({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, VIEWPORT);
  let idx = 0;
  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split(" ").map((word, w) => (
        <span key={word + w} className="inline-block whitespace-nowrap" aria-hidden="true">
          {word.split("").map((ch, c) => {
            const d = delay + idx++ * STAGGER.chars;
            return (
              <motion.span
                key={c}
                className="inline-block"
                initial={{ opacity: 0, y: "0.35em", filter: "blur(6px)" }}
                animate={inView ? { opacity: 1, y: "0em", filter: "blur(0px)" } : undefined}
                transition={{ duration: 0.7, ease: EASE, delay: d }}
              >
                {ch}
              </motion.span>
            );
          })}
          {w < text.split(" ").length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
};

export const Counter = ({ value, testId }: { value: number; testId: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, VIEWPORT);
  const [n, setN] = useState(value);
  const started = useRef(false);
  useEffect(() => {
    if (!inView || started.current) return undefined;
    started.current = true;
    const ctrl = animate(0, value, { duration: 1.8, ease: EASE, onUpdate: (v) => setN(Math.round(v)) });
    return () => ctrl.stop();
  }, [inView, value]);
  return <span ref={ref} data-testid={testId}>{n}</span>;
};

export const Highlight = ({ children, delay = 0 }: { children: ReactNode; delay?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  return (
    <span ref={ref} className="hl">
      <motion.span
        className="hl-bg"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : undefined}
        transition={{ duration: 0.9, ease: EASE, delay }}
      />
      <span className="relative">{children}</span>
    </span>
  );
};
