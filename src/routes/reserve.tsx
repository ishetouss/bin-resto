import { createFileRoute } from "@tanstack/react-router";
import { ReservationForm } from "@/components/site/ReservationForm";
import venue from "@/assets/venue-night.jpg.asset.json";

export const Route = createFileRoute("/reserve")({
  head: () => ({
    meta: [
      { title: "Book a Table — Stafford Brewers" },
      { name: "description", content: "Send a table booking request to Stafford Brewers." },
      { property: "og:title", content: "Book Your Reservation at Stafford Brewers" },
      { property: "og:description", content: "Choose your date, time and guests — we'll confirm your table." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1fr_1.3fr] md:px-8">
      <div>
        <p className="eyebrow text-gold">Reservations</p>
        <h1 className="mt-3 text-6xl">Book Your Reservation</h1>
        <p className="mt-4 text-muted-foreground">Send us your preferred date and time. This is a booking <em>request</em> — your table is confirmed once Stafford Brewers replies.</p>
        <img src={venue.url} alt="Our terrace at night" loading="lazy" className="mt-10 hidden aspect-[4/5] w-full object-cover shadow-frame md:block" />
      </div>
      <div className="bg-card p-6 shadow-soft ring-1 ring-border md:p-10"><ReservationForm /></div>
    </section>
  ),
});
