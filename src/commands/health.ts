import { execa } from 'execa';
import fs from 'fs/promises';
import { ui } from '../utils/ui.js';

interface HealthCheck {
  name: string;
  status: 'pass' | 'warn' | 'fail';
  message: string;
  fix?: string;
}

export async function health(options: { fix?: boolean } = {}) {
  ui.intro('Forge Health — Project Health Check');
  
  const spinner = ui.spinner();
  spinner.start('Analyzing your project...');
  
  const checks: HealthCheck[] = [];
  
  // Check 1: Dependencies
  try {
    const { stdout } = await execa('npm', ['outdated', '--json'], {
      reject: false,
      stdio: 'pipe',
    });
    
    if (stdout) {
      const outdated = JSON.parse(stdout);
      const count = Object.keys(outdated).length;
      
      if (count > 0) {
        checks.push({
          name: 'Dependencies',
          status: 'warn',
          message: `${count} package(s) have updates available`,
          fix: 'npm update',
        });
      } else {
        checks.push({
          name: 'Dependencies',
          status: 'pass',
          message: 'All packages are up to date',
        });
      }
    } else {
      checks.push({
        name: 'Dependencies',
        status: 'pass',
        message: 'All packages are up to date',
      });
    }
  } catch (error) {
    checks.push({
      name: 'Dependencies',
      status: 'warn',
      message: 'Could not check for updates',
    });
  }
  
  // Check 2: Security vulnerabilities
  try {
    const { stdout } = await execa('npm', ['audit', '--json'], {
      reject: false,
      stdio: 'pipe',
    });
    
    const audit = JSON.parse(stdout);
    const vulns = audit.metadata?.vulnerabilities;
    
    if (vulns) {
      const total = vulns.high + vulns.critical;
      
      if (total > 0) {
        checks.push({
          name: 'Security',
          status: 'fail',
          message: `${total} high/critical vulnerabilities found`,
          fix: 'npm audit fix',
        });
      } else if (vulns.moderate > 0) {
        checks.push({
          name: 'Security',
          status: 'warn',
          message: `${vulns.moderate} moderate vulnerabilities found`,
          fix: 'npm audit fix',
        });
      } else {
        checks.push({
          name: 'Security',
          status: 'pass',
          message: 'No known vulnerabilities',
        });
      }
    }
  } catch (error) {
    checks.push({
      name: 'Security',
      status: 'warn',
      message: 'Could not run security audit',
    });
  }
  
  // Check 3: TypeScript config
  try {
    await fs.access('tsconfig.json');
    checks.push({
      name: 'TypeScript',
      status: 'pass',
      message: 'TypeScript configured',
    });
  } catch {
    checks.push({
      name: 'TypeScript',
      status: 'warn',
      message: 'No tsconfig.json found',
    });
  }
  
  // Check 4: Tests
  try {
    const pkg = JSON.parse(await fs.readFile('package.json', 'utf-8'));
    
    if (pkg.scripts?.test) {
      checks.push({
        name: 'Tests',
        status: 'pass',
        message: 'Test script configured',
      });
    } else {
      checks.push({
        name: 'Tests',
        status: 'warn',
        message: 'No test script found',
      });
    }
  } catch {
    checks.push({
      name: 'Tests',
      status: 'warn',
      message: 'Could not check test configuration',
    });
  }
  
  // Check 5: Environment variables
  try {
    await fs.access('.env.local');
    checks.push({
      name: 'Environment',
      status: 'pass',
      message: '.env.local exists',
    });
  } catch {
    checks.push({
      name: 'Environment',
      status: 'warn',
      message: 'No .env.local file found',
    });
  }
  
  spinner.stop('Analysis complete!');
  
  // Display results
  console.log('');
  ui.box('Health Report', [
    ...checks.map(check => {
      const icon = check.status === 'pass' ? '✓' : check.status === 'warn' ? '⚠' : '✗';
      const color = check.status === 'pass' ? 'green' : check.status === 'warn' ? 'yellow' : 'red';
      return `${icon} ${check.name}: ${check.message}`;
    }),
  ]);
  
  // Show fixes
  const fixable = checks.filter(c => c.fix);
  
  if (fixable.length > 0) {
    console.log('');
    ui.info('Recommended fixes:');
    fixable.forEach(check => {
      console.log(`  ${check.name}: ${ui.code(check.fix!)}`);
    });
    
    if (options.fix) {
      console.log('');
      const spinner2 = ui.spinner();
      spinner2.start('Applying fixes...');
      
      // In a real implementation, this would create a PR with fixes
      // For now, just show what would happen
      
      spinner2.stop('Fixes ready!');
      ui.info('In production, this would create a PR with automated fixes');
    }
  }
  
  const score = checks.filter(c => c.status === 'pass').length;
  const total = checks.length;
  
  console.log('');
  if (score === total) {
    ui.confetti();
    ui.outro(`Perfect score! ${score}/${total} checks passed 🎉`);
  } else {
    ui.outro(`Health score: ${score}/${total} checks passed`);
  }
}
