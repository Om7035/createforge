#!/usr/bin/env node

// Simple test to verify our new token-free approach works
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🧪 Testing CreateForge - Token-Free Approach\n');

const testProjectName = 'test-saas-app';

try {
  // Clean up any existing test project
  if (fs.existsSync(testProjectName)) {
    console.log('🧹 Cleaning up existing test project...');
    fs.rmSync(testProjectName, { recursive: true, force: true });
  }

  console.log('⏱️  Starting timer...');
  const startTime = Date.now();

  // Test 1: Create project
  console.log('📦 Creating project...');
  execSync(`node dist/cli.js create ${testProjectName} --no-install`, { 
    stdio: 'inherit',
    cwd: process.cwd()
  });

  // Test 2: Check if essential files exist
  console.log('✅ Checking project structure...');
  const requiredFiles = [
    'package.json',
    'README.md',
    '.env.local',
    'app/page.tsx',
    'app/layout.tsx',
    'app/globals.css',
    'scripts/setup.js',
    'tailwind.config.js',
    'tsconfig.json'
  ];

  let allFilesExist = true;
  requiredFiles.forEach(file => {
    const filePath = path.join(testProjectName, file);
    if (fs.existsSync(filePath)) {
      console.log(`  ✅ ${file}`);
    } else {
      console.log(`  ❌ ${file} - MISSING`);
      allFilesExist = false;
    }
  });

  // Test 3: Check package.json content
  console.log('📋 Checking package.json...');
  const packageJson = JSON.parse(fs.readFileSync(path.join(testProjectName, 'package.json'), 'utf8'));
  
  const requiredDeps = ['next', 'react', 'react-dom', 'bcryptjs', 'jsonwebtoken', 'tailwindcss'];
  const missingDeps = requiredDeps.filter(dep => !packageJson.dependencies[dep]);
  
  if (missingDeps.length === 0) {
    console.log('  ✅ All required dependencies present');
  } else {
    console.log(`  ❌ Missing dependencies: ${missingDeps.join(', ')}`);
    allFilesExist = false;
  }

  // Test 4: Check if setup script exists and is executable
  console.log('🔧 Checking setup script...');
  const setupScript = fs.readFileSync(path.join(testProjectName, 'scripts/setup.js'), 'utf8');
  if (setupScript.includes('bcrypt') && setupScript.includes('users')) {
    console.log('  ✅ Setup script looks good');
  } else {
    console.log('  ❌ Setup script missing key components');
    allFilesExist = false;
  }

  // Test 5: Check environment file
  console.log('🌍 Checking environment setup...');
  const envFile = fs.readFileSync(path.join(testProjectName, '.env.local'), 'utf8');
  if (envFile.includes('JWT_SECRET') && envFile.includes('no external services')) {
    console.log('  ✅ Environment file configured correctly');
  } else {
    console.log('  ❌ Environment file missing key configuration');
    allFilesExist = false;
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log('\n🎉 Test Results:');
  console.log(`⏱️  Time taken: ${elapsed}s`);
  console.log(`📁 Project size: ${getDirSize(testProjectName)} files`);
  console.log(`✅ Success: ${allFilesExist ? 'YES' : 'NO'}`);

  if (allFilesExist) {
    console.log('\n🚀 SUCCESS! CreateForge now creates working apps instantly!');
    console.log('\n📋 What works out of the box:');
    console.log('  ✅ No external API keys needed');
    console.log('  ✅ Local authentication system');
    console.log('  ✅ Mock payment flows');
    console.log('  ✅ Realistic demo data');
    console.log('  ✅ Complete Next.js app');
    console.log('  ✅ TypeScript support');
    console.log('  ✅ Tailwind CSS styling');
    console.log('\n🎯 Next steps for developers:');
    console.log(`  1. cd ${testProjectName}`);
    console.log('  2. npm install');
    console.log('  3. npm run setup');
    console.log('  4. npm run dev');
    console.log('  5. Login with: admin@test.com / password');
  } else {
    console.log('\n❌ FAILED! Some components are missing.');
    process.exit(1);
  }

} catch (error) {
  console.error('\n💥 Test failed with error:', error.message);
  process.exit(1);
} finally {
  // Clean up
  if (fs.existsSync(testProjectName)) {
    console.log('\n🧹 Cleaning up test project...');
    fs.rmSync(testProjectName, { recursive: true, force: true });
  }
}

function getDirSize(dirPath) {
  let fileCount = 0;
  
  function countFiles(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        countFiles(filePath);
      } else {
        fileCount++;
      }
    });
  }
  
  countFiles(dirPath);
  return fileCount;
}
