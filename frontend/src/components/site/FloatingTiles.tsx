import { useEffect } from "react";
import { motion, MotionValue, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Aperture, Box, Code, Compass, Fingerprint, Layers, MessageSquare, Mic, MousePointer2, PenTool, Share2, Sparkles } from "lucide-react";
import { useDesktop } from "../../lib/motion";

const TILES = [
  { x: 44, y: 22, s: 54, d: 0.4, rx: 10, ry: -18, I: MessageSquare, m: false },
  { x: 54, y: 14, s: 46, d: 0.3, rx: 6, ry: -8, I: Box, m: false },
  { x: 64, y: 9, s: 40, d: 0.25, rx: 4, ry: 6, I: Share2, m: false },
  { x: 76, y: 12, s: 50, d: 0.35, rx: 8, ry: 14, I: Sparkles, m: true },
  { x: 86, y: 24, s: 70, d: 0.6, rx: 10, ry: 22, I: Fingerprint, m: true },
  { x: 90, y: 46, s: 92, d: 0.85, rx: 12, ry: 26, I: MousePointer2, m: true },
  { x: 50, y: 34, s: 78, d: 0.7, rx: 14, ry: -22, I: Code, m: true },
  { x: 62, y: 30, s: 104, d: 1, rx: 12, ry: -6, I: Mic, m: true },
  { x: 76, y: 32, s: 96, d: 0.95, rx: 10, ry: 10, I: PenTool, m: true },
  { x: 40, y: 8, s: 34, d: 0.2, rx: 4, ry: -24, I: Layers, m: false },
  { x: 70, y: 52, s: 62, d: 0.55, rx: 18, ry: 4, I: Compass, m: false },
  { x: 96, y: 8, s: 38, d: 0.3, rx: 6, ry: 30, I: Aperture, m: false },
];

const Tile = ({ t, i, mx, my }: { t: (typeof TILES)[number]; i: number; mx: MotionValue<number>; my: MotionValue<number> }) => {
  const x = useTransform(mx, (v) => v * 40 * t.d);
  const y = useTransform(my, (v) => v * 30 * t.d);
  const Icon = t.I;
  return (
    <motion.div
      className={`absolute ${t.m ? "" : "hidden md:block"}`}
      style={{ left: `${t.x}%`, top: `${t.y}%`, x, y, zIndex: Math.round(t.d * 10) }}
      initial={{ opacity: 0, scale: 0.6, z: -200 }}
      animate={{ opacity: 1, scale: 1, z: 0 }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.5 + i * 0.06 }}
    >
      <div className="tile-float" style={{ animationDelay: `${-i * 0.7}s`, animationDuration: `${6 + (i % 4)}s` }}>
        <div
          className="tile"
          style={{ width: t.s, height: t.s, transform: `rotateX(${t.rx}deg) rotateY(${t.ry}deg)`, ["--depth" as string]: `${Math.max(4, t.s * 0.09)}px` }}
        >
          <Icon size={t.s * 0.42} strokeWidth={1.6} color="#fff" />
        </div>
      </div>
    </motion.div>
  );
};

export const FloatingTiles = ({ progress }: { progress: MotionValue<number> }) => {
  const desktop = useDesktop();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 60, damping: 18 });
  const my = useSpring(rawY, { stiffness: 60, damping: 18 });
  const rotX = useTransform(progress, [0, 1], [0, 38]);
  const z = useTransform(progress, [0, 1], [0, 260]);
  const yShift = useTransform(progress, [0, 1], ["0%", "-12%"]);

  useEffect(() => {
    if (!desktop) return undefined;
    const on = (e: PointerEvent) => {
      rawX.set(e.clientX / window.innerWidth - 0.5);
      rawY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", on);
    return () => window.removeEventListener("pointermove", on);
  }, [desktop, rawX, rawY]);

  return (
    <div className="pointer-events-none absolute inset-0 [perspective:1200px]" aria-hidden="true" data-testid="hero-tiles">
      <div className="absolute inset-0 origin-top max-lg:-left-[30%] max-lg:scale-[0.8] max-lg:opacity-90">
        <motion.div className="absolute inset-0 [transform-style:preserve-3d]" style={desktop ? { rotateX: rotX, z, y: yShift } : undefined}>
          {TILES.map((t, i) => (
            <Tile key={i} t={t} i={i} mx={mx} my={my} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};
