import { ProtectedRoute } from "@/components/auth/protected-route";
import { AuthHeader } from "@/components/ui/auth-header";
import { Footer } from "@/components/ui/footer";

export default function ModerationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthHeader />
      <main className="flex-1 bg-gray-50/50">
        <ProtectedRoute allowedRoles={["MODERATOR", "ADMIN"]}>
          <div className="container mx-auto py-8">
            <div className="flex flex-col gap-8">
              <div className="flex items-end justify-between border-b pb-4">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Moderation Queue</h1>
                  <p className="text-muted-foreground mt-2">Review pending image submissions</p>
                </div>
              </div>
              {children}
            </div>
          </div>
        </ProtectedRoute>
      </main>
      <Footer />
    </>
  );
}
