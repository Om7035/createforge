import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-5xl w-full items-center justify-between font-mono text-sm">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome to Your SaaS
            </h1>
            <p className="text-xl text-muted-foreground">
              Built with CreateForge — Production-ready in minutes
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>

          <div className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon="⚡"
              title="Lightning Fast"
              description="Built on Next.js 14 with App Router for optimal performance"
            />
            <FeatureCard
              icon="🔒"
              title="Secure by Default"
              description="Authentication with Clerk, tested and production-ready"
            />
            <FeatureCard
              icon="💳"
              title="Payments Ready"
              description="Stripe integration with subscriptions and webhooks"
            />
          </div>

          <div className="pt-8 text-sm text-muted-foreground">
            <p>
              ✨ Demo data is seeded — try logging in with test accounts
            </p>
            <p className="pt-2">
              Built with{" "}
              <a
                href="https://forge.dev"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                CreateForge
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="border rounded-lg p-6 space-y-2 hover:shadow-lg transition-shadow">
      <div className="text-4xl">{icon}</div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
