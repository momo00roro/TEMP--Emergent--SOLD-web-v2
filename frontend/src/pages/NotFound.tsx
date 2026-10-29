import { Seo } from "../components/site/Seo";
import { PageHero } from "../components/site/PageHero";
import { Btn } from "../components/site/Primitives";

export default function NotFound() {
  return (
    <>
      <Seo path="/404/" title="Page not found | SOLD AI Studio" description="This page has moved or no longer exists. Explore SOLD AI Studio's work, services and studio." />
      <PageHero testId="not-found" chip={["404", "Lost"]} lines={["This page", "has moved."]} lead="The link may be from our previous site. Everything you need is still here.">
        <div className="mt-10 flex flex-wrap gap-3">
          <Btn to="/" arrow testId="not-found-home">Back to home</Btn>
          <Btn to="/works/" variant="ghost" testId="not-found-works">See our work</Btn>
        </div>
      </PageHero>
    </>
  );
}
