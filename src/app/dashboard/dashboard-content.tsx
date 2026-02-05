"use client";

import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, User } from "lucide-react";
import Image from "next/image";

interface DashboardContentProps {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  };
}

export function DashboardContent({ user }: DashboardContentProps) {
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/nimbuslab-symbol.svg"
              alt="nimbuslab"
              width={32}
              height={32}
            />
            <h1 className="text-3xl font-bold font-heading">Dashboard</h1>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile
            </CardTitle>
            <CardDescription>Your account information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Name</p>
              <p className="text-lg">{user.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="text-lg">{user.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">User ID</p>
              <p className="font-mono text-sm text-muted-foreground">{user.id}</p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 rounded-lg border bg-muted/50 p-6">
          <h2 className="mb-2 text-lg font-semibold">Next steps</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Add more pages to your dashboard</li>
            <li>Connect to your database models</li>
            <li>Implement your business logic</li>
            <li>Customize the UI with shadcn/ui components</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
