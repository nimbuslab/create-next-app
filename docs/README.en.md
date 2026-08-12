<div align="center">

# create-next-app

**Full-stack Next.js template with authentication, database, and ready-made configuration for AI agents.**
Next.js 16 with the App Router, React 19, Better Auth, Drizzle ORM on PostgreSQL, and shadcn/ui.

[Ler em português](../README.md)

[![CI](https://github.com/nimbuslab/create-next-app/actions/workflows/ci.yml/badge.svg)](https://github.com/nimbuslab/create-next-app/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js-16-FF5500)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-FF5500)](https://react.dev)
[![license](https://img.shields.io/badge/license-MIT-FF5500)](../LICENSE)

[Installation](#installation) · [Quick start](#quick-start) · [Stack](#stack) · [Scripts](#available-scripts) · [Roadmap](#roadmap)

</div>

---

## Why create-next-app

- **Authentication working from the first `bun run dev`**: Better Auth with email and password, session with cookie cache, and a server-protected `/dashboard`
- **End-to-end typed database**: Drizzle ORM on PostgreSQL, with the whole schema in a single file
- **Interactive setup**: detects Docker, starts PostgreSQL, applies the schema, creates the demo user, and optionally creates the GitHub repository
- **Configuration for AI agents**: generates the context file for the assistant you use, already filled in with the project stack and conventions
- **Server Components by default**: `"use client"` only where there is state, an event, or a browser API
- **Dark theme by default**: `next-themes` switching between light, dark, and the system preference

## Installation

### With the nimbuslab CLI

```bash
bun add -g @nimbuslab/cli
nimbus create my-app --app
cd my-app
```

### Cloning the template

```bash
git clone --depth 1 https://github.com/nimbuslab/create-next-app.git my-app
cd my-app
rm -rf .git
```

## Quick start

With the interactive setup, which handles the database and the `.env` file:

```bash
bun install
bun run setup
bun run dev
```

If you prefer to do everything by hand:

```bash
bun install
cp .env.example .env
docker compose up -d
bun run db:push
bun run seed
bun run dev
```

Open [http://localhost:3000](http://localhost:3000). `bun run seed` creates a demo user:

- Email: `demo@example.com`
- Password: `demo1234`

## Stack

The versions below are the ones declared in this repository's `package.json` and `docker-compose.yml`.

| Piece | Version | Role |
|---|---|---|
| [Next.js](https://nextjs.org) | `16.3.0` | App Router, Server Components, Turbopack |
| [React](https://react.dev) | `19.2.8` | UI library |
| [TypeScript](https://www.typescriptlang.org) | `^5` | Static typing in `strict` mode |
| [Better Auth](https://better-auth.com) | `^1.3.10` | Authentication and sessions |
| [Drizzle ORM](https://orm.drizzle.team) | `^0.44.0` | Typed queries |
| [drizzle-kit](https://orm.drizzle.team/docs/kit-overview) | `^0.31.0` | Migrations and Drizzle Studio |
| [PostgreSQL](https://www.postgresql.org) | `16-alpine` | Relational database (image from `docker-compose.yml`) |
| [Tailwind CSS](https://tailwindcss.com) | `^4` | Utility-first styling, CSS-based configuration |
| [shadcn/ui](https://ui.shadcn.com) | `new-york` style | Accessible components on top of Radix UI |
| [Bun](https://bun.sh) | `1.3+` | Runtime and package manager |

`package.json` does not pin the Bun version: `1.3+` is the range the template is developed against, and CI uses the latest. The `engines` field requires Node `>=18` for anyone running the build outside Bun.

## Project structure

```
.
├── .github/workflows/ci.yml     # typecheck, lint, and build
├── docker-compose.yml           # local PostgreSQL 16
├── drizzle.config.ts            # drizzle-kit configuration
├── scripts/
│   ├── ai-configs.ts            # config templates per AI assistant
│   ├── seed.ts                  # creates the demo user
│   └── setup.ts                 # initial setup wizard
└── src/
    ├── app/
    │   ├── (auth)/
    │   │   ├── login/page.tsx
    │   │   └── register/page.tsx
    │   ├── api/auth/[...all]/route.ts   # Better Auth handler
    │   ├── dashboard/                    # protected route
    │   ├── globals.css                   # theme tokens
    │   ├── layout.tsx
    │   └── page.tsx                      # public page
    ├── components/
    │   ├── theme-provider.tsx
    │   └── ui/                           # shadcn/ui components
    ├── db/
    │   ├── index.ts             # Drizzle client and pg pool
    │   └── schema.ts            # user, session, account, verification tables
    └── lib/
        ├── auth.ts              # Better Auth configuration (server)
        ├── auth-client.ts       # authentication client (browser)
        └── utils.ts             # cn() helper
```

## Available scripts

| Command | What it does |
|---|---|
| `bun run dev` | Development server with Turbopack |
| `bun run build` | Production build |
| `bun run start` | Production server from the build |
| `bun run lint` | Checks the code with ESLint |
| `bun run lint:fix` | Applies ESLint's automatic fixes |
| `bun run typecheck` | `tsc --noEmit` |
| `bun run setup` | Initial setup wizard |
| `bun run seed` | Creates the demo user |
| `bun run db:generate` | Generates migration files from the schema |
| `bun run db:push` | Pushes the schema straight to the database (development) |
| `bun run db:migrate` | Runs the generated migrations (production) |
| `bun run db:studio` | Opens Drizzle Studio |

Always use `bun run <script>`. `bun build` without `run` calls Bun's own bundler, not this script.

## Database

### Local, with Docker

```bash
docker compose up -d
bun run db:push
bun run seed
```

`docker-compose.yml` starts PostgreSQL 16 on `localhost:5432` with user `postgres`, password `postgres`, and database `app`. These are local development credentials and must not reach production. `.env.example` already ships the matching `DATABASE_URL`.

### Managed provider

Any PostgreSQL works, such as [Neon](https://neon.tech) or [Supabase](https://supabase.com). Replace `DATABASE_URL` in `.env` and run the migrations:

```bash
bun run db:generate
bun run db:migrate
```

### Changing the schema

Edit `src/db/schema.ts`, then:

```bash
bun run db:generate   # generates the migration
bun run db:push       # or apply it directly, in development
```

### Drizzle Studio

```bash
bun run db:studio
```

Opens at [https://local.drizzle.studio](https://local.drizzle.studio).

## Authentication

Configured in `src/lib/auth.ts` with [Better Auth](https://better-auth.com) and the Drizzle adapter.

What ships working:

- Sign-up and sign-in with email and password
- Password hashing with scrypt, Better Auth's default
- 7-day session, refreshed every 24 hours, with a 5-minute cookie cache
- Protected `/dashboard`: `src/app/dashboard/page.tsx` reads the session on the server and redirects to `/login` when there is none

What does **not** ship and is on the [Roadmap](#roadmap): password reset, email verification, and OAuth providers. None of the three is configured in `auth.ts`, and the template carries no email provider.

## Configuration for AI agents

`bun run setup` asks which assistant you use and generates the matching context file, with the stack, the folder structure, and the project conventions:

| Assistant | Generated file |
|---|---|
| Claude Code | `CLAUDE.md` |
| Cursor | `.cursorrules` |
| Gemini CLI | `.gemini/GEMINI.md` |
| GitHub Copilot | `.github/copilot-instructions.md` |
| Windsurf | `.windsurfrules` |

The templates live in `scripts/ai-configs.ts`.

## Adding components

```bash
bunx --bun shadcn@latest add dialog
bunx --bun shadcn@latest add table
```

`components.json` already points to `src/components/ui` and to the tokens in `src/app/globals.css`.

## Environment variables

Copy `.env.example` to `.env` and adjust it. No other `.env` file is committed.

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | yes | PostgreSQL connection string, read by `src/db/index.ts` and `drizzle.config.ts` |
| `BETTER_AUTH_SECRET` | yes | Session signing secret. Generate it with `openssl rand -base64 32` |
| `BETTER_AUTH_URL` | yes | Public URL of the application |
| `NEXT_PUBLIC_APP_URL` | no | Base URL for the authentication client. Defaults to `http://localhost:3000` |
| `NODE_ENV` | no | `development` or `production` |

## Deploy

Works on any platform that runs Next.js on Node, such as Vercel, Railway, or Render. The path is the same:

1. Provision a PostgreSQL instance and get the connection string
2. Set `DATABASE_URL`, `BETTER_AUTH_SECRET`, and `BETTER_AUTH_URL` in the environment
3. Run `bun run db:migrate` against the production database
4. Deploy

Generate the secret with:

```bash
openssl rand -base64 32
```

## Roadmap

- [ ] Password reset
- [ ] Email verification
- [ ] OAuth providers (Google and GitHub)
- [ ] `src/middleware.ts` with the protected-route matcher
- [ ] `Dockerfile` with `output: "standalone"` for self-hosting
- [ ] Automated tests in CI

## Contributing

Read the [contributing guide](../CONTRIBUTING.md) before opening a PR. In short: branch off `main`, write commits in Portuguese following Conventional Commits, and get `bun run typecheck`, `bun run lint`, and `bun run build` green before asking for review.

The [code of conduct](../CODE_OF_CONDUCT.md) applies to everyone taking part in the project.

## Support

Questions, bugs, and suggestions go to [Issues](https://github.com/nimbuslab/create-next-app/issues). Security reports follow the process described in [SECURITY.md](../SECURITY.md).

## License

[MIT](../LICENSE) © [nimbuslab](https://nimbuslab.com.br)

---

<div align="center">

Built in Brasília, DF, Brazil

</div>
