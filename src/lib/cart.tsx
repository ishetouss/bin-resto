import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { cartTotals, type CartLine } from "./cart-math";

interface CartCtx {
  lines: CartLine[];
  add: (item: { id: string; name: string; price: number }) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  open: boolean;
  setOpen: (o: boolean) => void;
  totals: ReturnType<typeof cartTotals>;
  pulse: number;
}

const Ctx = createContext<CartCtx | null>(null);
const KEY = "binresto-cart-demo";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [pulse, setPulse] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded) localStorage.setItem(KEY, JSON.stringify(lines));
  }, [lines, loaded]);

  const value = useMemo<CartCtx>(
    () => ({
      lines,
      open,
      setOpen,
      pulse,
      totals: cartTotals(lines),
      add: (item) => {
        setLines((ls) => {
          const ex = ls.find((l) => l.id === item.id);
          return ex ? ls.map((l) => (l.id === item.id ? { ...l, qty: l.qty + 1 } : l)) : [...ls, { ...item, qty: 1 }];
        });
        setPulse((p) => p + 1);
      },
      setQty: (id, qty) =>
        setLines((ls) => (qty <= 0 ? ls.filter((l) => l.id !== id) : ls.map((l) => (l.id === id ? { ...l, qty } : l)))),
      remove: (id) => setLines((ls) => ls.filter((l) => l.id !== id)),
      clear: () => setLines([]),
    }),
    [lines, open, pulse],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
}
