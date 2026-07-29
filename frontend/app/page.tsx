import { ArrowRight } from "lucide-react";
import { CategoryCard } from "@/components/ui/category-card";
import { CollectionCard } from "@/components/ui/collection-card";
import { Container } from "@/components/ui/container";
import { CTASection } from "@/components/ui/cta-section";
import { EmptyState } from "@/components/ui/empty-state";
import { Footer } from "@/components/ui/footer";
import { AuthHeader } from "@/components/ui/auth-header";
import { Hero } from "@/components/ui/hero";
import { ImageCard } from "@/components/ui/image-card";
import { SkeletonCard } from "@/components/ui/skeleton-card";
import { SectionTitle } from "@/components/ui/section-title";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { StatsCard } from "@/components/ui/stats-card";
import {
  collections,
  communityStats,
  featureHighlights,
  featuredImages,
  trendingCategories,
  values,
} from "@/lib/home-data";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="border-b border-border/70 bg-secondary text-secondary-foreground">
        <Container>
          <div className="flex flex-col gap-3 py-3 text-sm sm:flex-row sm:items-center sm:justify-between">
            <p className="font-medium">
              New to EthiopiaHub Images? Discover curated Ethiopian photography built for fast browsing.
            </p>
            <a className="inline-flex items-center gap-2 font-semibold transition-opacity hover:opacity-90" href="#cta">
              Join the community <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </Container>
      </div>

      <AuthHeader />

      <main>
        <Container>
          <Hero />
        </Container>

        <SectionWrapper id="trending-categories" tone="muted">
          <Container>
            <div className="space-y-10">
              <SectionTitle
                eyebrow="Trending categories"
                title="Start exploring the parts of Ethiopia people search for most."
                description="These category cards act as a reusable pattern for discovery-driven pages and future filtered views."
              />
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {trendingCategories.map((category) => (
                  <CategoryCard key={category.title} category={category} />
                ))}
              </div>
            </div>
          </Container>
        </SectionWrapper>

        <SectionWrapper id="featured-images">
          <Container>
            <div className="space-y-10">
              <SectionTitle
                eyebrow="Featured images"
                title="A masonry-style grid that keeps the photography front and center."
                description="Placeholder visuals are used here so the layout can later connect to real backend content without changing the structure."
              />
              <div className="columns-1 gap-4 space-y-4 sm:columns-2 xl:columns-3 2xl:columns-4">
                {featuredImages.map((image) => (
                  <div key={image.title} className="break-inside-avoid pb-4">
                    <ImageCard image={image} />
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </SectionWrapper>

        <SectionWrapper id="collections" tone="muted">
          <Container>
            <div className="space-y-10">
              <SectionTitle
                eyebrow="Explore collections"
                title="Editorial groupings that help users move through the library with intent."
                description="These cards can later be reused on collection indexes, landing pages, and category detail views."
              />
              <div className="grid gap-6 lg:grid-cols-3">
                {collections.map((collection) => (
                  <CollectionCard key={collection.title} collection={collection} />
                ))}
              </div>
            </div>
          </Container>
        </SectionWrapper>

        <SectionWrapper id="why-ethiohub-images">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
              <SectionTitle
                eyebrow="Why EthiopiaHub Images"
                title="A design foundation built to support future product pages without redesigning them."
                description="The same sections, cards, and controls can later power login, upload, gallery, profile, and dashboard experiences."
              />
              <div className="grid gap-4">
                {featureHighlights.map((feature) => (
                  <article key={feature.title} className="rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-card">
                    <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.description}</p>
                  </article>
                ))}
              </div>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {values.slice(0, 3).map((value) => (
                <article key={value.title} className="rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-card">
                  <value.icon className="h-6 w-6 text-secondary" aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{value.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{value.description}</p>
                </article>
              ))}
            </div>
          </Container>
        </SectionWrapper>

        <SectionWrapper id="community" tone="muted">
          <Container>
            <div className="space-y-10">
              <SectionTitle
                eyebrow="Community statistics"
                title="Real engagement metrics help the platform feel alive, even before backend data arrives."
                description="The stat card pattern can be reused later for dashboard widgets, profile summaries, and admin reporting."
              />
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {communityStats.map((stat) => (
                  <StatsCard key={stat.label} stat={stat} />
                ))}
              </div>
            </div>
          </Container>
        </SectionWrapper>

        <SectionWrapper id="cta">
          <Container>
            <CTASection
              title="Join EthiopiaHub Images and help shape Ethiopia's visual library."
              description="The home page sets the visual system for the entire product, so future pages can stay consistent and reuse the same components without reinventing the UI."
              primaryLabel="Register interest"
              primaryHref="#footer"
              secondaryLabel="Contact the team"
              secondaryHref="#footer"
            />
          </Container>
        </SectionWrapper>

        <SectionWrapper tone="muted">
          <Container>
            <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-start">
              <div className="space-y-4">
                <SectionTitle
                  eyebrow="Loading and empty states"
                  title="The reusable feedback components are ready for future data-driven pages."
                  description="They are included in the system now so later routes can show consistent loading, empty, and fallback experiences."
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <EmptyState
                  title="No images yet"
                  description="This state will be used when future pages have no results to show."
                  actionLabel="Browse categories"
                  actionHref="#trending-categories"
                />
                <SkeletonCard lines={3} showAvatar />
              </div>
            </div>
          </Container>
        </SectionWrapper>
      </main>

      <Footer />
    </div>
  );
}
