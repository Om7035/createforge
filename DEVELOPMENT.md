# CreateForge Development Guide

This guide covers the technical architecture and development workflow for CreateForge.

## Architecture Overview

```
createforge/
├── src/                    # CLI source code
│   ├── cli.ts             # Main CLI entry point
│   ├── commands/          # Command implementations
│   │   ├── create.ts      # Project creation
│   │   ├── live.ts        # Forge Live integration
│   │   ├── add.ts         # Plugin installation
│   │   ├── health.ts      # Health checks
│   │   ├── init.ts        # GitHub/deployment setup
│   │   └── profile.ts     # User profile management
│   └── utils/             # Shared utilities
│       ├── ui.ts          # UI components (clack)
│       ├── config.ts      # User configuration
│       └── templates.ts   # Template registry
├── templates/             # Template repositories
│   ├── nextjs-saas/      # Next.js SaaS starter
│   ├── ai-rag/           # AI RAG chat app
│   └── [more templates]
└── dist/                  # Compiled output
```

## Core Principles

### 1. Instant Success (< 10 minutes)
Every feature optimizes for time-to-first-success:
- Parallel operations where possible
- Smart defaults, minimal questions
- Pre-configured everything
- Demo data ready to go

### 2. Delightful UX
Small touches that make developers smile:
- Confetti on success
- Progress indicators
- Helpful error messages
- Smart suggestions

### 3. Battle-Tested Quality
No shortcuts on quality:
- All templates have tests
- CI/CD configured by default
- Security scanned
- Actually deployed to production

### 4. Extensibility
Plugin system for community contributions:
- Simple plugin API
- Marketplace integration
- Revenue sharing
- Recognition system

## Development Workflow

### Setup

```bash
# Clone and install
git clone https://github.com/createforge/createforge.git
cd createforge
npm install

# Build
npm run build

# Link for local testing
npm link

# Test the CLI
forge create test-app
```

### Development Mode

```bash
# Watch mode (auto-rebuild on changes)
npm run dev

# In another terminal, test commands
forge create my-test-app
```

### Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

## Adding a New Command

1. Create command file in `src/commands/`:

```typescript
// src/commands/mycommand.ts
import { ui } from '../utils/ui.js';

export async function myCommand(options: MyOptions = {}) {
  ui.intro('My Command');
  
  // Implementation
  
  ui.outro('Done!');
}
```

2. Register in `src/cli.ts`:

```typescript
program
  .command('mycommand')
  .description('Description of my command')
  .option('--flag', 'Flag description')
  .action(myCommand);
```

3. Add tests in `tests/commands/mycommand.test.ts`

## Creating a Template

### Template Requirements

Every template must be production-ready:

1. **Dependencies**: All packages in `package.json`
2. **Tests**: Unit + integration tests passing
3. **Type Safety**: TypeScript with strict mode
4. **Seed Data**: Realistic demo scenarios
5. **CI/CD**: GitHub Actions configured
6. **Documentation**: Comprehensive README
7. **Environment**: `.env.example` with all vars

### Template Structure

```
template-name/
├── package.json
├── README.md
├── .env.example
├── tsconfig.json
├── next.config.js          # For Next.js
├── tailwind.config.ts
├── vitest.config.ts
├── playwright.config.ts
├── app/                    # Next.js app directory
│   ├── (auth)/
│   ├── (dashboard)/
│   └── api/
├── components/
│   ├── ui/                # shadcn/ui components
│   └── [features]/
├── lib/
│   ├── db.ts
│   ├── auth.ts
│   └── utils.ts
├── prisma/
│   └── schema.prisma
├── scripts/
│   └── seed.ts            # Demo data
├── tests/
│   ├── setup.ts
│   ├── unit/
│   └── e2e/
└── .github/
    └── workflows/
        └── ci.yml
```

### Seed Data Best Practices

Create multiple realistic scenarios:

```typescript
// scripts/seed.ts
async function seed() {
  // Scenario 1: Happy path
  await createUser({
    email: 'success@example.com',
    status: 'active',
    plan: 'pro',
  });
  
  // Scenario 2: Edge case
  await createUser({
    email: 'trial@example.com',
    status: 'trialing',
    trialEndsAt: futureDate(14),
  });
  
  // Scenario 3: Error state
  await createUser({
    email: 'failed@example.com',
    status: 'past_due',
    paymentFailed: true,
  });
}
```

### Template Testing

```bash
# Test template creation
forge create test-app --template your-template

# Verify
cd test-app
npm install
npm test
npm run build
npm run dev
```

## Plugin System

### Plugin Interface

```typescript
export interface ForgePlugin {
  id: string;
  name: string;
  description: string;
  packages: string[];
  envVars: EnvVar[];
  files?: PluginFile[];
  setup?: () => Promise<void>;
}

interface EnvVar {
  key: string;
  description: string;
  required?: boolean;
  default?: string;
}

interface PluginFile {
  path: string;
  content: string;
  overwrite?: boolean;
}
```

### Creating a Plugin

