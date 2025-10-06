#!/usr/bin/env node

import { Command } from 'commander';
import { create } from './commands/create.js';
import { live } from './commands/live.js';
import { addPlugin } from './commands/add.js';
import { health } from './commands/health.js';
import { init } from './commands/init.js';
import { showProfile } from './commands/profile.js';
import { showWelcome, showQuickStart, showExamples } from './commands/help.js';
import { templates, getFeaturedTemplates, getTemplatesByCategory, getTemplatesByTag, searchTemplates, Template } from './utils/templates.js';
import { builtinPlugins, ForgePlugin } from './plugins/index.js';
import { ui } from './utils/ui.js';

const program = new Command();

program
  .name('createforge')
  .description('Ship full-stack apps, not scaffolds — from idea to deployed product in minutes')
  .version('0.1.0')
  .hook('preAction', () => {
    ui.banner();
  });

program
  .command('create')
  .description('Create a new app from a template')
  .argument('[project-name]', 'Name of your project')
  .option('-t, --template <template>', 'Template to use (nextjs-saas, ai-rag, etc.)')
  .option('-l, --live', 'Open in Forge Live browser environment')
  .option('--no-install', 'Skip dependency installation')
  .option('--no-git', 'Skip git initialization')
  .action(create);

program
  .command('live')
  .description('Open current project in Forge Live browser environment')
  .argument('[path]', 'Path to project', '.')
  .action(live);

program
  .command('add')
  .description('Add a plugin to your project')
  .argument('<plugin>', 'Plugin name (stripe, clerk, supabase, etc.)')
  .action(addPlugin);

program
  .command('health')
  .description('Check project health and get upgrade recommendations')
  .option('--fix', 'Automatically create PR for upgrades')
  .action(health);

program
  .command('init')
  .description('Initialize GitHub repo, actions, and deployment')
  .option('--deploy <platform>', 'Deploy platform (vercel, netlify, railway)', 'vercel')
  .action(init);

program
  .command('profile')
  .description('Manage your Forge profile and presets')
  .option('--edit', 'Edit profile settings')
  .action(showProfile);

program
  .command('showcase')
  .description('Create a public showcase of your project')
  .option('--title <title>', 'Showcase title')
  .option('--description <description>', 'Showcase description')
  .action(() => {
    ui.info('Showcase feature coming soon!');
    ui.info('This will help you share your creations with the community');
  });

