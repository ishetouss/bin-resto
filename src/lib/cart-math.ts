export interface CartLine {
  id: string;
  name: string;
  price: number;
  qty: number;
}

export function lineTotal(l: CartLine) {
  return Math.max(0, Math.round(l.price)) * Math.max(0, Math.floor(l.qty));
}

export function cartTotals(lines: CartLine[]) {
  const subtotal = lines.reduce((s, l) => s + lineTotal(l), 0);
  const count = lines.reduce((s, l) => s + Math.max(0, Math.floor(l.qty)), 0);
  return { subtotal, total: subtotal, count };
}

export function orderMessage(lines: CartLine[], currency: string, note?: string) {
  const { total } = cartTotals(lines);
  const rows = lines.map((l) => `• ${l.qty} × ${l.name} — ${lineTotal(l).toLocaleString("en-US")} ${currency}`);
  return [
    "Hello Stafford Brewers, I'd like to place an order:",
    ...rows,
    `Total: ${total.toLocaleString("en-US")} ${currency}`,
    note ? `Note: ${note}` : "",
    "Please confirm availability and final price.",
  ]
    .filter(Boolean)
    .join("\n");
}
