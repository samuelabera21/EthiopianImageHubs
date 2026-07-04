import { authRepository } from "../repositories/auth.repository";

import { RegisterInput } from "../validators/auth.validator";

import { hashPassword } from "../utils/password";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwt";

import {
  generateToken,
  hashToken,
} from "../utils/token";

export class AuthService {
  /**
   * Register new user
   */
  async register(data: RegisterInput) {
    //------------------------------------
    // Check email
    //------------------------------------

    const emailExists =
      await authRepository.findByEmail(data.email);

    if (emailExists) {
      throw new Error("Email already exists");
    }

    //------------------------------------
    // Check username
    //------------------------------------

    const usernameExists =
      await authRepository.findByUsername(
        data.username,
      );

    if (usernameExists) {
      throw new Error("Username already exists");
    }

    //------------------------------------
    // Find default role
    //------------------------------------

    const role =
      await authRepository.findRoleByName("USER");

    if (!role) {
      throw new Error(
        "Default role not found",
      );
    }

    //------------------------------------
    // Hash password
    //------------------------------------

    const passwordHash =
      await hashPassword(data.password);

    //------------------------------------
    // Create user
    //------------------------------------

    const user =
      await authRepository.createUser({
        username: data.username,
        email: data.email,
        passwordHash,
        roleId: role.id,
      });

    //------------------------------------
    // Email verification token
    //------------------------------------

    const verificationToken =
      generateToken();

    const verificationTokenHash =
      hashToken(verificationToken);

    const verificationExpiresAt =
      new Date(
        Date.now() + 1000 * 60 * 60 * 24,
      );

    await authRepository.createEmailVerification(
      user.id,
      verificationTokenHash,
      verificationExpiresAt,
    );

    //------------------------------------
    // JWT Payload
    //------------------------------------

    const payload = {
      userId: user.id,
      email: user.email,
      role: role.name,
    };

    //------------------------------------
    // Generate JWTs
    //------------------------------------

    const accessToken =
      generateAccessToken(payload);

    const refreshToken =
      generateRefreshToken(payload);

    //------------------------------------
    // Store refresh token hash
    //------------------------------------

    const refreshTokenHash =
      hashToken(refreshToken);

    const refreshExpiresAt =
      new Date(
        Date.now() +
          1000 *
            60 *
            60 *
            24 *
            7,
      );

    await authRepository.createSession({
      userId: user.id,
      refreshTokenHash,
      expiresAt: refreshExpiresAt,
    });

    //------------------------------------
    // Return response
    //------------------------------------

    return {
      success: true,
      message:
        "Registration successful",

      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: role.name,
          emailVerified:
            user.emailVerified,
        },

        tokens: {
          accessToken,
          refreshToken,
        },

        verificationToken,
      },
    };
  }
}

export const authService =
  new AuthService();