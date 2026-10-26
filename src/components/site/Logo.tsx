import { siteConfig } from "@/config/siteConfig";
import { cn } from "@/lib/utils";

export function Logo({ className, light }: { className?: string; light?: boolean }) {
  if (siteConfig.logoImage) return <img src={siteConfig.logoImage} alt={siteConfig.businessName} className={cn("h-10 w-auto", className)} />;
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)} aria-label={siteConfig.businessName}>
      <span className={cn("grid size-9 place-items-center rounded-full border font-display text-lg italic", light ? "border-gold text-gold" : "border-burgundy text-burgundy")}>B</span>
      <span className="leading-none">
        <span className={cn("block font-display text-xl font-semibold tracking-[0.18em]", light ? "text-ivory" : "text-espresso")}>BIN</span>
        <span className="eyebrow block text-[0.55rem] text-gold">Resto</span>
      </span>
    </span>
  );
}
