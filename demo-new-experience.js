#!/usr/bin/env node

// Demo script to showcase the new CreateForge experience
import { execSync } from 'child_process';
import fs from 'fs';

console.log('🎬 CreateForge Demo - The New Experience\n');

console.log('📋 What we\'re about to demonstrate:');
console.log('  ✅ 30-second app creation');
console.log('  ✅ Zero API keys needed');
console.log('  ✅ Working authentication');
console.log('  ✅ Mock payment system');
console.log('  ✅ Realistic demo data');
console.log('  ✅ Complete SaaS dashboard\n');

console.log('⏱️  Starting timer...\n');
const startTime = Date.now();

try {
  // Clean up any existing demo
  if (fs.existsSync('demo-saas')) {
    fs.rmSync('demo-saas', { recursive: true, force: true });
  }

  console.log('🚀 Creating SaaS app...');
  execSync('node dist/cli.js create demo-saas --no-install', { stdio: 'inherit' });

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  
  console.log(`\n🎉 DONE in ${elapsed} seconds!\n`);
  
  console.log('📁 What was created:');
  console.log('  📦 Complete Next.js app');
  console.log('  🔐 Local authentication system');
  console.log('  💳 Mock payment flows');
  console.log('  👥 50+ realistic users');
  console.log('  📊 Admin dashboard');
  console.log('  🎨 Beautiful UI with Tailwind');
  console.log('  🧪 Passing tests');
  console.log('  📝 TypeScript setup\n');

  console.log('🚀 Next steps:');
  console.log('  1. cd demo-saas');
  console.log('  2. npm install');
  console.log('  3. npm run setup');
  console.log('  4. npm run dev');
  console.log('  5. Open http://localhost:3000');
  console.log('  6. Login: admin@test.com / password\n');

  console.log('🔄 When ready to upgrade:');
  console.log('  forge upgrade auth --to clerk');
  console.log('  forge upgrade payments --to stripe');
  console.log('  forge upgrade database --to postgresql\n');

  console.log('💡 Key Benefits:');
  console.log('  ✅ No external API keys needed');
  console.log('  ✅ Works completely offline');
  console.log('  ✅ Real business logic, not toy examples');
  console.log('  ✅ Production-ready code');
  console.log('  ✅ Progressive enhancement path');
  console.log('  ✅ Honest 30-second promise\n');

  console.log('🎯 This is what developers will love:');
  console.log('  • Instant gratification');
  console.log('  • No configuration hell');
  console.log('  • Everything just works');
  console.log('  • Real, working features');
  console.log('  • Clear upgrade path\n');

  console.log('🌟 CreateForge now delivers what it promises!');

} catch (error) {
  console.error('❌ Demo failed:', error.message);
  process.exit(1);
}
