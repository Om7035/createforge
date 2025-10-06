export interface Template {
  id: string;
  name: string;
  description: string;
  tags: string[];
  repo: string;
  featured: boolean;
  battleTested: boolean;
  hasTests: boolean;
  hasSeedData: boolean;
  livePreviewUrl?: string;
}

export const templates: Template[] = [
  // Featured Templates
  {
    id: 'nextjs-saas',
    name: 'Next.js SaaS Starter',
    description: 'Production-ready SaaS with auth, payments, and dashboard',
    tags: ['nextjs', 'typescript', 'tailwind', 'stripe', 'clerk'],
    repo: 'createforge/template-nextjs-saas',
    featured: true,
    battleTested: true,
    hasTests: true,
    hasSeedData: true,
    livePreviewUrl: 'https://stackblitz.com/github/createforge/template-nextjs-saas',
  },
  {
    id: 'mern-stack',
    name: 'MERN Stack App',
    description: 'MongoDB, Express, React, Node.js with authentication',
    tags: ['mongodb', 'express', 'react', 'nodejs', 'jwt'],
    repo: 'createforge/template-mern-stack',
    featured: true,
    battleTested: true,
    hasTests: true,
    hasSeedData: true,
    livePreviewUrl: 'https://stackblitz.com/github/createforge/template-mern-stack',
  },
  {
    id: 'ai-rag',
    name: 'AI RAG Chat App',
    description: 'Retrieval-Augmented Generation chat with vector search',
    tags: ['nextjs', 'openai', 'pinecone', 'langchain'],
    repo: 'createforge/template-ai-rag',
    featured: true,
    battleTested: true,
    hasTests: true,
    hasSeedData: true,
    livePreviewUrl: 'https://stackblitz.com/github/createforge/template-ai-rag',
  },
  {
    id: 'ecommerce',
    name: 'E-commerce Store',
    description: 'Full-featured store with cart, checkout, and admin',
    tags: ['nextjs', 'stripe', 'shopify', 'tailwind'],
    repo: 'createforge/template-ecommerce',
    featured: true,
    battleTested: true,
    hasTests: true,
    hasSeedData: true,
  },

  // Full-Stack Templates
  {
    id: 'mern-ecommerce',
    name: 'MERN E-commerce',
    description: 'Full-stack e-commerce with React, Node.js, MongoDB',
    tags: ['mongodb', 'express', 'react', 'nodejs', 'stripe'],
    repo: 'createforge/template-mern-ecommerce',
    featured: false,
    battleTested: true,
    hasTests: true,
    hasSeedData: true,
  },
  {
    id: 'mean-stack',
    name: 'MEAN Stack App',
    description: 'MongoDB, Express, Angular, Node.js application',
    tags: ['mongodb', 'express', 'angular', 'nodejs', 'typescript'],
    repo: 'createforge/template-mean-stack',
    featured: false,
    battleTested: true,
    hasTests: true,
    hasSeedData: true,
  },
  {
    id: 'mevn-stack',
    name: 'MEVN Stack App',
    description: 'MongoDB, Express, Vue.js, Node.js application',
    tags: ['mongodb', 'express', 'vuejs', 'nodejs', 'typescript'],
    repo: 'createforge/template-mevn-stack',
    featured: false,
    battleTested: true,
    hasTests: true,
    hasSeedData: true,
  },
  {
    id: 't3-stack',
    name: 'T3 Stack App',
    description: 'Next.js, tRPC, Prisma, Tailwind, NextAuth',
    tags: ['nextjs', 'trpc', 'prisma', 'tailwind', 'nextauth'],
    repo: 'createforge/template-t3-stack',
    featured: false,
    battleTested: true,
    hasTests: true,
    hasSeedData: true,
  },

  // Modern Framework Templates
  {
    id: 'remix-app',
    name: 'Remix Full-Stack',
    description: 'Remix with Prisma, Tailwind, and authentication',
    tags: ['remix', 'prisma', 'tailwind', 'typescript'],
    repo: 'createforge/template-remix-app',
    featured: false,
    battleTested: true,
    hasTests: true,
    hasSeedData: true,
  },
  {
    id: 'sveltekit-app',
    name: 'SvelteKit App',
    description: 'SvelteKit with Prisma, Tailwind, and Supabase',
    tags: ['sveltekit', 'prisma', 'tailwind', 'supabase'],
    repo: 'createforge/template-sveltekit-app',
    featured: false,
    battleTested: true,
    hasTests: true,
    hasSeedData: true,
  },
  {
    id: 'astro-blog',
    name: 'Astro Blog',
    description: 'Lightning-fast blog with Astro and MDX',
    tags: ['astro', 'mdx', 'tailwind', 'typescript'],
    repo: 'createforge/template-astro-blog',
    featured: false,
    battleTested: true,
    hasTests: true,
    hasSeedData: true,
  },
  {
    id: 'solid-start',
    name: 'SolidStart App',
    description: 'SolidJS with SolidStart meta-framework',
    tags: ['solidjs', 'solidstart', 'tailwind', 'typescript'],
    repo: 'createforge/template-solid-start',
    featured: false,
    battleTested: true,
    hasTests: true,
    hasSeedData: true,
  },

  // Backend Templates
  {
    id: 'express-api',
    name: 'Express REST API',
    description: 'Express.js REST API with MongoDB and JWT auth',
    tags: ['express', 'mongodb', 'jwt', 'swagger', 'typescript'],
    repo: 'createforge/template-express-api',
    featured: false,
    battleTested: true,
    hasTests: true,
    hasSeedData: true,
  },
  {
    id: 'fastify-api',
    name: 'Fastify REST API',
    description: 'High-performance API with Fastify and Prisma',
    tags: ['fastify', 'prisma', 'swagger', 'typescript'],
    repo: 'createforge/template-fastify-api',
    featured: false,
    battleTested: true,
    hasTests: true,
    hasSeedData: true,
  },
  {
    id: 'graphql-api',
    name: 'GraphQL API',
    description: 'GraphQL API with Apollo Server and Prisma',
    tags: ['graphql', 'apollo', 'prisma', 'typescript'],
    repo: 'createforge/template-graphql-api',
    featured: false,
    battleTested: true,
    hasTests: true,
    hasSeedData: true,
  },
  {
    id: 'trpc-api',
    name: 'tRPC API',
    description: 'Type-safe API with tRPC and Prisma',
    tags: ['trpc', 'prisma', 'zod', 'typescript'],
    repo: 'createforge/template-trpc-api',
    featured: false,
    battleTested: true,
    hasTests: true,
    hasSeedData: true,
  },

  // Mobile & Cross-Platform
  {
    id: 'react-native',
    name: 'React Native App',
    description: 'Cross-platform mobile app with Expo',
    tags: ['react-native', 'expo', 'typescript', 'navigation'],
    repo: 'createforge/template-react-native',
    featured: false,
    battleTested: true,
    hasTests: true,
    hasSeedData: true,
  },
  {
    id: 'flutter-app',
    name: 'Flutter App',
    description: 'Cross-platform mobile app with Flutter',
    tags: ['flutter', 'dart', 'firebase', 'bloc'],
    repo: 'createforge/template-flutter-app',
    featured: false,
    battleTested: true,
    hasTests: true,
    hasSeedData: true,
  },
  {
    id: 'electron-app',
    name: 'Electron Desktop App',
    description: 'Cross-platform desktop app with React',
    tags: ['electron', 'react', 'typescript', 'tailwind'],
    repo: 'createforge/template-electron-app',
    featured: false,
    battleTested: true,
    hasTests: true,
    hasSeedData: true,
  },

  // Specialized Templates
  {
    id: 'nextjs-blog',
    name: 'Next.js Blog',
    description: 'Modern blog with MDX, SEO, and analytics',
    tags: ['nextjs', 'mdx', 'tailwind'],
    repo: 'createforge/template-nextjs-blog',
    featured: false,
    battleTested: true,
    hasTests: true,
    hasSeedData: true,
  },
  {
    id: 'portfolio',
    name: 'Developer Portfolio',
    description: 'Stunning portfolio with animations and CMS',
    tags: ['nextjs', 'framer-motion', 'sanity', 'tailwind'],
    repo: 'createforge/template-portfolio',
    featured: false,
    battleTested: true,
    hasTests: true,
    hasSeedData: true,
  },
  {
    id: 'dashboard',
    name: 'Admin Dashboard',
    description: 'Feature-rich admin dashboard with charts',
    tags: ['nextjs', 'recharts', 'tailwind', 'prisma'],
    repo: 'createforge/template-dashboard',
    featured: false,
    battleTested: true,
    hasTests: true,
    hasSeedData: true,
  },
  {
    id: 'landing-page',
    name: 'Landing Page',
    description: 'High-converting landing page with animations',
    tags: ['nextjs', 'framer-motion', 'tailwind', 'analytics'],
    repo: 'createforge/template-landing-page',
    featured: false,
    battleTested: true,
    hasTests: true,
    hasSeedData: true,
  },

  // Microservices & Cloud
  {
    id: 'microservices',
    name: 'Microservices Starter',
    description: 'Docker-based microservices with API Gateway',
    tags: ['docker', 'kubernetes', 'nodejs', 'redis', 'nginx'],
    repo: 'createforge/template-microservices',
    featured: false,
    battleTested: true,
    hasTests: true,
    hasSeedData: true,
  },
  {
    id: 'serverless',
    name: 'Serverless Functions',
    description: 'AWS Lambda functions with Serverless Framework',
    tags: ['serverless', 'aws', 'lambda', 'dynamodb', 'typescript'],
    repo: 'createforge/template-serverless',
    featured: false,
    battleTested: true,
    hasTests: true,
    hasSeedData: true,
  },
  {
    id: 'edge-functions',
    name: 'Edge Functions',
    description: 'Vercel Edge Functions with global deployment',
    tags: ['vercel', 'edge-functions', 'typescript', 'kv'],
    repo: 'createforge/template-edge-functions',
    featured: false,
    battleTested: true,
    hasTests: true,
    hasSeedData: true,
  },
];

