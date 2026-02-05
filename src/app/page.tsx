import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Database, Lock } from "lucide-react";
import Image from "next/image";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-muted/30">
        <div className="container relative mx-auto px-4 py-24 sm:py-32 lg:py-40">
          <div className="mx-auto max-w-4xl text-center">
            {/* Logo */}
            <div className="mb-8 flex justify-center">
              <Image
                src="/nimbuslab-symbol.svg"
                alt="nimbuslab"
                width={64}
                height={64}
              />
            </div>

            {/* Badge */}
            <div className="mb-8 inline-flex items-center rounded-full border border-border bg-background px-4 py-1.5 text-sm">
              <span className="mr-2 rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
                v1.0
              </span>
              <span className="text-muted-foreground">Production ready</span>
            </div>

            <h1 className="mb-6 font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Build your app{" "}
              <span className="text-primary">
                faster
              </span>
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              A production-ready template with Next.js 16, Better Auth, Drizzle, and shadcn/ui.
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
      <section className="container mx-auto px-4 py-24 lg:py-32">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="mb-4 font-heading text-3xl font-bold tracking-tight sm:text-5xl">
            Everything you{" "}
            <span className="text-primary">need</span>
          </h2>
          <p className="text-lg text-muted-foreground sm:text-xl">
            A complete foundation for building production-ready web applications
          </p>
        </div>

        <div className="mx-auto max-w-5xl grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Zap,
              title: "Next.js 16",
              description: "App Router, Server Components, and Turbopack for blazing-fast development",
            },
            {
              icon: Lock,
              title: "Better Auth",
              description: "Modern authentication with email/password and OAuth support",
            },
            {
              icon: Database,
              title: "Drizzle ORM",
              description: "Type-safe database access with PostgreSQL support",
            },
            {
              icon: Shield,
              title: "Type Safe",
              description: "Full TypeScript support with strict mode enabled",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="group relative h-full rounded-xl border-2 border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-muted">
                <feature.icon className="h-6 w-6 stroke-primary" />
              </div>
              <h3 className="mb-2 text-lg font-bold font-heading">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Image
              src="/nimbuslab-symbol.svg"
              alt="nimbuslab"
              width={24}
              height={24}
            />
            <span className="font-heading text-lg font-bold">create-next-app</span>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Built by{" "}
            <a
              href="https://nimbuslab.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              nimbuslab
            </a>
            {" "}with modern web technologies
          </p>
        </div>
      </footer>
    </main>
  );
}
