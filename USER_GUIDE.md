# 🚀 CreateForge User Guide

> **Ship full-stack apps, not scaffolds** — Your complete guide to building production-ready applications in minutes.

---

## 🎯 What is CreateForge?

CreateForge is a modern CLI tool that creates **production-ready, full-stack applications** with authentication, payments, tests, and deployment—all configured and working out of the box.

Unlike other scaffolding tools that give you empty templates, CreateForge delivers **living, breathing applications** that you can deploy immediately.

---

## ⚡ Quick Start

### 1. **Create Your First App**

```bash
# Interactive mode (recommended for beginners)
npx createforge

# Or specify everything upfront
npx createforge my-app --template nextjs-saas
```

### 2. **Navigate and Run**

```bash
cd my-app
npm run dev
```

### 3. **Open in Browser**

Visit `http://localhost:3000` and see your app running!

---

## 🎨 Beautiful Terminal Experience

CreateForge features a beautiful, colorful terminal interface:

- **🎉 Animated celebrations** when your app is ready
- **📊 Progress indicators** showing each step
- **🎨 Color-coded messages** for success, errors, and info
- **📋 Beautiful tables** for templates and plugins
- **🎯 Step-by-step guidance** throughout the process

### Example Terminal Output

```
  ⚡ CreateForge
  Ship full-stack apps, not scaffolds

[1/8] Getting project name
[2/8] Selecting template
[3/8] Cloning template
[4/8] Installing dependencies
[5/8] Initializing git repository
[6/8] Updating project stats
[7/8] Celebrating success! 🎉

    🎉 ✨ 🚀 ✨ 🎉
  ✨ 🎊 🌟 🎊 ✨
🚀 🌟 🎉 🌟 🚀
  ✨ 🎊 🌟 🎊 ✨
    🎉 ✨ 🚀 ✨ 🎉

┌──────────────────────────────────────────────────────────┐
│ 🚀 Your app is ready!                                   │
├──────────────────────────────────────────────────────────┤
│  SUCCESS  Created in 12.3s — Time to first success: 12.3s │
│                                                          │
│ Next steps:                                              │
│   $ cd my-app                                            │
│   $ npm run dev                                          │
└──────────────────────────────────────────────────────────┘
```

---

## 📚 Available Commands

### **Core Commands**

#### `forge create [name]`
Create a new application from a template.

```bash
# Interactive mode
forge create

# With specific template
forge create my-saas --template nextjs-saas

# Skip installation steps
forge create my-app --no-install --no-git

# Open in browser immediately
forge create my-app --live
```

**Options:**
- `--template <name>` - Specify template (nextjs-saas, ai-rag, etc.)
- `--live` - Open in Forge Live browser environment
- `--no-install` - Skip dependency installation
- `--no-git` - Skip git initialization

#### `forge add <plugin>`
Add functionality to your existing project.

```bash
forge add stripe      # Add payments
forge add clerk       # Add authentication
forge add supabase    # Add database
forge add openai      # Add AI capabilities
forge add analytics   # Add analytics
```

#### `forge templates`
View all available templates with descriptions.

```bash
forge templates
```

**Output:**
```
┌────────────────────────────────────────────────────────────┐
│ Available Templates                                        │
├────────────────────────────────────────────────────────────┤
│Template    │Description                    │Stack           │
├────────────┼───────────────────────────────┼────────────────┤
│nextjs-saas │Production SaaS with auth...   │Next.js + TS... │
│ai-rag      │RAG chat with vector search    │Next.js + AI... │
│nextjs-blog │Blog with MDX support          │Next.js + MDX...│
│ecommerce   │Full store with cart...        │Next.js + Stripe│
└────────────────────────────────────────────────────────────┘
```

#### `forge plugins`
View all available plugins with use cases.

```bash
forge plugins
```

### **Project Management**

#### `forge health`
Check your project's health and get upgrade recommendations.

```bash
forge health
forge health --fix  # Automatically create PR for upgrades
```

#### `forge init`
Initialize GitHub repository and deployment.

```bash
forge init
forge init --deploy vercel    # Deploy to Vercel
forge init --deploy netlify   # Deploy to Netlify
```

#### `forge live [path]`
Open project in Forge Live browser environment.

```bash
forge live          # Current directory
forge live my-app   # Specific project
```

### **User Preferences**

#### `forge profile`
Manage your preferences and presets.

```bash
forge profile
forge profile --edit
```

