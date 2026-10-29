import { useEffect } from "react";
import Lenis from "lenis";
import { useLocation } from "react-router-dom";

let lenisInstance: Lenis | null = null;
export const getLenis = () => lenisInstance;

export const scrollToTarget = (selector: string) => {
  const el = document.querySelector(selector) as HTMLElement | null;
  if (!el) return false;
  if (lenisInstance) lenisInstance.scrollTo(el, { offset: -72 });
  else el.scrollIntoView({ behavior: "smooth" });
  return true;
};

export const SmoothScroll = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return undefined;
    const lenis = new Lenis({ duration: 1.15, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    lenisInstance = lenis;
    let id = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => {
        scrollToTarget(hash);
      }, 120);
      return () => clearTimeout(t);
    }
    if (lenisInstance) lenisInstance.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
    return undefined;
  }, [pathname, hash]);

  return null;
};
