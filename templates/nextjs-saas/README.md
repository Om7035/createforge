# Next.js SaaS Starter

[![Built with CreateForge](https://img.shields.io/badge/Built%20with-CreateForge-blueviolet)](https://forge.dev)

Production-ready SaaS starter with authentication, payments, and dashboard.

## What's Included

- ✅ **Next.js 14** with App Router
- ✅ **TypeScript** for type safety
- ✅ **Tailwind CSS** + shadcn/ui components
- ✅ **Clerk** for authentication
- ✅ **Stripe** for payments
- ✅ **Prisma** ORM with SQLite (swap to PostgreSQL easily)
- ✅ **Tests** (Vitest + Playwright)
- ✅ **Demo data** seeded and ready
- ✅ **CI/CD** GitHub Actions configured
- ✅ **ESLint** + Prettier

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your Clerk and Stripe keys

# Seed demo data
npm run seed

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Demo Scenarios Included

The seed script creates realistic demo data:

1. **Trial User Flow**
   - Email: trial@example.com
   - Status: Free tier
   - Days remaining: 14

2. **Paid Customer**
   - Email: customer@example.com
   - Plan: Pro ($29/mo)
   - Subscription active

3. **Payment Failed**
   - Email: failed@example.com
   - Status: Payment failed
   - Action required

## Testing

```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# Type checking
npm run type-check
```

## Deployment

### Vercel (Recommended)

```bash
# Using CreateForge
forge init --deploy vercel

# Or manually
vercel
```

### Environment Variables

Required:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `DATABASE_URL`

## Project Structure

```
├── app/                # Next.js app directory
│   ├── (auth)/        # Auth routes
│   ├── (dashboard)/   # Protected dashboard
│   └── api/           # API routes
├── components/        # React components
│   ├── ui/           # shadcn/ui components
│   └── ...
├── lib/              # Utilities
├── prisma/           # Database schema
├── scripts/          # Seed scripts
└── tests/            # Test files
```

## Features

### Authentication
- Sign up / Sign in
- Social auth (Google, GitHub)
- Email verification
- Password reset

### Payments
- Stripe Checkout
- Subscription management
- Webhook handling
- Customer portal

### Dashboard
- User profile
- Subscription status
- Usage metrics
- Settings

## Customization

### Change Database

Edit `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // Change from sqlite
  url      = env("DATABASE_URL")
}
```

### Add Features

```bash
forge add supabase    # Add Supabase
forge add openai      # Add AI features
forge add analytics   # Add analytics
```

## Health Check

```bash
forge health
# Checks dependencies, security, tests
```

## Contributing

This template is maintained by the CreateForge community.

## License

MIT

---

**Built with CreateForge** — Ship full-stack apps, not scaffolds.
