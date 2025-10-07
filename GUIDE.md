# CreateForge Developer Guide

> **Step-by-step guide to building production SaaS apps with CreateForge**

## 📋 Quick Navigation

| Section | What You'll Learn |
|---------|-------------------|
| [🚀 Getting Started](#-getting-started) | Install and create your first app |
| [⚙️ Commands Reference](#️-commands-reference) | All available commands |
| [🏗️ Project Structure](#️-project-structure) | Understanding your generated app |
| [🔐 Authentication](#-authentication) | Working with the auth system |
| [💳 Payments](#-payments) | Mock payment system usage |
| [🎨 Customization](#-customization) | Modify UI and add features |
| [🧪 Testing](#-testing) | Run and write tests |
| [📈 Upgrade Services](#-upgrade-services) | Move to production services |
| [🚀 Deployment](#-deployment) | Deploy your app |
| [🔧 Troubleshooting](#-troubleshooting) | Fix common issues |

## 🚀 Getting Started

### Step 1: Install CreateForge

```bash
# Option 1: Global installation (recommended)
npm install -g createforge

# Option 2: Use directly with npx
npx createforge my-app
```

### Step 2: Create Your First App

```bash
# Interactive creation (asks for project name)
createforge

# Direct creation
createforge my-saas-app

# Skip npm install (faster for testing)
createforge my-app --no-install
```

### Step 3: Start Development

```bash
# Navigate to your project
cd my-saas-app

# Install dependencies (if skipped)
npm install

# Create demo data
npm run setup

# Start development server
npm run dev
```

### Step 4: First Login

```bash
# Open browser: http://localhost:3000
# Login credentials:
Email: admin@test.com
Password: password

# What you'll see:
✅ Working dashboard with real data
✅ 50+ users with different roles
✅ Payment history and analytics
✅ Admin controls
✅ Beautiful responsive UI
```

## ⚙️ Commands Reference

### Core Commands

```bash
# Create new app
createforge [project-name]
createforge my-app --no-install    # Skip npm install

# Get help
createforge --help
createforge --version
```

### Project Commands (run inside project directory)

```bash
# Development
npm run dev                # Start development server
npm run build             # Build for production
npm run start             # Start production server

# Data & Setup
npm run setup             # Create demo data (50+ users, payments)

# Testing
npm test                  # Run all tests
npm run test:watch        # Run tests in watch mode

# Code Quality
npm run lint              # Check code style
npx tsc --noEmit         # Type checking
```

### Upgrade Commands

```bash
# Upgrade authentication
forge upgrade auth --to clerk
forge upgrade auth --to auth0
forge upgrade auth --to supabase

# Upgrade payments
forge upgrade payments --to stripe
forge upgrade payments --to paddle
forge upgrade payments --to lemonsqueezy

# Upgrade database
forge upgrade database --to postgresql
forge upgrade database --to supabase
forge upgrade database --to planetscale

# Upgrade email
forge upgrade email --to sendgrid
forge upgrade email --to mailgun
forge upgrade email --to resend
```

### Utility Commands

```bash
# Check project health
forge health

# View available templates
forge templates

# View available plugins
forge plugins
```

---

## 🏗️ Project Structure

### Generated File Structure

```
my-saas-app/
├── 📁 app/                    # Next.js App Router
│   ├── 📄 page.tsx           # Main dashboard page
│   ├── 📄 layout.tsx         # Root layout with navigation
│   └── 📄 globals.css        # Global styles + Tailwind
├── 📁 data/                  # Local data storage
│   ├── 📄 users.json         # User accounts (50+ users)
│   └── 📄 payments.json      # Payment transactions
├── 📁 scripts/               # Setup and utilities
│   └── 📄 setup.js          # Creates realistic demo data
├── 📄 package.json           # Dependencies and scripts
├── 📄 .env.local            # Environment variables (no tokens!)
├── 📄 tailwind.config.js    # Tailwind CSS configuration
├── 📄 tsconfig.json         # TypeScript configuration
├── 📄 next.config.js        # Next.js configuration
└── 📄 README.md             # Project documentation
```

### Key Files Explained

| File | Purpose | Can I Edit? |
|------|---------|-------------|
| `app/page.tsx` | Main dashboard UI | ✅ Yes - customize your app |
| `app/layout.tsx` | Navigation and layout | ✅ Yes - modify structure |
| `data/users.json` | User accounts | ✅ Yes - add/modify users |
| `data/payments.json` | Payment history | ✅ Yes - add transactions |
| `scripts/setup.js` | Demo data generator | ✅ Yes - customize data |
| `.env.local` | Environment variables | ✅ Yes - add your config |

## 🔐 Authentication

### How Authentication Works

CreateForge uses **JWT-based local authentication** - no external service needed!

```bash
# Login Flow:
1. User enters email/password
2. System checks data/users.json
3. Password verified with bcrypt
4. JWT token generated
5. User redirected to dashboard
```

### Default User Accounts

| Email | Password | Role | Plan |
|-------|----------|------|------|
| `admin@test.com` | `password` | Admin | Enterprise |
| `user@test.com` | `password` | User | Pro |
| `user3@example.com` | `password` | User | Free |
| ... | ... | ... | ... |
| `user50@example.com` | `password` | User | Random |

### Adding New Users

```bash
# Method 1: Edit data/users.json directly
{
  "id": "51",
  "email": "newuser@example.com",
  "password": "$2a$10$...",  # Use bcrypt to hash
  "name": "New User",
  "role": "user",
  "plan": "pro",
  "createdAt": "2025-01-01T00:00:00.000Z"
}

# Method 2: Modify scripts/setup.js and run npm run setup
```

### Customizing Authentication

```typescript
// In your app/page.tsx, modify the login logic:
const handleLogin = async (email: string, password: string) => {
  // Add your custom validation here
  if (email === 'custom@domain.com' && password === 'mypass') {
    setUser({ email, name: 'Custom User', role: 'admin' });
    setIsLoggedIn(true);
  }
  // ... existing logic
};
```

---

## 💳 Payments

### Mock Payment System

CreateForge includes a **complete payment system** that works like Stripe:

```bash
# Features Available:
✅ Subscription management
✅ Payment processing
✅ Invoice generation  
✅ Failed payment handling
✅ Revenue analytics
✅ Payment history
```

### Subscription Plans

| Plan | Price | Features |
|------|-------|----------|
| **Free** | $0/month | Basic features, Community support |
| **Pro** | $29.99/month | All features, Priority support |
| **Enterprise** | $99.99/month | Everything + Custom integrations |

### Payment Data Structure

```json
// data/payments.json example
{
  "id": "1-0",
  "userId": "1",
  "amount": 2999,           // Amount in cents ($29.99)
  "status": "completed",    // completed, failed, pending
  "createdAt": "2024-12-15T10:30:00.000Z"
}
```

### Simulating Payment Flows

```bash
# The mock system automatically:
✅ Creates realistic payment history
✅ Simulates success/failure rates (90% success)
✅ Generates revenue analytics
✅ Handles different subscription tiers
✅ Shows payment trends over time
```

### Adding Custom Payment Logic

```typescript
// Example: Add custom payment processing
const processPayment = async (userId: string, amount: number) => {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Your custom logic here
  const success = Math.random() > 0.1; // 90% success rate
  
  return {
    success,
    transactionId: `txn_${Date.now()}`,
    amount,
    status: success ? 'completed' : 'failed'
  };
};
```

## 🎨 Customization

### Modifying the UI

```bash
# Main files to customize:
app/page.tsx          # Dashboard layout and components
app/layout.tsx        # Navigation and overall structure  
app/globals.css       # Global styles and Tailwind classes
```

### Adding New Pages

```bash
# Create new pages in app/ directory:
mkdir app/settings
touch app/settings/page.tsx

# Example settings page:
```

```typescript
// app/settings/page.tsx
export default function Settings() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p>Your settings content here...</p>
      </div>
    </div>
  );
}
```

### Customizing Styles

```css
/* app/globals.css - Add your custom styles */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom component styles */
.dashboard-card {
  @apply bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow;
}

.btn-primary {
  @apply bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700;
}
```

### Adding New Components

```bash
# Create components directory
mkdir components
touch components/UserCard.tsx
```

```typescript
// components/UserCard.tsx
interface UserCardProps {
  user: {
    name: string;
    email: string;
    plan: string;
  };
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="dashboard-card">
      <h3 className="font-semibold">{user.name}</h3>
      <p className="text-gray-600">{user.email}</p>
      <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
        {user.plan}
      </span>
    </div>
  );
}
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test -- auth.test.js
```

### Test Structure

```bash
# Tests are located in:
tests/
├── auth.test.js          # Authentication tests
├── payments.test.js      # Payment system tests
└── components.test.js    # UI component tests
```

### Writing Tests

```typescript
// Example test file
import { describe, it, expect } from 'vitest';

describe('User Authentication', () => {
  it('should validate correct credentials', () => {
    const result = validateUser('admin@test.com', 'password');
    expect(result).toBeTruthy();
    expect(result.role).toBe('admin');
  });
  
  it('should reject invalid credentials', () => {
    const result = validateUser('wrong@email.com', 'wrongpass');
    expect(result).toBeFalsy();
  });
});
```

## 📈 Upgrade Services

### When to Upgrade

```bash
# Start upgrading when you:
✅ Have validated your product idea
✅ Need real user authentication
✅ Want to process actual payments
✅ Need production database
✅ Ready to scale
```

### Authentication Upgrade

```bash
# Upgrade to Clerk (recommended)
forge upgrade auth --to clerk

# What this does:
1. Installs @clerk/nextjs package
2. Creates migration guide (AUTH_MIGRATION.md)
3. Provides step-by-step instructions
4. Shows how to migrate existing users
```

#### Clerk Setup Steps

```bash
# 1. Create Clerk account
# Visit: https://clerk.com

# 2. Install package
npm install @clerk/nextjs

# 3. Add environment variables
echo "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_..." >> .env.local
echo "CLERK_SECRET_KEY=sk_test_..." >> .env.local

# 4. Follow migration guide
cat AUTH_MIGRATION.md
```

### Payment Upgrade

```bash
# Upgrade to Stripe (recommended)
forge upgrade payments --to stripe

# What this creates:
1. Stripe SDK installation guide
2. Webhook setup instructions
3. API key configuration
4. Payment flow migration
5. Testing checklist
```

#### Stripe Setup Steps

```bash
# 1. Create Stripe account
# Visit: https://stripe.com

# 2. Install Stripe
npm install stripe @stripe/stripe-js

# 3. Add API keys
echo "STRIPE_SECRET_KEY=sk_test_..." >> .env.local
echo "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_..." >> .env.local

# 4. Set up webhooks
# Follow PAYMENTS_MIGRATION.md
```

### Database Upgrade

```bash
# Upgrade to Supabase (recommended)
forge upgrade database --to supabase

# Migration includes:
1. Schema generation from your JSON data
2. Data export/import scripts
3. Connection setup guide
4. Query migration examples
```

#### Supabase Setup Steps

```bash
# 1. Create Supabase project
# Visit: https://supabase.com

# 2. Install client
npm install @supabase/supabase-js

# 3. Add connection string
echo "DATABASE_URL=postgresql://..." >> .env.local

# 4. Migrate data
node scripts/migrate-to-supabase.js
```

## 🚀 Deployment

### Quick Deployment Options

#### Option 1: Vercel (Easiest)

```bash
# Method 1: Drag & Drop
1. Run: npm run build
2. Go to: https://vercel.com/new
3. Drag your project folder
4. Done! ✅

# Method 2: Vercel CLI
npm i -g vercel
vercel
# Follow prompts
```

#### Option 2: Netlify

```bash
# Build for static export
npm run build

# Drag & drop deployment
1. Go to: https://app.netlify.com/drop
2. Drag the 'out' folder
3. Live in seconds! ✅
```

#### Option 3: Railway

```bash
# Connect GitHub repo
1. Go to: https://railway.app
2. "Deploy from GitHub"
3. Select your repo
4. Auto-deploy! ✅
```

#### Option 4: Docker

```bash
# Use included Dockerfile
docker build -t my-saas .
docker run -p 3000:3000 my-saas

# Deploy to any container platform:
# - Railway
# - Render
# - DigitalOcean
# - Google Cloud Run
```

### Environment Variables for Production

```bash
# Required for production:
JWT_SECRET=your-super-secure-secret-key-here
NEXT_PUBLIC_APP_URL=https://yourdomain.com

# After upgrading services:
CLERK_SECRET_KEY=sk_live_...
STRIPE_SECRET_KEY=sk_live_...
DATABASE_URL=postgresql://...
```

---

## 🔧 Troubleshooting

### Common Issues & Solutions

#### Issue: "Cannot find module" errors

```bash
# Solution: Clean install
rm -rf node_modules package-lock.json
npm install
```

#### Issue: Port 3000 already in use

```bash
# Solution: Use different port
npm run dev -- -p 3001

# Or kill existing process
lsof -ti:3000 | xargs kill -9  # Mac/Linux
netstat -ano | findstr :3000   # Windows
```

#### Issue: TypeScript errors

```bash
# Solution: Check types
npx tsc --noEmit

# Fix common issues:
# - Add missing type imports
# - Check component prop types
# - Verify data structure types
```

#### Issue: Tailwind styles not working

```bash
# Solution: Rebuild CSS
rm -rf .next
npm run dev

# Check tailwind.config.js paths
# Ensure globals.css imports Tailwind
```

#### Issue: Demo data not loading

```bash
# Solution: Regenerate data
npm run setup

# Check data files exist:
ls data/users.json
ls data/payments.json
```

### Getting Help

```bash
# Check project health
forge health

# Enable debug mode
DEBUG=createforge* npm run dev

# Community support:
# GitHub: https://github.com/Om7035/createforge/issues
# Discussions: https://github.com/Om7035/createforge/discussions
```

---

## 🎯 Quick Reference

### Essential Commands

```bash
# Create & Start
createforge my-app        # Create new app
cd my-app && npm run dev  # Start development

# Development
npm run setup            # Create demo data
npm test                 # Run tests
npm run build           # Build for production

# Upgrade Services
forge upgrade auth --to clerk
forge upgrade payments --to stripe
forge upgrade database --to supabase
```

### Default Credentials

```bash
Admin:  admin@test.com / password
User:   user@test.com / password
Others: user3@example.com / password (through user50)
```

### Key Files to Customize

```bash
app/page.tsx          # Main dashboard
app/layout.tsx        # Navigation & layout
app/globals.css       # Styles
data/users.json       # User accounts
data/payments.json    # Payment data
scripts/setup.js      # Demo data generator
```

### Deployment URLs

```bash
Vercel:   https://vercel.com/new
Netlify:  https://app.netlify.com/drop
Railway:  https://railway.app
Render:   https://render.com
```

---

**🎉 You're ready to build amazing SaaS apps with CreateForge!**

*Start local, ship fast, upgrade when ready.*

```typescript
// Example test structure
import { describe, it, expect } from 'vitest';
import { validateUser, processPayment } from '../lib/auth';

describe('Authentication', () => {
  it('should validate correct credentials', () => {
    const result = validateUser('admin@test.com', 'password');
    expect(result).toBeTruthy();
    expect(result.role).toBe('admin');
  });
  
  it('should reject invalid credentials', () => {
    const result = validateUser('wrong@email.com', 'wrongpass');
    expect(result).toBeFalsy();
  });
});

describe('Payments', () => {
  it('should process payment successfully', async () => {
    const result = await processPayment('user1', 2999);
    expect(result.success).toBe(true);
    expect(result.amount).toBe(2999);
  });
});
```

### Testing Strategy

```bash
Unit Tests:
├── Authentication functions
├── Payment processing logic
├── Data validation
└── Utility functions

Integration Tests:
├── API route testing
├── Component rendering
├── User flow testing
└── Data persistence

E2E Tests (Future):
├── Login/logout flows
├── Payment processing
├── Admin operations
└── User management
```

## 🔄 Progressive Enhancement

### Upgrade Philosophy

**Start local, enhance progressively**:

1. **Develop Locally** - Build features with mock services
2. **Validate Concept** - Ensure product-market fit
3. **Upgrade Services** - Move to production services when ready
4. **Scale Gradually** - Add complexity as needed

### Authentication Upgrade

```bash
# Upgrade to Clerk
forge upgrade auth --to clerk

# What happens:
1. Installs @clerk/nextjs
2. Creates migration guide
3. Provides code examples
4. Explains data migration
5. Offers support resources
```

### Payment Upgrade

```bash
# Upgrade to Stripe
forge upgrade payments --to stripe

# Migration includes:
├── Stripe SDK installation
├── Webhook setup guide
├── API key configuration
├── Payment flow updates
└── Testing instructions
```

### Database Upgrade

```bash
# Upgrade to PostgreSQL
forge upgrade database --to postgresql

# Migration process:
├── Schema generation
├── Data export/import
├── Connection setup
├── Query updates
└── Performance optimization
```

## 🚀 Deployment

### Deployment Options

CreateForge apps are **standard Next.js applications** and can be deployed anywhere:

#### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or drag & drop to vercel.com
npm run build
# Upload .next folder
```

#### Option 2: Netlify
```bash
# Build for static export
npm run build

# Drag & drop to netlify.com
# Or use Netlify CLI
```

#### Option 3: Docker
```bash
# Dockerfile included in generated projects
docker build -t my-saas .
docker run -p 3000:3000 my-saas
```

#### Option 4: Traditional Hosting
```bash
# Build and upload
npm run build
npm start

# Works on any Node.js hosting
```

### Environment Variables for Production

```bash
# Production .env
JWT_SECRET=your-super-secure-secret-key
NEXT_PUBLIC_APP_URL=https://yourdomain.com

# When upgraded to real services:
CLERK_SECRET_KEY=your_clerk_secret
STRIPE_SECRET_KEY=your_stripe_secret
DATABASE_URL=your_database_url
```

### Performance Optimization

```bash
# Built-in optimizations:
├── Next.js automatic optimization
├── Image optimization
├── Code splitting
├── Static generation where possible
└── Efficient bundling
```

## 🔧 Troubleshooting

### Common Issues

#### Issue: "Cannot find module" errors
```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### Issue: Port 3000 already in use
```bash
# Solution: Use different port
npm run dev -- -p 3001
```

#### Issue: TypeScript errors
```bash
# Solution: Check and fix types
npx tsc --noEmit
```

#### Issue: Tailwind styles not working
```bash
# Solution: Rebuild CSS
rm -rf .next
npm run dev
```

### Getting Help

```bash
# Check project health
forge health

# View logs
npm run dev --verbose

# Community support
# GitHub Issues: https://github.com/Om7035/createforge/issues
# Discussions: https://github.com/Om7035/createforge/discussions
```

### Debug Mode

```bash
# Enable debug logging
DEBUG=createforge* npm run dev

# Verbose output
npm run dev --verbose
```

## 📈 Advanced Usage

### Custom Templates

```bash
# Create custom template structure
my-template/
├── package.json
├── template.json
├── src/
└── README.md

# Use custom template
forge create my-app --template ./my-template
```

### Plugin Development

```bash
# Plugin structure
my-plugin/
├── index.js
├── package.json
└── install.js

# Register plugin
forge add ./my-plugin
```

### Configuration

```javascript
// forge.config.js (optional)
module.exports = {
  templates: {
    default: 'nextjs-saas',
    custom: './templates'
  },
  plugins: {
    autoInstall: true,
    registry: 'npm'
  }
};
```

---

## 🎯 Next Steps

1. **Build Your App** - Start with CreateForge basics
2. **Add Features** - Customize for your use case  
3. **Test Thoroughly** - Use built-in testing tools
4. **Deploy Early** - Get feedback from real users
5. **Upgrade Gradually** - Move to production services when ready

## 💡 Pro Tips

- **Start Simple**: Don't upgrade services until you need to
- **Use Mock Data**: Perfect for demos and development
- **Test Offline**: Ensure your app works without internet
- **Version Control**: Commit early and often
- **Document Changes**: Keep track of customizations

---

**Happy building! CreateForge is designed to get out of your way so you can focus on what matters - creating value for your users.**
