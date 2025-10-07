import * as p from '@clack/prompts';
import fs from 'fs/promises';
import { ui } from '../utils/ui.js';

interface UpgradeOptions {
  service?: 'auth' | 'payments' | 'database' | 'email';
  provider?: string;
}

export async function upgrade(options: UpgradeOptions = {}) {
  ui.intro('🚀 Upgrade to Real Services');
  
  // Check if we're in a CreateForge project
  try {
    await fs.access('package.json');
  } catch {
    ui.error('No package.json found. Are you in a project directory?');
    process.exit(1);
  }
  
  const service = options.service || await ui.select({
    message: 'What would you like to upgrade?',
    options: [
      { 
        value: 'auth', 
        label: '🔐 Authentication', 
        hint: 'Upgrade from local auth to Clerk/Auth0' 
      },
      { 
        value: 'payments', 
        label: '💳 Payments', 
        hint: 'Upgrade from mock payments to Stripe' 
      },
      { 
        value: 'database', 
        label: '🗄️ Database', 
        hint: 'Upgrade from SQLite to PostgreSQL' 
      },
      { 
        value: 'email', 
        label: '📧 Email', 
        hint: 'Upgrade from file emails to SendGrid/Mailgun' 
      },
    ],
  });
  
  if (p.isCancel(service)) {
    ui.outro('Upgrade cancelled');
    process.exit(0);
  }
  
  switch (service) {
    case 'auth':
      await upgradeAuth(options.provider);
      break;
    case 'payments':
      await upgradePayments(options.provider);
      break;
    case 'database':
      await upgradeDatabase(options.provider);
      break;
    case 'email':
      await upgradeEmail(options.provider);
      break;
  }
}

async function upgradeAuth(provider?: string) {
  const authProvider = provider || await ui.select({
    message: 'Choose authentication provider',
    options: [
      { value: 'clerk', label: 'Clerk (Recommended)', hint: 'Easy setup, great DX' },
      { value: 'auth0', label: 'Auth0', hint: 'Enterprise features' },
      { value: 'supabase', label: 'Supabase Auth', hint: 'If using Supabase DB' },
    ],
  });
  
  if (p.isCancel(authProvider)) return;
  
  ui.box('🔐 Authentication Upgrade Guide', [
    `Upgrading to ${authProvider}:`,
    '',
    '1. **Sign up for account**:',
    authProvider === 'clerk' ? '   https://clerk.com' : 
    authProvider === 'auth0' ? '   https://auth0.com' :
    '   https://supabase.com',
    '',
    '2. **Install packages**:',
    authProvider === 'clerk' ? '   npm install @clerk/nextjs' :
    authProvider === 'auth0' ? '   npm install @auth0/nextjs-auth0' :
    '   npm install @supabase/auth-helpers-nextjs',
    '',
    '3. **Add environment variables**:',
    authProvider === 'clerk' ? '   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...' :
    authProvider === 'auth0' ? '   AUTH0_SECRET=...' :
    '   NEXT_PUBLIC_SUPABASE_URL=...',
    '',
    '4. **Update your code**:',
    '   Replace local auth logic with provider SDK',
    '',
    '💡 Your existing user data can be migrated!',
  ]);
  
  // Create migration guide
  const migrationGuide = `# Authentication Migration Guide

## Upgrading from Local Auth to ${authProvider}

### Step 1: Install Dependencies
\`\`\`bash
${authProvider === 'clerk' ? 'npm install @clerk/nextjs' :
  authProvider === 'auth0' ? 'npm install @auth0/nextjs-auth0' :
  'npm install @supabase/auth-helpers-nextjs @supabase/supabase-js'}
\`\`\`

### Step 2: Environment Variables
Add to your \`.env.local\`:
\`\`\`
${authProvider === 'clerk' ? 
`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...` :
authProvider === 'auth0' ?
`AUTH0_SECRET=...
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=https://your-domain.auth0.com
AUTH0_CLIENT_ID=...
AUTH0_CLIENT_SECRET=...` :
`NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...`}
\`\`\`

### Step 3: Update Code
Replace your local authentication logic with ${authProvider} SDK calls.

### Step 4: Migrate Users (Optional)
Your existing user data in \`data/users.json\` can be imported to ${authProvider}.

### Need Help?
- Documentation: ${
  authProvider === 'clerk' ? 'https://clerk.com/docs' :
  authProvider === 'auth0' ? 'https://auth0.com/docs' :
  'https://supabase.com/docs/guides/auth'
}
- Community: Join our Discord for migration help
`;
  
  await fs.writeFile('AUTH_MIGRATION.md', migrationGuide);
  ui.success('Migration guide created: AUTH_MIGRATION.md');
}

