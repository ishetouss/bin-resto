import { Link } from "@tanstack/react-router";
import { MessageCircle, MapPin, Clock } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { siteConfig, whatsappLink } from "@/config/siteConfig";
import { contactLinks } from "./ContactBlocks";

export function Footer() {
  const links = contactLinks();
  return (
    <footer className="section-dark relative overflow-hidden">
      <img src={hero} alt="" aria-hidden loading="lazy" className="absolute inset-0 size-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/85 to-espresso/70" />
      <div className="relative mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="flex flex-col items-center text-center">
          <img src={siteConfig.logoImage} alt={siteConfig.businessName} width={112} height={112} loading="lazy" className="size-28 rounded-full bg-ivory object-contain p-1 ring-2 ring-gold/60" />
          <p className="mt-6 font-display text-4xl md:text-5xl">{siteConfig.businessName}</p>
          <p className="mt-2 font-display text-xl italic text-gold">{siteConfig.tagline}</p>
        </div>
        <div className="gold-rule my-12" />
        <div className="grid gap-10 text-center md:grid-cols-3 md:text-left">
          <div>
            <p className="eyebrow text-gold">Contact</p>
            <p className="mt-4 flex items-center justify-center gap-2 text-ivory/85 md:justify-start"><MapPin className="size-4 text-gold" /> {siteConfig.location}</p>
            {links.length > 0 && (
              <div className="mt-5 flex flex-wrap justify-center gap-2 md:justify-start">
                {links.map((l) => (
                  <a key={l.label} href={l.href} aria-label={l.label} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="grid size-10 place-items-center rounded-full border border-ivory/25 transition-colors hover:border-gold hover:text-gold">
                    <l.icon className="size-4" />
                  </a>
                ))}
              </div>
            )}
          </div>
          <div>
            <p className="eyebrow text-gold">Opening hours</p>
            {siteConfig.openingHours.map((h) => <p key={h.days} className="mt-4 flex items-center justify-center gap-2 font-display text-2xl md:justify-start"><Clock className="size-4 text-gold" /> {h.hours}</p>)}
            <p className="mt-2 text-sm text-ivory/70">{siteConfig.services.join(" · ")}</p>
          </div>
          <div>
            <p className="eyebrow text-gold">Explore</p>
            <ul className="mt-4 space-y-2 text-ivory/85">
              <li><Link to="/menu" className="hover:text-gold">Menu</Link></li>
              <li><Link to="/reserve" className="hover:text-gold">Book a table</Link></li>
              <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="relative border-t border-ivory/10 py-6 text-center text-xs text-ivory/60">{siteConfig.copyright}</div>
    </footer>
  );
}

export function FloatingWhatsApp() {
  const wa = whatsappLink(`Hello ${siteConfig.businessName}!`);
  if (!wa) return null;
  return (
    <a href={wa} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="fixed bottom-5 right-5 z-30 grid size-14 place-items-center rounded-full bg-forest text-ivory shadow-frame transition-transform hover:scale-110">
      <MessageCircle className="size-6" />
    </a>
  );
}
