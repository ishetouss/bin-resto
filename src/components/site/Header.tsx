import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Logo } from "./Logo";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/reserve", label: "Reserve" },
  { to: "/share", label: "QR & Share" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const { totals, setOpen: openCart, pulse } = useCart();
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <Link to="/" aria-label="Stafford Brewers home"><Logo /></Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="eyebrow text-muted-foreground transition-colors hover:text-burgundy" activeProps={{ className: "text-burgundy" }} activeOptions={{ exact: true }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={() => openCart(true)} className="relative grid size-10 place-items-center rounded-full hover:bg-muted" aria-label={`Open order, ${totals.count} items`}>
            <ShoppingBag className="size-5" />
            {totals.count > 0 && (
              <span key={pulse} className="bump absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full bg-burgundy text-[0.65rem] font-semibold text-primary-foreground">{totals.count}</span>
            )}
          </button>
          <button className="grid size-10 place-items-center rounded-full hover:bg-muted md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      <div className={cn("grid overflow-hidden transition-all duration-500 md:hidden", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
        <nav className="min-h-0" aria-label="Mobile">
          <div className="flex flex-col gap-1 px-5 pb-5">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="border-b border-border/60 py-3 font-display text-2xl">
                {n.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
