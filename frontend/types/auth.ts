export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export interface ForgotPasswordResponse {
  success: true;
  message: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

export interface ApiFieldError {
  field: string;
  message: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: ApiFieldError[];
}

export interface AuthUserSummary {
  id: string;
  username: string;
  email: string;
  role: string;
  emailVerified: boolean;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  success: true;
  message: string;
  data: {
    user: AuthUserSummary;
    tokens: AuthTokens;
  };
}

export interface CurrentUser {
  id: string;
  username: string;
  email: string;
  role: string;
  emailVerified: boolean;
  status: string;
  createdAt: string;
  profile?: {
    displayName?: string | null;
    bio?: string | null;
    avatarUrl?: string | null;
  };
}

export interface GetCurrentUserResponse {
  success: boolean;
  data: CurrentUser;
}