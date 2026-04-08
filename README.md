
# LUXE Jewels

Production-grade Next.js storefront for luxury jewellery.

## Tech Stack

- Next.js App Router (TypeScript)
- Tailwind CSS v4
- Framer Motion + GSAP
- Zustand (cart/wishlist state)

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Start dev server:

```bash
npm run dev
```

3. Open:

```text
http://localhost:3000
```

## Production Build

```bash
npm run build
npm run start
```

## Environment Variables

Set the following in your deployment environment:

- `NEXT_PUBLIC_SITE_URL`: Public site URL used for canonical metadata and sitemap generation.

Example:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Production Readiness Included

- Security headers in Next config.
- Strict mode enabled.
- Dynamic `robots.txt` and `sitemap.xml`.
- Web app manifest.
- App-level and global error boundaries.
- Optimized image formats and remote image allowlist.

## Deployment

Deploy on Vercel (recommended) or any Node-compatible platform:

1. Set environment variables.
2. Build with `npm run build`.
3. Start with `npm run start`.

For Vercel, import the repository and add `NEXT_PUBLIC_SITE_URL` in Project Settings.
