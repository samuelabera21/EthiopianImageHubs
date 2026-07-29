import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/ui/search-bar";
import { cn } from "@/lib/cn";

interface HeroProps {
  className?: string;
}

export function Hero({ className }: HeroProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden py-6 sm:py-8 lg:py-10",
        className,
      )}
    >
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,_rgba(46,139,87,0.06),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(139,90,43,0.06),_transparent_28%)]" />
      <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div className="flex flex-col items-start gap-4 text-left">
          <div className="space-y-4">
            <p className="inline-flex items-center rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-secondary shadow-card">
              Ethiopia through a modern lens
            </p>
            <h1 className="max-w-4xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-5xl">
              Discover Ethiopia&apos;s visual stories in a calm, premium image library.
            </h1>
            <p className="max-w-2xl text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
              Explore landscapes, coffee culture, architecture, wildlife, and people through a thoughtfully designed photography experience.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="#featured-images" size="lg">
              Explore featured images
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button href="#collections" size="lg" variant="outline">
              Browse collections
            </Button>
          </div>
          <SearchBar
            ariaLabel="Search featured Ethiopian images"
            className="w-full max-w-2xl bg-surface/95"
            placeholder="Search landscapes, coffee ceremonies, architecture, and more"
          />
        </div>

        <div className="relative mx-auto grid w-full max-w-[620px] grid-cols-2 gap-4 self-start lg:-mt-8 lg:justify-self-end">
          <div className="group relative overflow-hidden rounded-[28px] border border-border bg-surface shadow-elevated aspect-[3/4] transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_36px_90px_rgba(16,47,30,0.18)]">
            <Image
              alt="Ethiopian landscape aerial view placeholder"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              fill
              priority
              sizes="(max-width: 1024px) 50vw, 35vw"
              src="/placeholders/ethiopia-landscape-1.jpg"
            />
          </div>
          <div className="group relative overflow-hidden rounded-[28px] border border-border bg-surface shadow-elevated aspect-[3/4] translate-y-6 transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_36px_90px_rgba(16,47,30,0.18)]">
            <Image
              alt="Ethiopian coffee culture placeholder"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              fill
              sizes="(max-width: 1024px) 50vw, 35vw"
              src="/placeholders/ethiopia-coffee-2.jpg"
            />
          </div>
          <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-8 right-4 h-28 w-28 rounded-full bg-secondary/10 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
