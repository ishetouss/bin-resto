import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { siteConfig, whatsappLink, isValidUrl } from "@/config/siteConfig";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z.string().trim().regex(/^\+?[\d\s-]{8,18}$/, "Please enter a valid phone number"),
  email: z.union([z.literal(""), z.string().trim().email("Please enter a valid email").max(120)]),
  date: z.string().min(1, "Choose a date").refine((d) => d >= new Date().toISOString().slice(0, 10), "Date can't be in the past"),
  time: z.string().min(1, "Choose a time"),
  guests: z.coerce.number().int().min(1, "At least 1 guest").max(50, "For groups over 50 please contact us"),
  requests: z.string().max(500).optional(),
});
type Data = z.infer<typeof schema>;
const empty = { name: "", phone: "", email: "", date: "", time: "", guests: "2", requests: "" };

function F({ k, label, errors, children }: { k: string; label: string; errors: Record<string, string>; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="eyebrow text-muted-foreground">{label}</span>
      {children}
      {errors[k] && <span className="mt-1 block text-sm text-destructive" role="alert">{errors[k]}</span>}
    </label>
  );
}

export function ReservationForm() {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState<"form" | "review" | "saved">("form");
  const [data, setData] = useState<Data | null>(null);

  const set = (k: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => (errs[i.path[0] as string] ||= i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setData(r.data);
    setStep("review");
  };

  const msg = data && `Hello Stafford Brewers, I'd like to request a table:\nName: ${data.name}\nPhone: ${data.phone}${data.email ? `\nEmail: ${data.email}` : ""}\nDate: ${data.date}\nTime: ${data.time}\nGuests: ${data.guests}${data.requests ? `\nRequests: ${data.requests}` : ""}\nPlease confirm if a table is available.`;
  const wa = msg ? whatsappLink(msg) : null;

  const saveLocal = () => {
    const list = JSON.parse(localStorage.getItem("binresto-booking-requests") || "[]");
    list.push({ ...data, savedAt: new Date().toISOString() });
    localStorage.setItem("binresto-booking-requests", JSON.stringify(list));
    setStep("saved");
  };

  const field = "mt-2 w-full rounded border bg-card px-4 py-3 text-base";

  if (step === "saved")
    return (
      <div className="rounded border border-dashed p-8 text-center">
        <p className="eyebrow text-gold">Demo request saved</p>
        <h3 className="mt-2 text-3xl">Request noted on this device</h3>
        <p className="mt-3 text-muted-foreground">This is a demonstration — your request was stored only in this browser and has <strong>not</strong> been sent to Stafford Brewers. No table is reserved yet. Please contact the restaurant directly to confirm.</p>
        <Button className="mt-6" variant="outline" onClick={() => { setForm(empty); setStep("form"); }}>New request</Button>
      </div>
    );

  if (step === "review" && data)
    return (
      <div className="space-y-6">
        <h3 className="text-3xl">Review your request</h3>
        <dl className="grid grid-cols-2 gap-4 border-y py-6 text-sm">
          {[["Name", data.name], ["Phone", data.phone], ["Email", data.email || "—"], ["Date", data.date], ["Time", data.time], ["Guests", String(data.guests)]].map(([k, v]) => (
            <div key={k}><dt className="eyebrow text-muted-foreground">{k}</dt><dd className="mt-1 text-base">{v}</dd></div>
          ))}
          {data.requests && <div className="col-span-2"><dt className="eyebrow text-muted-foreground">Special requests</dt><dd className="mt-1">{data.requests}</dd></div>}
        </dl>
        <p className="text-sm text-muted-foreground">This sends a booking <em>request</em>. Your table is confirmed only when Stafford Brewers replies.</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          {wa ? (
            <Button asChild className="flex-1"><a href={wa} target="_blank" rel="noopener noreferrer">Send request on WhatsApp</a></Button>
          ) : isValidUrl(siteConfig.reservationUrl) ? (
            <Button asChild className="flex-1"><a href={siteConfig.reservationUrl} target="_blank" rel="noopener noreferrer">Continue to booking service</a></Button>
          ) : (
            <Button className="flex-1" onClick={saveLocal}>Save demo request</Button>
          )}
          <Button variant="outline" onClick={() => setStep("form")}>Edit details</Button>
        </div>
      </div>
    );

  return (
    <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
      <F errors={errors} k="name" label="Full name"><input className={field} value={form.name} onChange={set("name")} autoComplete="name" /></F>
      <F errors={errors} k="phone" label="Phone number"><input className={field} value={form.phone} onChange={set("phone")} type="tel" autoComplete="tel" placeholder="+250…" /></F>
      <F errors={errors} k="email" label="Email (optional)"><input className={field} value={form.email} onChange={set("email")} type="email" autoComplete="email" /></F>
      <F errors={errors} k="guests" label="Guests"><input className={field} value={form.guests} onChange={set("guests")} type="number" min={1} max={50} /></F>
      <F errors={errors} k="date" label="Preferred date"><input className={field} value={form.date} onChange={set("date")} type="date" /></F>
      <F errors={errors} k="time" label="Preferred time"><input className={field} value={form.time} onChange={set("time")} type="time" /></F>
      <div className="sm:col-span-2"><F errors={errors} k="requests" label="Special requests"><textarea className={field} rows={3} value={form.requests} onChange={set("requests")} maxLength={500} placeholder="Celebration, dietary needs, seating…" /></F></div>
      <Button type="submit" size="lg" className="sm:col-span-2">Review request</Button>
    </form>
  );
}
