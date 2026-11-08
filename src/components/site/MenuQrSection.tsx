import { Link } from "@tanstack/react-router";
import { QRCodeSVG } from "qrcode.react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMenuUrl } from "@/config/siteConfig";

export function MenuQrSection() {
  return (
    <section aria-labelledby="menu-qr-title" className="border-y bg-cream/50 px-5 py-20 md:py-24">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
        <div>
          <p className="eyebrow text-gold">Our menu</p>
          <h2 id="menu-qr-title" className="mt-3 text-4xl md:text-6xl">Scan the menu.</h2>
        </div>
        <div className="menu-qr p-3 shadow-soft">
          <QRCodeSVG value={getMenuUrl()} size={224} level="M" marginSize={4}
            bgColor="var(--qr-paper)" fgColor="var(--qr-ink)" title="Stafford Brewers menu QR code" />
        </div>
        <Button asChild size="lg"><Link to="/menu">Explore our menu <ArrowUpRight /></Link></Button>
      </div>
    </section>
  );
}