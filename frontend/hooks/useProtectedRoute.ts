"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/authentication/provider/AuthProvider";

interface UseProtectedRouteOptions {
  allowedRoles?: string[];
}

export function useProtectedRoute(options?: UseProtectedRouteOptions) {
  const { isAuthenticated, isLoading, currentUser } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (options?.allowedRoles && currentUser) {
      if (!options.allowedRoles.includes(currentUser.role)) {
        router.push("/");
        return;
      }
    }

    setIsAuthorized(true);
  }, [isLoading, isAuthenticated, currentUser, options?.allowedRoles, router]);

  return { isAuthenticated, isLoading, isAuthorized };
}
