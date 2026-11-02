import { createFileRoute } from "@tanstack/react-router";
import { MenuExplorer } from "@/components/site/MenuExplorer";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — BIN RESTO" },
      { name: "description", content: "Coffee, tea, juices, smoothies, breakfast, curries, grills, wraps and bakery at BIN RESTO — prices in RWF." },
      { property: "og:title", content: "The BIN RESTO Menu" },
      { property: "og:description", content: "Browse, search and build your order from the BIN RESTO menu." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
      <p className="eyebrow text-gold">À la carte</p>
      <h1 className="mt-3 text-6xl md:text-7xl">Our Menu</h1>
      <p className="mt-4 max-w-lg text-muted-foreground">Tap a dish for details, add favourites to your order, and send it to us when you're ready.</p>
      <div className="gold-rule my-10" />
      <MenuExplorer />
    </section>
  ),
});
