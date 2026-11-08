import { describe, expect, it } from "vitest";
import { getMenuUrl, siteConfig, telLink, whatsappLink } from "./siteConfig";

describe("Stafford Brewers booking contact", () => {
  it("links the menu QR to the public menu, not the editor preview", () => {
    expect(getMenuUrl()).toBe("https://stafford-terrace-table.lovable.app/menu");
  });
  it("routes WhatsApp bookings to the supplied number", () => {
    const link = whatsappLink("Table request for 2 guests");
    expect(link).toBe("https://wa.me/250780858565?text=Table%20request%20for%202%20guests");
  });
  it("uses the supplied telephone contact", () => {
    expect(siteConfig.phone).toBe("+250780858565");
    expect(telLink()).toBe("tel:+250780858565");
  });
});