export function getTemplate(id: string): Template | undefined {
  return templates.find(t => t.id === id);
}

export function getFeaturedTemplates(): Template[] {
  return templates.filter(t => t.featured);
}

export function getBattleTestedTemplates(): Template[] {
  return templates.filter(t => t.battleTested);
}

export function getTemplatesByCategory(category: string): Template[] {
  const categories = {
    'full-stack': ['mern-stack', 'mean-stack', 'mevn-stack', 't3-stack', 'remix-app', 'sveltekit-app'],
    'frontend': ['nextjs-saas', 'nextjs-blog', 'astro-blog', 'solid-start', 'portfolio', 'landing-page'],
    'backend': ['express-api', 'fastify-api', 'graphql-api', 'trpc-api'],
    'mobile': ['react-native', 'flutter-app'],
    'desktop': ['electron-app'],
    'ecommerce': ['ecommerce', 'mern-ecommerce'],
    'ai': ['ai-rag'],
    'blog': ['nextjs-blog', 'astro-blog'],
    'saas': ['nextjs-saas', 'dashboard'],
    'cloud': ['microservices', 'serverless', 'edge-functions'],
  };
  
  const templateIds = categories[category as keyof typeof categories] || [];
  return templates.filter(t => templateIds.includes(t.id));
}

export function getTemplatesByTag(tag: string): Template[] {
  return templates.filter(t => t.tags.includes(tag.toLowerCase()));
}

export function searchTemplates(query: string): Template[] {
  const lowerQuery = query.toLowerCase();
  return templates.filter(t => 
    t.name.toLowerCase().includes(lowerQuery) ||
    t.description.toLowerCase().includes(lowerQuery) ||
    t.tags.some(tag => tag.includes(lowerQuery))
  );
}
