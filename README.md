# create-next-app

A production-ready full-stack template with authentication, database, and modern tooling.

[Leia em Portugues](./docs/README.pt-BR.md)

## Stack

- **Next.js 16** - App Router, Server Components, Turbopack
- **React 19** - Latest features and performance improvements
- **Better Auth** - Modern authentication (email/password, OAuth ready)
- **Drizzle** - Type-safe database ORM
- **PostgreSQL** - Production-ready database
- **Tailwind CSS 4** - Utility-first CSS
- **shadcn/ui** - Accessible, customizable components
- **TypeScript** - Full type safety with strict mode
- **Docker** - Local development with containers

## Quick Start

```bash
# Create a new project
bunx @nimbuslab/create-next-app my-app

# Navigate to project
cd my-app

# Run interactive setup (recommended)
bun setup

# Or manual setup:
cp .env.example .env
docker compose up -d
bun install
bun db:push
bun seed

# Start development server
bun dev
```

## Project Structure

```
src/
├── app/
│   ├── (auth)/           # Auth pages (login, register)
│   ├── api/auth/         # Better Auth API routes
│   ├── dashboard/        # Protected dashboard
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── landing/          # Landing page sections
│   └── ui/               # shadcn/ui components
├── db/
│   ├── schema.ts         # Drizzle schema
│   └── index.ts          # Database connection
└── lib/
    ├── auth.ts           # Better Auth server config
    ├── auth-client.ts    # Better Auth client
    └── utils.ts
drizzle.config.ts         # Drizzle configuration
```

## Available Scripts

```bash
bun dev           # Start development server
bun build         # Build for production
bun start         # Start production server
bun lint          # Run ESLint
bun typecheck     # Type check with TypeScript
bun setup         # Interactive project setup
bun seed          # Seed demo user
bun db:push       # Push schema to database
bun db:migrate    # Run migrations
bun db:studio     # Open Drizzle Studio
```

## Authentication

This template uses [Better Auth](https://better-auth.com) for authentication.

### Features included:
- Email/password authentication
- Session management
- Protected routes
- Server-side session validation

### Adding OAuth providers:

```typescript
// src/lib/auth.ts
export const auth = betterAuth({
  // ... existing config
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
});
```

## Database

### Local Development

```bash
# Start PostgreSQL
docker compose up -d

# View database
bun db:studio
```

### Schema Changes

```bash
# After editing src/db/schema.ts
bun db:push      # Push to database (dev)
bun db:migrate   # Create migration (prod)
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `BETTER_AUTH_SECRET` | Auth secret (min 32 chars) | Yes |
| `BETTER_AUTH_URL` | App URL for auth | Yes |
| `NEXT_PUBLIC_APP_URL` | Public app URL | Yes |

## Deployment

### Vercel + Neon/Supabase

1. Create a PostgreSQL database (Neon, Supabase, etc.)
2. Set environment variables in Vercel
3. Deploy

```bash
bunx vercel
```

### Docker

```dockerfile
FROM oven/bun:1 AS builder
WORKDIR /app
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

FROM oven/bun:1-slim
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["bun", "server.js"]
```

## License

MIT License - see [LICENSE](./LICENSE) for details.

---

Made with care in Brazil by [nimbuslab](https://nimbuslab.com.br)
