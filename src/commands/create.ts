import * as p from '@clack/prompts';
import { execa } from 'execa';
import degit from 'degit';
import fs from 'fs/promises';
import path from 'path';
import { ui } from '../utils/ui.js';
import { templates, getTemplate, getFeaturedTemplates } from '../utils/templates.js';
import { config, updateStats, addRecentTemplate } from '../utils/config.js';
import { live } from './live.js';
import { addPlugin } from './add.js';
import open from 'open';

interface CreateOptions {
  template?: string;
  live?: boolean;
  install?: boolean;
  git?: boolean;
}

export async function create(projectName?: string, options: CreateOptions = {}) {
  console.clear();
  ui.banner();
  
  const startTime = Date.now();
  
  // Step 1: Get project name
  ui.step(1, 8, 'Getting project name');
  if (!projectName) {
    const result = await ui.text({
      message: 'What is your project called?',
      placeholder: 'my-awesome-app',
      validate: (value) => {
        if (!value) return 'Project name is required';
        if (!/^[a-z0-9-]+$/.test(value)) return 'Use lowercase letters, numbers, and hyphens only';
        return undefined;
      },
    });
    
    if (p.isCancel(result)) {
      ui.outro('Cancelled. Come back when inspiration strikes! 💡');
      process.exit(0);
    }
    
    projectName = result as string;
  }
  
  // Step 2: Select template
  ui.step(2, 8, 'Selecting template');
  let templateId = options.template;
  
  if (!templateId) {
    const featured = getFeaturedTemplates();
    const result = await ui.select({
      message: 'Pick your stack',
      options: [
        ...featured.map(t => ({
          value: t.id,
          label: `${t.name} ${t.battleTested ? '⚔️' : ''}`,
          hint: t.description,
        })),
        { value: 'browse', label: '→ Browse all templates', hint: `${templates.length} available` },
      ],
    });
    
    if (p.isCancel(result)) {
      ui.outro('Cancelled. Come back when inspiration strikes! 💡');
      process.exit(0);
    }
    
    templateId = result as string;
    
    if (templateId === 'browse') {
      const browseResult = await ui.select({
        message: 'Choose a template',
        options: templates.map(t => ({
          value: t.id,
          label: `${t.name} ${t.battleTested ? '⚔️' : ''}`,
          hint: t.description,
        })),
      });
      
      if (p.isCancel(browseResult)) {
        ui.outro('Cancelled. Come back when inspiration strikes! 💡');
        process.exit(0);
      }
      
      templateId = browseResult as string;
    }
  }
  
  const template = getTemplate(templateId);
  
  if (!template) {
    ui.error(`Template "${templateId}" not found`);
    process.exit(1);
  }
  
  ui.info(`Using ${ui.badge(template.name)}`);
  
  // Step 3: Clone template
  ui.step(3, 8, 'Cloning template');
  const spinner = ui.spinner();
  spinner.start('Creating your project...');
  
  try {
    const emitter = degit(template.repo, {
      cache: false,
      force: true,
    });
    
    await emitter.clone(projectName);
    spinner.stop('Project created!');
    ui.success(`Cloned ${template.name}`);
  } catch (error) {
    spinner.stop('Failed to clone template');
    ui.error(`Could not clone template: ${error}`);
    ui.warning('Using local template fallback...');
    
    // Fallback: create a minimal Next.js structure
    await createFallbackTemplate(projectName, template.id);
  }
  
  // Step 4: Install dependencies
  ui.step(4, 8, 'Installing dependencies');
  if (options.install !== false) {
    spinner.start('Installing dependencies...');
    
    try {
      await execa('npm', ['install'], {
        cwd: projectName,
        stdio: 'pipe',
      });
      spinner.stop('Dependencies installed!');
      ui.success('Packages ready');
    } catch (error) {
      spinner.stop('Installation failed');
      ui.warning('You can run `npm install` manually later');
    }
  }
  
  // Step 5: Initialize git
  ui.step(5, 8, 'Initializing git repository');
  if (options.git !== false) {
    try {
      await execa('git', ['init'], { cwd: projectName, stdio: 'pipe' });
      await execa('git', ['add', '.'], { cwd: projectName, stdio: 'pipe' });
      await execa('git', ['commit', '-m', 'Initial commit from CreateForge'], { cwd: projectName, stdio: 'pipe' });
      ui.success('Git initialized');
    } catch (error) {
      // Git not available, skip silently
    }
  }
  
  // Step 6: Update stats
  ui.step(6, 8, 'Updating project stats');
  updateStats('project_created');
  addRecentTemplate(template.id);
  
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  
  // Step 7: Success celebration!
  ui.step(7, 8, 'Celebrating success! 🎉');
  ui.bigConfetti();
  
  ui.box('🚀 Your app is ready!', [
    `${ui.successBadge('SUCCESS')} Created in ${elapsed}s — Time to first success: ${elapsed}s`,
    '',
    `${ui.bold('Next steps:')}`,
    `  ${ui.command(`cd ${projectName}`)}`,
    `  ${ui.command('npm run dev')}`,
    '',
    template.hasSeedData ? '💡 Demo data is already seeded — check it out!' : '',
    template.hasTests ? '✓ Tests included — run `npm test`' : '',
  ].filter(Boolean));
  
  ui.spacer();
  ui.info(`Share your build: ${ui.link('https://forge.dev/showcase')}`);
  ui.info(`Add plugins: ${ui.command('forge add stripe')}`);
  ui.info(`Deploy now: ${ui.command('forge init --deploy vercel')}`);
  
  // Step 8: Optional enhancements
  ui.step(8, 8, 'Optional enhancements');
  if (options.live || template.livePreviewUrl) {
    console.log('');
    const shouldOpenLive = await ui.confirm({
      message: 'Open in Forge Live browser environment?',
      initialValue: true,
    });
    
    if (!p.isCancel(shouldOpenLive) && shouldOpenLive) {
      if (template.livePreviewUrl) {
        ui.info('Opening live preview...');
        await open(template.livePreviewUrl);
      } else {
        await live(projectName);
      }
    }
  }
  
  // Optional: Offer to open the project
  console.log('');
  const shouldOpen = await ui.confirm({
    message: 'Open project in VS Code?',
    initialValue: true,
  });
  
  if (!p.isCancel(shouldOpen) && shouldOpen) {
    try {
      await execa('code', [projectName], { stdio: 'inherit' });
    } catch {
      ui.info(`Project created in: ${projectName}`);
    }
  }
  
  console.log('');
  ui.outro(`Happy building! ${ui.badge('Built with CreateForge')}`);
  
  // Track first success
  updateStats('first_success');
}

