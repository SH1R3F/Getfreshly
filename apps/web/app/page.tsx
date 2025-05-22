import { Button } from "@repo/ui/components/button";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import Hero from "@/assets/hero.png";

export default function Home() {
  return (
    <main className="flex flex-col dark:bg-black bg-slate-50 min-h-dvh relative mt-[-84px]">
      {/* Hero Section */}
      <section
        className="flex flex-col items-center h-dvh bg-red-50 bg-cover justify-center px-4 py-24 md:py-32 lg:py-40 text-center shadow-md dark:invert"
        style={{ backgroundImage: `url(${Hero.src})` }}
      >
        <div className="max-w-3xl mx-auto space-y-6 dark:invert">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Get Freshly
          </h1>
          <p className="text-xl text-muted-foreground md:text-2xl">
            Your all-in-one PPC tool, powered by AI
          </p>
        </div>
      </section>
    </main>
  );
}
