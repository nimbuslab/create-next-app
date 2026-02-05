# create-next-app

> Production-ready full-stack Next.js template with authentication, database, and AI-friendly documentation.

Build complete web applications with authentication, database, and best practices out of the box. Optimized for rapid development and production deployment.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nimbuslab/create-next-app)

[Leia em Português](./docs/README.pt-BR.md)

## Features

✨ **Full-Stack Ready** - Auth, database, protected routes
🔐 **Authentication** - Better Auth with email/password + OAuth ready
💾 **Database** - PostgreSQL + Drizzle ORM (type-safe)
🎨 **Modern UI** - Tailwind CSS 4 + shadcn/ui + dark mode
🤖 **AI-Ready** - Auto-generated docs for Claude Code, Cursor, Copilot
🐳 **Docker** - Local development with containers
⚡ **Fast** - Server Components, Turbopack, optimized build

## Quick Start

### Using nimbuslab CLI (Recommended)

The easiest way with interactive setup:

```bash
npx @nimbuslab/cli create my-app --app
cd my-app
bun setup  # Interactive database & auth setup
bun dev
```

This will:
- Clone the template
- Set up AI-friendly documentation
- Configure authentication
- Set up database (PostgreSQL)
- Generate .env files
- Initialize Git

### Manual Setup

```bash
# Clone template
bunx degit nimbuslab/create-next-app my-app
cd my-app

# Install dependencies
bun install

# Set up environment
cp .env.example .env
# Edit .env with your database credentials

# Start database (Docker)
docker compose up -d

# Push database schema
bun db:push

# Seed database (optional)
bun seed

# Start development
bun dev
```

