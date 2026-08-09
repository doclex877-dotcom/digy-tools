# Digy

Five free, browser-only image tools: Image Compressor, Image Converter, HEIC to JPG, Image Resizer, and Image to PDF. Everything runs client-side — no backend, no uploads, no hosting bill.

## Stack
- Next.js (App Router, static export)
- Tailwind CSS v4
- browser-image-compression, heic2any, pdf-lib, lucide-react

## Run locally
```
npm install
npm run dev
```

## Build (static export)
```
npm run build
```
Output goes to the `out/` folder — this is what gets deployed. No server required.

## Deploy on Vercel (free tier)
1. Push this folder to a new GitHub repo.
2. In Vercel, "Add New Project" → import the repo. Vercel auto-detects Next.js — no config needed, the static export in `next.config.ts` handles the rest.
3. Once deployed, go to your Vercel project → Settings → Domains → add `digy.cash` (and `www.digy.cash`).
4. Vercel will show you DNS records (usually an A record for the apex domain and a CNAME for `www`). Add those in your domain registrar's DNS settings.
5. Wait for DNS to propagate (can take a few minutes to a few hours), then your custom domain is live over HTTPS automatically.

## Before submitting to AdSense
- [ ] Update the placeholder email in `app/contact/page.tsx` (currently `hello@digy.cash`) to a real inbox you check.
- [ ] Double check `app/privacy/page.tsx` and `app/terms/page.tsx` read correctly for your setup.
- [ ] Once you have an AdSense publisher ID, add the AdSense script to `app/layout.tsx` `<head>` and create a `public/ads.txt` file with your publisher line (format: `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`) — AdSense gives you this exact line when you sign up.
- [ ] Let the site sit with real traffic for a few days before submitting — a brand-new domain with zero visits is a common soft-rejection reason.

## Adding a 6th tool later
Copy an existing tool folder (e.g. `app/compress/`) as a template — it already uses the shared `FileDrop`, `ResultCard`, and `ToolShell` components, so a new tool is mostly just the processing logic in the middle.