### **Help & Information**

#### `forge welcome`
Show welcome guide with getting started information.

#### `forge quickstart`
Show step-by-step quick start guide.

#### `forge examples`
Show example workflows for common use cases.

#### `forge love`
Show developer appreciation message.

---

## 🎯 Templates

### **Featured Templates**

#### **nextjs-saas** ⚔️ Battle-Tested
**Perfect for:** SaaS applications, subscription services, business apps

**Includes:**
- ✅ Next.js 14 with App Router
- ✅ TypeScript & Tailwind CSS
- ✅ Authentication (ready for Clerk)
- ✅ Payment processing (ready for Stripe)
- ✅ Database schema (ready for Supabase)
- ✅ Dashboard with user management
- ✅ Subscription management
- ✅ Email templates
- ✅ Tests with Vitest
- ✅ CI/CD with GitHub Actions

```bash
forge create my-saas --template nextjs-saas
```

#### **ai-rag** ⚔️ Battle-Tested
**Perfect for:** AI chat applications, knowledge bases, document search

**Includes:**
- ✅ Next.js with AI integration
- ✅ RAG (Retrieval Augmented Generation)
- ✅ Vector database integration
- ✅ Chat interface
- ✅ Document upload & processing
- ✅ OpenAI integration ready
- ✅ Streaming responses

```bash
forge create ai-chat --template ai-rag
```

#### **nextjs-blog**
**Perfect for:** Personal blogs, company blogs, content sites

**Includes:**
- ✅ Next.js with MDX
- ✅ Blog post management
- ✅ SEO optimization
- ✅ RSS feed generation
- ✅ Comment system ready
- ✅ Analytics integration

```bash
forge create my-blog --template nextjs-blog
```

#### **ecommerce**
**Perfect for:** Online stores, marketplaces, product catalogs

**Includes:**
- ✅ Product catalog
- ✅ Shopping cart
- ✅ Checkout flow
- ✅ Payment processing
- ✅ Order management
- ✅ Admin dashboard

```bash
forge create my-store --template ecommerce
```

---

## 🔌 Plugins

### **Payment Processing**

#### **Stripe**
Add payment processing with Stripe.

```bash
forge add stripe
```

**What it adds:**
- Payment components
- Subscription management
- Webhook handling
- Environment variables setup

#### **Analytics**

#### **Vercel Analytics**
Track user behavior and performance.

```bash
forge add analytics
```

### **Authentication**

#### **Clerk**
Complete authentication solution.

```bash
forge add clerk
```

**What it adds:**
- Sign up/sign in components
- User management
- Session handling
- Protected routes

### **Database**

#### **Supabase**
Backend as a service with database and auth.

```bash
forge add supabase
```

**What it adds:**
- Database client setup
- Authentication integration
- Real-time subscriptions
- Storage integration

### **AI Capabilities**

#### **OpenAI**
Add AI features to your application.

```bash
forge add openai
```

**What it adds:**
- OpenAI client setup
- Chat completion helpers
- Streaming utilities
- Error handling

---

## 🎨 Example Workflows

### **🏪 E-commerce Store**

```bash
# 1. Create store
forge create my-store --template ecommerce

# 2. Add payment processing
cd my-store
forge add stripe

# 3. Add analytics
forge add analytics

# 4. Deploy
forge init --deploy vercel
```

### **🤖 AI Chat Application**

```bash
# 1. Create AI app
forge create ai-chat --template ai-rag

# 2. Add OpenAI integration
cd ai-chat
forge add openai

# 3. Add database for chat history
forge add supabase

# 4. Deploy
forge init --deploy vercel
```

### **💼 SaaS Application**

```bash
# 1. Create SaaS app
forge create my-saas --template nextjs-saas

# 2. Add authentication
cd my-saas
forge add clerk

# 3. Add payment processing
forge add stripe

# 4. Add database
forge add supabase

# 5. Deploy
forge init --deploy vercel
```

### **📝 Personal Blog**

```bash
# 1. Create blog
forge create my-blog --template nextjs-blog

# 2. Add analytics
cd my-blog
forge add analytics

# 3. Deploy
forge init --deploy vercel
```

---

## 🚀 Deployment Guide

### **Automatic Deployment**

```bash
# Deploy to Vercel (recommended)
forge init --deploy vercel

# Deploy to Netlify
forge init --deploy netlify

# Deploy to Railway
forge init --deploy railway
```

