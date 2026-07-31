export type Role = "USER" | "CONTRIBUTOR" | "MODERATOR" | "ADMIN";

export type ApplicationStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface ContributorApplication {
  id: string;
  userId: string;
  message: string | null;
  status: ApplicationStatus;
  adminNote: string | null;
  reviewedById: string | null;
  reviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    username: string;
    email: string;
  };
}

export interface ApplyContributorRequest {
  message?: string;
}

export interface ReviewContributorApplicationRequest {
  status: "APPROVED" | "REJECTED";
  adminNote?: string;
}

export interface ContributorApplicationResponse {
  success: boolean;
  message: string;
  data: ContributorApplication;
}

export interface ContributorApplicationListResponse {
  success: boolean;
  message: string;
  data: ContributorApplication[];
}
