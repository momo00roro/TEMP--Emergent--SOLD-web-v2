import { motion, useScroll, useTransform } from "framer-motion";

export const Scene = () => {
  const { scrollY } = useScroll();
  const gridY = useTransform(scrollY, (v) => `0px ${(-v * 0.25) % 120}px`);
  const beamY = useTransform(scrollY, [0, 2000], [0, -260]);
  const beamO = useTransform(scrollY, [0, 900, 2400], [1, 0.75, 0.55]);
  return (
    <div className="scene" aria-hidden="true">
      <motion.div className="scene-beam" style={{ y: beamY, opacity: beamO }} />
      <div className="scene-plane-wrap">
        <motion.div className="scene-plane" style={{ backgroundPosition: gridY }} />
        <motion.div className="scene-plus" style={{ backgroundPosition: gridY }} />
      </div>
      <div className="scene-stars" />
      <div className="scene-stars scene-stars-2" />
      <div className="scene-grain" />
    </div>
  );
};
