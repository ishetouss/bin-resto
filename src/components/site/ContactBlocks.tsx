import { Instagram, Facebook, Music2, MapPin, Phone, Mail, MessageCircle, CalendarCheck, ShoppingBag } from "lucide-react";
import { siteConfig, whatsappLink, telLink, mailLink, isValidUrl } from "@/config/siteConfig";

export function contactLinks() {
  const c = siteConfig;
  return [
    { label: "WhatsApp", href: whatsappLink(`Hello ${c.businessName}!`), icon: MessageCircle },
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

export function Hours() {
  return (
    <ul className="space-y-1">
      {siteConfig.openingHours.map((x) => <li key={x.days} className="flex justify-between gap-6"><span>{x.days}</span><span>{x.hours}</span></li>)}
    </ul>
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
        {links.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {links.map((l) => (
              <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm transition-colors hover:border-burgundy hover:text-burgundy">
                <l.icon className="size-4" /> {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
      <div className="bg-card p-8 shadow-soft ring-1 ring-border">
        <p className="eyebrow text-gold">Opening hours</p>
        <div className="mt-4 font-display text-xl"><Hours /></div>
        <div className="gold-rule my-6" />
        <p className="eyebrow text-gold">Location</p>
        <p className="mt-3 flex items-center gap-2 font-display text-xl"><MapPin className="size-4 text-gold" /> {siteConfig.location}</p>
        <div className="gold-rule my-6" />
        <p className="eyebrow text-gold">We offer</p>
        <p className="mt-3 text-muted-foreground">{siteConfig.services.join(" · ")}</p>
      </div>
    </div>
  );
}
