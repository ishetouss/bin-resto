import { useEffect, useRef } from "react";
import samosa from "@/assets/samosa.jpg";
import doughnut from "@/assets/coffee.jpg";
import burger from "@/assets/burger.jpg";
import fries from "@/assets/mains.jpg";
import sandwich from "@/assets/sandwich.jpg";

const frames = [
  { src: burger, alt: "Cheese burger", string: 40, tilt: -3, w: "w-40 md:w-52", dur: 6, x: "left-[2%]", top: "top-6" },
  { src: samosa, alt: "Golden samosas", string: 120, tilt: 4, w: "w-32 md:w-44", dur: 7.2, x: "left-[38%]", top: "top-6" },
  { src: doughnut, alt: "Cappuccino", string: 20, tilt: 2, w: "w-36 md:w-48", dur: 5.4, x: "right-[2%]", top: "top-6" },
  { src: fries, alt: "Chicken curry", string: 250, tilt: -4, w: "hidden md:block md:w-40", dur: 6.6, x: "left-[10%]", top: "top-6" },
  { src: sandwich, alt: "Club sandwich", string: 210, tilt: 3, w: "hidden md:block md:w-44", dur: 7.8, x: "right-[12%]", top: "top-6" },
];

/** Signature gallery: framed food photos hanging from gold strings. Purely decorative layer — sits in its own column, never over text. */
export function HangingFrames() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const set = (deg: number) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => el.style.setProperty("--pointer", `${deg.toFixed(2)}deg`));
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      set(((e.clientX - (r.left + r.width / 2)) / r.width) * 6);
    };
    const onScroll = () => set(Math.sin(window.scrollY / 120) * 2.5);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className="relative h-[340px] w-full md:h-[580px]">
      <div className="gold-rule absolute inset-x-0 top-0" />
      {frames.map((f, i) => (
        <div key={i} className={`drop-in absolute ${f.x} ${f.top}`} style={{ ["--enter" as string]: `${0.15 + i * 0.15}s` }}>
          <div style={{ marginTop: f.string }}>
            <figure
              className={`hang ${f.w} bg-card p-2 pb-6 shadow-frame ring-1 ring-gold/40`}
              style={{ ["--string" as string]: `${f.string + 24}px`, ["--tilt" as string]: `${f.tilt}deg`, ["--dur" as string]: `${f.dur}s`, ["--delay" as string]: `${-i * 1.3}s` }}
            >
              <img src={f.src} alt={f.alt} width={400} height={400} className="aspect-square w-full object-cover" loading={i < 3 ? "eager" : "lazy"} />
            </figure>
          </div>
        </div>
      ))}
    </div>
  );
}
