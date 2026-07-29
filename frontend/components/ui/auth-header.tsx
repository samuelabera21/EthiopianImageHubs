"use client";

import { useAuth } from "@/features/authentication/provider/AuthProvider";
import { Header } from "@/components/ui/header";

interface AuthHeaderProps {
  variant?: "default" | "minimal";
}

export function AuthHeader({ variant = "default" }: AuthHeaderProps) {
  const { isAuthenticated, currentUser, isLoading } = useAuth();

  if (isLoading || !isAuthenticated || !currentUser || variant === "minimal") {
    return <Header variant={variant} />;
  }

  return (
    <Header
      variant={variant}
      user={{
        username: currentUser.username,
        href: "/profile",
      }}
    />
  );
}
