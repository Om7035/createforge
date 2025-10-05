# CreateForge - Quick Reference Guide

## 🚀 For Users

### Installation
```bash
# Use directly (no installation)
npx createforge

# Install globally
npm install -g createforge
```

### Create a Project
```bash
# Interactive mode
forge create

# With specific template
forge create my-app --template nextjs-saas

# Skip installation
forge create my-app --no-install

# Skip git init
forge create my-app --no-git
```

### Add Plugins
```bash
cd my-app
forge add stripe      # Payments
forge add clerk       # Authentication
forge add supabase    # Database
forge add openai      # AI capabilities
forge add analytics   # Analytics
```

### Other Commands
```bash
forge live            # Open in browser
forge health          # Check project health
forge init            # Setup GitHub & deployment
forge profile         # Manage preferences
forge plugins         # List available plugins
forge templates       # List available templates
forge --help          # Show help
forge --version       # Show version
```

---

## 👨‍💻 For Developers

### Setup Development Environment
```bash
# Clone repository
git clone https://github.com/Om7035/createforge.git
cd createforge

# Install dependencies
npm install

# Build
npm run build

# Link for local testing
npm link

# Test
npm test
```

### Development Workflow
```bash
# Watch mode (auto-rebuild)
npm run dev

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Build for production
npm run build
```

### Testing
```bash
# Run all tests
npm test

# Run specific test file
npm test src/cli.test.ts

# Run with coverage
npm test -- --coverage
```

### Publishing Updates
```bash
# Update version
npm version patch    # 0.1.0 -> 0.1.1
npm version minor    # 0.1.0 -> 0.2.0
npm version major    # 0.1.0 -> 1.0.0

# Build and publish
npm run build
npm publish

# Or let GitHub Actions do it
git tag v0.1.1
git push origin v0.1.1
```

---

## 📁 Project Structure

```
createforge/
├── src/                    # TypeScript source
│   ├── cli.ts             # Main CLI entry
│   ├── commands/          # Command implementations
│   │   ├── create.ts
│   │   ├── add.ts
│   │   ├── live.ts
│   │   ├── health.ts
│   │   ├── init.ts
│   │   └── profile.ts
│   ├── plugins/           # Plugin system
│   │   └── index.ts
│   └── utils/             # Utilities
│       ├── ui.ts
│       ├── templates.ts
│       └── config.ts
├── templates/             # Project templates
│   ├── nextjs-saas/
│   ├── ai-rag/
│   └── ...
├── dist/                  # Compiled JS (gitignored)
├── .github/workflows/     # CI/CD
│   ├── ci.yml
│   └── publish.yml
└── docs/                  # Documentation
```

---

## 🔧 Common Tasks

### Add a New Template
1. Create template in `templates/` directory
2. Add to `src/utils/templates.ts`
3. Test with `forge create --template your-template`
4. Document in README

### Add a New Plugin
1. Add plugin config to `src/plugins/index.ts`
2. Test with `forge add your-plugin`
3. Document in README

### Fix a Bug
1. Create issue on GitHub
2. Create branch: `git checkout -b fix/bug-name`
3. Fix and test
4. Commit: `git commit -m "fix: description"`
5. Push and create PR

### Add a Feature
1. Create issue on GitHub
2. Create branch: `git checkout -b feat/feature-name`
3. Implement and test
4. Update docs
5. Commit: `git commit -m "feat: description"`
6. Push and create PR

---

## 🐛 Troubleshooting

### Command not found
```bash
# Check if installed
npm list -g createforge

# Reinstall
npm install -g createforge

# Check npm global path
npm bin -g
```

### Tests failing
```bash
# Clean and rebuild
rm -rf node_modules dist
npm install
npm run build
npm test
```

### CI failing
```bash
# Check logs on GitHub Actions
# Usually fixed by:
npm run build
npm test
git add .
git commit -m "fix: CI issues"
git push
```

---

## 📚 Documentation Links

- **Main README**: [README.md](README.md)
- **Installation**: [INSTALL.md](INSTALL.md)
- **Contributing**: [CONTRIBUTING.md](CONTRIBUTING.md)
- **Development**: [DEVELOPMENT.md](DEVELOPMENT.md)
- **Publishing**: [PUBLISHING.md](PUBLISHING.md)
- **Security**: [SECURITY.md](SECURITY.md)
- **Changelog**: [CHANGELOG.md](CHANGELOG.md)

---

## 🔗 Important Links

- **npm Package**: https://www.npmjs.com/package/createforge
- **GitHub Repo**: https://github.com/Om7035/createforge
- **Issues**: https://github.com/Om7035/createforge/issues
- **CI/CD**: https://github.com/Om7035/createforge/actions

---

## 💡 Tips

### For Users
- Use `npx createforge` to always get the latest version
- Check `forge --help` for all available commands
- Read template README after creation

### For Contributors
- Run tests before committing
- Follow conventional commits
- Update documentation
- Add tests for new features

### For Maintainers
- Keep dependencies updated
- Respond to issues promptly
- Review PRs carefully
- Publish regularly

---

**Last Updated**: 2025-10-06  
**Version**: 0.1.0
