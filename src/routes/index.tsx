import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import hero from "@/assets/hero.jpg";
import burger from "@/assets/burger.jpg";
import coffee from "@/assets/coffee.jpg";
import mains from "@/assets/mains.jpg";
import { Button } from "@/components/ui/button";
import { HangingFrames } from "@/components/site/HangingFrames";
import { Reveal } from "@/components/site/Reveal";
import venue from "@/assets/venue-night.jpg.asset.json";
import { MenuHighlights, priceText } from "@/components/site/MenuExplorer";
import { MenuQrSection } from "@/components/site/MenuQrSection";
import { menuItems, tagLabel } from "@/config/menuData";
import { siteConfig } from "@/config/siteConfig";
import { Coffee } from "lucide-react";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Stafford Brewers — Exceptional Taste. Beautiful Moments." },
      { name: "description", content: "Carefully brewed coffee, fresh juices and generous plates at Stafford Brewers, Musambira, Kamonyi. Open 05:00–23:00." },
      { property: "og:title", content: "Stafford Brewers — Exceptional Taste. Beautiful Moments." },
      { property: "og:description", content: "Coffee, Grab & Go, fresh juices and generous plates in Musambira, Kamonyi." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const parallax = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onScroll = () => { if (parallax.current) parallax.current.style.transform = `translateY(${window.scrollY * 0.15}px) scale(1.08)`; };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const specials = menuItems.filter((m) => m.tags?.includes("chef") && m.image).slice(0, 3);
  const best = menuItems.filter((m) => m.featured && !m.tags?.length && m.image).slice(0, 5);
  const { add } = useCart();

  return (
    <>
      {/* HERO */}
      <section className="terrace-hero section-dark relative flex items-end overflow-hidden">
        <img src={venue.url} alt="The Stafford Brewers terrace lit up at night" width={689} height={532} fetchPriority="high" className="terrace-photo absolute inset-0 size-full object-cover animate-in fade-in duration-1000" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/55 to-espresso/20" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 pt-32 md:px-8 md:pb-28">
          <p className="eyebrow animate-in fade-in slide-in-from-bottom-2 text-gold duration-700">{siteConfig.businessName} · {siteConfig.location}</p>
          <h1 className="terrace-title mt-5 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Exceptional Taste.<br /><em className="text-gold-soft">Beautiful Moments.</em>
          </h1>
          <p className="mt-6 max-w-md text-lg text-ivory/85 animate-in fade-in duration-1000 [animation-delay:300ms] fill-mode-both">
            Carefully brewed coffee, fresh juices and generous plates — served with warmth, made to be remembered.
          </p>
          <div className="mt-9 flex flex-wrap gap-3 animate-in fade-in slide-in-from-bottom-2 duration-1000 [animation-delay:500ms] fill-mode-both">
            <Button asChild size="lg" variant="gold"><Link to="/menu">Explore our menu</Link></Button>
            <Button asChild size="lg" variant="ivory"><Link to="/reserve">Book a table</Link></Button>
          </div>
        </div>
      </section>

      {/* SERVICES STRIP */}
      <section className="border-b bg-cream/60">
        <ul className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 py-5">
          {siteConfig.services.map((sv) => (
            <li key={sv} className="eyebrow flex items-center gap-2 text-espresso"><Coffee className="size-4 text-gold" /> {sv}</li>
          ))}
        </ul>
      </section>

      {/* SIGNATURE HANGING GALLERY */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 md:grid-cols-[1fr_1.2fr] md:px-8">
        <Reveal>
          <p className="eyebrow text-gold">Grab &amp; Go</p>
          <h2 className="mt-3 text-5xl leading-tight">Your coffee, ready when you are.</h2>
          <p className="mt-4 max-w-md text-muted-foreground">On your way to work or a long journey? Every coffee on our menu is available as Grab &amp; Go — brewed fresh, handed over with a smile.</p>
          <Button asChild className="mt-8"><Link to="/menu">See the coffee menu</Link></Button>
        </Reveal>
        <HangingFrames />
      </section>

      {/* CINEMATIC BAND */}
      <section className="relative h-[55vh] min-h-80 overflow-hidden">
        <img ref={parallax} src={hero} alt="A Stafford Brewers table with burger, fries and samosas" width={1600} height={1104} className="absolute inset-0 size-full scale-[1.08] object-cover" />
        <div className="absolute inset-0 bg-espresso/35" />
        <div className="relative mx-auto flex h-full max-w-7xl items-end px-5 pb-10 md:px-8">
          <p className="max-w-xl font-display text-3xl italic text-ivory md:text-5xl">“Good food is a welcome. Every plate, an invitation.”</p>
        </div>
      </section>

      {/* WELCOME */}
      <section className="mx-auto max-w-4xl px-5 py-24 text-center md:py-32">
        <Reveal>
          <p className="eyebrow text-gold">Welcome to Stafford Brewers</p>
          <h2 className="mt-5 text-4xl leading-tight md:text-6xl">A place where every bite feels considered, and every guest feels at home.</h2>
          <div className="gold-rule mx-auto mt-10 w-40" />
        </Reveal>
      </section>

      {/* SIGNATURE SHOWCASE — asymmetric */}
      <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-24 md:grid-cols-12 md:px-8">
        <Reveal className="md:col-span-7">
          <figure className="group overflow-hidden"><img src={burger} alt="Signature cheese burger" loading="lazy" width={816} height={816} className="aspect-[4/3] w-full object-cover transition-transform duration-1000 group-hover:scale-105" /></figure>
          <p className="eyebrow mt-4 text-gold">Signature</p>
          <h3 className="text-3xl">The Classic, perfected.</h3>
        </Reveal>
        <div className="grid gap-6 md:col-span-5 md:pt-24">
          <Reveal delay={150}>
            <figure className="group overflow-hidden"><img src={coffee} alt="Cappuccino with latte art" loading="lazy" width={816} height={816} className="aspect-square w-full object-cover transition-transform duration-1000 group-hover:scale-105" /></figure>
            <h3 className="mt-3 text-2xl">Brewed with care</h3>
          </Reveal>
          <Reveal delay={300}>
            <p className="text-muted-foreground">From espresso to Kawaccino, Rwandan teas to fresh-pressed juices — and a kitchen that celebrates simple ingredients done beautifully.</p>
          </Reveal>
        </div>
      </section>

      {/* SPECIAL MENU TODAY */}
      <section className="section-dark py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-gold">Today's discovery</p>
              <h2 className="mt-3 text-5xl md:text-6xl">Find Our Special Menu Today</h2>
            </div>
            <Button asChild variant="gold"><Link to="/menu">See the full menu</Link></Button>
          </Reveal>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {specials.map((m, i) => (
              <Reveal key={m.id} delay={i * 120} className={i === 1 ? "md:translate-y-10" : ""}>
                <article className="group">
                  <div className="relative overflow-hidden ring-1 ring-gold/30">
                    <img src={m.image} alt={m.name} loading="lazy" width={600} height={750} className="aspect-[4/5] w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    <span className="eyebrow absolute left-4 top-4 bg-gold px-3 py-1 text-[0.6rem] text-espresso">{m.tags?.[0] ? tagLabel[m.tags[0]] : "Special"}</span>
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-4">
                    <h3 className="text-2xl">{m.name}</h3>
                    <span className="text-gold">{priceText(m)}</span>
                  </div>
                  {m.description && <p className="mt-1 text-sm text-ivory/70">{m.description}</p>}
                  <button onClick={() => { if (m.price !== null) { add({ id: m.id, name: m.name, price: m.price }); toast.success(`${m.name} added`); } }} className="eyebrow mt-4 text-gold hover:underline">Add to order +</button>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mt-20 text-center text-xs text-ivory/50">Availability may vary — please ask our team.</p>
        </div>
      </section>

      {/* BESTSELLERS — numbered list */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <Reveal><p className="eyebrow text-gold">Hand-picked</p><h2 className="mt-3 text-5xl">House favourites</h2></Reveal>
        <ol className="mt-12 divide-y border-y">
          {best.map((m, i) => (
            <Reveal as="li" key={m.id} delay={i * 80}>
              <div className="group flex items-center gap-5 py-5">
                <span className="w-10 font-display text-3xl italic text-gold">0{i + 1}</span>
                <img src={m.image} alt="" loading="lazy" width={80} height={80} className="size-16 rounded-full object-cover transition-transform duration-500 group-hover:scale-110 md:size-20" />
                <div className="flex-1"><h3 className="text-2xl md:text-3xl">{m.name}</h3><p className="hidden text-sm text-muted-foreground md:block">{m.description}</p></div>
                <span className="text-sm tabular-nums">{priceText(m)}</span>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* MENU PREVIEW */}
      <section className="bg-cream/50 py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal className="mb-10 text-center"><p className="eyebrow text-gold">The menu</p><h2 className="mt-3 text-5xl">Taste your way through</h2></Reveal>
          <MenuHighlights />
          <div className="mt-6 text-center"><Button asChild><Link to="/menu">View full menu</Link></Button></div>
        </div>
      </section>

      {/* STORY */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:grid-cols-2 md:px-8">
        <Reveal className="relative">
          <img src={coffee} alt="Cappuccino and espresso" loading="lazy" width={816} height={816} className="aspect-[4/5] w-4/5 object-cover shadow-frame" />
          <img src={mains} alt="Chicken curry and grilled tilapia" loading="lazy" width={816} height={816} className="absolute -bottom-8 right-0 w-1/2 border-8 border-ivory object-cover shadow-frame" />
        </Reveal>
        <Reveal delay={150}>
          <p className="eyebrow text-gold">Our story</p>
          <h2 className="mt-3 text-5xl">Rooted in welcome.</h2>
          <p className="mt-6 text-muted-foreground">Under warm brick arches, we pour carefully brewed Rwandan coffee and serve honest, generous plates — from a morning Rolex to a slow evening curry. Everyone is welcome at our table.</p>
          
        </Reveal>
      </section>

      <MenuQrSection />
    </>
  );
}
