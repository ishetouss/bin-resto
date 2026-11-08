/**
 * Stafford Brewers — central business configuration.
 * Edit ONLY this file to change contact details, links and service areas.
 * Leave a value as "" to hide the related button automatically.
 * After editing, rebuild / republish the site so every visitor sees the change.
 */
export const siteConfig = {
  businessName: "Stafford Brewers",
  tagline: "Exceptional Taste. Beautiful Moments.",
  logoImage: "/__l5e/assets-v1/0d5c4f1b-7c8d-4924-9e0f-8fab6ed4bf69/stafford-logo.jpg",
  currency: "RWF",

  /** Public menu URL used when sharing. Empty = current site address + /menu. */
  menuUrl: "https://stafford-terrace-table.lovable.app/menu",

  /** WhatsApp number that receives orders & bookings — international format, digits only, e.g. "2507XXXXXXXX". */
  whatsappNumber: "250780858565",
  phone: "+250780858565",
  email: "",
  instagramUrl: "",
  facebookUrl: "",
  tiktokUrl: "",
  googleMapsUrl: "",
  reservationUrl: "", // optional external booking service
  orderingUrl: "", // optional external ordering service

  location: "Musambira, Kamonyi",
  openingHours: [{ days: "Open daily", hours: "05:00 – 23:00" }] as { days: string; hours: string }[],
  services: ["Dine-in", "Grab & Go", "Table bookings", "WhatsApp orders"],

  copyright: "© 2026 Stafford Brewers. All rights reserved.",
};

export function isValidUrl(url?: string | null): url is string {
  if (!url) return false;
  try {
    const u = new URL(url);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}

export function whatsappLink(message?: string): string | null {
  const digits = siteConfig.whatsappNumber.replace(/\D/g, "");
  if (digits.length < 8) return null;
  return `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}

export function telLink(): string | null {
  const p = siteConfig.phone.replace(/[^\d+]/g, "");
  return p.length >= 8 ? `tel:${p}` : null;
}

export function mailLink(): string | null {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(siteConfig.email) ? `mailto:${siteConfig.email}` : null;
}

export function getMenuUrl(): string {
  if (isValidUrl(siteConfig.menuUrl)) return siteConfig.menuUrl;
  if (typeof window === "undefined") return "/menu";
  return `${window.location.origin}/menu`;
}

export function formatPrice(n: number): string {
  return `${n.toLocaleString("en-US")} ${siteConfig.currency}`;
}
