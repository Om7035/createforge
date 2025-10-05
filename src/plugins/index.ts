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
  analytics: {
    id: 'analytics',
    name: 'Analytics',
    description: 'Track user behavior',
    packages: ['@vercel/analytics'],
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
