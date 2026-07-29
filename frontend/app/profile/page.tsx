import { Metadata } from "next";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { ProfileContent } from "@/features/authentication/profile/profile-content";

export const metadata: Metadata = {
  title: "Profile",
  description: "View and manage your EthiopiaHub Images account profile.",
};

export default function ProfilePage() {
  return (
    <>
      <Header variant="minimal" />
      <main className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <ProfileContent />
        </div>
      </main>
      <Footer />
    </>
  );
}
