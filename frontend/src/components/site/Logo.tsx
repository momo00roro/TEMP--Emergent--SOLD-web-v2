export const LogoMark = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
    <defs>
      <linearGradient id="sold-g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#8FB0FF" />
        <stop offset="0.45" stopColor="#2D6BFF" />
        <stop offset="1" stopColor="#1A47C9" />
      </linearGradient>
    </defs>
    <rect x="1" y="1" width="30" height="30" rx="7" fill="url(#sold-g)" />
    <path d="M21.5 10.5H13a3 3 0 0 0 0 6h6a3 3 0 0 1 0 6h-8.5" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="square" />
    <circle cx="23.2" cy="22.5" r="1.6" fill="#fff" />
  </svg>
);

export const Logo = () => (
  <span className="flex items-center gap-2.5">
    <LogoMark />
    <span className="flex flex-col leading-none">
      <span className="text-[19px] font-semibold tracking-[-0.03em] text-white">SOLD</span>
      <span className="font-mono text-[9px] tracking-[0.22em] text-[#A9B4C8]">AI STUDIO</span>
    </span>
  </span>
);
