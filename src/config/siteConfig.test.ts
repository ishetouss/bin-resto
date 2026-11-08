import { describe, expect, it } from "vitest";
import { siteConfig, telLink, whatsappLink } from "./siteConfig";

describe("Stafford Brewers booking contact", () => {
  it("routes WhatsApp bookings to the supplied number", () => {
    const link = whatsappLink("Table request for 2 guests");
    expect(link).toBe("https://wa.me/250780858565?text=Table%20request%20for%202%20guests");
  });
  it("uses the supplied telephone contact", () => {
    expect(siteConfig.phone).toBe("+250780858565");
    expect(telLink()).toBe("tel:+250780858565");
  });
});