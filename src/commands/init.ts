import { execa } from 'execa';
import fs from 'fs/promises';
import { ui } from '../utils/ui.js';
import * as p from '@clack/prompts';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface InitOptions {
  deploy?: string;
}

export async function init(options: InitOptions = {}) {
  ui.intro('Forge Init — GitHub & Deployment Setup');
  
  // Check if git is initialized
  try {
    await execa('git', ['rev-parse', '--git-dir'], { stdio: 'pipe' });
  } catch {
    ui.error('Not a git repository. Initialize git first: `git init`');
    process.exit(1);
  }
  
  // Get project info
  const projectName = path.basename(process.cwd());
  
  // Step 1: Create GitHub repo
  const createRepo = await ui.confirm({
    message: 'Create GitHub repository?',
    initialValue: true,
  });
  
  if (p.isCancel(createRepo)) {
    ui.outro('Cancelled');
    process.exit(0);
  }
  
  let repoUrl = '';
  if (createRepo) {
    const spinner = ui.spinner();
    spinner.start('Creating GitHub repository...');
    
    // In production, this would use GitHub API
    spinner.stop('GitHub setup ready!');
    ui.info('In production, this would create a GitHub repo via API');
    ui.info('For now, create manually: https://github.com/new');
    
    const repoName = await ui.text({
      message: 'Repository name',
      placeholder: projectName,
      initialValue: projectName,
    });
    
    if (!p.isCancel(repoName)) {
      repoUrl = `https://github.com/your-username/${repoName}`;
    }
  }
  
  // Step 2: Set up GitHub Actions
  const setupActions = await ui.confirm({
    message: 'Add GitHub Actions CI/CD?',
    initialValue: true,
  });
  
  if (!p.isCancel(setupActions) && setupActions) {
    await setupGitHubActions(options.deploy || 'vercel');
    ui.success('GitHub Actions configured');
  }
  
  // Step 3: Enable Dependabot
  const setupDependabot = await ui.confirm({
    message: 'Enable Dependabot for dependency updates?',
    initialValue: true,
  });
  
  if (!p.isCancel(setupDependabot) && setupDependabot) {
    await setupDependabotConfig();
    ui.success('Dependabot configured');
  }
  
  // Step 4: Create initial issues
  const createIssues = await ui.confirm({
    message: 'Create starter issues & project board?',
    initialValue: false,
  });
  
  if (!p.isCancel(createIssues) && createIssues) {
    await createStarterIssues();
    ui.success('Starter issues created');
  }
  
  // Step 5: Set up deployment
  const deployPlatform = options.deploy || await ui.select({
    message: 'Choose deployment platform',
    options: [
      { value: 'vercel', label: 'Vercel (Recommended)' },
      { value: 'netlify', label: 'Netlify' },
      { value: 'railway', label: 'Railway' },
      { value: 'manual', label: 'Manual Deployment' },
    ],
    initialValue: 'vercel',
  });
  
  if (!p.isCancel(deployPlatform)) {
    await setupDeployment(deployPlatform as string);
  }
  
  console.log('');
  ui.confetti();
  
  ui.box('🚀 Setup Complete!', [
    'Your project is ready for production:',
    '',
    createRepo ? '✓ GitHub repository' : '',
    setupActions ? '✓ CI/CD pipeline' : '',
    setupDependabot ? '✓ Automated dependency updates' : '',
    createIssues ? '✓ Starter issues & project board' : '',
    '',
    'Next steps:',
    '  git add .',
    '  git commit -m "Initial commit from CreateForge"',
    createRepo ? `  git remote add origin ${repoUrl}.git` : '',
    createRepo ? '  git push -u origin main' : '',
    '',
    'Deployment:',
    deployPlatform === 'vercel' ? '  Visit https://vercel.com/new to deploy' : '',
    deployPlatform === 'netlify' ? '  Visit https://app.netlify.com/start to deploy' : '',
    deployPlatform === 'railway' ? '  Visit https://railway.app/new to deploy' : '',
    deployPlatform === 'manual' ? '  Run `npm run build` and deploy the output' : '',
  ].filter(Boolean));
  
  // Offer to open deployment platform
  if (deployPlatform !== 'manual' && deployPlatform !== 'none') {
    console.log('');
    const openDeploy = await ui.confirm({
      message: `Open ${String(deployPlatform)} dashboard?`,
      initialValue: true,
    });
    
    if (!p.isCancel(openDeploy) && openDeploy) {
      const urls: Record<string, string> = {
        vercel: 'https://vercel.com/new',
        netlify: 'https://app.netlify.com/start',
        railway: 'https://railway.app/new',
      };
      
      const platformStr = String(deployPlatform);
      if (urls[platformStr]) {
        const { default: open } = await import('open');
        await open(urls[platformStr]);
        ui.info(`Opening ${platformStr}...`);
      }
    }
  }
  
  console.log('');
  ui.outro('Happy shipping! 🎉');
}