program
  .command('plugins')
  .description('List available plugins')
  .option('-c, --category <category>', 'Filter by category (payment, auth, database, ai, etc.)')
  .option('-s, --search <query>', 'Search plugins')
  .action((options) => {
    let title = 'Available Plugins';
    let plugins: ForgePlugin[] = Object.values(builtinPlugins);
    
    if (options.search) {
      const query = options.search.toLowerCase();
      plugins = plugins.filter((p: ForgePlugin) => 
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.id.includes(query)
      );
      title = `Search results for "${options.search}"`;
    }
    
    ui.intro(title);
    
    if (plugins.length === 0) {
      ui.warning('No plugins found matching your criteria');
      ui.info('Try: forge plugins or forge plugins --search auth');
      return;
    }
    
    // Group plugins by category
    const categories = {
      '💳 Payment Processing': plugins.filter((p: ForgePlugin) => ['stripe', 'paypal'].includes(p.id)),
      '🔐 Authentication': plugins.filter((p: ForgePlugin) => ['clerk', 'nextauth', 'auth0'].includes(p.id)),
      '🗄️ Database & Backend': plugins.filter((p: ForgePlugin) => ['supabase', 'prisma', 'mongodb', 'firebase'].includes(p.id)),
      '🤖 AI & Machine Learning': plugins.filter((p: ForgePlugin) => ['openai', 'anthropic', 'pinecone'].includes(p.id)),
      '📧 Communication': plugins.filter((p: ForgePlugin) => ['resend', 'sendgrid', 'twilio'].includes(p.id)),
      '📁 File Storage': plugins.filter((p: ForgePlugin) => ['uploadthing', 'cloudinary'].includes(p.id)),
      '📊 Analytics & Monitoring': plugins.filter((p: ForgePlugin) => ['analytics', 'posthog', 'sentry'].includes(p.id)),
      '🔄 API & Data': plugins.filter((p: ForgePlugin) => ['trpc', 'tanstack', 'apollo'].includes(p.id)),
      '🎨 UI & Styling': plugins.filter((p: ForgePlugin) => ['shadcn', 'mantine', 'chakra'].includes(p.id)),
      '🏪 State Management': plugins.filter((p: ForgePlugin) => ['zustand', 'redux'].includes(p.id)),
      '🧪 Testing': plugins.filter((p: ForgePlugin) => ['playwright', 'cypress'].includes(p.id)),
    };
    
    // Show popular plugins first
    const popular = plugins.filter((p: ForgePlugin) => 
      ['stripe', 'clerk', 'supabase', 'openai', 'prisma', 'nextauth', 'trpc', 'shadcn'].includes(p.id)
    );
    
    if (popular.length > 0 && !options.search) {
      ui.spacer();
      ui.info(ui.bold('⭐ Popular Plugins'));
      ui.table(
        ['Plugin', 'Description', 'Category'],
        popular.map((p: ForgePlugin) => [
          p.id,
          p.description,
          getCategoryForPlugin(p.id)
        ])
      );
    }
    
    if (!options.search) {
      Object.entries(categories).forEach(([category, categoryPlugins]) => {
        if (categoryPlugins.length > 0) {
          ui.spacer();
          ui.info(ui.bold(category));
          ui.table(
            ['Plugin', 'Description', 'Packages'],
            categoryPlugins.map((p: ForgePlugin) => [
              p.id,
              p.description,
              p.packages.slice(0, 2).join(', ') + (p.packages.length > 2 ? '...' : '')
            ])
          );
        }
      });
    } else {
      ui.spacer();
      ui.table(
        ['Plugin', 'Description', 'Category'],
        plugins.map((p: ForgePlugin) => [
          p.id,
          p.description,
          getCategoryForPlugin(p.id)
        ])
      );
    }
    
    ui.spacer();
    ui.info(`📊 Total: ${plugins.length} plugins available`);
    ui.info(`Use ${ui.command('forge add <plugin>')} to install any plugin`);
    ui.info(`Search: ${ui.command('forge plugins --search auth')} or ${ui.command('forge plugins --search payment')}`);
    ui.outro('Build something amazing! 🚀');
  });

function getCategoryForPlugin(pluginId: string): string {
  const categoryMap: Record<string, string> = {
    'stripe': 'Payment', 'paypal': 'Payment',
    'clerk': 'Auth', 'nextauth': 'Auth', 'auth0': 'Auth',
    'supabase': 'Database', 'prisma': 'Database', 'mongodb': 'Database', 'firebase': 'Database',
    'openai': 'AI', 'anthropic': 'AI', 'pinecone': 'AI',
    'resend': 'Email', 'sendgrid': 'Email', 'twilio': 'SMS',
    'uploadthing': 'Storage', 'cloudinary': 'Storage',
    'analytics': 'Analytics', 'posthog': 'Analytics', 'sentry': 'Monitoring',
    'trpc': 'API', 'tanstack': 'Data', 'apollo': 'GraphQL',
    'shadcn': 'UI', 'mantine': 'UI', 'chakra': 'UI',
    'zustand': 'State', 'redux': 'State',
    'playwright': 'Testing', 'cypress': 'Testing',
  };
  return categoryMap[pluginId] || 'Other';
}

