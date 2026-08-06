import { Metadata } from "next";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { ProfileEditContent } from "@/features/authentication/profile/profile-edit-content";

export const metadata: Metadata = {
  title: "Edit Profile",
  description: "Update your EthiopiaHub Images account profile.",
};

export default function ProfileEditPage() {
  return (
    <>
      <Header variant="minimal" />
      <main className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <ProfileEditContent />
        </div>
      </main>
      <Footer />
    </>
  );
}
