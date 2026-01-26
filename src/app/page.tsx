import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Database, Lock } from "lucide-react";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="container relative mx-auto px-4 py-24 sm:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Build your app{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                faster
              </span>
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              A production-ready template with Next.js 16, Better Auth, Prisma, and shadcn/ui.
              Start building your full-stack app today.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              {session ? (
                <Button size="lg" asChild>
                  <Link href="/dashboard" className="gap-2">
                    Go to Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button size="lg" asChild>
                    <Link href="/register" className="gap-2">
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/login">Sign In</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need
          </h2>
          <p className="mb-12 text-lg text-muted-foreground">
            A complete foundation for building production-ready web applications.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Zap,
              title: "Next.js 16",
              description: "App Router, Server Components, and Turbopack for blazing-fast development.",
            },
            {
              icon: Lock,
              title: "Better Auth",
              description: "Modern authentication with email/password and OAuth support.",
            },
            {
              icon: Database,
              title: "Prisma ORM",
              description: "Type-safe database access with PostgreSQL support.",
            },
            {
              icon: Shield,
              title: "Type Safe",
              description: "Full TypeScript support with strict mode enabled.",
            },
          ].map((feature) => (
            <div key={feature.title} className="rounded-lg border bg-muted/50 p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-sm text-muted-foreground">
            Made with{" "}
            <a
              href="https://github.com/nimbuslab/create-next-app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4 hover:text-foreground"
            >
              create-next-app
            </a>
            {" "}by nimbuslab
          </p>
        </div>
      </footer>
    </main>
  );
}
