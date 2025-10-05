#!/usr/bin/env node

import { Command } from 'commander';
import { create } from './commands/create.js';
import { live } from './commands/live.js';
import { addPlugin } from './commands/add.js';
import { health } from './commands/health.js';
import { init } from './commands/init.js';
import { showProfile } from './commands/profile.js';
import { ui } from './utils/ui.js';

const program = new Command();

program
  .name('createforge')
  .description('Ship full-stack apps, not scaffolds — from idea to deployed product in minutes')
  .version('0.1.0')
  .hook('preAction', () => {
    ui.intro('CreateForge — Ship full-stack apps in minutes');
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
    ui.info('Available plugins: stripe, clerk, supabase, openai, analytics');
    ui.info('Use `forge add <plugin>` to install any plugin');
  });

program
  .command('templates')
  .description('List available templates')
  .action(() => {
    ui.info('Available templates: nextjs-saas, ai-rag, nextjs-blog, ecommerce');
    ui.info('Use `forge create --template <template>` to create a project with a specific template');
  });

program
  .command('love')
  .description('Show some developer love')
  .action(() => {
    ui.confetti();
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

program.parse();
