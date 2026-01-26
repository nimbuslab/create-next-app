#!/usr/bin/env bun

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Check if demo user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: "demo@example.com" },
  });

  if (existingUser) {
    console.log("Demo user already exists");
    return;
  }

  // Create demo user with Better Auth compatible password hash
  // Password: demo1234
  const hashedPassword = await Bun.password.hash("demo1234", {
    algorithm: "bcrypt",
    cost: 10,
  });

  await prisma.user.create({
    data: {
      email: "demo@example.com",
      name: "Demo User",
      emailVerified: true,
      accounts: {
        create: {
          accountId: "demo-account",
          providerId: "credential",
          password: hashedPassword,
        },
      },
    },
  });

  console.log("Demo user created successfully");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
