import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { EASE } from "../../lib/motion";

export const ChapterIndicator = () => {
  const { pathname } = useLocation();
  const [ch, setCh] = useState({ n: "00", name: "Welcome" });

  useEffect(() => {
    const t = setTimeout(() => {
      const els = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              const el = e.target as HTMLElement;
              setCh({ n: el.dataset.chapter || "00", name: el.dataset.chapterName || "" });
            }
          });
        },
        { rootMargin: "-48% 0px -48% 0px" }
      );
      els.forEach((el) => io.observe(el));
      (window as any).__chapterIO = io;
    }, 300);
    return () => {
      clearTimeout(t);
      const io = (window as any).__chapterIO as IntersectionObserver | undefined;
      io?.disconnect();
    };
  }, [pathname]);

  return (
    <div className="fixed bottom-5 left-5 z-40 hidden items-stretch md:flex" data-testid="chapter-indicator">
      <span className="flex w-9 items-center justify-center bg-[#2D6BFF] font-mono text-[11px] text-white">
        <motion.span key={ch.n} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, ease: EASE }}>{ch.n}</motion.span>
      </span>
      <span className="flex flex-col justify-center border border-white/15 bg-black/80 px-3 py-1.5 backdrop-blur-md">
        <span className="font-mono text-[9px] tracking-[0.2em] text-[#A9B4C8]">CHAPTER</span>
        <motion.span key={ch.name} className="font-mono text-[11px] tracking-[0.14em] text-white" initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, ease: EASE }} data-testid="chapter-name">
          {ch.name.toUpperCase()}
        </motion.span>
      </span>
    </div>
  );
};
