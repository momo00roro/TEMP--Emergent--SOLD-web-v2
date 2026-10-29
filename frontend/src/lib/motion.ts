import { useEffect, useState } from "react";

export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_IO: [number, number, number, number] = [0.65, 0, 0.35, 1];

export const DUR = { fast: 0.45, base: 0.8, slow: 1.15 };
export const STAGGER = { chars: 0.018, lines: 0.09, items: 0.08 };
export const VIEWPORT = { once: true, amount: 0.15 } as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE } },
};

export function useMedia(query: string) {
  const [match, setMatch] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return match;
}

export const useDesktop = () => useMedia("(min-width: 1024px)");
export const useReducedMotion = () => useMedia("(prefers-reduced-motion: reduce)");
