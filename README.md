# PaDiscount: PWD & Senior Discount Checker (PH)

PaDiscount helps Philippine food establishments confirm the proper 20% discount and 12% VAT exemption for PWD and Senior Citizen diners. The app works offline, runs OCR in the browser, and keeps a quick reference to the key rules.

## What you can do
- Manual checker calculates the qualified diner’s share, VAT removal, and 20% discount to show the expected amount due.
- Receipt scanner (Tesseract.js) extracts totals and discount lines from receipt photos entirely on-device for privacy.
- Quick rules grid summarizes eligibility, receipt requirements, and “no discount stacking” reminders.
- Offline-ready via a service worker; the UI shows online/offline status and caches the main screens for reuse.

## Tech stack
- Next.js 16 (App Router) and React 19, TypeScript
- Tailwind CSS with shadcn-style UI primitives and lucide-react icons
- Tesseract.js for client-side OCR
- Simple service worker in `public/sw.js` for caching

## Requirements
- Node.js 18.18+ (Node 20 LTS recommended)
- npm (bundled with Node)

## Setup and development
```bash
npm install
npm run dev
# visit http://localhost:3000
```

## Production build
- `npm run build` – generate the optimized Next.js build
- `npm run start` – serve the built app
- `npm run lint` – run ESLint checks

## Key files
- `src/app/page.tsx` – main landing layout with the scanner and manual checker
- `src/components/receipt-scanner.tsx` – OCR upload flow and parsed findings
- `src/components/discount-checker.tsx` – VAT-exempt share calculator for group bills
- `src/components/offline-provider.tsx` – online/offline banner and service worker registration
- `public/sw.js` – cache-first service worker

## Notes and guidance
- OCR happens in the browser; photos never leave the device. Clear, glare-free shots improve accuracy.
- Discount logic assumes dine-in/take-out meals for PWD/Senior diners, per RA 9994/10754. Always verify against the receipt and current PH regulations.
