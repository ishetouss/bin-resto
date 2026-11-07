# Stafford Brewers — Website

A fully static restaurant website (no backend, no database).

## Preview & build
```
bun install
bun run dev      # local preview
bun run build    # production build
```
Deploy by publishing from Lovable (or any static/edge host).

## Customize
- **Business details & links:** `src/config/siteConfig.ts` — WhatsApp, phone, email, socials, maps, booking/order URLs, locations, service areas, opening hours, footer text. Empty values automatically hide their buttons.
- **Menu:** `src/config/menuData.ts` — categories, items, descriptions, prices (RWF), images, availability, labels.
- **Images:** `src/assets/` — replace files with real photos (keep names, or update imports).
- **Colours & fonts:** `src/styles.css`.

### WhatsApp orders & bookings
Set `whatsappNumber` in `siteConfig.ts` (digits only, e.g. `2507XXXXXXXX`). Orders from the basket and table requests are then opened in WhatsApp as a ready-to-send message to that number.

### Important
Changing config or menu files requires republishing before visitors see updates. Nothing edited in a browser syncs to other devices.

## Demo vs external features
| Feature | How it works |
|---|---|
| Cart | Demo, stored in the visitor's browser only |
| Sending an order | Opens WhatsApp (or your ordering URL) — the order is only received once sent there |
| Reservations | Sent as a request via WhatsApp / your booking URL; with neither configured it's saved locally as a clearly-labelled demo |
| Availability & prices | Sample content, not live |
| Share menu / copy link | Fully in-browser |
| Maps, socials, calls, email | External links |
