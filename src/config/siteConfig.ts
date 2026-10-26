/**
 * BIN RESTO — central business configuration.
 * Edit ONLY this file to change contact details, links and service areas.
 * Leave a value as "" to hide the related button automatically.
 * After editing, rebuild / republish the site so every visitor sees the change.
 */
export const siteConfig = {
  businessName: "BIN RESTO",
  tagline: "Exceptional Taste. Beautiful Moments.",
  logoText: "BIN RESTO",
  /** Optional path to an image logo in /public (e.g. "/logo.png"). Empty = typographic wordmark. */
  logoImage: "",
  currency: "RWF",

  /**
   * Public menu URL encoded in the QR code. Set this to your final domain after
   * publishing, e.g. "https://binresto.rw/menu". Empty = current site address + /menu.
   */
  menuUrl: "",

  /** WhatsApp number in international format, digits only, e.g. "2507XXXXXXXX". */
  whatsappNumber: "",
  phone: "", // e.g. "+250 7XX XXX XXX"
  email: "",
  instagramUrl: "",
  facebookUrl: "",
  tiktokUrl: "",
  googleMapsUrl: "",
  reservationUrl: "", // external booking service, optional
  orderingUrl: "", // external ordering service, optional

  locations: {
    kigali: {
      label: "Kigali",
      address: "", // e.g. "KG 000 St, Kigali"
      mapUrl: "",
      note: "Location details coming soon.",
    },
    southern: {
      label: "Southern Province",
      address: "",
      mapUrl: "",
      note: "Service details coming soon.",
    },
  },

  /** Describe exactly which areas you serve. Empty list shows a "to be confirmed" note. */
  serviceAreas: [] as string[],
  deliveryInfo: "", // e.g. "Delivery and collection available — ask on WhatsApp."

  /** Opening hours. Empty list shows "Opening hours to be announced". */
  openingHours: [] as { days: string; hours: string }[],

  footerText: "Crafted with warmth — from Kigali to the Southern Province.",
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
