import { useEffect, useRef, useState } from "react";
import { Copy, Download, Printer, Share2, MessageCircle, Check } from "lucide-react";
import { getMenuUrl } from "@/config/siteConfig";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { toast } from "sonner";

export function QrShare() {
  const [url, setUrl] = useState("");
  const [dataUrl, setDataUrl] = useState("");
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);
  const generated = useRef(false);

  useEffect(() => {
    setUrl(getMenuUrl());
    setCanShare(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  const generate = async () => {
    setError(false);
    try {
      const QR = await import("qrcode");
      const d = await QR.toDataURL(url, { width: 640, margin: 1, errorCorrectionLevel: "H", color: { dark: "#2a1d15", light: "#fbf7ef" } });
      setDataUrl(d);
      generated.current = true;
    } catch {
      setError(true);
    }
  };
  useEffect(() => { if (url && !generated.current) generate(); }, [url]);

  const download = () => {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "bin-resto-menu-qr.png";
    a.click();
  };
  const print = () => {
    const w = window.open("", "_blank");
    if (!w) return toast.error("Please allow pop-ups to print.");
    w.document.write(`<html><head><title>BIN RESTO menu QR</title></head><body style="font-family:serif;text-align:center;padding:40px"><h1 style="letter-spacing:.2em">BIN RESTO</h1><p>Scan to explore our menu</p><img src="${dataUrl}" style="width:320px"/><p style="font-size:12px">${url}</p><script>window.onload=()=>window.print()</script></body></html>`);
    w.document.close();
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Menu link copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy — please copy the link manually.");
    }
  };
  const share = async () => {
    try { await navigator.share({ title: "BIN RESTO menu", text: "Explore the BIN RESTO menu", url }); } catch {}
  };
  const waShare = `https://wa.me/?text=${encodeURIComponent(`Explore the BIN RESTO menu: ${url}`)}`;

  return (
    <div className="grid items-center gap-12 md:grid-cols-2">
      <div className="mx-auto w-full max-w-sm rotate-[-1.5deg] bg-card p-8 text-center shadow-frame ring-1 ring-gold/50 transition-transform duration-500 hover:rotate-0">
        <Logo className="justify-center" />
        <div className="gold-rule my-5" />
        <div className="mx-auto grid aspect-square w-full max-w-64 place-items-center bg-ivory">
          {error ? (
            <div className="p-4 text-sm text-muted-foreground">QR code couldn't be generated. <button className="underline" onClick={generate}>Try again</button></div>
          ) : dataUrl ? (
            <img src={dataUrl} alt="QR code linking to the BIN RESTO menu" className="w-full animate-in zoom-in-95 fade-in duration-500" />
          ) : (
            <div className="size-full animate-pulse bg-muted" />
          )}
        </div>
        <p className="mt-5 font-display text-2xl italic">Scan · Explore · Share</p>
        <p className="mt-1 break-all text-xs text-muted-foreground">{url}</p>
      </div>
      <div className="space-y-6">
        <p className="eyebrow text-gold">Scan, Explore &amp; Share</p>
        <h2 className="text-4xl md:text-5xl">Our menu, one scan away.</h2>
        <p className="text-muted-foreground">Point your phone camera at the code to open our menu instantly. The code always links to the same menu page — so it stays valid when dishes change.</p>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" onClick={generate}>Generate QR code</Button>
          <Button variant="outline" onClick={download} disabled={!dataUrl}><Download /> Download</Button>
          <Button variant="outline" onClick={print} disabled={!dataUrl}><Printer /> Print</Button>
          <Button variant="outline" onClick={copy}>{copied ? <Check /> : <Copy />} {copied ? "Copied" : "Copy link"}</Button>
          {canShare && <Button onClick={share}><Share2 /> Share menu</Button>}
          <Button asChild variant={canShare ? "outline" : "default"}><a href={waShare} target="_blank" rel="noopener noreferrer"><MessageCircle /> WhatsApp</a></Button>
        </div>
      </div>
    </div>
  );
}