async function upgradePayments(provider?: string) {
  const paymentProvider = provider || await ui.select({
    message: 'Choose payment provider',
    options: [
      { value: 'stripe', label: 'Stripe (Recommended)', hint: 'Most popular, great docs' },
      { value: 'paddle', label: 'Paddle', hint: 'Handles taxes globally' },
      { value: 'lemonsqueezy', label: 'Lemon Squeezy', hint: 'Simple setup' },
    ],
  });
  
  if (p.isCancel(paymentProvider)) return;
  
  ui.box('💳 Payments Upgrade Guide', [
    `Upgrading to ${paymentProvider}:`,
    '',
    '1. **Create account**:',
    paymentProvider === 'stripe' ? '   https://stripe.com' :
    paymentProvider === 'paddle' ? '   https://paddle.com' :
    '   https://lemonsqueezy.com',
    '',
    '2. **Install SDK**:',
    paymentProvider === 'stripe' ? '   npm install stripe @stripe/stripe-js' :
    paymentProvider === 'paddle' ? '   npm install @paddle/paddle-js' :
    '   npm install @lemonsqueezy/lemonsqueezy.js',
    '',
    '3. **Add API keys**:',
    '   Get your keys from the dashboard',
    '',
    '4. **Replace mock payments**:',
    '   Update payment flows with real API calls',
    '',
    '💡 Test with sandbox/test mode first!',
  ]);
  
  const migrationGuide = `# Payments Migration Guide

## Upgrading from Mock Payments to ${paymentProvider}

### Step 1: Install Dependencies
\`\`\`bash
${paymentProvider === 'stripe' ? 'npm install stripe @stripe/stripe-js' :
  paymentProvider === 'paddle' ? 'npm install @paddle/paddle-js' :
  'npm install @lemonsqueezy/lemonsqueezy.js'}
\`\`\`

### Step 2: Environment Variables
\`\`\`
${paymentProvider === 'stripe' ?
`STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...` :
paymentProvider === 'paddle' ?
`PADDLE_API_KEY=...
PADDLE_WEBHOOK_SECRET=...` :
`LEMONSQUEEZY_API_KEY=...
LEMONSQUEEZY_WEBHOOK_SECRET=...`}
\`\`\`

### Step 3: Replace Mock Logic
Replace the mock payment functions in your code with real ${paymentProvider} API calls.

### Step 4: Set Up Webhooks
Configure webhooks to handle payment events securely.

### Testing
Use ${paymentProvider}'s test mode to verify everything works before going live.
`;
  
  await fs.writeFile('PAYMENTS_MIGRATION.md', migrationGuide);
  ui.success('Migration guide created: PAYMENTS_MIGRATION.md');
}

async function upgradeDatabase(provider?: string) {
  const dbProvider = provider || await ui.select({
    message: 'Choose database provider',
    options: [
      { value: 'supabase', label: 'Supabase (Recommended)', hint: 'PostgreSQL + realtime' },
      { value: 'planetscale', label: 'PlanetScale', hint: 'Serverless MySQL' },
      { value: 'railway', label: 'Railway PostgreSQL', hint: 'Simple setup' },
      { value: 'neon', label: 'Neon', hint: 'Serverless PostgreSQL' },
    ],
  });
  
  if (p.isCancel(dbProvider)) return;
  
  ui.box('🗄️ Database Upgrade Guide', [
    `Upgrading to ${dbProvider}:`,
    '',
    '1. **Create database**:',
    dbProvider === 'supabase' ? '   https://supabase.com' :
    dbProvider === 'planetscale' ? '   https://planetscale.com' :
    dbProvider === 'railway' ? '   https://railway.app' :
    '   https://neon.tech',
    '',
    '2. **Get connection string**:',
    '   Copy the DATABASE_URL from dashboard',
    '',
    '3. **Migrate data**:',
    '   Export from JSON files to new database',
    '',
    '4. **Update connection**:',
    '   Replace file-based storage with DB queries',
    '',
    '💡 Your existing data structure will work!',
  ]);
  
  ui.success(`Database upgrade guide for ${dbProvider} ready!`);
}

async function upgradeEmail(provider?: string) {
  const emailProvider = provider || await ui.select({
    message: 'Choose email provider',
    options: [
      { value: 'sendgrid', label: 'SendGrid', hint: 'Reliable delivery' },
      { value: 'mailgun', label: 'Mailgun', hint: 'Developer-friendly' },
      { value: 'resend', label: 'Resend', hint: 'Modern email API' },
    ],
  });
  
  if (p.isCancel(emailProvider)) return;
  
  ui.box('📧 Email Upgrade Guide', [
    `Upgrading to ${emailProvider}:`,
    '',
    '1. **Create account**:',
    emailProvider === 'sendgrid' ? '   https://sendgrid.com' :
    emailProvider === 'mailgun' ? '   https://mailgun.com' :
    '   https://resend.com',
    '',
    '2. **Get API key**:',
    '   Generate API key from dashboard',
    '',
    '3. **Install SDK**:',
    emailProvider === 'sendgrid' ? '   npm install @sendgrid/mail' :
    emailProvider === 'mailgun' ? '   npm install mailgun.js' :
    '   npm install resend',
    '',
    '4. **Replace file emails**:',
    '   Update email functions to use API',
    '',
    '💡 Keep file emails as backup/testing!',
  ]);
  
  ui.success(`Email upgrade guide for ${emailProvider} ready!`);
}