```typescript
// plugins/my-plugin/index.ts
import type { ForgePlugin } from '@createforge/types';

export default {
  id: 'my-plugin',
  name: 'My Plugin',
  description: 'Adds amazing functionality',
  packages: ['my-package'],
  envVars: [
    {
      key: 'MY_API_KEY',
      description: 'Your API key from my-service.com',
      required: true,
    },
  ],
  files: [
    {
      path: 'lib/my-plugin.ts',
      content: `
        export function myPlugin() {
          // Plugin code
        }
      `,
    },
  ],
  setup: async () => {
    // Custom setup logic
    console.log('Setting up My Plugin...');
  },
} as ForgePlugin;
```

### Plugin Installation Flow

1. User runs: `forge add my-plugin`
2. CLI installs npm packages
3. CLI adds env vars to `.env.local`
4. CLI creates plugin files
5. CLI runs custom setup
6. Success message with next steps

## UI Components

We use `@clack/prompts` for beautiful CLI UX:

```typescript
import * as p from '@clack/prompts';
import { ui } from '../utils/ui.js';

// Intro/outro
ui.intro('Command Name');
ui.outro('Success!');

// Text input
const name = await ui.text({
  message: 'What is your name?',
  placeholder: 'John Doe',
  validate: (value) => {
    if (!value) return 'Name is required';
  },
});

// Select
const choice = await ui.select({
  message: 'Pick one',
  options: [
    { value: 'a', label: 'Option A', hint: 'Hint text' },
    { value: 'b', label: 'Option B' },
  ],
});

// Multi-select
const choices = await ui.multiselect({
  message: 'Pick multiple',
  options: [...],
});

// Confirm
const confirmed = await ui.confirm({
  message: 'Are you sure?',
  initialValue: true,
});

// Spinner
const spinner = ui.spinner();
spinner.start('Loading...');
// ... do work ...
spinner.stop('Done!');

// Messages
ui.success('Success message');
ui.error('Error message');
ui.warning('Warning message');
ui.info('Info message');

// Special
ui.confetti();  // 🎉
ui.box('Title', ['Line 1', 'Line 2']);
```

## Configuration System

User config stored in `~/.config/createforge/config.json`:

```typescript
import { config } from '../utils/config.js';

// Get values
const profile = config.get('profile');
const stats = config.get('stats');

// Set values
config.set('profile.name', 'John Doe');
config.set('templates.favorites', ['nextjs-saas']);

// Update stats
updateStats('project_created');
updateStats('first_success');

// Template history
addRecentTemplate('nextjs-saas');
```

## Error Handling

Always handle errors gracefully:

```typescript
try {
  await riskyOperation();
} catch (error) {
  ui.error('Something went wrong');
  ui.info('Try: npm install');
  process.exit(1);
}
```

## Performance Optimization

### Parallel Operations

```typescript
// Bad: Sequential
await installPackages();
await setupGit();
await seedData();

// Good: Parallel
await Promise.all([
  installPackages(),
  setupGit(),
  seedData(),
]);
```

### Smart Caching

```typescript
// Cache template list
const templates = await fetchTemplates({ cache: true });

// Degit caching
const emitter = degit(repo, { cache: true });
```

## Metrics & Analytics

Track key metrics (opt-in only):

```typescript
import { track } from '../utils/analytics.js';

// Track events
track('project_created', {
  template: 'nextjs-saas',
  duration: elapsed,
});

track('first_success', {
  time: elapsed,
});

track('plugin_added', {
  plugin: 'stripe',
});
```

## Release Process

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Run tests: `npm test`
4. Build: `npm run build`
5. Commit: `git commit -m "chore: release v0.2.0"`
6. Tag: `git tag v0.2.0`
7. Push: `git push && git push --tags`
8. Publish: `npm publish`

## Debugging

```bash
# Enable debug logs
DEBUG=forge:* forge create my-app

# Test specific command
node dist/cli.js create test-app --template nextjs-saas

# Check config
cat ~/.config/createforge/config.json
```

## Best Practices

### 1. User Experience
- Show progress for long operations
- Provide helpful error messages
- Offer suggestions for fixes
- Celebrate successes

### 2. Code Quality
- Write tests for new features
- Use TypeScript strictly
- Document complex logic
- Keep functions small and focused

### 3. Performance
- Parallelize independent operations
- Cache when appropriate
- Minimize network requests
- Stream large outputs

### 4. Security
- Never commit secrets
- Validate user input
- Use environment variables
- Scan dependencies

## Resources

- [Commander.js](https://github.com/tj/commander.js) - CLI framework
- [Clack](https://github.com/natemoo-re/clack) - Beautiful prompts
- [Degit](https://github.com/Rich-Harris/degit) - Template cloning
- [Execa](https://github.com/sindresorhus/execa) - Process execution
- [Conf](https://github.com/sindresorhus/conf) - Config management

## Questions?

- 💬 Discord: https://discord.gg/createforge
- 📧 Email: dev@forge.dev
- 📖 Docs: https://forge.dev/docs

---

Happy building! 🚀
