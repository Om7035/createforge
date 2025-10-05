# CreateForge Quick Start

Get from zero to deployed app in under 10 minutes.

## 🚀 5-Minute Setup

### Step 1: Create Your App (1 minute)

```bash
npx createforge my-saas
```

You'll be asked:
1. **Project name** — `my-saas` (or whatever you want)
2. **Template** — Choose `Next.js SaaS Starter`
3. **Open in browser?** — Yes (to see it live immediately)

**That's it!** CreateForge will:
- ✅ Clone the template
- ✅ Install dependencies
- ✅ Initialize git
- ✅ Seed demo data
- ✅ Open in browser (optional)

### Step 2: Run Locally (30 seconds)

```bash
cd my-saas
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**You'll see:**
- ✨ Beautiful landing page
- 🔐 Working authentication
- 💳 Payment integration (test mode)
- 📊 Dashboard with demo data

### Step 3: Explore Demo Data (2 minutes)

The template includes realistic scenarios:

**Trial User:**
- Email: `trial@example.com`
- 14 days remaining
- Can upgrade to paid

**Paid Customer:**
- Email: `customer@example.com`
- Pro plan active
- Full access

**Payment Failed:**
- Email: `failed@example.com`
- Needs payment update
- Shows error states

### Step 4: Add Your First Plugin (1 minute)

```bash
forge add stripe
```

This will:
- ✅ Install Stripe packages
- ✅ Add environment variables
- ✅ Create example components
- ✅ Include test data

### Step 5: Deploy to Production (5 minutes)

```bash
forge init --deploy vercel
```

This sets up:
- ✅ GitHub repository
- ✅ CI/CD pipeline
- ✅ Vercel deployment
- ✅ Environment variables
- ✅ Dependabot

Then:

```bash
git push origin main
```

**Your app is live!** 🎉

## 🎯 What You Get

### Included Out of the Box

- ✅ **Next.js 14** — Latest features, App Router
- ✅ **TypeScript** — Full type safety
- ✅ **Tailwind CSS** — Beautiful, responsive design
- ✅ **shadcn/ui** — High-quality components
- ✅ **Clerk Auth** — User authentication
- ✅ **Stripe** — Payment processing
- ✅ **Prisma** — Type-safe database
- ✅ **Tests** — Vitest + Playwright
- ✅ **CI/CD** — GitHub Actions
- ✅ **Demo Data** — Realistic scenarios

### File Structure

```
my-saas/
├── app/                    # Next.js pages
│   ├── (auth)/            # Login, signup
│   ├── (dashboard)/       # Protected routes
│   └── api/               # API endpoints
├── components/
│   ├── ui/                # Reusable components
│   └── [features]/        # Feature components
├── lib/                   # Utilities
├── prisma/                # Database schema
├── scripts/               # Seed scripts
└── tests/                 # Test files
```

## 🛠️ Common Tasks

### Add Authentication

Already included! Just add your Clerk keys:

```bash
# .env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

Get keys from [clerk.com](https://clerk.com)

### Add Payments

Already included! Add your Stripe keys:

```bash
# .env.local
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

Get keys from [stripe.com](https://stripe.com)

### Add Database

Prisma is configured with SQLite. To use PostgreSQL:

1. Update `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

2. Update `.env.local`:

```bash
DATABASE_URL="postgresql://user:pass@host:5432/db"
```

3. Run migrations:

```bash
npx prisma migrate dev
```

### Run Tests

```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# Watch mode
npm run test:watch
```

### Check Project Health

```bash
forge health
```

This checks:
- ✓ Dependency updates
- ✓ Security vulnerabilities
- ✓ TypeScript config
- ✓ Test setup
- ✓ Environment variables

### Add More Plugins

```bash
forge add supabase    # Database
forge add openai      # AI features
forge add analytics   # User tracking
```

## 🎨 Customization

### Change Branding

Edit `app/page.tsx`:

```tsx
<h1>Your App Name</h1>
<p>Your tagline</p>
```

### Add Pages

Create files in `app/`:

```tsx
// app/about/page.tsx
export default function About() {
  return <div>About page</div>
}
```

### Add API Routes

Create files in `app/api/`:

```tsx
// app/api/hello/route.ts
export async function GET() {
  return Response.json({ message: 'Hello!' })
}
```

### Modify Database

Edit `prisma/schema.prisma`:

```prisma
model Post {
  id        String   @id @default(cuid())
  title     String
  content   String
  createdAt DateTime @default(now())
}
```

Then run:

```bash
npx prisma migrate dev --name add_posts
```

## 🚢 Deployment

### Vercel (Recommended)

```bash
forge init --deploy vercel
git push origin main
```

### Netlify

```bash
forge init --deploy netlify
git push origin main
```

### Railway

```bash
forge init --deploy railway
git push origin main
```

### Manual Deployment

```bash
npm run build
npm start
```

## 📊 Monitoring

### Check Logs

```bash
# Vercel
vercel logs

# Railway
railway logs
```

### Health Checks

```bash
forge health --fix
```

This will:
- Check for updates
- Scan for vulnerabilities
- Create PR with fixes

## 🆘 Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Tests Fail

```bash
# Update snapshots
npm test -- -u

# Run specific test
npm test -- Button.test.tsx
```

### Database Issues

```bash
# Reset database
npx prisma migrate reset

# Reseed data
npm run seed
```

### Environment Variables Missing

```bash
# Copy example
cp .env.example .env.local

# Add your keys
# Edit .env.local
```

## 🎓 Next Steps

### Learn More

- 📖 [Full Documentation](https://forge.dev/docs)
- 🎥 [Video Tutorials](https://forge.dev/tutorials)
- 💬 [Join Discord](https://discord.gg/createforge)

### Contribute

- 🐛 [Report Issues](https://github.com/createforge/createforge/issues)
- 💡 [Suggest Features](https://github.com/createforge/createforge/discussions)
- 🎨 [Share Your Template](https://forge.dev/showcase)

### Get Help

- 💬 Discord: https://discord.gg/createforge
- 📧 Email: help@forge.dev
- 🐦 Twitter: [@createforge](https://twitter.com/createforge)

## 🎉 Success Checklist

After following this guide, you should have:

- [x] Created a new app
- [x] Ran it locally
- [x] Explored demo data
- [x] Added a plugin
- [x] Deployed to production
- [x] Set up CI/CD
- [x] Run tests

**Time to first success: < 10 minutes** ✨

---

**You're ready to build!** 🚀

Share what you create: [forge.dev/showcase](https://forge.dev/showcase)

[![Built with CreateForge](https://img.shields.io/badge/Built%20with-CreateForge-blueviolet)](https://forge.dev)
