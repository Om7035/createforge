# Quick Publish Guide

## 🚀 Publish CreateForge to npm in 5 Minutes

### Step 1: Create npm Account (if you don't have one)
1. Go to [npmjs.com/signup](https://www.npmjs.com/signup)
2. Create your account
3. Verify your email

### Step 2: Login to npm
```bash
npm login
```
Enter your username, password, and email.

### Step 3: Check Package Name Availability
```bash
npm view createforge
```
If you see "npm ERR! 404", the name is available! ✅

### Step 4: Build Your Project
```bash
cd f:\forge
npm run build
```

### Step 5: Test Locally (Optional but Recommended)
```bash
npm link
forge --version
```

### Step 6: Publish! 🎉
```bash
npm publish
```

### Step 7: Verify It Works
```bash
# In a new terminal/directory
npx createforge --version
```

## ✅ Done! Users can now install with:

```bash
# Use directly
npx createforge

# Or install globally
npm install -g createforge
forge create my-app
```

## 📝 Next Steps

1. **Share your package**:
   - Tweet about it
   - Post on Reddit (r/javascript, r/node)
   - Share in Discord communities

2. **Monitor usage**:
   - Check download stats: [npmjs.com/package/createforge](https://www.npmjs.com/package/createforge)

3. **Update when needed**:
   ```bash
   # Make changes
   npm version patch  # or minor/major
   npm run build
   npm publish
   ```

## 🆘 Common Issues

**"Package name taken"**
- Try: `@yourusername/createforge`
- Or choose a different name

**"Need to verify email"**
- Check your email and click the verification link

**"Permission denied"**
- Run `npm whoami` to check if logged in
- Run `npm login` if needed

## 📚 Full Documentation
- [PUBLISHING.md](PUBLISHING.md) - Complete publishing guide
- [INSTALL.md](INSTALL.md) - User installation guide
