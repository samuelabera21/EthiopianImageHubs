"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { loginUser } from "@/services/auth.service";
import { registerUser } from "@/services/register.service";
import { logoutUser } from "@/services/logout.service";
import { apiClient, persistTokens, removeTokens, getTokens } from "@/services/api";
import type {
  LoginRequest,
  RegisterRequest,
  CurrentUser,
  GetCurrentUserResponse,
} from "@/types/auth";

interface AuthContextType {
  currentUser: CurrentUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginRequest) => Promise<void>;
  register: (payload: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<boolean>;
  getCurrentUser: () => Promise<CurrentUser | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage and fetch user
  useEffect(() => {
    async function initializeAuth() {
      setIsLoading(true);
      try {
        const { accessToken } = getTokens();

        if (!accessToken) {
          setIsAuthenticated(false);
          setCurrentUser(null);
          return;
        }

        // Fetch current user to validate token and populate user data
        const response = await apiClient.get<GetCurrentUserResponse>("/auth/me");
        const user = response.data.data;

        setCurrentUser(user);
        setIsAuthenticated(true);
      } catch {
        // Token invalid or expired
        removeTokens();
        setIsAuthenticated(false);
        setCurrentUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    initializeAuth();
  }, []);

  const login = async (payload: LoginRequest) => {
    setIsLoading(true);
    try {
      const response = await loginUser(payload);
      const { tokens } = response.data;

      persistTokens(tokens.accessToken, tokens.refreshToken);

      // Fetch full user data from /auth/me
      const meResponse = await apiClient.get<GetCurrentUserResponse>("/auth/me");
      const fullUser = meResponse.data.data;

      setCurrentUser(fullUser);
      setIsAuthenticated(true);
    } catch (error) {
      removeTokens();
      setIsAuthenticated(false);
      setCurrentUser(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (payload: RegisterRequest) => {
    setIsLoading(true);
    try {
      const response = await registerUser(payload);
      const { tokens } = response.data;

      persistTokens(tokens.accessToken, tokens.refreshToken);

      // Fetch full user data from /auth/me
      const meResponse = await apiClient.get<GetCurrentUserResponse>("/auth/me");
      const fullUser = meResponse.data.data;

      setCurrentUser(fullUser);
      setIsAuthenticated(true);
    } catch (error) {
      removeTokens();
      setIsAuthenticated(false);
      setCurrentUser(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch {
      // Continue with local logout even if backend call fails
    } finally {
      removeTokens();
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
  };

  const getCurrentUser = async (): Promise<CurrentUser | null> => {
    try {
      const response = await apiClient.get<GetCurrentUserResponse>("/auth/me");
      const user = response.data.data;
      setCurrentUser(user);
      return user;
    } catch {
      removeTokens();
      setIsAuthenticated(false);
      setCurrentUser(null);
      return null;
    }
  };

  const refreshAccessToken = async (): Promise<boolean> => {
    try {
      // The apiClient interceptor handles refresh automatically
      // This method can be used to manually trigger a refresh if needed
      const response = await apiClient.get<GetCurrentUserResponse>("/auth/me");
      const user = response.data.data;
      setCurrentUser(user);
      return true;
    } catch {
      removeTokens();
      setIsAuthenticated(false);
      setCurrentUser(null);
      return false;
    }
  };

  const value: AuthContextType = {
    currentUser,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    refreshAccessToken,
    getCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
