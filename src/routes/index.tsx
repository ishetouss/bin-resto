import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import hero from "@/assets/hero.jpg";
import samosa from "@/assets/samosa.jpg";
import doughnut from "@/assets/doughnut.jpg";
import burger from "@/assets/burger.jpg";
import sandwich from "@/assets/sandwich.jpg";
import fries from "@/assets/fries.jpg";
import dessert from "@/assets/dessert.jpg";
import drink from "@/assets/drink.jpg";
import { Button } from "@/components/ui/button";
import { HangingFrames } from "@/components/site/HangingFrames";
import { Reveal } from "@/components/site/Reveal";
import { MenuExplorer } from "@/components/site/MenuExplorer";
import { QrShare } from "@/components/site/QrShare";
import { ServiceArea, ContactSection } from "@/components/site/ContactBlocks";
import { menuItems, tagLabel } from "@/config/menuData";
import { formatPrice, whatsappLink } from "@/config/siteConfig";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BIN RESTO — Exceptional Taste. Beautiful Moments." },
      { name: "description", content: "Samosas, doughnuts, burgers and chef's specials. BIN RESTO serves memorable food from Kigali to the Southern Province." },
      { property: "og:title", content: "BIN RESTO — Exceptional Taste. Beautiful Moments." },
      { property: "og:description", content: "Explore our menu, book a table and share the moment — from Kigali to the Southern Province." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const wa = whatsappLink("Hello BIN RESTO, I'd like to order.");
  const parallax = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onScroll = () => { if (parallax.current) parallax.current.style.transform = `translateY(${window.scrollY * 0.15}px) scale(1.08)`; };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const specials = menuItems.filter((m) => m.tags?.some((t) => t === "offer" || t === "chef")).slice(0, 3);
  const best = menuItems.filter((m) => m.tags?.includes("bestseller")).slice(0, 4);
  const { add } = useCart();

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 pb-16 pt-10 md:grid-cols-[1.05fr_1fr] md:gap-10 md:px-8 md:pt-16">
          <div className="relative z-10 flex flex-col justify-center">
            <p className="eyebrow animate-in fade-in slide-in-from-bottom-2 text-gold duration-700">Kigali · Southern Province</p>
            <h1 className="mt-5 text-[3.4rem] leading-[0.95] animate-in fade-in slide-in-from-bottom-4 duration-1000 md:text-[5.6rem]">
              Exceptional Taste.<br /><em className="text-burgundy">Beautiful Moments.</em>
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground animate-in fade-in duration-1000 [animation-delay:300ms] fill-mode-both">
              Golden samosas, hand-glazed doughnuts and generous plates — served with warmth, made to be remembered.
            </p>
            <div className="mt-9 flex flex-wrap gap-3 animate-in fade-in slide-in-from-bottom-2 duration-1000 [animation-delay:500ms] fill-mode-both">
              <Button asChild size="lg"><Link to="/menu">Explore our menu</Link></Button>
              <Button asChild size="lg" variant="outline"><Link to="/reserve">Book a table</Link></Button>
              {wa && <Button asChild size="lg" variant="ghost"><a href={wa} target="_blank" rel="noopener noreferrer">Order on WhatsApp</a></Button>}
            </div>
          </div>
          <HangingFrames />
        </div>
      </section>

      {/* CINEMATIC BAND */}
      <section className="relative h-[55vh] min-h-80 overflow-hidden">
        <img ref={parallax} src={hero} alt="A BIN RESTO table with burger, fries and samosas" width={1600} height={1104} className="absolute inset-0 size-full scale-[1.08] object-cover" />
        <div className="absolute inset-0 bg-espresso/35" />
        <div className="relative mx-auto flex h-full max-w-7xl items-end px-5 pb-10 md:px-8">
          <p className="max-w-xl font-display text-3xl italic text-ivory md:text-5xl">“Good food is a welcome. Every plate, an invitation.”</p>
        </div>
      </section>

      {/* WELCOME */}
      <section className="mx-auto max-w-4xl px-5 py-24 text-center md:py-32">
        <Reveal>
          <p className="eyebrow text-gold">Welcome to BIN RESTO</p>
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
            <figure className="group overflow-hidden"><img src={samosa} alt="Golden samosas" loading="lazy" width={816} height={816} className="aspect-square w-full object-cover transition-transform duration-1000 group-hover:scale-105" /></figure>
            <h3 className="mt-3 text-2xl">Golden samosas</h3>
          </Reveal>
          <Reveal delay={300}>
            <p className="text-muted-foreground">From crisp pastries to hand-finished sweet treats, our kitchen celebrates simple ingredients done beautifully.</p>
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
                    <span className="text-gold">{formatPrice(m.price)}</span>
                  </div>
                  <p className="mt-1 text-sm text-ivory/70">{m.description}</p>
                  <button onClick={() => { add(m); toast.success(`${m.name} added`); }} className="eyebrow mt-4 text-gold hover:underline">Add to order +</button>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mt-20 text-center text-xs text-ivory/50">Sample specials — availability changes daily.</p>
        </div>
      </section>

      {/* BESTSELLERS — numbered list */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <Reveal><p className="eyebrow text-gold">Customer favourites</p><h2 className="mt-3 text-5xl">Bestsellers</h2></Reveal>
        <ol className="mt-12 divide-y border-y">
          {best.map((m, i) => (
            <Reveal as="li" key={m.id} delay={i * 80}>
              <div className="group flex items-center gap-5 py-5">
                <span className="w-10 font-display text-3xl italic text-gold">0{i + 1}</span>
                <img src={m.image} alt="" loading="lazy" width={80} height={80} className="size-16 rounded-full object-cover transition-transform duration-500 group-hover:scale-110 md:size-20" />
                <div className="flex-1"><h3 className="text-2xl md:text-3xl">{m.name}</h3><p className="hidden text-sm text-muted-foreground md:block">{m.description}</p></div>
                <span className="text-sm tabular-nums">{formatPrice(m.price)}</span>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* MENU PREVIEW */}
      <section className="bg-cream/50 py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal className="mb-10 text-center"><p className="eyebrow text-gold">The menu</p><h2 className="mt-3 text-5xl">Taste your way through</h2></Reveal>
          <MenuExplorer limit={6} compact />
          <div className="mt-6 text-center"><Button asChild><Link to="/menu">View full menu</Link></Button></div>
        </div>
      </section>

      {/* STORY */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:grid-cols-2 md:px-8">
        <Reveal className="relative">
          <img src={dessert} alt="Chocolate gâteau" loading="lazy" width={816} height={816} className="aspect-[4/5] w-4/5 object-cover shadow-frame" />
          <img src={drink} alt="Fresh passion juice and iced coffee" loading="lazy" width={816} height={816} className="absolute -bottom-8 right-0 w-1/2 border-8 border-ivory object-cover shadow-frame" />
        </Reveal>
        <Reveal delay={150}>
          <p className="eyebrow text-gold">Our story</p>
          <h2 className="mt-3 text-5xl">Rooted in welcome.</h2>
          <p className="mt-6 text-muted-foreground">BIN RESTO began with a simple idea: everyday favourites, cooked with care and served with genuine hospitality. Today we bring that spirit to guests from Kigali to the Southern Province.</p>
          <p className="mt-4 text-sm italic text-muted-foreground">Story text is a placeholder — the owner can replace it with BIN RESTO's own story.</p>
        </Reveal>
      </section>

      {/* RESERVATION CTA */}
      <section className="relative overflow-hidden bg-burgundy py-24 text-primary-foreground">
        <Reveal className="relative mx-auto max-w-3xl px-5 text-center">
          <p className="eyebrow text-gold-soft">Reservations</p>
          <h2 className="mt-4 text-5xl md:text-7xl">Your table awaits.</h2>
          <p className="mx-auto mt-5 max-w-md text-ivory/80">Celebrations, dinners, or simply a good meal — send us a booking request.</p>
          <Button asChild variant="gold" size="lg" className="mt-8"><Link to="/reserve">Book a table</Link></Button>
        </Reveal>
      </section>

      {/* GALLERY */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <Reveal className="mb-10"><p className="eyebrow text-gold">Gallery</p><h2 className="mt-3 text-5xl">From our kitchen</h2></Reveal>
        <div className="grid auto-rows-[160px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-4">
          {[[doughnut, "md:row-span-2", "Doughnuts"], [fries, "", "Fries"], [sandwich, "md:col-span-2", "Club sandwich"], [samosa, "", "Samosas"], [burger, "row-span-2 md:row-span-1", "Burger"], [dessert, "", "Dessert"], [drink, "", "Drinks"]].map(([src, cls, alt], i) => (
            <Reveal key={i} delay={i * 60} className={`group overflow-hidden ${cls}`}>
              <img src={src} alt={alt} loading="lazy" className="size-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* QR */}
      <section className="bg-cream/50 py-24"><div className="mx-auto max-w-6xl px-5 md:px-8"><QrShare /></div></section>

      {/* SERVICE AREA */}
      <section className="section-dark py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <Reveal className="mb-12"><p className="eyebrow text-gold">Where we serve</p><h2 className="mt-3 text-5xl md:text-6xl">From Kigali to the Southern Province</h2></Reveal>
          <ServiceArea />
        </div>
      </section>

      {/* CONTACT */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8"><ContactSection /></section>
    </>
  );
}
