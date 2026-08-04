import { Metadata } from "next";
import { AuthHeader } from "@/components/ui/auth-header";
import { Footer } from "@/components/ui/footer";
import { Container } from "@/components/ui/container";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { ContributorProfileClient } from "@/features/profile/contributor-profile-client";

interface PageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  return {
    title: `${username} | Contributor Profile`,
    description: `View ${username}'s profile and portfolio on EthiopiaHub Images.`,
  };
}

export default async function ContributorProfilePage({ params }: PageProps) {
  const { username } = await params;

  return (
    <div className="min-h-screen">
      <AuthHeader />
      <main>
        <SectionWrapper className="pt-8">
          <Container>
            <ContributorProfileClient username={username} />
          </Container>
        </SectionWrapper>
      </main>
      <Footer />
    </div>
  );
}
