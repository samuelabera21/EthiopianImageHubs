import axios from "axios";
import type { ApiErrorResponse, ApiFieldError } from "@/types/auth";

export class AuthServiceError extends Error {
  status?: number;
  fieldErrors: ApiFieldError[];

  constructor(
    message: string,
    options?: { status?: number; fieldErrors?: ApiFieldError[] },
  ) {
    super(message);
    this.name = "AuthServiceError";
    this.status = options?.status;
    this.fieldErrors = options?.fieldErrors ?? [];
  }
}

export function normalizeAuthError(error: unknown): AuthServiceError {
  if (!axios.isAxiosError(error)) {
    return new AuthServiceError("Unable to connect to the authentication service.");
  }

  const responseData = error.response?.data as ApiErrorResponse | undefined;
  const message =
    responseData?.message || error.message || "Unable to complete the request.";
  const fieldErrors = Array.isArray(responseData?.errors) ? responseData.errors : [];

  return new AuthServiceError(message, {
    status: error.response?.status,
    fieldErrors,
  });
}
