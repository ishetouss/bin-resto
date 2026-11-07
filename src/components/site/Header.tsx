import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X, MapPin, Clock } from "lucide-react";
import { useCart } from "@/lib/cart";
import { siteConfig } from "@/config/siteConfig";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/reserve", label: "Book a table" },
  { to: "/contact", label: "Contact" },
] as const;

/** No header bar: a menu button (left) opens a side drawer; the logo floats top-right. */
export function Header() {
  const [open, setOpen] = useState(false);
  const { totals, setOpen: openCart, pulse } = useCart();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-start justify-between p-4 md:p-6">
        <div className="pointer-events-auto flex gap-2">
          <button onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open}
            className="flex h-12 items-center gap-2 rounded-full bg-background/90 px-4 shadow-frame backdrop-blur transition-transform hover:scale-105">
            <Menu className="size-5" /><span className="eyebrow hidden sm:inline">Menu</span>
          </button>
          <button onClick={() => openCart(true)} aria-label={`Open order, ${totals.count} items`}
            className="relative grid size-12 place-items-center rounded-full bg-background/90 shadow-frame backdrop-blur transition-transform hover:scale-105">
            <ShoppingBag className="size-5" />
            {totals.count > 0 && <span key={pulse} className="bump absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full bg-burgundy text-[0.65rem] font-semibold text-primary-foreground">{totals.count}</span>}
          </button>
        </div>
        <Link to="/" aria-label={`${siteConfig.businessName} home`} className="pointer-events-auto">
          <img src={siteConfig.logoImage} alt={siteConfig.businessName} width={72} height={72} className="size-14 rounded-full bg-ivory object-contain p-0.5 shadow-frame ring-2 ring-gold/60 transition-transform hover:rotate-6 md:size-[72px]" />
        </Link>
      </div>

      <div className={cn("fixed inset-0 z-50", open ? "pointer-events-auto" : "pointer-events-none")} aria-hidden={!open}>
        <div onClick={() => setOpen(false)} className={cn("absolute inset-0 bg-espresso/60 backdrop-blur-sm transition-opacity duration-500", open ? "opacity-100" : "opacity-0")} />
        <aside role="dialog" aria-label="Site menu" className={cn("section-dark absolute left-0 top-0 flex h-full w-[86%] max-w-sm flex-col p-8 shadow-frame transition-transform duration-500 ease-[cubic-bezier(.6,.05,.2,1)]", open ? "translate-x-0" : "-translate-x-full")}>
          <div className="flex items-center justify-between">
            <img src={siteConfig.logoImage} alt="" className="size-14 rounded-full bg-ivory object-contain p-0.5" />
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="grid size-11 place-items-center rounded-full border border-ivory/20 transition-colors hover:border-gold hover:text-gold"><X className="size-5" /></button>
          </div>
          <p className="mt-6 font-display text-3xl">{siteConfig.businessName}</p>
          <div className="gold-rule my-6" />
          <nav className="flex flex-col" aria-label="Main">
            {nav.map((n, i) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} activeOptions={{ exact: true }} activeProps={{ className: "text-gold" }}
                className={cn("border-b border-ivory/10 py-4 font-display text-3xl transition-all duration-500 hover:translate-x-2 hover:text-gold", open ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0")}
                style={{ transitionDelay: open ? `${150 + i * 70}ms` : "0ms" }}>
                {n.label}
              </Link>
            ))}
            <button onClick={() => { setOpen(false); openCart(true); }} className={cn("flex items-center justify-between border-b border-ivory/10 py-4 text-left font-display text-3xl transition-all duration-500 hover:translate-x-2 hover:text-gold", open ? "opacity-100" : "opacity-0")} style={{ transitionDelay: open ? "430ms" : "0ms" }}>
              Your order <span className="font-sans text-sm text-gold">{totals.count}</span>
            </button>
          </nav>
          <div className="mt-auto space-y-3 text-sm text-ivory/75">
            <p className="flex items-center gap-2"><MapPin className="size-4 text-gold" /> {siteConfig.location}</p>
            {siteConfig.openingHours.map((h) => <p key={h.days} className="flex items-center gap-2"><Clock className="size-4 text-gold" /> {h.hours}</p>)}
            <p className="eyebrow pt-2 text-gold">{siteConfig.services.join(" · ")}</p>
          </div>
        </aside>
      </div>
    </>
  );
}
