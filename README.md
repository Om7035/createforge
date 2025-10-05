# CreateForge

> **Ship full-stack apps, not scaffolds** — From idea to deployed product in minutes.

[![npm version](https://badge.fury.io/js/createforge.svg)](https://www.npmjs.com/package/createforge)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Why Developers Love CreateForge

Most scaffolding tools give you a skeleton. **CreateForge gives you a living, breathing app** — battle-tested, production-ready, and delightful to work with.

### ⚡ Instant Competence
```bash
npx createforge my-saas
# ✨ Live app in < 5 minutes
# ✓ Tests passing
# ✓ Demo data seeded
# ✓ Ready to deploy
```

**Time to first success: < 10 minutes** (we measure this obsessively)

### 🎯 Signature Features

#### 🌐 Forge Live — Zero-Setup Browser Dev
Spawn a fully running instance in your browser. Edit code, see live preview, share with teammates — **zero local setup**.

```bash
forge create --live
# Opens instant browser environment
# Share link: https://live.forge.dev/your-app
```

#### 🤖 Forge Copilot — Natural Language Builder
Build by talking. Upgrade by asking.

```bash
forge copilot "Add Stripe payments with a pricing table"
# ✓ Installs Stripe
# ✓ Creates pricing components
# ✓ Adds checkout flow
# ✓ Includes test data
```

#### 🔍 Forge Health — One-Dashboard Maintenance
Never worry about outdated dependencies or security issues.

```bash
forge health
# Checks: dependencies, security, tests, config
# One-click PR for upgrades
```

#### ⚔️ Battle-Tested Templates
Every template passes automated quality gates:
- ✓ Unit & integration tests
- ✓ CI/CD configured
- ✓ Security scanned
- ✓ Production deployed

No toy projects. Only production-grade code.

#### 🎨 Forge Seeds — Realistic Demo Data
Every template includes multiple scenarios:
- Trial user flow
- Paid customer journey
- Payment failures
- Edge cases

**Demo like it's real** — because it is.

#### 🔌 Plugin Ecosystem with Incentives
```bash
forge add stripe      # Payments
forge add clerk       # Auth
forge add supabase    # Database
forge add openai      # AI
```

Plugins are npm packages. Marketplace shows installs, ratings, and **revenue-share for creators**.

#### 🚀 Zero-Friction GitHub Integration
```bash
forge init
# ✓ Creates GitHub repo
# ✓ Sets up CI/CD
# ✓ Enables Dependabot
# ✓ Configures secrets
# ✓ Creates starter issues
```

One command. Everything configured.

#### 🎯 PR Preview Environments
Every PR gets a live preview with seeded data. Reviewers can **play with the real app**.

#### 📊 Personal Profile & Presets
```bash
forge profile --edit
# Save favorite stack
# Set code style
# Define team policies
```

Your generator. Your way.

## Quick Start

### Create Your First App

```bash
# Interactive mode
npx createforge

# Or specify everything
npx createforge my-app --template nextjs-saas --live

# Navigate and run
cd my-app
npm run dev
```

### The Love Journey (0 to Evangelist)

**Minute 0-5:** Run `npx createforge` → instant live demo  
**Minute 5-20:** Edit in browser or VS Code → first deploy (confetti 🎉)  
**Hour 1:** Add Stripe → payments work with test data  
**Day 1-7:** Share demo, get feedback, install community plugin  
**Week 2-4:** Contribute plugin/template → earn recognition

## Available Templates

### 🌟 Featured

| Template | Description | Stack |
|----------|-------------|-------|
| **nextjs-saas** | Production SaaS with auth, payments, dashboard | Next.js 14, TypeScript, Tailwind, Stripe, Clerk |
| **ai-rag** | RAG chat with vector search | Next.js, OpenAI, Pinecone, LangChain |
| **ecommerce** | Full store with cart, checkout, admin | Next.js, Stripe, Shopify, Tailwind |

All templates include:
- ✓ TypeScript
- ✓ Tests (Vitest)
- ✓ CI/CD (GitHub Actions)
- ✓ Demo data
- ✓ Production config

## Commands

### Core

```bash
# Create new app
forge create [name] [--template <id>] [--live]

# Open in browser environment
forge live [path]

# Add plugin
forge add <plugin>

# Check project health
forge health [--fix]

# Setup GitHub & deployment
forge init [--deploy <platform>]

# Manage profile
forge profile [--edit]
```

### Plugin System

```bash
# Install plugin
forge add stripe

# List available plugins
forge plugins

# Create your own
forge plugin create my-plugin
```

## What Makes It Different

| Feature | Other Tools | CreateForge |
|---------|-------------|-------------|
| Time to first success | 30-60 min | **< 10 min** |
| Production ready | ❌ Skeleton only | ✅ Battle-tested |
| Live browser preview | ❌ | ✅ Forge Live |
| Demo data included | ❌ | ✅ Multiple scenarios |
| One-click deployment | ❌ | ✅ GitHub + Vercel |
| Plugin marketplace | ❌ | ✅ With revenue share |
| Health monitoring | ❌ | ✅ Auto PR for fixes |
| Tests included | ❌ | ✅ All templates |

## Metrics We Track (To Prove Love)

- **Time-to-first-success (TFS):** Target ≤ 10 minutes
- **1-week retention:** Target > 30%
- **Template-to-deploy conversion:** % who generate → deploy
- **Contributor activation:** New plugin authors per month
- **NPS:** Net Promoter Score from onboarding

## Community & Growth

### Contribute

- 🎯 [Good First Issues](https://github.com/createforge/createforge/labels/good%20first%20issue)
- 🏆 [Template Showcase](https://forge.dev/showcase)
- 💰 [Plugin Marketplace](https://forge.dev/plugins)

### Monthly Contests

Best template wins sponsorship. Submit yours!

### Workshops & Tutorials

Live sessions where you build and ship in one hour.

## Roadmap (First 90 Days)

- [x] **Week 0-2:** CLI core + 2 battle-tested templates
- [x] **Week 2-4:** Forge Live + GitHub init + Vercel deploy
- [ ] **Week 4-6:** Forge Seeds + PR previews
- [ ] **Week 6-10:** Forge Health + auto-upgrade PRs
- [ ] **Week 10-12:** Plugin marketplace + 10 curated templates

## Philosophy

We design every feature to trigger one or more of these emotions:

1. **Instant competence** — Feel capable immediately
2. **Trust & reliability** — It just works in production
3. **Control & craftsmanship** — Power users can fine-tune
4. **Delight & identity** — Proud to show what you built
5. **Community & reciprocity** — Contributing returns value

## Installation

```bash
# Use directly with npx (recommended)
npx createforge

# Or install globally
npm install -g createforge
forge create my-app
```

## Requirements

- Node.js 18+
- npm or yarn
- Git

## Examples

### Create SaaS with Stripe

```bash
forge create my-saas --template nextjs-saas
cd my-saas
forge add stripe
forge init --deploy vercel
```

### Create AI Chat App

```bash
forge create ai-chat --template ai-rag
cd ai-chat
forge add openai
forge live  # Test in browser
```

### Add Multiple Plugins

```bash
forge create my-app
cd my-app
forge add clerk      # Auth
forge add supabase   # Database
forge add analytics  # Tracking
```

## Configuration

CreateForge saves your preferences in `~/.config/createforge/`:

```json
{
  "profile": {
    "name": "Your Name",
    "favoriteStack": ["nextjs", "typescript", "tailwind"],
    "codeStyle": "standard"
  },
  "templates": {
    "favorites": ["nextjs-saas"],
    "recent": ["nextjs-saas", "ai-rag"]
  }
}
```

## Privacy & Telemetry

We collect **minimal, opt-in telemetry** to improve UX:
- Template popularity
- Time-to-first-success
- Error rates

**Always opt-in. Always transparent.**

```bash
# Disable telemetry
forge telemetry --disable
```

## Built With CreateForge Badge

Show off what you built:

```markdown
[![Built with CreateForge](https://img.shields.io/badge/Built%20with-CreateForge-blueviolet)](https://forge.dev)
```

## Support

- 📖 [Documentation](https://forge.dev/docs)
- 💬 [Discord Community](https://discord.gg/createforge)
- 🐛 [Issue Tracker](https://github.com/createforge/createforge/issues)
- 🎓 [Tutorials](https://forge.dev/tutorials)

## License

MIT © CreateForge

---

<div align="center">

**Ship full-stack apps, not scaffolds.**

[Get Started](https://forge.dev) • [Templates](https://forge.dev/templates) • [Plugins](https://forge.dev/plugins) • [Showcase](https://forge.dev/showcase)

Made with ❤️ by developers, for developers

</div>
