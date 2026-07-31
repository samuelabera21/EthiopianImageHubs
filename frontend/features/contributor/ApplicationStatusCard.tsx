"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContributorApplication } from "@/types/contributor";

interface ApplicationStatusCardProps {
  application: ContributorApplication;
}

export function ApplicationStatusCard({ application }: ApplicationStatusCardProps) {
  const isPending = application.status === "PENDING";
  const isApproved = application.status === "APPROVED";
  const isRejected = application.status === "REJECTED";

  return (
    <Card className="overflow-hidden p-8">
      <div className="flex flex-col items-center justify-center space-y-6 text-center">
        {isPending && (
          <>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10 text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Application Under Review
              </h2>
              <p className="mx-auto max-w-md text-muted-foreground">
                We have received your application to become a contributor. Our team is currently reviewing it. We will notify you once a decision is made.
              </p>
            </div>
          </>
        )}

        {isApproved && (
          <>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Application Approved!
              </h2>
              <p className="mx-auto max-w-md text-muted-foreground">
                Welcome! You are now a contributor. You can start uploading and sharing your photography with the community.
              </p>
            </div>
            <div className="mt-6">
              <Button href="/upload">Go to Upload</Button>
            </div>
          </>
        )}

        {isRejected && (
          <>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-danger/10 text-danger">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Application Rejected
              </h2>
              <p className="mx-auto max-w-md text-muted-foreground">
                Unfortunately, your application to become a contributor was not approved at this time.
              </p>
              {application.adminNote && (
                <div className="mt-4 rounded-xl border border-border bg-background p-4 text-left">
                  <p className="text-sm font-medium text-foreground">Feedback from Admin:</p>
                  <p className="mt-1 text-sm text-muted-foreground">{application.adminNote}</p>
                </div>
              )}
            </div>
            <div className="mt-6">
              <Button href="/">Return to Home</Button>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}
