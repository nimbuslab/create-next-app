#!/usr/bin/env bun

import * as p from "@clack/prompts";
import pc from "picocolors";
import { readFile, writeFile, access, mkdir } from "node:fs/promises";
import { $ } from "bun";
import { AI_CONFIGS, type AIProvider } from "./ai-configs";

const ENV_TEMPLATE = `# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/app?schema=public"

# Better Auth
BETTER_AUTH_SECRET="your-secret-key-change-in-production"
BETTER_AUTH_URL="http://localhost:3000"

# App
NODE_ENV="development"
`;

async function fileExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  console.log();
  console.log(pc.cyan("  create-next-app setup"));
  console.log();

  p.intro(pc.bgCyan(pc.black(" Project Setup ")));

  const config = await p.group(
    {
      name: () =>
        p.text({
          message: "Project name:",
          placeholder: "my-app",
          validate: (v) => (v ? undefined : "Name is required"),
        }),
      theme: () =>
        p.select({
          message: "Default theme:",
          options: [
            { value: "dark", label: "Dark", hint: "recommended" },
            { value: "light", label: "Light" },
            { value: "system", label: "System", hint: "follows OS preference" },
          ],
        }),
      aiAssistant: () =>
        p.select({
          message: "Which AI assistant do you use?",
          options: [
            { value: "claude", label: "Claude Code", hint: "Anthropic" },
            { value: "cursor", label: "Cursor", hint: "AI-first editor" },
            { value: "copilot", label: "GitHub Copilot" },
            { value: "windsurf", label: "Windsurf", hint: "Codeium" },
            { value: "none", label: "None", hint: "skip AI config" },
          ],
        }),
      startDocker: () =>
        p.confirm({
          message: "Start PostgreSQL with Docker?",
          initialValue: true,
        }),
    },
    {
      onCancel: () => {
        p.cancel("Setup cancelled");
        process.exit(0);
      },
    }
  );

  const s = p.spinner();

  // Update package.json
  s.start("Updating package.json...");
  try {
    const pkgPath = "package.json";
    const pkg = JSON.parse(await readFile(pkgPath, "utf-8"));
    pkg.name = config.name;
    await writeFile(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
    s.stop("package.json updated");
  } catch {
    s.stop("Error updating package.json");
  }

  // Update theme in layout.tsx
  s.start("Configuring theme...");
  try {
    const layoutPath = "src/app/layout.tsx";
    let layout = await readFile(layoutPath, "utf-8");
    layout = layout.replace(
      /defaultTheme="(dark|light|system)"/,
      `defaultTheme="${config.theme}"`
    );
    await writeFile(layoutPath, layout);
    s.stop(`Theme set to ${config.theme}`);
  } catch {
    s.stop("Error configuring theme");
  }

  // Generate AI config
  if (config.aiAssistant !== "none") {
    s.start(`Generating ${config.aiAssistant} config...`);
    try {
      const aiConfig = AI_CONFIGS[config.aiAssistant as AIProvider];
      const content = aiConfig.content("app");

      // Create directory if needed (for copilot)
      if (aiConfig.filename.includes("/")) {
        const dir = aiConfig.filename.split("/").slice(0, -1).join("/");
        await mkdir(dir, { recursive: true });
      }

      await writeFile(aiConfig.filename, content);
      s.stop(`${aiConfig.filename} created`);
    } catch {
      s.stop("Error generating AI config");
    }
  }

  // Create .env if not exists
  s.start("Checking .env...");
  if (!(await fileExists(".env"))) {
    await writeFile(".env", ENV_TEMPLATE);
    s.stop(".env created");
  } else {
    s.stop(".env already exists");
  }

  // Start Docker
  if (config.startDocker) {
    s.start("Starting PostgreSQL with Docker...");
    try {
      await $`docker compose up -d`.quiet();
      s.stop("PostgreSQL started");
      // Wait for DB to be ready
      await Bun.sleep(2000);
    } catch {
      s.stop("Error starting Docker (is Docker running?)");
    }
  }

  // Generate Prisma client
  s.start("Generating Prisma client...");
  try {
    await $`bunx prisma generate`.quiet();
    s.stop("Prisma client generated");
  } catch {
    s.stop("Error generating Prisma client");
  }

  // Run migrations
  s.start("Running database migrations...");
  try {
    await $`bunx prisma migrate dev --name init`.quiet();
    s.stop("Migrations complete");
  } catch {
    s.stop("Error running migrations (is DB running?)");
  }

  // Seed demo user
  s.start("Creating demo user...");
  try {
    await $`bun run scripts/seed.ts`.quiet();
    s.stop("Demo user created");
  } catch {
    s.stop("Error creating demo user");
  }

  p.outro(pc.green("Setup complete!"));

  console.log();
  console.log(pc.bold("Next steps:"));
  console.log();
  console.log(`  ${pc.cyan("bun")} dev`);
  console.log();
  console.log(pc.bold("Demo credentials:"));
  console.log();
  console.log(`  Email: ${pc.cyan("demo@example.com")}`);
  console.log(`  Password: ${pc.cyan("demo1234")}`);
  console.log();
}

main().catch(console.error);
