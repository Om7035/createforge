export interface ForgePlugin {
  id: string;
  name: string;
  description: string;
  packages: string[];
  envVars: Array<{
    key: string;
    description: string;
    required?: boolean;
    default?: string;
  }>;
  files?: Array<{
    path: string;
    content: string;
    overwrite?: boolean;
  }>;
  setup?: () => Promise<void>;
}

// Built-in plugins
export const builtinPlugins: Record<string, ForgePlugin> = {
  // Payment Processing
  stripe: {
    id: 'stripe',
    name: 'Stripe Payments',
    description: 'Accept payments with Stripe',
    packages: ['stripe', '@stripe/stripe-js'],
    envVars: [
      { 
        key: 'STRIPE_SECRET_KEY', 
        description: 'Your Stripe secret key' 
      },
      { 
        key: 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY', 
        description: 'Your Stripe publishable key' 
      },
    ],
  },
  paypal: {
    id: 'paypal',
    name: 'PayPal Payments',
    description: 'Accept payments with PayPal',
    packages: ['@paypal/react-paypal-js'],
    envVars: [
      { 
        key: 'PAYPAL_CLIENT_ID', 
        description: 'Your PayPal client ID' 
      },
      { 
        key: 'PAYPAL_CLIENT_SECRET', 
        description: 'Your PayPal client secret' 
      },
    ],
  },

  // Authentication
  clerk: {
    id: 'clerk',
    name: 'Clerk Auth',
    description: 'User authentication with Clerk',
    packages: ['@clerk/nextjs'],
    envVars: [
      { 
        key: 'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY', 
        description: 'Your Clerk publishable key' 
      },
      { 
        key: 'CLERK_SECRET_KEY', 
        description: 'Your Clerk secret key' 
      },
    ],
  },
  nextauth: {
    id: 'nextauth',
    name: 'NextAuth.js',
    description: 'Authentication for Next.js',
    packages: ['next-auth'],
    envVars: [
      { 
        key: 'NEXTAUTH_SECRET', 
        description: 'NextAuth secret key' 
      },
      { 
        key: 'NEXTAUTH_URL', 
        description: 'Your app URL' 
      },
    ],
  },
  auth0: {
    id: 'auth0',
    name: 'Auth0',
    description: 'Authentication with Auth0',
    packages: ['@auth0/nextjs-auth0'],
    envVars: [
      { 
        key: 'AUTH0_SECRET', 
        description: 'Auth0 secret' 
      },
      { 
        key: 'AUTH0_BASE_URL', 
        description: 'Your app URL' 
      },
      { 
        key: 'AUTH0_ISSUER_BASE_URL', 
        description: 'Auth0 domain' 
      },
      { 
        key: 'AUTH0_CLIENT_ID', 
        description: 'Auth0 client ID' 
      },
      { 
        key: 'AUTH0_CLIENT_SECRET', 
        description: 'Auth0 client secret' 
      },
    ],
  },

  // Database & Backend
  supabase: {
    id: 'supabase',
    name: 'Supabase',
    description: 'Database and auth with Supabase',
    packages: ['@supabase/supabase-js'],
    envVars: [
      { 
        key: 'NEXT_PUBLIC_SUPABASE_URL', 
        description: 'Your Supabase project URL' 
      },
      { 
        key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY', 
        description: 'Your Supabase anon key' 
      },
    ],
  },
  prisma: {
    id: 'prisma',
    name: 'Prisma ORM',
    description: 'Type-safe database ORM',
    packages: ['prisma', '@prisma/client'],
    envVars: [
      { 
        key: 'DATABASE_URL', 
        description: 'Your database connection string' 
      },
    ],
  },
  mongodb: {
    id: 'mongodb',
    name: 'MongoDB',
    description: 'MongoDB database integration',
    packages: ['mongodb', 'mongoose'],
    envVars: [
      { 
        key: 'MONGODB_URI', 
        description: 'Your MongoDB connection string' 
      },
    ],
  },
  firebase: {
    id: 'firebase',
    name: 'Firebase',
    description: 'Google Firebase services',
    packages: ['firebase', 'firebase-admin'],
    envVars: [
      { 
        key: 'FIREBASE_PROJECT_ID', 
        description: 'Your Firebase project ID' 
      },
      { 
        key: 'FIREBASE_PRIVATE_KEY', 
        description: 'Firebase private key' 
      },
      { 
        key: 'FIREBASE_CLIENT_EMAIL', 
        description: 'Firebase client email' 
      },
    ],
  },

  // AI & Machine Learning
  openai: {
    id: 'openai',
    name: 'OpenAI',
    description: 'AI capabilities with OpenAI',
    packages: ['openai'],
    envVars: [
      { 
        key: 'OPENAI_API_KEY', 
        description: 'Your OpenAI API key' 
      },
    ],
  },
  anthropic: {
    id: 'anthropic',
    name: 'Anthropic Claude',
    description: 'AI capabilities with Claude',
    packages: ['@anthropic-ai/sdk'],
    envVars: [
      { 
        key: 'ANTHROPIC_API_KEY', 
        description: 'Your Anthropic API key' 
      },
    ],
  },
  pinecone: {
    id: 'pinecone',
    name: 'Pinecone Vector DB',
    description: 'Vector database for AI applications',
    packages: ['@pinecone-database/pinecone'],
    envVars: [
      { 
        key: 'PINECONE_API_KEY', 
        description: 'Your Pinecone API key' 
      },
      { 
        key: 'PINECONE_ENVIRONMENT', 
        description: 'Your Pinecone environment' 
      },
    ],
  },

  // Communication & Email
  resend: {
    id: 'resend',
    name: 'Resend Email',
    description: 'Email API for developers',
    packages: ['resend'],
    envVars: [
      { 
        key: 'RESEND_API_KEY', 
        description: 'Your Resend API key' 
      },
    ],
  },
  sendgrid: {
    id: 'sendgrid',
    name: 'SendGrid',
    description: 'Email delivery service',
    packages: ['@sendgrid/mail'],
    envVars: [
      { 
        key: 'SENDGRID_API_KEY', 
        description: 'Your SendGrid API key' 
      },
    ],
  },
  twilio: {
    id: 'twilio',
    name: 'Twilio',
    description: 'SMS and communication APIs',
    packages: ['twilio'],
    envVars: [
      { 
        key: 'TWILIO_ACCOUNT_SID', 
        description: 'Your Twilio Account SID' 
      },
      { 
        key: 'TWILIO_AUTH_TOKEN', 
        description: 'Your Twilio Auth Token' 
      },
    ],
  },

  // File Storage & CDN
  uploadthing: {
    id: 'uploadthing',
    name: 'UploadThing',
    description: 'File uploads for Next.js',
    packages: ['uploadthing', '@uploadthing/react'],
    envVars: [
      { 
        key: 'UPLOADTHING_SECRET', 
        description: 'Your UploadThing secret' 
      },
      { 
        key: 'UPLOADTHING_APP_ID', 
        description: 'Your UploadThing app ID' 
      },
    ],
  },
  cloudinary: {
    id: 'cloudinary',
    name: 'Cloudinary',
    description: 'Image and video management',
    packages: ['cloudinary', 'next-cloudinary'],
    envVars: [
      { 
        key: 'CLOUDINARY_CLOUD_NAME', 
        description: 'Your Cloudinary cloud name' 
      },
      { 
        key: 'CLOUDINARY_API_KEY', 
        description: 'Your Cloudinary API key' 
      },
      { 
        key: 'CLOUDINARY_API_SECRET', 
        description: 'Your Cloudinary API secret' 
      },
    ],
  },

  // Analytics & Monitoring
  analytics: {
    id: 'analytics',
    name: 'Vercel Analytics',
    description: 'Track user behavior',
    packages: ['@vercel/analytics'],
    envVars: [],
  },
  posthog: {
    id: 'posthog',
    name: 'PostHog',
    description: 'Product analytics and feature flags',
    packages: ['posthog-js', 'posthog-node'],
    envVars: [
      { 
        key: 'NEXT_PUBLIC_POSTHOG_KEY', 
        description: 'Your PostHog project API key' 
      },
      { 
        key: 'NEXT_PUBLIC_POSTHOG_HOST', 
        description: 'PostHog host URL' 
      },
    ],
  },
  sentry: {
    id: 'sentry',
    name: 'Sentry',
    description: 'Error tracking and performance monitoring',
    packages: ['@sentry/nextjs'],
    envVars: [
      { 
        key: 'SENTRY_DSN', 
        description: 'Your Sentry DSN' 
      },
    ],
  },

  // API & Data Fetching
  trpc: {
    id: 'trpc',
    name: 'tRPC',
    description: 'Type-safe APIs',
    packages: ['@trpc/server', '@trpc/client', '@trpc/react-query', '@trpc/next'],
    envVars: [],
  },
  tanstack: {
    id: 'tanstack',
    name: 'TanStack Query',
    description: 'Data fetching and caching',
    packages: ['@tanstack/react-query', '@tanstack/react-query-devtools'],
    envVars: [],
  },
  apollo: {
    id: 'apollo',
    name: 'Apollo GraphQL',
    description: 'GraphQL client and server',
    packages: ['@apollo/client', 'apollo-server-micro', 'graphql'],
    envVars: [],
  },

  // UI & Styling
  shadcn: {
    id: 'shadcn',
    name: 'shadcn/ui',
    description: 'Beautiful UI components',
    packages: ['@radix-ui/react-slot', 'class-variance-authority', 'clsx', 'tailwind-merge'],
    envVars: [],
  },
  mantine: {
    id: 'mantine',
    name: 'Mantine',
    description: 'React components library',
    packages: ['@mantine/core', '@mantine/hooks', '@mantine/notifications'],
    envVars: [],
  },
  chakra: {
    id: 'chakra',
    name: 'Chakra UI',
    description: 'Simple, modular and accessible UI',
    packages: ['@chakra-ui/react', '@emotion/react', '@emotion/styled', 'framer-motion'],
    envVars: [],
  },

  // State Management
  zustand: {
    id: 'zustand',
    name: 'Zustand',
    description: 'Lightweight state management',
    packages: ['zustand'],
    envVars: [],
  },
  redux: {
    id: 'redux',
    name: 'Redux Toolkit',
    description: 'Predictable state container',
    packages: ['@reduxjs/toolkit', 'react-redux'],
    envVars: [],
  },

  // Testing
  playwright: {
    id: 'playwright',
    name: 'Playwright',
    description: 'End-to-end testing',
    packages: ['@playwright/test'],
    envVars: [],
  },
  cypress: {
    id: 'cypress',
    name: 'Cypress',
    description: 'End-to-end testing framework',
    packages: ['cypress'],
    envVars: [],
  },
};

export async function getPlugin(pluginId: string): Promise<ForgePlugin | null> {
  // First check built-in plugins
  if (builtinPlugins[pluginId]) {
    return builtinPlugins[pluginId];
  }
  
  // In the future, we could check npm registry for community plugins
  // For now, we only support built-in plugins
  return null;
}
