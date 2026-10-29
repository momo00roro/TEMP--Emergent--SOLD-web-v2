import { Btn, Chip, SplitChars } from "./Primitives";

export const CtaBand = ({ title = "Ready to tell your story?" }: { title?: string }) => (
  <section className="relative z-10 py-24 md:py-36" data-chapter="06" data-chapter-name="Contact" data-testid="cta-band">
    <div className="wrap">
      <div className="cta-panel">
        <Chip n="06" label="Contact" light />
        <h2 className="section-title mt-8 max-w-4xl text-white"><SplitChars text={title} /></h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85">
          Work with an AI-first design team. Tell us what you are building and where research, consistency, or delivery feels difficult.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Btn to="/contact/" variant="light" arrow testId="cta-band-start">Start a conversation</Btn>
          <Btn to="/works/" variant="ghost" testId="cta-band-works">Explore our work</Btn>
        </div>
      </div>
    </div>
  </section>
);
