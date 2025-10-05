import * as p from '@clack/prompts';
import { ui } from '../utils/ui.js';
import { config, getFavoriteStack, setFavoriteStack } from '../utils/config.js';

export async function showProfile(options: { edit?: boolean } = {}) {
  ui.intro('Forge Profile');
  
  const currentConfig = config.store;
  const profile = currentConfig.profile;
  const stats = currentConfig.stats;
  const templates = currentConfig.templates;
  
  if (options.edit) {
    await editProfile();
    return;
  }
  
  // Display profile
  ui.box('Your Profile', [
    `Name: ${profile.name || 'Not set'}`,
    `Projects created: ${stats.projectsCreated}`,
    stats.firstSuccess ? `First success: ${new Date(stats.firstSuccess).toLocaleDateString()}` : '',
    '',
    'Favorite Stack:',
    ...(profile.favoriteStack && profile.favoriteStack.length > 0
      ? profile.favoriteStack.map((s: string) => `  • ${s}`)
      : ['  (not set)']),
    '',
    'Recent Templates:',
    ...(templates.recent.length > 0
      ? templates.recent.map((t: string) => `  • ${t}`)
      : ['  (none)']),
  ].filter(Boolean));
  
  console.log('');
  ui.info('Edit your profile: `forge profile --edit`');
  ui.outro('Keep building! 🚀');
}

async function editProfile() {
  ui.intro('Edit Profile');
  
  const currentConfig = config.store;
  const currentProfile = currentConfig.profile;
  
  // Edit name
  const name = await ui.text({
    message: 'Your name (optional)',
    placeholder: currentProfile.name || 'Developer',
    initialValue: currentProfile.name,
  });
  
  if (!p.isCancel(name)) {
    config.set({
      ...currentConfig,
      profile: {
        ...currentProfile,
        name: name as string
      }
    });
  }
  
  // Edit favorite stack
  const stackOptions = [
    { value: 'nextjs', label: 'Next.js' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'tailwind', label: 'Tailwind CSS' },
    { value: 'stripe', label: 'Stripe' },
    { value: 'clerk', label: 'Clerk Auth' },
    { value: 'supabase', label: 'Supabase' },
    { value: 'openai', label: 'OpenAI' },
    { value: 'vercel', label: 'Vercel' },
  ];
  
  const stack = await ui.multiselect({
    message: 'Select your favorite stack',
    options: stackOptions,
    initialValues: currentProfile.favoriteStack,
  });
  
  if (!p.isCancel(stack)) {
    setFavoriteStack(stack as string[]);
  }
  
  // Edit code style
  const codeStyle = await ui.select({
    message: 'Preferred code style',
    options: [
      { value: 'standard', label: 'Standard' },
      { value: 'airbnb', label: 'Airbnb' },
      { value: 'google', label: 'Google' },
      { value: 'custom', label: 'Custom' },
    ],
    initialValue: currentProfile.codeStyle || 'standard',
  });
  
  if (!p.isCancel(codeStyle)) {
    const updatedConfig = config.store;
    config.set({
      ...updatedConfig,
      profile: {
        ...updatedConfig.profile,
        codeStyle: codeStyle as string
      }
    });
  }
  
  ui.success('Profile updated!');
  ui.outro('Your preferences will be used for new projects');
}
