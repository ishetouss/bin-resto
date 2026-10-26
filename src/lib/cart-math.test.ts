import { describe, expect, it } from "vitest";
import { cartTotals, orderMessage } from "./cart-math";

describe("cart totals", () => {
  it("sums price × quantity", () => {
    const t = cartTotals([
      { id: "a", name: "Burger", price: 5500, qty: 2 },
      { id: "b", name: "Juice", price: 1500, qty: 3 },
    ]);
    expect(t.subtotal).toBe(15500);
    expect(t.total).toBe(15500);
    expect(t.count).toBe(5);
  });
  it("empty cart is zero", () => {
    expect(cartTotals([]).total).toBe(0);
  });
  it("order message includes total in RWF", () => {
    expect(orderMessage([{ id: "a", name: "Samosa", price: 500, qty: 4 }], "RWF")).toContain("Total: 2,000 RWF");
  });
});
