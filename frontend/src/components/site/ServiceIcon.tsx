import { Aperture, Compass, Fingerprint, Layers, MousePointer2, Sparkles, Wrench } from "lucide-react";

const MAP = { compass: Compass, fingerprint: Fingerprint, aperture: Aperture, pointer: MousePointer2, layers: Layers, wrench: Wrench, sparkles: Sparkles };

export const ServiceIcon = ({ name, size = 26 }: { name: string; size?: number }) => {
  const Icon = MAP[name as keyof typeof MAP] ?? Sparkles;
  return <Icon size={size} strokeWidth={1.6} color="#fff" />;
};
