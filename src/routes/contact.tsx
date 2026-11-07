import { createFileRoute } from "@tanstack/react-router";
import { ContactSection, ServiceArea } from "@/components/site/ContactBlocks";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Locations — Stafford Brewers" },
      { name: "description", content: "Contact Stafford Brewers and see where we serve, from Kigali to the Southern Province." },
      { property: "og:title", content: "Contact Stafford Brewers" },
      { property: "og:description", content: "Hours, locations and ways to reach Stafford Brewers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <>
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8"><ContactSection /></section>
      <section className="section-dark py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <h2 className="mb-12 text-5xl">From Kigali to the Southern Province</h2>
          <ServiceArea />
        </div>
      </section>
    </>
  ),
});
