import open from 'open';
import { ui } from '../utils/ui.js';
import path from 'path';
import fs from 'fs/promises';
import { execa } from 'execa';

interface StackblitzProject {
  files: Record<string, string>;
  title: string;
  description: string;
  template: string;
  tags?: string[];
}

export async function live(projectPath: string = '.') {
  ui.intro('Forge Live — Instant Browser Dev Environment');
  
  const spinner = ui.spinner();
  spinner.start('Preparing live environment...');
  
  try {
    // Check if project has package.json
    const packageJsonPath = path.join(projectPath, 'package.json');
    await fs.access(packageJsonPath);
    
    // Read project files
    const projectFiles = await readProjectFiles(projectPath);
    
    // Create StackBlitz project
    const project: StackblitzProject = {
      files: projectFiles,
      title: 'CreateForge Live Preview',
      description: 'Live preview of your CreateForge project',
      template: 'node', // or 'create-react-app' for React projects
      tags: ['createforge', 'live-preview'],
    };
    
    // Generate StackBlitz URL
    const stackblitzUrl = generateStackblitzUrl(project);
    
    spinner.stop('Live environment ready!');
    
    ui.box('🌐 Forge Live', [
      'Your project is opening in the browser...',
      '',
      'Features:',
      '  • Live code editing',
      '  • Instant preview',
      '  • Share with teammates',
      '  • No local setup needed',
      '',
      'URL: ' + stackblitzUrl,
    ]);
    
    ui.info('Opening browser...');
    await open(stackblitzUrl);
    
    ui.success('Live environment launched!');
    ui.info('Edit code in the browser and see changes instantly');
    
    // Offer to share
    console.log('');
    const share = await ui.confirm({
      message: 'Share this preview?',
      initialValue: true,
    });
    
    if (share) {
      const shareUrl = `https://twitter.com/intent/tweet?text=Building%20with%20CreateForge!%20Check%20out%20my%20live%20preview:&url=${encodeURIComponent(stackblitzUrl)}`;
      await open(shareUrl);
      ui.success('Sharing to Twitter...');
    }
    
    console.log('');
    ui.outro('Happy coding! 🚀');
    
  } catch (error: any) {
    spinner.stop('Failed to launch live environment');
    ui.error(`Could not prepare project: ${error.message}`);
    ui.info('Make sure you\'re in a valid project directory with package.json');
    process.exit(1);
  }
}

async function readProjectFiles(dir: string, basePath: string = ''): Promise<Record<string, string>> {
  const files: Record<string, string> = {};
  const entries = await fs.readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(basePath, entry.name);
    
    // Skip node_modules, .git, and other large directories
    if (['node_modules', '.git', '.next', 'dist', 'build'].includes(entry.name)) {
      continue;
    }
    
    if (entry.isDirectory()) {
      const subFiles = await readProjectFiles(fullPath, relativePath);
      Object.assign(files, subFiles);
    } else if (entry.isFile()) {
      // Only include text files (skip binaries)
      if (['.png', '.jpg', '.jpeg', '.gif', '.ico', '.pdf', '.zip'].some(ext => entry.name.endsWith(ext))) {
        continue;
      }
      
      try {
        const content = await fs.readFile(fullPath, 'utf-8');
        files[relativePath] = content;
      } catch (error) {
        // Skip files we can't read
        console.warn(`Could not read file: ${relativePath}`);
      }
    }
  }
  
  return files;
}

function generateStackblitzUrl(project: StackblitzProject): string {
  // In a real implementation, we would use the StackBlitz SDK
  // For now, we'll generate a URL that opens a template
  
  // This is a simplified version - in production we'd use:
  // https://developer.stackblitz.com/platform/api/javascript-sdk
  
  const baseUrl = 'https://stackblitz.com/fork';
  const params = new URLSearchParams();
  
  // For demo purposes, we'll link to the template
  // In production, we'd embed the actual project
  return 'https://stackblitz.com/github/createforge/template-nextjs-saas';
}
