# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-10-06

### Added
- Initial release of CreateForge CLI
- `create` command to scaffold new projects from templates
- `add` command to install plugins (Stripe, Clerk, Supabase, OpenAI, Analytics)
- `live` command to open projects in browser environment
- `health` command to check project health
- `init` command to initialize GitHub repo and deployment
- `profile` command to manage user preferences
- Built-in templates:
  - nextjs-saas: Production SaaS with auth, payments, dashboard
  - ai-rag: RAG chat with vector search
  - nextjs-blog: Blog with MDX support
  - ecommerce: Full store with cart and checkout
- Plugin system for extending functionality
- Interactive CLI with beautiful prompts
- Automatic dependency installation
- Git initialization
- TypeScript support
- Comprehensive documentation
- MIT License

### Features
- Terminal-ready CLI tool
- Global installation support (`npm install -g createforge`)
- Direct usage with npx (`npx createforge`)
- Battle-tested templates with tests included
- Automatic GitHub integration
- CI/CD workflows
- Health monitoring and upgrade recommendations

### Developer Experience
- TypeScript source code
- Vitest for testing
- GitHub Actions for CI/CD
- Comprehensive documentation
- Contributing guidelines
- Development setup guide

## [Unreleased]

### Planned
- Forge Copilot - Natural language builder
- Forge Seeds - Realistic demo data
- PR preview environments
- Plugin marketplace
- Community templates
- Auto-upgrade PRs
- Telemetry (opt-in)
- More templates
- More plugins

---

[0.1.0]: https://github.com/Om7035/createforge/releases/tag/v0.1.0