**What `forge init` does:**
1. Creates GitHub repository
2. Sets up CI/CD workflows
3. Configures deployment
4. Sets up environment variables
5. Creates first deployment

### **Manual Deployment**

If you prefer manual deployment:

#### **Vercel**
```bash
npm install -g vercel
vercel
```

#### **Netlify**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

---

## 🔧 Customization

### **Environment Variables**

CreateForge automatically creates `.env.local` with required variables:

```bash
# Stripe
STRIPE_SECRET_KEY=# Your Stripe secret key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=# Your Stripe publishable key

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=# Your Clerk publishable key
CLERK_SECRET_KEY=# Your Clerk secret key

# Supabase
NEXT_PUBLIC_SUPABASE_URL=# Your Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=# Your Supabase anon key

# OpenAI
OPENAI_API_KEY=# Your OpenAI API key
```

### **Project Structure**

All templates follow a consistent structure:

```
my-app/
├── app/                    # Next.js App Router
├── components/             # React components
├── lib/                    # Utilities and configurations
├── public/                 # Static assets
├── styles/                 # CSS and styling
├── tests/                  # Test files
├── .env.local             # Environment variables
├── package.json           # Dependencies
└── README.md              # Project documentation
```

---

## 🛠️ Troubleshooting

### **Common Issues**

#### **Command not found**
```bash
# If you get "forge: command not found"
npm install -g createforge

# Or use npx
npx createforge
```

#### **Permission errors**
```bash
# On macOS/Linux, you might need sudo
sudo npm install -g createforge
```

#### **Template not found**
```bash
# Check available templates
forge templates

# Use exact template name
forge create my-app --template nextjs-saas
```

#### **Plugin installation fails**
```bash
# Make sure you're in a project directory
cd my-app
forge add stripe

# Check if package.json exists
ls package.json
```

### **Getting Help**

- **Documentation**: [GitHub README](https://github.com/Om7035/createforge#readme)
- **Issues**: [GitHub Issues](https://github.com/Om7035/createforge/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Om7035/createforge/discussions)

---

## 🎯 Pro Tips

### **1. Use Templates for Speed**
Don't start from scratch. Pick the template closest to your needs:

```bash
forge templates  # See all options
```

### **2. Add Plugins Incrementally**
Start simple, add features as needed:

```bash
forge create my-app
cd my-app
forge add clerk     # Add auth when you need it
forge add stripe    # Add payments when ready
```

### **3. Check Project Health**
Keep your project up-to-date:

```bash
forge health        # Check for issues
forge health --fix  # Auto-fix when possible
```

### **4. Use Live Preview**
Test templates before committing:

```bash
forge create my-app --live  # Opens in browser immediately
```

### **5. Leverage Examples**
Learn from common patterns:

```bash
forge examples  # See workflow examples
```

---

## 🎉 Success Stories

### **Time to First Success**
- **Average**: 5-10 minutes from idea to running app
- **Record**: 2 minutes for experienced developers
- **Includes**: Full authentication, payments, and deployment

### **What Developers Say**

> *"CreateForge saved me weeks of setup time. I went from idea to deployed SaaS in one afternoon!"*

> *"The templates are actually production-ready. I'm using the nextjs-saas template for my startup."*

> *"Beautiful CLI experience. It's actually fun to create new projects now."*

---

## 🚀 What's Next?

### **Coming Soon**
- 🤖 AI-powered project setup
- 🎨 Visual project builder
- 📊 Template marketplace
- 🔄 Automatic updates
- 👥 Team collaboration features

### **Get Involved**
- ⭐ [Star us on GitHub](https://github.com/Om7035/createforge)
- 🐛 [Report bugs](https://github.com/Om7035/createforge/issues)
- 💡 [Suggest features](https://github.com/Om7035/createforge/discussions)
- 🤝 [Contribute templates](https://github.com/Om7035/createforge/blob/main/CONTRIBUTING.md)

---

## 📞 Support

Need help? We're here for you:

- **📖 Documentation**: This guide + [GitHub README](https://github.com/Om7035/createforge#readme)
- **🐛 Bug Reports**: [GitHub Issues](https://github.com/Om7035/createforge/issues)
- **💬 Questions**: [GitHub Discussions](https://github.com/Om7035/createforge/discussions)
- **⭐ Show Love**: [Star the repo](https://github.com/Om7035/createforge)

---

**Happy building! ⚡**

*Made with ❤️ by developers, for developers*
