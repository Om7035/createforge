import { execa } from 'execa';
import fs from 'fs/promises';
import path from 'path';
import { ui } from '../utils/ui.js';
import { getPlugin, ForgePlugin } from '../plugins/index.js';

export async function addPlugin(pluginId: string) {
  ui.intro(`Adding ${pluginId} to your project`);
  
  const plugin = await getPlugin(pluginId);
  
  if (!plugin) {
    ui.error(`Plugin "${pluginId}" not found`);
    ui.info('Built-in plugins: stripe, clerk, supabase, openai, analytics');
    ui.info('Community plugins: coming soon!');
    process.exit(1);
  }
  
  ui.info(`Installing ${ui.badge(plugin.name)}`);
  ui.info(plugin.description);
  
  // Install packages
  const spinner = ui.spinner();
  spinner.start(`Installing ${plugin.packages.join(', ')}...`);
  
  try {
    await execa('npm', ['install', ...plugin.packages], {
      stdio: 'pipe',
    });
    spinner.stop('Packages installed!');
    ui.success(`Installed ${plugin.packages.length} package(s)`);
  } catch (error) {
    spinner.stop('Installation failed');
    ui.error('Failed to install packages');
    process.exit(1);
  }
  
  // Create/update .env.local
  if (plugin.envVars.length > 0) {
    console.log('');
    ui.info('Environment variables needed:');
    
    const envPath = '.env.local';
    let envContent = '';
    
    try {
      envContent = await fs.readFile(envPath, 'utf-8');
    } catch {
      // File doesn't exist, will create it
    }
    
    const newVars: string[] = [];
    
    for (const envVar of plugin.envVars) {
      if (!envContent.includes(envVar.key)) {
        newVars.push(`${envVar.key}=# ${envVar.description}`);
        console.log(`  ${ui.code(envVar.key)} - ${envVar.description}`);
      }
    }
    
    if (newVars.length > 0) {
      const updated = envContent + '\n' + newVars.join('\n') + '\n';
      await fs.writeFile(envPath, updated);
      ui.success(`Added ${newVars.length} environment variable(s) to .env.local`);
    }
  }
  
  // Create plugin files if specified
  if (plugin.files && plugin.files.length > 0) {
    spinner.start('Creating plugin files...');
    
    try {
      for (const file of plugin.files) {
        // Create directory if it doesn't exist
        const dir = path.dirname(file.path);
        await fs.mkdir(dir, { recursive: true });
        
        // Check if file exists and overwrite is not allowed
        if (!file.overwrite) {
          try {
            await fs.access(file.path);
            // File exists, skip
            continue;
          } catch {
            // File doesn't exist, continue
          }
        }
        
        // Write file
        await fs.writeFile(file.path, file.content);
      }
      
      spinner.stop('Plugin files created!');
      ui.success(`Created ${plugin.files.length} file(s)`);
    } catch (error) {
      spinner.stop('Failed to create files');
      ui.warning(`Could not create all plugin files: ${error}`);
    }
  }
  
  // Run custom setup if available
  if (plugin.setup) {
    spinner.start('Running setup...');
    try {
      await plugin.setup();
      spinner.stop('Setup complete!');
    } catch (error) {
      spinner.stop('Setup failed');
      ui.warning(`Plugin setup failed: ${error}`);
    }
  }
  
  console.log('');
  ui.confetti();
  
  ui.box(`✓ ${plugin.name} installed!`, [
    'Next steps:',
    plugin.envVars.length > 0 ? '  1. Add your API keys to .env.local' : '',
    '  2. Check the docs for usage examples',
    '  3. Run `npm run dev` to test',
  ].filter(Boolean));
  
  console.log('');
  ui.outro('Plugin ready to use! 🎉');
}
