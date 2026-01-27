#!/usr/bin/env bun

import * as p from "@clack/prompts";
import pc from "picocolors";
import { readFile, writeFile, access, mkdir } from "node:fs/promises";
import { $ } from "bun";
import { AI_CONFIGS, type AIProvider } from "./ai-configs";

const ENV_TEMPLATE = `# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/app"

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

async function isDockerInstalled(): Promise<boolean> {
  try {
    await $`docker --version`.quiet();
    return true;
  } catch {
    return false;
  }
}

async function isDockerRunning(): Promise<boolean> {
  try {
    await $`docker info`.quiet();
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

  // Check Docker status
  const dockerInstalled = await isDockerInstalled();
  const dockerRunning = dockerInstalled && (await isDockerRunning());

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
      dbOption: () =>
        p.select({
          message: "Database setup:",
          options: dockerRunning
            ? [
                { value: "docker", label: "Docker (local)", hint: "recommended" },
                { value: "cloud", label: "Cloud (Neon/Supabase)", hint: "configure .env manually" },
                { value: "skip", label: "Skip", hint: "configure later" },
              ]
            : dockerInstalled
              ? [
                  { value: "docker", label: "Docker (local)", hint: "Docker not running" },
                  { value: "cloud", label: "Cloud (Neon/Supabase)", hint: "recommended" },
                  { value: "skip", label: "Skip", hint: "configure later" },
                ]
              : [
                  { value: "install", label: "Install Docker", hint: "show instructions" },
                  { value: "cloud", label: "Cloud (Neon/Supabase)", hint: "recommended" },
                  { value: "skip", label: "Skip", hint: "configure later" },
                ],
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

  // Handle database setup based on option
  let dbReady = false;

  if (config.dbOption === "install") {
    // Show Docker installation instructions
    p.note(
      `${pc.bold("Linux/WSL:")}
  curl -fsSL https://get.docker.com | sh
  sudo usermod -aG docker $USER
  ${pc.dim("(logout and login again)")}

${pc.bold("macOS:")}
  brew install --cask docker
  ${pc.dim("(or download from docker.com)")}

${pc.bold("Windows:")}
  Download Docker Desktop from docker.com

${pc.dim("After installing, run:")} ${pc.cyan("bun setup")}`,
      "Install Docker"
    );
  } else if (config.dbOption === "docker") {
    if (!dockerRunning) {
      p.log.warn("Docker is not running. Start Docker and run setup again.");
      p.note(
        `${pc.bold("Start Docker:")}
  sudo systemctl start docker
  ${pc.dim("or open Docker Desktop")}

${pc.dim("Then run:")} ${pc.cyan("bun setup")}`,
        "Docker not running"
      );
    } else {
      s.start("Starting PostgreSQL with Docker...");
      try {
        await $`docker compose up -d`.quiet();
        s.stop("PostgreSQL started");
        // Wait for DB to be ready
        await Bun.sleep(2000);
        dbReady = true;
      } catch {
        s.stop("Error starting Docker");
      }
    }
  } else if (config.dbOption === "cloud") {
    p.note(
      `${pc.bold("1. Create a free database:")}
  ${pc.cyan("https://neon.tech")} ${pc.dim("(recommended)")}
  ${pc.cyan("https://supabase.com")}

${pc.bold("2. Copy the connection string to .env:")}
  DATABASE_URL="postgresql://user:pass@host/db"

${pc.bold("3. Run migrations:")}
  ${pc.cyan("bun db:push")}

${pc.bold("4. Create demo user:")}
  ${pc.cyan("bun seed")}`,
      "Cloud Database Setup"
    );
  }

  // Run migrations and seed if DB is ready
  if (dbReady) {
    s.start("Running database migrations...");
    try {
      await $`bunx drizzle-kit push`.quiet();
      s.stop("Migrations complete");
    } catch {
      s.stop("Error running migrations");
    }

    s.start("Creating demo user...");
    try {
      await $`bun run scripts/seed.ts`.quiet();
      s.stop("Demo user created");
    } catch {
      s.stop("Error creating demo user");
    }
  }

  p.outro(pc.green("Setup complete!"));

  console.log();
  console.log(pc.bold("Next steps:"));
  console.log();

  if (!dbReady && config.dbOption !== "skip") {
    console.log(`  ${pc.yellow("1.")} Configure database (see instructions above)`);
    console.log(`  ${pc.yellow("2.")} ${pc.cyan("bun db:push")} - Run migrations`);
    console.log(`  ${pc.yellow("3.")} ${pc.cyan("bun seed")} - Create demo user`);
    console.log(`  ${pc.yellow("4.")} ${pc.cyan("bun dev")} - Start development`);
  } else if (dbReady) {
    console.log(`  ${pc.cyan("bun")} dev`);
    console.log();
    console.log(pc.bold("Demo credentials:"));
    console.log();
    console.log(`  Email: ${pc.cyan("demo@example.com")}`);
    console.log(`  Password: ${pc.cyan("demo1234")}`);
  } else {
    console.log(`  ${pc.cyan("bun")} dev`);
    console.log();
    console.log(pc.dim("  Note: Configure database when ready"));
  }

  console.log();
}

main().catch(console.error);
