# Installation Guide

## For Users

### Quick Start (Recommended)

The easiest way to use CreateForge is with `npx` - no installation required:

```bash
npx createforge
```

This will run the latest version directly from npm.

### Global Installation

If you want to install CreateForge globally on your system:

```bash
npm install -g createforge
```

After installation, you can use either command:

```bash
createforge create my-app
# or
forge create my-app
```

### Verify Installation

Check that CreateForge is installed correctly:

```bash
forge --version
# or
createforge --version
```

## Usage Examples

### Create a new project interactively
```bash
npx createforge
```

### Create with specific template
```bash
npx createforge my-saas --template nextjs-saas
```

### Create and open in browser
```bash
npx createforge my-app --live
```

### Add plugins to existing project
```bash
cd my-app
forge add stripe
forge add clerk
```

### Check project health
```bash
forge health
```

### Initialize GitHub and deployment
```bash
forge init --deploy vercel
```

## For Developers

### Install from Source

1. Clone the repository:
```bash
git clone https://github.com/Om7035/createforge.git
cd createforge
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

4. Link locally for testing:
```bash
npm link
```

Now you can use `forge` or `createforge` commands globally, pointing to your local development version.

### Development Mode

Run in watch mode while developing:
```bash
npm run dev
```

### Run Tests
```bash
npm test
```

## Publishing to npm

When ready to publish (for maintainers):

1. Update version in `package.json`
2. Build the project:
```bash
npm run build
```

3. Publish to npm:
```bash
npm publish
```

## Troubleshooting

### Command not found after global install

If you get "command not found" after `npm install -g createforge`:

1. Check npm global bin path:
```bash
npm bin -g
```

2. Make sure this path is in your system's PATH environment variable

3. On Windows, you may need to restart your terminal

### Permission errors on Linux/Mac

If you get permission errors during global install:

```bash
sudo npm install -g createforge
```

Or configure npm to use a different directory:
```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

### Module not found errors

Make sure all dependencies are installed:
```bash
npm install
npm run build
```

## Requirements

- **Node.js**: 18.0.0 or higher
- **npm**: 7.0.0 or higher
- **Git**: Required for project initialization

## Uninstalling

To remove CreateForge from your system:

```bash
npm uninstall -g createforge
```

## Support

- 📖 [Documentation](https://github.com/Om7035/createforge#readme)
- 🐛 [Report Issues](https://github.com/Om7035/createforge/issues)
- 💬 [Discussions](https://github.com/Om7035/createforge/discussions)
