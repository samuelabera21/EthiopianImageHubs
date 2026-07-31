import { apiClient } from "./api";
import type {
  ApplyContributorRequest,
  ContributorApplicationResponse,
  ContributorApplicationListResponse,
  ReviewContributorApplicationRequest,
} from "../types/contributor";

/**
 * Apply to become a contributor
 */
export async function applyForContributor(payload: ApplyContributorRequest) {
  const response = await apiClient.post<ContributorApplicationResponse>(
    "/contributors/apply",
    payload,
  );
  return response.data;
}

/**
 * Get the current user's contributor application
 */
export async function getContributorApplication() {
  const response = await apiClient.get<ContributorApplicationResponse>(
    "/contributors/application",
  );
  return response.data;
}

/**
 * Admin: Get all contributor applications
 */
export async function getContributorApplications(params?: {
  status?: string;
  page?: string;
  limit?: string;
}) {
  const searchParams = new URLSearchParams();
  if (params?.status) searchParams.append("status", params.status);
  if (params?.page) searchParams.append("page", params.page);
  if (params?.limit) searchParams.append("limit", params.limit);

  const query = searchParams.toString() ? `?${searchParams.toString()}` : "";
  const response = await apiClient.get<ContributorApplicationListResponse>(
    `/admin/contributor-applications${query}`,
  );
  return response.data;
}

/**
 * Admin: Review a contributor application
 */
export async function reviewContributorApplication(
  applicationId: string,
  payload: ReviewContributorApplicationRequest,
) {
  const response = await apiClient.patch<ContributorApplicationResponse>(
    `/admin/contributor-applications/${applicationId}`,
    payload,
  );
  return response.data;
}
