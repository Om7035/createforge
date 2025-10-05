# Publishing CreateForge to npm

This guide explains how to publish CreateForge to npm so users can install it globally on their systems.

## Prerequisites

1. **npm account**: Create one at [npmjs.com](https://www.npmjs.com/signup)
2. **npm CLI**: Make sure you're logged in:
   ```bash
   npm login
   ```
3. **Package name availability**: Check if `createforge` is available:
   ```bash
   npm view createforge
   ```

## Pre-Publishing Checklist

Before publishing, ensure:

- [ ] All tests pass: `npm test`
- [ ] Project builds successfully: `npm run build`
- [ ] Version number is updated in `package.json`
- [ ] README.md is up to date
- [ ] CHANGELOG.md is updated (if you have one)
- [ ] All changes are committed to git
- [ ] LICENSE file exists

## Publishing Steps

### 1. Update Version

Update the version in `package.json` following [Semantic Versioning](https://semver.org/):

```bash
# For bug fixes
npm version patch

# For new features (backwards compatible)
npm version minor

# For breaking changes
npm version major
```

### 2. Build the Project

```bash
npm run build
```

This compiles TypeScript to JavaScript in the `dist/` folder.

### 3. Test Locally

Test the CLI locally before publishing:

```bash
npm link
forge --version
forge create test-app
```

### 4. Publish to npm

```bash
npm publish
```

If this is your first time publishing:
- You may need to verify your email
- You may need to enable 2FA on your npm account

### 5. Verify Publication

Check that your package is live:

```bash
npm view createforge
```

Test installation:

```bash
npx createforge@latest --version
```

## Publishing with GitHub Actions (Automated)

We've set up automated publishing via GitHub Actions:

1. **Create npm token**:
   - Go to npmjs.com → Account → Access Tokens
   - Generate a new "Automation" token
   - Copy the token

2. **Add token to GitHub**:
   - Go to your repo → Settings → Secrets and variables → Actions
   - Create new secret: `NPM_TOKEN`
   - Paste your npm token

3. **Create a release**:
   ```bash
   git tag v0.1.0
   git push origin v0.1.0
   ```
   
   Or create a release through GitHub UI

4. The workflow will automatically:
   - Run tests
   - Build the project
   - Publish to npm

## Post-Publishing

After publishing:

1. **Test installation globally**:
   ```bash
   npm install -g createforge
   forge --version
   ```

2. **Update documentation**:
   - Update README with new version
   - Add release notes

3. **Announce**:
   - Share on social media
   - Post in relevant communities
   - Update project website

## Troubleshooting

### "Package name already exists"

If `createforge` is taken, you can:
- Choose a different name (update in `package.json`)
- Use a scoped package: `@yourusername/createforge`

### "You must verify your email"

Check your npm account email and verify it.

### "You need to enable 2FA"

Some packages require 2FA:
```bash
npm profile enable-2fa auth-and-writes
```

### "Permission denied"

Make sure you're logged in:
```bash
npm whoami
npm login
```

## Version Management

### Semantic Versioning

- **Major** (1.0.0): Breaking changes
- **Minor** (0.1.0): New features, backwards compatible
- **Patch** (0.0.1): Bug fixes

### Pre-release Versions

For beta releases:
```bash
npm version prerelease --preid=beta
npm publish --tag beta
```

Users can install with:
```bash
npm install -g createforge@beta
```

## Unpublishing

⚠️ **Warning**: Unpublishing can break projects depending on your package.

To unpublish within 72 hours:
```bash
npm unpublish createforge@0.1.0
```

To deprecate instead (recommended):
```bash
npm deprecate createforge@0.1.0 "This version has been deprecated"
```

## Best Practices

1. **Test thoroughly** before publishing
2. **Use semantic versioning** consistently
3. **Keep dependencies updated** and secure
4. **Document breaking changes** clearly
5. **Maintain a CHANGELOG**
6. **Respond to issues** promptly
7. **Tag releases** in git

## Resources

- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning](https://semver.org/)
- [npm CLI Documentation](https://docs.npmjs.com/cli/)
