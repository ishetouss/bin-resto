import { Instagram, Facebook, Music2, MapPin, Phone, Mail, MessageCircle, CalendarCheck, ShoppingBag } from "lucide-react";
import { siteConfig, whatsappLink, telLink, mailLink, isValidUrl } from "@/config/siteConfig";

export function contactLinks() {
  const c = siteConfig;
  return [
    { label: "WhatsApp", href: whatsappLink("Hello Stafford Brewers!"), icon: MessageCircle },
    { label: "Call us", href: telLink(), icon: Phone },
    { label: "Email", href: mailLink(), icon: Mail },
    { label: "Instagram", href: isValidUrl(c.instagramUrl) ? c.instagramUrl : null, icon: Instagram },
    { label: "Facebook", href: isValidUrl(c.facebookUrl) ? c.facebookUrl : null, icon: Facebook },
    { label: "TikTok", href: isValidUrl(c.tiktokUrl) ? c.tiktokUrl : null, icon: Music2 },
    { label: "Google Maps", href: isValidUrl(c.googleMapsUrl) ? c.googleMapsUrl : null, icon: MapPin },
    { label: "Book online", href: isValidUrl(c.reservationUrl) ? c.reservationUrl : null, icon: CalendarCheck },
    { label: "Order online", href: isValidUrl(c.orderingUrl) ? c.orderingUrl : null, icon: ShoppingBag },
  ].filter((l): l is typeof l & { href: string } => !!l.href);
}

export function Hours({ light }: { light?: boolean }) {
  const h = siteConfig.openingHours;
  if (!h.length) return <p className={light ? "text-ivory/70" : "text-muted-foreground"}>Opening hours to be announced.</p>;
  return (
    <ul className="space-y-1">
      {h.map((x) => <li key={x.days} className="flex justify-between gap-6"><span>{x.days}</span><span>{x.hours}</span></li>)}
    </ul>
  );
}

export function ServiceArea() {
  const { kigali, southern } = siteConfig.locations;
  return (
    <div className="grid items-center gap-12 md:grid-cols-2">
      <svg viewBox="0 0 400 300" className="w-full" role="img" aria-label="Illustration: a route from Kigali to the Southern Province">
        <path d="M60 250 C 120 200, 110 120, 200 110 S 320 60, 340 50" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeDasharray="4 6" />
        <circle cx="340" cy="50" r="7" fill="var(--burgundy)" />
        <circle cx="340" cy="50" r="16" fill="none" stroke="var(--gold)" />
        <circle cx="60" cy="250" r="7" fill="var(--burgundy)" />
        <circle cx="60" cy="250" r="16" fill="none" stroke="var(--gold)" />
        <text x="320" y="92" fill="var(--ivory)" fontFamily="var(--font-display)" fontSize="22">Kigali</text>
        <text x="30" y="290" fill="var(--ivory)" fontFamily="var(--font-display)" fontSize="22">Southern Province</text>
      </svg>
      <div className="space-y-6">
        {[kigali, southern].map((l) => (
          <div key={l.label} className="border-l border-gold pl-5">
            <h3 className="text-3xl">{l.label}</h3>
            <p className="mt-1 text-ivory/75">{l.address || l.note}</p>
            {isValidUrl(l.mapUrl) && <a href={l.mapUrl} target="_blank" rel="noopener noreferrer" className="eyebrow mt-2 inline-block text-gold hover:underline">Open in Maps</a>}
          </div>
        ))}
        <p className="text-sm text-ivory/70">
          {siteConfig.serviceAreas.length ? `Serving: ${siteConfig.serviceAreas.join(", ")}.` : "Exact service areas will be confirmed soon."} {siteConfig.deliveryInfo}
        </p>
      </div>
    </div>
  );
}

export function ContactSection() {
  const links = contactLinks();
  return (
    <div className="grid gap-12 md:grid-cols-[1.2fr_1fr]">
      <div>
        <p className="eyebrow text-gold">Contact</p>
        <h2 className="mt-3 text-5xl md:text-6xl">Let's share a table.</h2>
        <p className="mt-4 max-w-md text-muted-foreground">Questions, group bookings or catering — reach out and our team will be glad to help.</p>
        {links.length ? (
          <div className="mt-8 flex flex-wrap gap-3">
            {links.map((l) => (
              <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm transition-colors hover:border-burgundy hover:text-burgundy">
                <l.icon className="size-4" /> {l.label}
              </a>
            ))}
          </div>
        ) : (
          <p className="mt-8 rounded border border-dashed p-4 text-sm text-muted-foreground">Contact details and social links are coming soon.</p>
        )}
      </div>
      <div className="bg-card p-8 shadow-soft ring-1 ring-border">
        <p className="eyebrow text-gold">Opening hours</p>
        <div className="mt-4 font-display text-xl"><Hours /></div>
        <div className="gold-rule my-6" />
        <p className="eyebrow text-gold">Find us</p>
        <p className="mt-3 text-muted-foreground">{siteConfig.locations.kigali.address || "Kigali location to be announced."}</p>
      </div>
    </div>
  );
}
