import { ProtectedRoute } from "@/components/auth/protected-route";
import { AuthHeader } from "@/components/ui/auth-header";
import { Footer } from "@/components/ui/footer";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthHeader />
      <main className="flex-1 bg-gray-50/50">
        <ProtectedRoute allowedRoles={["ADMIN"]}>
          <div className="container mx-auto py-8">
            <div className="flex flex-col gap-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                <p className="text-muted-foreground mt-2">Manage the platform</p>
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
