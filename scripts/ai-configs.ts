// AI configuration templates for different assistants

export const AI_CONFIGS = {
  claude: {
    filename: "CLAUDE.md",
    content: (projectType: "landing" | "app" | "turborepo") => `# ${projectType === "landing" ? "create-next-landing" : projectType === "app" ? "create-next-app" : "create-turborepo"}

${getProjectDescription(projectType)}

## Quick Start

\`\`\`bash
bun install
bun setup    # Configure project
bun dev      # Start development server
\`\`\`

${projectType === "app" ? `
## Demo Credentials

- Email: \`demo@example.com\`
- Password: \`demo1234\`
` : ""}

## Stack

${getStackInfo(projectType)}

## Project Structure

${getStructureInfo(projectType)}

## Adding Components

\`\`\`bash
bunx --bun shadcn@latest add button
bunx --bun shadcn@latest add card
\`\`\`

## Conventions

- Use \`bun\` for all package operations
- Components in PascalCase
- Server Components by default
- Dark mode first design
- Use \`cn()\` for conditional classes

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
${projectType === "app" ? "- [Better Auth](https://better-auth.com)\n- [Drizzle](https://orm.drizzle.team)" : ""}
`,
  },

  cursor: {
    filename: ".cursorrules",
    content: (projectType: "landing" | "app" | "turborepo") => `# Cursor Rules for ${projectType === "landing" ? "create-next-landing" : projectType === "app" ? "create-next-app" : "create-turborepo"}

You are an expert in Next.js 16, React 19, TypeScript, Tailwind CSS 4, and shadcn/ui.

## Tech Stack
- Next.js 16 with App Router and Turbopack
- React 19 with Server Components
- TypeScript (strict mode)
- Tailwind CSS 4 (CSS-first configuration)
- shadcn/ui components (default style)
- Bun as package manager
${projectType === "app" ? "- Better Auth for authentication\n- Drizzle ORM with PostgreSQL" : ""}

## Code Style
- Use functional components with TypeScript
- Prefer Server Components, use "use client" only when necessary
- Use cn() utility for conditional class names
- Follow kebab-case for file names
- Use PascalCase for component names

## File Structure
- Components in src/components/
- Pages in src/app/
- Utilities in src/lib/
${projectType === "app" ? "- Auth config in src/lib/auth.ts\n- Database schema in src/db/schema.ts" : ""}

## Commands
- bun dev - Start development
- bun build - Production build
- bun lint - Run ESLint
${projectType === "app" ? "- bun db:push - Push schema to DB\n- bun db:studio - Open Drizzle Studio" : ""}

## Preferences
- Dark mode first design
- Mobile-first responsive design
- Accessible components (a11y)
- Clean, minimal code
`,
  },

  copilot: {
    filename: ".github/copilot-instructions.md",
    content: (projectType: "landing" | "app" | "turborepo") => `# GitHub Copilot Instructions

## Project: ${projectType === "landing" ? "create-next-landing" : projectType === "app" ? "create-next-app" : "create-turborepo"}

${getProjectDescription(projectType)}

## Tech Stack
- Next.js 16 (App Router)
- React 19 (Server Components)
- TypeScript
- Tailwind CSS 4
- shadcn/ui
- Bun
${projectType === "app" ? "- Better Auth\n- Drizzle + PostgreSQL" : ""}

## Coding Standards
- Use TypeScript strict mode
- Prefer Server Components
- Use Tailwind for styling
- Follow shadcn/ui patterns
- Use cn() for class merging

## Do
- Write clean, readable code
- Use semantic HTML
- Follow accessibility best practices
- Prefer composition over inheritance

## Don't
- Use CSS modules or styled-components
- Use class components
- Add unnecessary dependencies
- Ignore TypeScript errors
`,
  },

  windsurf: {
    filename: ".windsurfrules",
    content: (projectType: "landing" | "app" | "turborepo") => `# Windsurf Rules

Project: ${projectType === "landing" ? "Landing Page" : projectType === "app" ? "Web App" : "Monorepo"}

Stack: Next.js 16, React 19, TypeScript, Tailwind CSS 4, shadcn/ui, Bun
${projectType === "app" ? "Auth: Better Auth | DB: Drizzle + PostgreSQL" : ""}

Style:
- Server Components by default
- "use client" only when needed
- Tailwind utility classes
- cn() for conditional classes
- Dark mode first

Structure:
- src/app/ - Pages (App Router)
- src/components/ - React components
- src/components/ui/ - shadcn components
- src/lib/ - Utilities
${projectType === "app" ? "- src/db/ - Database schema (Drizzle)" : ""}

Commands:
- bun dev
- bun build
- bun lint
${projectType === "app" ? "- bun setup (first time)" : ""}
`,
  },
};

function getProjectDescription(type: "landing" | "app" | "turborepo"): string {
  switch (type) {
    case "landing":
      return "Modern landing page template with Next.js 16, React 19, Tailwind CSS 4, and shadcn/ui.";
    case "app":
      return "Full-stack web app template with Next.js 16, Better Auth, Drizzle, and shadcn/ui.";
    case "turborepo":
      return "Monorepo template with Turborepo, Next.js 16, and shared packages.";
  }
}

function getStackInfo(type: "landing" | "app" | "turborepo"): string {
  const base = `- **Framework:** Next.js 16 (App Router, Turbopack)
- **React:** 19 (Server Components)
- **Styling:** Tailwind CSS 4
- **Components:** shadcn/ui
- **Theme:** next-themes (dark default)
- **Package Manager:** Bun`;

  if (type === "app") {
    return base + `
- **Auth:** Better Auth
- **Database:** PostgreSQL + Drizzle`;
  }
  if (type === "turborepo") {
    return base + `
- **Monorepo:** Turborepo`;
  }
  return base;
}

function getStructureInfo(type: "landing" | "app" | "turborepo"): string {
  if (type === "landing") {
    return `\`\`\`
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   └── theme-provider.tsx
└── lib/
    └── utils.ts
\`\`\``;
  }
  if (type === "app") {
    return `\`\`\`
src/
├── app/
│   ├── (auth)/
│   ├── api/auth/
│   └── dashboard/
├── components/
│   └── ui/
├── db/
│   ├── schema.ts
│   └── index.ts
└── lib/
    ├── auth.ts
    └── auth-client.ts
drizzle.config.ts
\`\`\``;
  }
  return `\`\`\`
apps/
├── web/
└── docs/
packages/
├── ui/
├── config-typescript/
└── config-eslint/
\`\`\``;
}

export type AIProvider = keyof typeof AI_CONFIGS;
