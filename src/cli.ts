#!/usr/bin/env node

import { Command } from 'commander';
import { create } from './commands/create.js';
import { live } from './commands/live.js';
import { addPlugin } from './commands/add.js';
import { health } from './commands/health.js';
import { init } from './commands/init.js';
import { showProfile } from './commands/profile.js';
import { showWelcome, showQuickStart, showExamples } from './commands/help.js';
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
  .action(() => {
    ui.intro('Available Plugins');
    
    ui.table(
      ['Plugin', 'Description', 'Use Case'],
      [
        ['stripe', 'Accept payments with Stripe', 'E-commerce, SaaS billing'],
        ['clerk', 'User authentication', 'Login, signup, user management'],
        ['supabase', 'Database and auth', 'Backend as a service'],
        ['openai', 'AI capabilities', 'Chat, completion, embeddings'],
        ['analytics', 'Track user behavior', 'Usage analytics'],
      ]
    );
    
    ui.info(`Use ${ui.command('forge add <plugin>')} to install any plugin`);
    ui.outro('Build something amazing! 🚀');
  });

program
  .command('templates')
  .description('List available templates')
  .action(() => {
    ui.intro('Available Templates');
    
    ui.table(
      ['Template', 'Description', 'Stack'],
      [
        ['nextjs-saas', 'Production SaaS with auth & payments', 'Next.js + TypeScript + Tailwind'],
        ['ai-rag', 'RAG chat with vector search', 'Next.js + OpenAI + Pinecone'],
        ['nextjs-blog', 'Blog with MDX support', 'Next.js + MDX + Tailwind'],
        ['ecommerce', 'Full store with cart & checkout', 'Next.js + Stripe + Tailwind'],
      ]
    );
    
    ui.info(`Use ${ui.command('forge create --template <name>')} to create a project`);
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