program
  .command('templates')
  .description('List available templates')
  .option('-c, --category <category>', 'Filter by category (full-stack, frontend, backend, mobile, etc.)')
  .option('-t, --tag <tag>', 'Filter by technology tag')
  .option('-s, --search <query>', 'Search templates')
  .option('-f, --featured', 'Show only featured templates')
  .action((options) => {
    let filteredTemplates: Template[] = templates;
    let title = 'All Templates';
    
    if (options.featured) {
      filteredTemplates = getFeaturedTemplates();
      title = 'Featured Templates';
    } else if (options.category) {
      filteredTemplates = getTemplatesByCategory(options.category);
      title = `${options.category.charAt(0).toUpperCase() + options.category.slice(1)} Templates`;
    } else if (options.tag) {
      filteredTemplates = getTemplatesByTag(options.tag);
      title = `Templates with ${options.tag}`;
    } else if (options.search) {
      filteredTemplates = searchTemplates(options.search);
      title = `Search results for "${options.search}"`;
    }
    
    ui.intro(title);
    
    if (filteredTemplates.length === 0) {
      ui.warning('No templates found matching your criteria');
      ui.info('Try: forge templates --featured or forge templates --category full-stack');
      return;
    }
    
    // Show featured templates first
    const featured = filteredTemplates.filter((t: Template) => t.featured);
    const regular = filteredTemplates.filter((t: Template) => !t.featured);
    
    if (featured.length > 0) {
      ui.spacer();
      ui.info(ui.bold('⭐ Featured Templates'));
      ui.table(
        ['Template', 'Description', 'Stack'],
        featured.map((t: Template) => [
          t.id + (t.battleTested ? ' ⚔️' : ''),
          t.description,
          t.tags.slice(0, 3).join(', ')
        ])
      );
    }
    
    if (regular.length > 0 && !options.featured) {
      ui.spacer();
      ui.info(ui.bold('📚 All Templates'));
      
      // Group by category for better organization
      const categories = {
        'Full-Stack': regular.filter((t: Template) => ['mern-stack', 'mean-stack', 'mevn-stack', 't3-stack', 'remix-app', 'sveltekit-app'].includes(t.id)),
        'Backend APIs': regular.filter((t: Template) => ['express-api', 'fastify-api', 'graphql-api', 'trpc-api'].includes(t.id)),
        'Mobile & Desktop': regular.filter((t: Template) => ['react-native', 'flutter-app', 'electron-app'].includes(t.id)),
        'Specialized': regular.filter((t: Template) => ['nextjs-blog', 'portfolio', 'dashboard', 'landing-page'].includes(t.id)),
        'Cloud & Microservices': regular.filter((t: Template) => ['microservices', 'serverless', 'edge-functions'].includes(t.id)),
      };
      
      Object.entries(categories).forEach(([category, templates]) => {
        if (templates.length > 0) {
          ui.spacer();
          ui.info(ui.dim(`${category}:`));
          ui.table(
            ['Template', 'Description', 'Stack'],
            templates.map((t: Template) => [
              t.id + (t.battleTested ? ' ⚔️' : ''),
              t.description,
              t.tags.slice(0, 3).join(', ')
            ])
          );
        }
      });
    }
    
    ui.spacer();
    ui.info(`📊 Total: ${filteredTemplates.length} templates available`);
    ui.info(`Use ${ui.command('forge create --template <name>')} to create a project`);
    ui.info(`Filter: ${ui.command('forge templates --category full-stack')} or ${ui.command('forge templates --featured')}`);
    ui.outro('Happy building! ⚡');
  });

program
  .command('love')
  .description('Show some developer love')
  .action(() => {
    ui.bigConfetti();
    ui.box('❤️ Developer Love', [
      'Thanks for using CreateForge!',
      '',
      'We\'re building something special for developers like you.',
      'If you enjoy using CreateForge, please consider:',
      '  • Starring our repo on GitHub',
      '  • Sharing with friends',
      '  • Contributing templates/plugins',
      '',
      'Made with ❤️ by developers, for developers'
    ]);
  });

program
  .command('welcome')
  .description('Show welcome guide')
  .action(showWelcome);

program
  .command('quickstart')
  .description('Show quick start guide')
  .action(showQuickStart);

program
  .command('examples')
  .description('Show example workflows')
  .action(showExamples);

// Show welcome if no command provided
if (process.argv.length === 2) {
  showWelcome();
} else {
  program.parse();
}