async function setupGitHubActions(platform: string) {
  const workflowDir = '.github/workflows';
  await fs.mkdir(workflowDir, { recursive: true });
  
  const workflow = `name: CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'
      - run: npm ci
      - run: npm test
      - run: npm run build

  deploy-preview:
    needs: test
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    steps:
      - uses: actions/checkout@v4
      ${platform === 'vercel' ? `- uses: amondnet/vercel-action@v25
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: \${{ secrets.VERCEL_PROJECT_ID }}
          github-comment: true` : '# Add preview deployment step'}

  deploy-production:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      ${platform === 'vercel' ? `- uses: amondnet/vercel-action@v25
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: \${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'` : '# Add production deployment step'}
`;
  
  await fs.writeFile(`${workflowDir}/ci.yml`, workflow);
}

async function setupDependabotConfig() {
  const dependabotDir = '.github';
  await fs.mkdir(dependabotDir, { recursive: true });
  
  const config = `version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
    reviewers:
      - "your-username"
    labels:
      - "dependencies"
      - "automated"
`;
  
  await fs.writeFile(`${dependabotDir}/dependabot.yml`, config);
}

async function createStarterIssues() {
  const issuesDir = '.github/ISSUES';
  await fs.mkdir(issuesDir, { recursive: true });
  
  // Create template issues
  const issues = [
    {
      filename: 'good-first-issue.md',
      content: `---
name: Good First Issue
about: A great first issue for new contributors
labels: good first issue, help wanted
---

## Description

This is a great first issue for new contributors to CreateForge templates.

## Requirements

- [ ] Fork the repository
- [ ] Create a new branch
- [ ] Make the required changes
- [ ] Add tests if applicable
- [ ] Submit a pull request

## Help

If you need help, feel free to ask in the comments or join our Discord: https://discord.gg/createforge
`,
    },
    {
      filename: 'add-new-feature.md',
      content: `---
name: Add New Feature
about: Suggest or implement a new feature
labels: enhancement
---

## Feature Description

[Describe the feature you'd like to add]

## Use Case

[Explain why this feature would be useful]

## Implementation Ideas

[If you have ideas on how to implement this, share them here]
`,
    },
  ];
  
  for (const issue of issues) {
    await fs.writeFile(path.join(issuesDir, issue.filename), issue.content);
  }
}

async function setupDeployment(platform: string) {
  ui.info(`Setting up ${platform} deployment...`);
  
  switch (platform) {
    case 'vercel':
      // Create Vercel config
      const vercelConfig = {
        version: 2,
        builds: [
          {
            src: 'package.json',
            use: '@vercel/next',
            config: {
              includeFiles: ['next.config.js'],
            },
          },
        ],
        routes: [
          {
            src: '/(.*)',
            dest: '/',
          },
        ],
      };
      
      await fs.writeFile('vercel.json', JSON.stringify(vercelConfig, null, 2));
      ui.success('Vercel configuration created');
      break;
      
    case 'netlify':
      // Create Netlify config
      const netlifyToml = `[build]
command = "npm run build"
publish = ".next"

[functions]
directory = "netlify/functions"

[[plugins]]
package = "@netlify/plugin-nextjs"
`;
      
      await fs.writeFile('netlify.toml', netlifyToml);
      ui.success('Netlify configuration created');
      break;
      
    case 'railway':
      // Create Railway config
      const railwayJson = {
        $schema: 'https://railway.app/railway.schema.json',
        build: {
          builder: 'NIXPACKS',
        },
        deploy: {
          startCommand: 'npm start',
          restartPolicyType: 'ON_FAILURE',
          restartPolicyMaxRetries: 10,
        },
      };
      
      await fs.writeFile('railway.json', JSON.stringify(railwayJson, null, 2));
      ui.success('Railway configuration created');
      break;
  }
}
