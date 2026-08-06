import { Metadata } from "next";
import { AuthHeader } from "@/components/ui/auth-header";
import { Footer } from "@/components/ui/footer";
import { Container } from "@/components/ui/container";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionTitle } from "@/components/ui/section-title";
import { ImageCard } from "@/components/ui/image-card";
import { ImageDetailsClient } from "@/features/gallery/image-details-client";
import { discoveryService } from "@/services/discovery.service";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Image ${id} | EthiopiaHub Images`,
    description: "View image details, download, and explore related images.",
  };
}

export default async function ImageDetailsPage({ params }: PageProps) {
  const { id } = await params;
  
  // Fetch recommended images for this image
  const recommendedRes = await discoveryService.getRecommendedImages(id, 8);
  const recommendedImages = recommendedRes.data || [];

  return (
    <div className="min-h-screen">
      <AuthHeader />
      <main>
        <SectionWrapper>
          <Container>
            <ImageDetailsClient imageId={id} />
          </Container>
        </SectionWrapper>

        {recommendedImages.length > 0 && (
          <SectionWrapper id="related-images" tone="muted">
            <Container>
              <div className="space-y-10">
                <SectionTitle
                  eyebrow="More like this"
                  title="Related images you might like"
                  description="Explore similar photography from the community."
                />
                <div className="columns-1 gap-4 space-y-4 sm:columns-2 xl:columns-3 2xl:columns-4">
                  {recommendedImages.map((image) => (
                    <div key={image.id} className="break-inside-avoid pb-4">
                      <ImageCard image={image} />
                    </div>
                  ))}
                </div>
              </div>
            </Container>
          </SectionWrapper>
        )}
      </main>
      <Footer />
    </div>
  );
}
