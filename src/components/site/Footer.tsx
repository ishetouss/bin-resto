import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { Logo } from "./Logo";
import { siteConfig, whatsappLink } from "@/config/siteConfig";
import { contactLinks, Hours } from "./ContactBlocks";

export function Footer() {
  const links = contactLinks();
  return (
    <footer className="section-dark">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-4 md:px-8">
        <div className="md:col-span-1">
          <Logo light />
          <p className="mt-5 font-display text-2xl italic text-ivory/90">{siteConfig.tagline}</p>
        </div>
        <div>
          <p className="eyebrow text-gold">Explore</p>
          <ul className="mt-4 space-y-2 text-ivory/80">
            <li><Link to="/menu" className="hover:text-gold">Menu</Link></li>
            <li><Link to="/reserve" className="hover:text-gold">Book a table</Link></li>
            <li><Link to="/share" className="hover:text-gold">QR &amp; share</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow text-gold">Hours</p>
          <div className="mt-4 text-ivory/80"><Hours light /></div>
        </div>
        <div>
          <p className="eyebrow text-gold">Locations</p>
          <p className="mt-4 text-ivory/80">Kigali · Southern Province</p>
          {links.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {links.map((l) => (
                <a key={l.label} href={l.href} aria-label={l.label} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="grid size-10 place-items-center rounded-full border border-ivory/20 hover:border-gold hover:text-gold">
                  <l.icon className="size-4" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="border-t border-ivory/10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 px-5 py-6 text-xs text-ivory/60 md:flex-row md:px-8">
          <span>© {new Date().getFullYear()} {siteConfig.businessName}</span>
          <span>{siteConfig.footerText}</span>
        </div>
      </div>
    </footer>
  );
}

export function FloatingWhatsApp() {
  const wa = whatsappLink("Hello BIN RESTO!");
  if (!wa) return null;
  return (
    <a href={wa} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="fixed bottom-5 right-5 z-30 grid size-14 place-items-center rounded-full bg-forest text-ivory shadow-frame transition-transform hover:scale-110">
      <MessageCircle className="size-6" />
    </a>
  );
}
