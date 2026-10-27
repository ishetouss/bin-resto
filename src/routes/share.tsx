import { createFileRoute } from "@tanstack/react-router";
import { QrShare } from "@/components/site/QrShare";

export const Route = createFileRoute("/share")({
  head: () => ({
    meta: [
      { title: "Scan & Share the Menu — BIN RESTO" },
      { name: "description", content: "Generate, download, print and share the BIN RESTO menu QR code." },
      { property: "og:title", content: "Scan, Explore & Share — BIN RESTO" },
      { property: "og:description", content: "One scan opens the BIN RESTO menu." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <section className="mx-auto max-w-6xl px-5 py-20 md:px-8"><QrShare /></section>,
});
