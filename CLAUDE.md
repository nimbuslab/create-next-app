# create-next-app

Full-stack web app template with Next.js 16, Better Auth, Prisma, and shadcn/ui.

## Quick Start

```bash
bun install
bun setup    # Configure project, start DB, run migrations, create demo user
bun dev      # Start development server
```

## Demo Credentials

After running `bun setup`:
- Email: `demo@example.com`
- Password: `demo1234`

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **React:** 19 (Server Components)
- **Auth:** Better Auth (email/password)
- **Database:** PostgreSQL + Prisma ORM
- **Styling:** Tailwind CSS 4 (CSS-first config)
- **Components:** shadcn/ui (default style)
- **Theme:** next-themes (dark mode default)
- **Package Manager:** Bun

## Project Structure

```
src/
├── app/
│   ├── (auth)/           # Auth pages (login, register)
│   ├── api/auth/[...all] # Better Auth API routes
│   ├── dashboard/        # Protected pages
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/               # shadcn/ui components
│   └── theme-provider.tsx
└── lib/
    ├── auth.ts           # Better Auth server config
    ├── auth-client.ts    # Better Auth client
    └── utils.ts
prisma/
└── schema.prisma         # Database schema
scripts/
├── setup.ts              # Project setup wizard
└── seed.ts               # Demo user seed
```

## Database Commands

```bash
bun db:generate   # Generate Prisma client
bun db:migrate    # Run migrations
bun db:push       # Push schema changes (dev)
bun db:studio     # Open Prisma Studio
```

## Adding Components

```bash
bunx --bun shadcn@latest add button
bunx --bun shadcn@latest add form
```

## Auth Usage

### Server Component
```tsx
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  return <div>Hello {session.user.name}</div>;
}
```

### Client Component
```tsx
"use client";
import { authClient } from "@/lib/auth-client";

export function LogoutButton() {
  return (
    <button onClick={() => authClient.signOut()}>
      Logout
    </button>
  );
}
```

## Conventions

- Use `bun` for all package operations
- Server Components by default
- Protected routes in `dashboard/`
- Auth pages in `(auth)/` route group
- Dark mode first design

## Environment Variables

Required in `.env`:
```
DATABASE_URL="postgresql://..."
BETTER_AUTH_SECRET="your-secret"
BETTER_AUTH_URL="http://localhost:3000"
```

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Better Auth](https://better-auth.com)
- [Prisma](https://prisma.io/docs)
- [shadcn/ui](https://ui.shadcn.com)
