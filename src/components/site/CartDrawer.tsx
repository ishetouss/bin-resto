import { useState } from "react";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice, siteConfig, whatsappLink, isValidUrl } from "@/config/siteConfig";
import { orderMessage, lineTotal } from "@/lib/cart-math";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export function CartDrawer() {
  const { lines, open, setOpen, setQty, remove, totals, clear } = useCart();
  const [review, setReview] = useState(false);
  const [note, setNote] = useState("");
  const wa = whatsappLink(orderMessage(lines, siteConfig.currency, note));

  return (
    <div className={cn("fixed inset-0 z-50", open ? "pointer-events-auto" : "pointer-events-none")} aria-hidden={!open}>
      <div className={cn("absolute inset-0 bg-espresso/50 transition-opacity", open ? "opacity-100" : "opacity-0")} onClick={() => setOpen(false)} />
      <aside role="dialog" aria-label="Your order" className={cn("absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-frame transition-transform duration-500", open ? "translate-x-0" : "translate-x-full")}>
        <div className="flex items-center justify-between border-b px-6 py-5">
          <div>
            <p className="eyebrow text-gold">Demo order</p>
            <h2 className="text-3xl">{review ? "Review your order" : "Your order"}</h2>
          </div>
          <button onClick={() => setOpen(false)} className="grid size-10 place-items-center rounded-full hover:bg-muted" aria-label="Close order"><X className="size-5" /></button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {lines.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-display text-2xl">Your order is empty</p>
              <p className="mt-2 text-sm text-muted-foreground">Browse the menu and add something delicious.</p>
              <Button asChild variant="outline" className="mt-6" onClick={() => setOpen(false)}><Link to="/menu">Explore the menu</Link></Button>
            </div>
          ) : (
            <ul className="divide-y">
              {lines.map((l) => (
                <li key={l.id} className="flex items-center gap-3 py-4 animate-in fade-in slide-in-from-right-4">
                  <div className="flex-1">
                    <p className="font-display text-lg leading-tight">{l.name}</p>
                    <p className="text-sm text-muted-foreground">{formatPrice(l.price)}</p>
                  </div>
                  {!review && (
                    <div className="flex items-center rounded-full border">
                      <button className="grid size-8 place-items-center" onClick={() => setQty(l.id, l.qty - 1)} aria-label={`Decrease ${l.name}`}><Minus className="size-3.5" /></button>
                      <span className="w-6 text-center text-sm tabular-nums">{l.qty}</span>
                      <button className="grid size-8 place-items-center" onClick={() => setQty(l.id, l.qty + 1)} aria-label={`Increase ${l.name}`}><Plus className="size-3.5" /></button>
                    </div>
                  )}
                  {review && <span className="text-sm">× {l.qty}</span>}
                  <span className="w-24 text-right text-sm font-medium tabular-nums">{formatPrice(lineTotal(l))}</span>
                  {!review && <button onClick={() => remove(l.id)} aria-label={`Remove ${l.name}`} className="text-muted-foreground hover:text-destructive"><Trash2 className="size-4" /></button>}
                </li>
              ))}
            </ul>
          )}
          {review && lines.length > 0 && (
            <label className="mt-4 block text-sm">
              <span className="eyebrow text-muted-foreground">Note (optional)</span>
              <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} maxLength={300} className="mt-2 w-full rounded border bg-card p-3" placeholder="Pickup time, delivery area, allergies…" />
            </label>
          )}
        </div>

        {lines.length > 0 && (
          <div className="space-y-3 border-t px-6 py-5">
            <div className="flex justify-between text-sm text-muted-foreground"><span>Subtotal</span><span className="tabular-nums">{formatPrice(totals.subtotal)}</span></div>
            <div className="flex justify-between font-display text-2xl"><span>Total</span><span className="tabular-nums">{formatPrice(totals.total)}</span></div>
            <p className="text-xs text-muted-foreground">Sample prices. Final price and availability are confirmed by BIN RESTO.</p>
            {!review ? (
              <div className="flex gap-2">
                <Button variant="ghost" onClick={clear}>Clear</Button>
                <Button className="flex-1" onClick={() => setReview(true)}>Review order</Button>
              </div>
            ) : (
              <div className="space-y-2">
                {wa ? (
                  <Button asChild className="w-full"><a href={wa} target="_blank" rel="noopener noreferrer">Send order on WhatsApp</a></Button>
                ) : isValidUrl(siteConfig.orderingUrl) ? (
                  <Button asChild className="w-full"><a href={siteConfig.orderingUrl} target="_blank" rel="noopener noreferrer">Continue to online ordering</a></Button>
                ) : (
                  <p className="rounded border border-dashed p-3 text-center text-sm text-muted-foreground">Online ordering opens soon — WhatsApp ordering hasn't been set up yet.</p>
                )}
                <Button variant="outline" className="w-full" onClick={() => setReview(false)}>Back to edit</Button>
              </div>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}
