import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";

const AUTH_STORAGE_KEYS = {
  accessToken: "ethiopiahub_images_access_token",
  refreshToken: "ethiopiahub_images_refresh_token",
} as const;

function getApiBaseUrl(): string {
  if (typeof window === "undefined") {
    return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";
  }
  return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";
}

function getStoredTokens() {
  if (typeof window === "undefined") {
    return { accessToken: null, refreshToken: null };
  }

  return {
    accessToken: window.localStorage.getItem(AUTH_STORAGE_KEYS.accessToken),
    refreshToken: window.localStorage.getItem(AUTH_STORAGE_KEYS.refreshToken),
  };
}

function setStoredTokens(accessToken: string, refreshToken: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(AUTH_STORAGE_KEYS.accessToken, accessToken);
  window.localStorage.setItem(AUTH_STORAGE_KEYS.refreshToken, refreshToken);
}

function clearStoredTokens() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEYS.accessToken);
  window.localStorage.removeItem(AUTH_STORAGE_KEYS.refreshToken);
}

interface ApiRefreshResponse {
  success: boolean;
  data: {
    accessToken: string;
  };
}

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessTokenAsync(): Promise<string | null> {
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;

  refreshPromise = (async () => {
    try {
      const { refreshToken } = getStoredTokens();
      if (!refreshToken) {
        clearStoredTokens();
        return null;
      }

      const response = await axios.post<ApiRefreshResponse>(
        `${getApiBaseUrl()}/auth/refresh`,
        { refreshToken }
      );

      const newAccessToken = response.data.data.accessToken;

      // The refresh endpoint only issues a new access token; the refresh
      // token stays valid, so we preserve the existing one.
      setStoredTokens(newAccessToken, refreshToken);
      return newAccessToken;
    } catch {
      clearStoredTokens();
      return null;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

function createApiClient(): AxiosInstance {
  const client = axios.create({
    baseURL: getApiBaseUrl(),
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Request interceptor: add auth token
  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const { accessToken } = getStoredTokens();
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor: handle 401 with auto-refresh
  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const newAccessToken = await refreshAccessTokenAsync();

        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return client(originalRequest);
        }

        // Refresh failed, clear tokens
        clearStoredTokens();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }

      return Promise.reject(error);
    }
  );

  return client;
}

export const apiClient = createApiClient();

// Token management utilities for AuthProvider
export function persistTokens(accessToken: string, refreshToken: string) {
  setStoredTokens(accessToken, refreshToken);
}

export function getTokens() {
  return getStoredTokens();
}

export function removeTokens() {
  clearStoredTokens();
}
