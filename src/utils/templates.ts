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
