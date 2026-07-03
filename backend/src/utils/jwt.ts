import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { env } from "../config/env";

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

/**
 * Generate Access Token
 */
export function generateAccessToken(
  payload: TokenPayload,
): string {
  return jwt.sign(
    payload,
    env.jwtAccessSecret,
    {
      expiresIn: env.jwtAccessExpiresIn as SignOptions["expiresIn"],
    },
  );
}

/**
 * Generate Refresh Token
 */
export function generateRefreshToken(
  payload: TokenPayload,
): string {
  return jwt.sign(
    payload,
    env.jwtRefreshSecret,
    {
      expiresIn: env.jwtRefreshExpiresIn as SignOptions["expiresIn"],
    },
  );
}

/**
 * Verify Access Token
 */
export function verifyAccessToken(
  token: string,
): JwtPayload {
  return jwt.verify(
    token,
    env.jwtAccessSecret,
  ) as JwtPayload;
}

/**
 * Verify Refresh Token
 */
export function verifyRefreshToken(
  token: string,
): JwtPayload {
  return jwt.verify(
    token,
    env.jwtRefreshSecret,
  ) as JwtPayload;
}