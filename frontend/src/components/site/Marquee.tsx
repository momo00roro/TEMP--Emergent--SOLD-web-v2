const WORDS = ["Digital experiences", "Made human", "Made better", "AI-first", "Singapore"];

export const Marquee = () => {
  const row = (
    <div className="flex shrink-0 items-center">
      {WORDS.map((w, i) => (
        <span key={w} className="flex items-center">
          <span className={`marquee-word ${i % 2 ? "marquee-outline" : ""}`}>{w}</span>
          <span className="mx-8 inline-block h-3 w-3 bg-[#2D6BFF] md:mx-14 md:h-4 md:w-4" />
        </span>
      ))}
    </div>
  );
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-[#03060F]/70 py-8 md:py-12" aria-label="Studio motto" data-testid="editorial-marquee">
      <div className="marquee-track">
        {row}
        {row}
      </div>
    </section>
  );
};
