import Link from "next/link";
import { Menu, MoonStar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SearchBar } from "@/components/ui/search-bar";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/cn";
import { headerActions, navigationItems } from "@/lib/home-data";

interface HeaderProps {
  className?: string;
  variant?: "default" | "minimal";
  user?: { username: string; href?: string };
}

export function Header({ className, variant = "default", user }: HeaderProps) {
  const isMinimal = variant === "minimal";

  return (
    <header
      className={cn(
        "sticky top-0 z-[300] border-b border-border/70 bg-background/92 backdrop-blur-md",
        className,
      )}
    >
      <Container className="py-4">
        <div className={cn("flex items-center gap-4", isMinimal ? "justify-between" : "") }>
          <Logo />
          {isMinimal ? (
            <div className="flex items-center gap-2">
              <Button href="/" variant="outline" size="sm">
                Back to home
              </Button>
            </div>
          ) : (
            <>
              <nav className="hidden flex-1 items-center justify-center gap-2 lg:flex" aria-label="Primary">
                {navigationItems.map((item) => (
                  <Link
                    key={item.label}
                    className="rounded-full px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-secondary"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="hidden min-w-0 flex-1 max-w-xl xl:block">
                <SearchBar
                  ariaLabel={headerActions.searchPlaceholder}
                  placeholder={headerActions.searchPlaceholder}
                />
              </div>
              <div className="ml-auto flex items-center gap-2">
                {user ? (
                  <div className="flex items-center gap-2">
                    <Link
                      href={user.href || "/profile"}
                      className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-surface"
                    >
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-xs font-bold text-white">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      <span className="hidden sm:inline">{user.username}</span>
                    </Link>
                  </div>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" ariaLabel="Theme toggle placeholder">
                      <MoonStar className="h-4 w-4" aria-hidden="true" />
                      <span className="hidden sm:inline">Theme</span>
                    </Button>
                    <Button href={headerActions.loginHref} variant="outline" size="sm">
                      Login
                    </Button>
                    <Button href={headerActions.registerHref} size="sm">
                      Register
                    </Button>
                  </>
                )}
                <Button variant="ghost" size="sm" className="lg:hidden" ariaLabel="Open navigation menu">
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </Button>
              </div>
            </>
          )}
        </div>
      </Container>
      {isMinimal ? null : (
        <Container className="pb-4 lg:hidden">
          <SearchBar
            ariaLabel={headerActions.searchPlaceholder}
            placeholder={headerActions.searchPlaceholder}
          />
        </Container>
      )}
    </header>
  );
}
