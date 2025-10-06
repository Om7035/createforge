import { ui } from '../utils/ui.js';

export async function showWelcome() {
  console.clear();
  ui.banner();
  
  ui.box('✨ Welcome to CreateForge!', [
    'The fastest way to create production-ready full-stack apps',
    '',
    '🚀 Get started in seconds:',
    `  ${ui.command('forge create my-app')}`,
    '',
    '📚 Explore what\'s available:',
    `  ${ui.command('forge templates')} - View all templates`,
    `  ${ui.command('forge plugins')} - View all plugins`,
    '',
    '🛠️ Common workflows:',
    `  ${ui.command('forge create my-saas --template nextjs-saas')}`,
    `  ${ui.command('forge add stripe')} - Add payments`,
    `  ${ui.command('forge health')} - Check project health`,
    `  ${ui.command('forge init')} - Setup GitHub & deployment`,
    '',
    '❤️ Show some love:',
    `  ${ui.command('forge love')} - See developer appreciation`,
  ]);
  
  ui.spacer();
  ui.info(`📖 Full documentation: ${ui.link('https://github.com/Om7035/createforge#readme')}`);
  ui.info(`🐛 Report issues: ${ui.link('https://github.com/Om7035/createforge/issues')}`);
  ui.info(`⭐ Star us on GitHub: ${ui.link('https://github.com/Om7035/createforge')}`);
  
  ui.outro('Happy building! ⚡');
}

export async function showQuickStart() {
  console.clear();
  ui.banner();
  
  ui.box('🚀 Quick Start Guide', [
    '1. Create your first app:',
    `   ${ui.command('forge create my-app')}`,
    '',
    '2. Navigate to your project:',
    `   ${ui.command('cd my-app')}`,
    '',
    '3. Start development server:',
    `   ${ui.command('npm run dev')}`,
    '',
    '4. Add features as needed:',
    `   ${ui.command('forge add stripe')} # Payments`,
    `   ${ui.command('forge add clerk')} # Authentication`,
    `   ${ui.command('forge add supabase')} # Database`,
    '',
    '5. Deploy when ready:',
    `   ${ui.command('forge init --deploy vercel')}`,
  ]);
  
  ui.spacer();
  ui.info('🎯 Pro tip: Use templates to get started faster!');
  ui.info(`   ${ui.command('forge create my-saas --template nextjs-saas')}`);
  
  ui.outro('You\'re all set! 🎉');
}

export async function showExamples() {
  console.clear();
  ui.banner();
  
  ui.box('💡 Example Workflows', [
    '🏪 E-commerce Store:',
    `   ${ui.command('forge create my-store --template ecommerce')}`,
    `   ${ui.command('forge add stripe')}`,
    '',
    '🤖 AI Chat App:',
    `   ${ui.command('forge create ai-chat --template ai-rag')}`,
    `   ${ui.command('forge add openai')}`,
    '',
    '💼 SaaS Application:',
    `   ${ui.command('forge create my-saas --template nextjs-saas')}`,
    `   ${ui.command('forge add clerk')}`,
    `   ${ui.command('forge add stripe')}`,
    '',
    '📝 Blog Website:',
    `   ${ui.command('forge create my-blog --template nextjs-blog')}`,
    `   ${ui.command('forge add analytics')}`,
  ]);
  
  ui.outro('Pick one and start building! 🚀');
}
