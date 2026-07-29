import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/cn";
import { footerLinks, footerSummary } from "@/lib/home-data";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer id="footer" className={cn("border-t border-border bg-background py-16", className)}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <Logo />
            <p className="max-w-md text-sm leading-6 text-muted-foreground">
              {footerSummary}
            </p>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              Explore
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {footerLinks.explore.map((item) => (
                <li key={item.label}>
                  <Link className="transition-colors hover:text-foreground" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              Community
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {footerLinks.community.map((item) => (
                <li key={item.label}>
                  <Link className="transition-colors hover:text-foreground" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              Legal
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {footerLinks.legal.map((item) => (
                <li key={item.label}>
                  <Link className="transition-colors hover:text-foreground" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground">
          © 2026 EthiopiaHub Images. Built to celebrate Ethiopian photography.
        </div>
      </Container>
    </footer>
  );
}
