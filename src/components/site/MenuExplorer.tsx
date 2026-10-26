import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { categories, menuItems, availabilityLabel, tagLabel, type MenuItem } from "@/config/menuData";
import { formatPrice } from "@/config/siteConfig";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function MenuExplorer({ limit, compact }: { limit?: number; compact?: boolean }) {
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");
  const [detail, setDetail] = useState<MenuItem | null>(null);
  const { add } = useCart();

  const usedCats = categories.filter((c) => menuItems.some((m) => m.category === c.id));
  const items = useMemo(() => {
    const s = q.trim().toLowerCase();
    const list = menuItems.filter((m) => (cat === "all" || m.category === cat) && (!s || `${m.name} ${m.description}`.toLowerCase().includes(s)));
    return limit ? list.slice(0, limit) : list;
  }, [cat, q, limit]);

  const addItem = (m: MenuItem) => {
    add({ id: m.id, name: m.name, price: m.price });
    toast.success(`${m.name} added to your order`);
  };

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:px-0" role="tablist" aria-label="Menu categories">
          {[{ id: "all", name: "All" }, ...usedCats].map((c) => (
            <button key={c.id} role="tab" aria-selected={cat === c.id} onClick={() => setCat(c.id)}
              className={cn("eyebrow shrink-0 rounded-full border px-4 py-2 transition-all duration-300", cat === c.id ? "border-burgundy bg-burgundy text-primary-foreground" : "hover:border-gold")}>
              {c.name}
            </button>
          ))}
        </div>
        {!compact && (
          <label className="relative md:w-72">
            <span className="sr-only">Search the menu</span>
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search dishes…" className="w-full rounded-full border bg-card py-2.5 pl-10 pr-4 text-sm" />
          </label>
        )}
      </div>

      {items.length === 0 ? (
        <p className="py-20 text-center font-display text-2xl text-muted-foreground">No dishes match your search.</p>
      ) : (
        <ul key={cat + q} className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((m, i) => (
            <li key={m.id} className="group animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-500" style={{ animationDelay: `${i * 50}ms` }}>
              <button onClick={() => setDetail(m)} className="block w-full text-left" aria-label={`View ${m.name}`}>
                <div className="relative overflow-hidden">
                  <img src={m.image} alt={m.name} width={600} height={450} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  {m.tags?.[0] && <span className="eyebrow absolute left-3 top-3 bg-ivory/95 px-2.5 py-1 text-[0.6rem] text-burgundy">{tagLabel[m.tags[0]]}</span>}
                </div>
              </button>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl leading-tight">{m.name}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{m.description}</p>
                  <p className="mt-2 text-xs text-forest">{availabilityLabel[m.availability]}</p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-2">
                  <span className="font-medium tabular-nums">{formatPrice(m.price)}</span>
                  <button disabled={m.availability === "unavailable"} onClick={() => addItem(m)} aria-label={`Add ${m.name}`}
                    className="grid size-9 place-items-center rounded-full border border-burgundy text-burgundy transition-colors hover:bg-burgundy hover:text-primary-foreground disabled:opacity-40">
                    <Plus className="size-4" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-10 text-center text-xs text-muted-foreground">Sample menu and prices — to be confirmed by BIN RESTO. Availability varies daily.</p>

      <Dialog open={!!detail} onOpenChange={(o) => !o && setDetail(null)}>
        <DialogContent className="max-w-lg overflow-hidden p-0">
          {detail && (
            <>
              <img src={detail.image} alt={detail.name} className="aspect-[4/3] w-full object-cover" />
              <div className="space-y-3 p-6">
                <p className="eyebrow text-gold">{categories.find((c) => c.id === detail.category)?.name}</p>
                <DialogTitle className="font-display text-3xl font-medium">{detail.name}</DialogTitle>
                <DialogDescription>{detail.description}</DialogDescription>
                <p className="text-xs text-forest">{availabilityLabel[detail.availability]}</p>
                <div className="flex items-center justify-between pt-2">
                  <span className="font-display text-2xl">{formatPrice(detail.price)}</span>
                  <Button disabled={detail.availability === "unavailable"} onClick={() => { addItem(detail); setDetail(null); }}>Add to order</Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
