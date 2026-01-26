#!/usr/bin/env bun

import { db } from "../src/db";
import { user, account } from "../src/db/schema";
import { eq } from "drizzle-orm";
import { hashPassword } from "better-auth/crypto";
import { randomUUID } from "crypto";

async function main() {
  // Check if demo user already exists
  const existingUser = await db
    .select()
    .from(user)
    .where(eq(user.email, "demo@example.com"))
    .limit(1);

  if (existingUser.length > 0) {
    console.log("Demo user already exists");
    return;
  }

  // Hash password using Better Auth's scrypt
  const hashedPassword = await hashPassword("demo1234");

  const userId = randomUUID();

  await db.insert(user).values({
    id: userId,
    email: "demo@example.com",
    name: "Demo User",
    emailVerified: true,
  });

  await db.insert(account).values({
    id: randomUUID(),
    accountId: "demo-account",
    providerId: "credential",
    userId: userId,
    password: hashedPassword,
  });

  console.log("Demo user created successfully");
}

main().catch(console.error);
