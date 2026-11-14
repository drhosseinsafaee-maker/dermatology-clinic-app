# اپلیکیشن کلینیک دکتر حسین صفائی

Mobile-first, installable web app for Dr. Hossein Safaei's dermatology, hair & aesthetics clinic in Tehran (Persian, RTL). Visitors can explore treatments, read before/after care and complication guidance, book a visit, browse results and see the loyalty club.

## Screens
- `/` — home: hero, quick actions, offers, treatment categories, doctor intro, reviews, journal, contact & map
- `/services` — treatment catalogue with search and category filter
- `/services/:slug` — treatment detail: about, benefits, before care, after care, complications & management, FAQ
- `/booking` — 4-step booking flow (service → day/time → details → confirm)
- `/gallery` — before/after comparison sliders
- `/club` — loyalty card, tiers & discounts, ways to earn points, referral code

## Tech
TanStack Start (React 19), Tailwind CSS 4, shadcn/ui, lucide icons, Vazirmatn font, Netlify Image CDN for images, deployed on Netlify. Images in `public/img` were generated for the project.

## Run locally
```bash
pnpm install
netlify dev   # or: pnpm dev
```

## Roadmap
Content and booking currently use sample data from `src/data/clinic.ts`. Next: real booking storage (Netlify Database), patient accounts (Netlify Identity), a working loyalty program, an admin panel, articles, reviews, ask-the-doctor, and notifications. See [PLAN.md](PLAN.md).
