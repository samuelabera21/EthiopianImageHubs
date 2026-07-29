import { Metadata } from "next";
import { AuthHeader } from "@/components/ui/auth-header";
import { Footer } from "@/components/ui/footer";
import { Container } from "@/components/ui/container";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { ImageDetailsClient } from "@/features/gallery/image-details-client";

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

  return (
    <div className="min-h-screen">
      <AuthHeader />
      <main>
        <SectionWrapper>
          <Container>
            <ImageDetailsClient imageId={id} />
          </Container>
        </SectionWrapper>
      </main>
      <Footer />
    </div>
  );
}
