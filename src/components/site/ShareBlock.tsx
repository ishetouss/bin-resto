import { useEffect, useState } from "react";
import { Share2, MessageCircle, Check, Copy } from "lucide-react";
import { getMenuUrl, siteConfig } from "@/config/siteConfig";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

/** Share the menu: native share (when supported), copy link and WhatsApp. */
export function ShareBlock() {
  const [url, setUrl] = useState("");
  const [canShare, setCanShare] = useState(false);
  const [copied, setCopied] = useState(false);
  useEffect(() => { setUrl(getMenuUrl()); setCanShare(!!navigator.share); }, []);
  const share = async () => { try { await navigator.share({ title: `${siteConfig.businessName} menu`, url }); } catch {} };
  const copy = async () => {
    try { await navigator.clipboard.writeText(url); setCopied(true); toast.success("Menu link copied"); setTimeout(() => setCopied(false), 2000); }
    catch { toast.error("Couldn't copy the link."); }
  };
  const wa = `https://wa.me/?text=${encodeURIComponent(`Have a look at the ${siteConfig.businessName} menu: ${url}`)}`;
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="eyebrow text-gold">Share</p>
      <h2 className="mt-3 text-4xl md:text-5xl">Bring a friend to the table.</h2>
      <p className="mt-4 text-muted-foreground">Send our menu to someone you'd love to share a coffee with.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {canShare ? <Button onClick={share}><Share2 /> Share menu</Button> : <Button onClick={copy}>{copied ? <Check /> : <Copy />} {copied ? "Copied" : "Copy menu link"}</Button>}
        <Button asChild variant="outline"><a href={wa} target="_blank" rel="noopener noreferrer"><MessageCircle /> Share on WhatsApp</a></Button>
      </div>
    </div>
  );
}
