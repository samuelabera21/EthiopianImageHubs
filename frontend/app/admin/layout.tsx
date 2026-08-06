import Link from "next/link";
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
              <div className="flex items-end justify-between border-b pb-4">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                  <p className="text-muted-foreground mt-2">Manage the platform</p>
                </div>
                <nav className="flex gap-4">
                  <Link href="/admin/users" className="text-sm font-medium text-muted-foreground hover:text-foreground">Users</Link>
                  <Link href="/admin/applications" className="text-sm font-medium text-muted-foreground hover:text-foreground">Applications</Link>
                  <Link href="/admin/categories" className="text-sm font-medium text-muted-foreground hover:text-foreground">Categories</Link>
                  <Link href="/admin/tags" className="text-sm font-medium text-muted-foreground hover:text-foreground">Tags</Link>
                </nav>
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
