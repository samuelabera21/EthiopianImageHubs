import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Footer } from "@/components/ui/footer";
import { Header } from "@/components/ui/header";
import { ForgotPasswordForm } from "@/features/authentication/forgot-password/forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Reset your EthiopiaHub Images account password.",
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen">
      <Header variant="minimal" />

      <main className="relative isolate overflow-hidden py-12 sm:py-16 lg:py-20">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,_rgba(46,139,87,0.08),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(139,90,43,0.08),_transparent_24%)]" />
        <Container>
          <div className="mx-auto grid max-w-2xl gap-6">
            <ForgotPasswordForm />
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