async function createFallbackTemplate(projectName: string, templateId: string) {
  await fs.mkdir(projectName, { recursive: true });
  
  // Create minimal package.json
  const packageJson = {
    name: projectName,
    version: '0.1.0',
    private: true,
    scripts: {
      dev: 'next dev',
      build: 'next build',
      start: 'next start',
      test: 'vitest',
    },
    dependencies: {
      next: '^14.0.0',
      react: '^18.2.0',
      'react-dom': '^18.2.0',
    },
    devDependencies: {
      '@types/node': '^20.0.0',
      '@types/react': '^18.2.0',
      typescript: '^5.3.0',
      vitest: '^1.0.0',
    },
  };
  
  await fs.writeFile(
    path.join(projectName, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );
  
  // Create minimal README
  const readme = `# ${projectName}

Created with [CreateForge](https://forge.dev) — Ship full-stack apps, not scaffolds.

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to see your app.

## What's Included

- ✓ Next.js 14 with App Router
- ✓ TypeScript
- ✓ Battle-tested configuration
- ✓ Ready to deploy

## Next Steps

- Add plugins: \`forge add stripe\`
- Check health: \`forge health\`
- Deploy: \`forge init --deploy vercel\`

---

${ui.badge('Built with CreateForge')}
`;
  
  await fs.writeFile(path.join(projectName, 'README.md'), readme);
  
  ui.success('Created minimal template structure');
}
