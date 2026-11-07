import { createFileRoute } from "@tanstack/react-router";
import { ContactSection } from "@/components/site/ContactBlocks";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Locations — Stafford Brewers" },
      { name: "description", content: "Contact Stafford Brewers in Musambira, Kamonyi — open 05:00 to 23:00." },
      { property: "og:title", content: "Contact Stafford Brewers" },
      { property: "og:description", content: "Hours, locations and ways to reach Stafford Brewers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <>
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8"><ContactSection /></section>
    </>
  ),
});
