# Contributing to CreateForge

Thank you for your interest in contributing! We're building a tool developers love, and your help makes that possible.

## Ways to Contribute

1. **Create Templates** — Share your battle-tested stacks
2. **Build Plugins** — Extend CreateForge with new integrations
3. **Improve Docs** — Help others get started faster
4. **Report Bugs** — Help us improve quality
5. **Suggest Features** — Share your ideas

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Setup

```bash
# Clone the repo
git clone https://github.com/createforge/createforge.git
cd createforge

# Install dependencies
npm install

# Build the CLI
npm run build

# Test locally
npm link
forge create test-app
```

## Creating a Template

Templates are the heart of CreateForge. Here's how to create one:

### Template Requirements

Every template must:
- ✅ Include `package.json` with all dependencies
- ✅ Have a comprehensive `README.md`
- ✅ Include tests (Vitest or Jest)
- ✅ Pass TypeScript type checking
- ✅ Include demo/seed data
- ✅ Have GitHub Actions CI/CD configured
- ✅ Follow the project structure conventions

### Template Structure

```
your-template/
├── package.json          # Dependencies and scripts
├── README.md             # Template documentation
├── .env.example          # Environment variables template
├── tsconfig.json         # TypeScript config
├── vitest.config.ts      # Test config
├── scripts/
│   └── seed.ts          # Demo data seeding
├── tests/               # Test files
│   ├── setup.ts
│   └── *.test.ts
├── .github/
│   └── workflows/
│       └── ci.yml       # CI/CD pipeline
└── [your app structure]
```

### Template Checklist

Before submitting:

- [ ] All dependencies listed in `package.json`
- [ ] `npm install` works without errors
- [ ] `npm test` passes all tests
- [ ] `npm run build` succeeds
- [ ] Demo data seeds successfully
- [ ] README includes:
  - [ ] Quick start guide
  - [ ] Feature list
  - [ ] Demo scenarios
  - [ ] Deployment instructions
- [ ] `.env.example` with all required variables
- [ ] GitHub Actions workflow configured
- [ ] No hardcoded secrets or API keys

### Submitting a Template

1. Create your template in `templates/your-template-name/`
2. Add it to `src/utils/templates.ts`:

```typescript
{
  id: 'your-template',
  name: 'Your Template Name',
  description: 'Brief description',
  tags: ['nextjs', 'typescript', 'etc'],
  repo: 'createforge/template-your-template',
  featured: false,
  battleTested: true,
  hasTests: true,
  hasSeedData: true,
}
```

3. Test it:

```bash
forge create test-app --template your-template
cd test-app
npm install
npm test
npm run dev
```

4. Submit a PR with:
   - Template code
   - Updated `templates.ts`
   - Screenshots/demo GIF
   - Description of what it includes

## Creating a Plugin

Plugins extend CreateForge functionality. They're npm packages that follow conventions.

### Plugin Structure

```typescript
// package.json
{
  "name": "@createforge/plugin-your-plugin",
  "version": "1.0.0",
  "keywords": ["createforge-plugin"],
  "forge": {
    "type": "plugin",
    "category": "auth|payments|database|ai|analytics|etc"
  }
}
```

### Plugin API

```typescript
// index.ts
export interface ForgePlugin {
  name: string;
  description: string;
  packages: string[];
  envVars: { key: string; description: string }[];
  setup?: () => Promise<void>;
  files?: { path: string; content: string }[];
}

export default {
  name: 'Your Plugin',
  description: 'What it does',
  packages: ['package-to-install'],
  envVars: [
    { key: 'API_KEY', description: 'Your API key' }
  ],
  setup: async () => {
    // Custom setup logic
  },
} as ForgePlugin;
```

### Plugin Guidelines

- Keep it focused (one integration, one purpose)
- Include clear documentation
- Provide demo/test data if applicable
- Handle errors gracefully
- Don't require manual steps (automate everything)

## Improving Documentation

Good docs make developers happy. Help us improve:

- Fix typos and unclear explanations
- Add examples and use cases
- Create tutorials and guides
- Improve error messages
- Add JSDoc comments to code

## Reporting Bugs

Found a bug? Help us fix it:

1. Check if it's already reported
2. Create a new issue with:
   - Clear title
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment (OS, Node version, etc.)
   - Screenshots if applicable

## Suggesting Features

Have an idea? We'd love to hear it:

1. Check existing issues/discussions
2. Create a new discussion or issue
3. Explain:
   - The problem it solves
   - How it makes devs love CreateForge
   - Example usage
   - Alternatives considered

## Code Style

We use:
- **TypeScript** for type safety
- **ESLint** for linting
- **Prettier** for formatting

Run before committing:

```bash
npm run lint
npm run type-check
npm test
```

## Commit Messages

Follow conventional commits:

```
feat: add Supabase plugin
fix: resolve template cloning issue
docs: update contributing guide
test: add tests for health command
chore: update dependencies
```

## Pull Request Process

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/amazing-feature`
3. Make your changes
4. Add tests if applicable
5. Run tests: `npm test`
6. Commit: `git commit -m 'feat: add amazing feature'`
7. Push: `git push origin feat/amazing-feature`
8. Open a PR with:
   - Clear description
   - Screenshots/demo if applicable
   - Link to related issue

## Review Process

We aim to review PRs within 48 hours. We look for:

- Code quality and style
- Test coverage
- Documentation
- Breaking changes (avoid if possible)
- Performance impact

## Community Guidelines

- Be respectful and inclusive
- Help others learn and grow
- Give constructive feedback
- Celebrate contributions
- Have fun building!

## Recognition

Contributors get:

- 🏆 Listed in `CONTRIBUTORS.md`
- 🎖️ Badges on their profile
- 📊 Stats on the leaderboard
- 💰 Revenue share for paid plugins
- 🎁 Swag for significant contributions

## Questions?

- 💬 Join our [Discord](https://discord.gg/createforge)
- 📧 Email: hello@forge.dev
- 🐦 Twitter: [@createforge](https://twitter.com/createforge)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for making CreateForge better!** 🎉

Every contribution, no matter how small, helps developers ship faster and love their tools more.