Open [http://localhost:3000](http://localhost:3000) and log in with:
- Email: `demo@example.com`
- Password: `demo1234`

## Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16 | App Router, Server Components, Turbopack |
| **React** | 19 | Latest features and performance |
| **Better Auth** | Latest | Modern authentication solution |
| **Drizzle ORM** | Latest | Type-safe database queries |
| **PostgreSQL** | 16 | Production-ready relational database |
| **Tailwind CSS** | 4 | Utility-first CSS framework |
| **shadcn/ui** | Latest | Accessible UI components |
| **TypeScript** | 5.7 | Full type safety (strict mode) |
| **Docker** | Latest | Containerized development |
| **Bun** | 1.0+ | Fast runtime and package manager |

## Project Structure

```
src/
├── app/
│   ├── (auth)/              # Auth pages (login, register)
│   │   ├── login/
│   │   └── register/
│   ├── api/auth/            # Better Auth API routes
│   ├── dashboard/           # Protected dashboard pages
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Public homepage
│   └── globals.css          # Global styles + CSS variables
├── components/
│   ├── auth/                # Auth-related components
│   ├── dashboard/           # Dashboard components
│   └── ui/                  # shadcn/ui components
├── lib/
│   ├── auth.ts              # Better Auth configuration
│   ├── db.ts                # Database client
│   └── utils.ts             # Utility functions
└── db/
    ├── schema.ts            # Drizzle schema definitions
    └── seed.ts              # Database seeding script
```

## Available Scripts

```bash
# Development
bun dev           # Start development server
bun build         # Build for production
bun start         # Start production server

# Database
bun db:generate   # Generate Drizzle migrations
bun db:push       # Push schema to database (dev)
bun db:migrate    # Run migrations (production)
bun db:studio     # Open Drizzle Studio (GUI)
bun seed          # Seed database with demo data

# Quality
bun lint          # Run ESLint
bun typecheck     # Run TypeScript check

# Setup
bun setup         # Interactive project setup
```

## Authentication

Powered by [Better Auth](https://better-auth.com):

### Features

- ✅ Email/Password authentication
- ✅ OAuth providers ready (Google, GitHub, etc)
- ✅ Session management
- ✅ Protected routes
- ✅ User management
- ✅ Password reset
- ✅ Email verification (optional)

### Configure OAuth (Optional)

Add to `.env`:

```env
# Google OAuth
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret

# GitHub OAuth
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
```

Update `src/lib/auth.ts` to enable providers.

## Database

### Local Development (Docker)

```bash
docker compose up -d     # Start PostgreSQL
bun db:push              # Push schema
bun seed                 # Add demo data
```

### Production (Neon, Supabase, etc)

Update `.env`:

```env
DATABASE_URL=postgresql://user:pass@host:5432/db
```

Then run migrations:

```bash
bun db:migrate
```

### Drizzle Studio

Visual database editor:

```bash
bun db:studio
```

Opens at [https://local.drizzle.studio](https://local.drizzle.studio)

## Adding Components

Use shadcn/ui:

```bash
bunx --bun shadcn@latest add dialog
bunx --bun shadcn@latest add table
bunx --bun shadcn@latest add dropdown-menu
```

Browse: [ui.shadcn.com/docs/components](https://ui.shadcn.com/docs/components)

## Customization

### Theme

Edit `src/app/globals.css`:
- Colors (CSS variables)
- Border radius
- Fonts

### Database Schema

Edit `src/db/schema.ts` and run:

```bash
bun db:generate  # Generate migration
bun db:push      # Apply changes
```

### Protected Routes

Add to `src/middleware.ts`:

```typescript
export const config = {
  matcher: ['/dashboard/:path*', '/settings/:path*']
}
```

## AI-Friendly Documentation

When created via `@nimbuslab/cli`, includes:

- **AGENTS.md** - Context for AI assistants
- **llms.txt** - LLM indexing standard
- **ARCHITECTURE.md** - Design decisions
- **EXAMPLES.md** - Code examples
- **.cursorrules** - Cursor AI config
- **.github/copilot-instructions.md** - Copilot context

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy!

Environment variables needed:
```env
DATABASE_URL=postgresql://...
BETTER_AUTH_SECRET=generate_with_openssl
BETTER_AUTH_URL=https://your-domain.com
```

Generate secret:
```bash
openssl rand -base64 32
```

### Docker (Self-hosted)

```bash
docker build -t my-app .
docker run -p 3000:3000 \
  -e DATABASE_URL=postgresql://... \
  -e BETTER_AUTH_SECRET=... \
  my-app
```

### Railway / Render

Works out of the box. Add environment variables and deploy.

## Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/myapp

# Auth
BETTER_AUTH_SECRET=generate_with_openssl_rand_base64_32
BETTER_AUTH_URL=http://localhost:3000

# OAuth (optional)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

## Examples

Apps built with this template:

- Coming soon!

Want to add yours? [Open a PR](https://github.com/nimbuslab/create-next-app/pulls)

## FAQ

**Q: Can I use MySQL/SQLite instead of PostgreSQL?**
A: Yes! Drizzle supports multiple databases. Update `src/lib/db.ts` accordingly.

**Q: How do I add more OAuth providers?**
A: Edit `src/lib/auth.ts` and add providers. Better Auth supports 20+ providers.

**Q: Is the authentication secure?**
A: Yes! Better Auth follows security best practices: bcrypt hashing, CSRF protection, secure sessions.

**Q: Can I remove Docker?**
A: Yes! Use any PostgreSQL instance. Update `DATABASE_URL` in `.env`.

**Q: Is this production-ready?**
A: Absolutely! Used in production by nimbuslab clients.

## Contributing

Contributions welcome!

1. Fork the repo
2. Create a feature branch
3. Make your changes
4. Submit a PR

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## Support

- 📖 [Documentation](https://github.com/nimbuslab/create-next-app)
- 🐛 [Issues](https://github.com/nimbuslab/create-next-app/issues)
- 💬 [Discussions](https://github.com/nimbuslab/create-next-app/discussions)

## License

MIT License - see [LICENSE](./LICENSE) for details.

---

**Created by nimbuslab** - Building digital products with design and technology.

Made with care in Brazil 🇧🇷
