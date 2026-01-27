import { db, user, account } from "../src/db";
import { hashPassword } from "better-auth/crypto";

async function seed() {
  console.log("Seeding database...");

  // Create demo user
  const hashedPassword = await hashPassword("demo1234");

  const [demoUser] = await db
    .insert(user)
    .values({
      id: "demo-user-id",
      name: "Demo User",
      email: "demo@example.com",
      emailVerified: true,
    })
    .onConflictDoNothing()
    .returning();

  if (demoUser) {
    await db
      .insert(account)
      .values({
        id: "demo-account-id",
        accountId: "demo-user-id",
        providerId: "credential",
        userId: demoUser.id,
        password: hashedPassword,
      })
      .onConflictDoNothing();

    console.log("Demo user created:");
    console.log("  Email: demo@example.com");
    console.log("  Password: demo1234");
  } else {
    console.log("Demo user already exists");
  }

  console.log("Seeding complete!");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});
