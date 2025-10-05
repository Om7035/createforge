import { execa } from 'execa';
import fs from 'fs/promises';
import path from 'path';

async function testCLI() {
  console.log('Testing CreateForge CLI...');
  
  // Create a test directory
  const testDir = path.join(process.cwd(), 'test-project');
  
  try {
    // Clean up if test directory exists
    await fs.rm(testDir, { recursive: true, force: true });
    
    console.log('✓ Test environment cleaned');
    
    // Test CLI help command
    const helpResult = await execa('node', ['dist/cli.js', '--help'], { cwd: process.cwd() });
    console.log('✓ CLI help command works');
    
    // Test CLI version command
    const versionResult = await execa('node', ['dist/cli.js', '--version'], { cwd: process.cwd() });
    console.log('✓ CLI version command works:', versionResult.stdout);
    
    console.log('\n🎉 All CLI tests passed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  } finally {
    // Clean up test directory
    try {
      await fs.rm(testDir, { recursive: true, force: true });
    } catch (e) {
      // Ignore cleanup errors
    }
  }
}

testCLI();
