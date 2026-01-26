#!/usr/bin/env bun

import * as p from "@clack/prompts";
import pc from "picocolors";
import { writeFile, access } from "node:fs/promises";
import { $ } from "bun";

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

  p.intro(pc.bgCyan(pc.black(" Database Setup ")));

  const config = await p.group(
    {
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
      s.stop(pc.yellow("Docker error (is Docker running?)"));
      console.log(pc.dim("  Start Docker and run 'bun setup' again"));
      console.log();
      process.exit(1);
    }
  }

  // Run Drizzle migrations
  s.start("Running database migrations...");
  try {
    await $`bunx drizzle-kit push`.quiet();
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
