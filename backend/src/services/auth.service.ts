import { authRepository } from "../repositories/auth.repository";

import { env } from "../config/env";

import { mailService } from "./mail.service";

import { verifyEmailTemplate } from "../templates/verify-email.template";

import {
  RegisterInput,
  LoginInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  RefreshTokenInput,
  LogoutInput,
} from "../validators/auth.validator";


import { resetPasswordTemplate } from "../templates/reset-password.template";

import {
  hashPassword,
  comparePassword,
} from "../utils/password";


import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
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
// Verification URL
//------------------------------------

const verificationUrl =
  `${env.backendUrl}/api/v1/auth/verify-email?token=${verificationToken}`;

//------------------------------------
// Email HTML
//------------------------------------

const html =
  verifyEmailTemplate(
    user.username,
    verificationUrl,
  );

//------------------------------------
// Send Email
//------------------------------------

await mailService.send(
  user.email,
  "Verify your EthiopiaHub Images account",
  html,
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
        "Registration successful. Please check your email to verify your account.",

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
      },
    };
  }
/**
 * Login user
 */
async login(data: LoginInput) {
  //------------------------------------
  // Find user by email
  //------------------------------------

  const user =
    await authRepository.findByEmail(
      data.email,
    );

  if (!user) {
    throw new Error(
      "Invalid email or password",
    );
  }

  //------------------------------------
  // Verify password
  //------------------------------------

  const passwordMatched =
    await comparePassword(
      data.password,
      user.passwordHash,
    );

  if (!passwordMatched) {
    throw new Error(
      "Invalid email or password",
    );
  }

  //------------------------------------
  // Check account status
  //------------------------------------

  if (user.status !== "ACTIVE") {
    throw new Error(
      "Your account is not active",
    );
  }

  //------------------------------------
  // Remove old sessions (optional)
  //------------------------------------

  await authRepository.deleteSessionsByUserId(
    user.id,
  );

  //------------------------------------
  // JWT Payload
  //------------------------------------

  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role.name,
  };

  //------------------------------------
  // Generate JWT Tokens
  //------------------------------------

  const accessToken =
    generateAccessToken(payload);

  const refreshToken =
    generateRefreshToken(payload);

  //------------------------------------
  // Hash Refresh Token
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

  //------------------------------------
  // Save Session
  //------------------------------------

  await authRepository.createSession({
    userId: user.id,
    refreshTokenHash,
    expiresAt: refreshExpiresAt,
  });

  //------------------------------------
  // Return Response
  //------------------------------------

  return {
    success: true,
    message: "Login successful",

    data: {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role.name,
        emailVerified:
          user.emailVerified,
      },

      tokens: {
        accessToken,
        refreshToken,
      },
    },
  };
}

/**
 * Verify email
 */
async verifyEmail(token: string) {
  //------------------------------------
  // Hash token
  //------------------------------------

  const tokenHash = hashToken(token);

  //------------------------------------
  // Find verification record
  //------------------------------------

  const verification =
    await authRepository.findEmailVerificationByTokenHash(
      tokenHash,
    );

  if (!verification) {
    throw new Error(
      "Invalid verification token",
    );
  }

  //------------------------------------
  // Already verified?
  //------------------------------------

  if (verification.verifiedAt) {
    throw new Error(
      "Email already verified",
    );
  }

  //------------------------------------
  // Token expired?
  //------------------------------------

  if (
    verification.expiresAt.getTime() <
    Date.now()
  ) {
    throw new Error(
      "Verification token has expired",
    );
  }

  //------------------------------------
  // Activate account
  //------------------------------------

  await authRepository.verifyUser(
    verification.userId,
  );

  //------------------------------------
  // Mark verification record
  //------------------------------------

  await authRepository.markEmailVerificationAsVerified(
    verification.id,
  );

  //------------------------------------
  // Response
  //------------------------------------

  return {
    success: true,
    message:
      "Email verified successfully",
  };
}

/**
 * Forgot password
 */
async forgotPassword(
  data: ForgotPasswordInput,
) {
  //------------------------------------
  // Find user
  //------------------------------------

  const user =
    await authRepository.findByEmail(
      data.email,
    );

  //------------------------------------
  // Never reveal whether user exists
  //------------------------------------

  if (!user) {
    return {
      success: true,
      message:
        "If the email exists, a password reset link has been sent.",
    };
  }

  //------------------------------------
  // Delete previous reset tokens
  //------------------------------------

  await authRepository.deletePasswordResetsByUserId(
    user.id,
  );

  //------------------------------------
  // Generate token
  //------------------------------------

  const resetToken =
    generateToken();

  const tokenHash =
    hashToken(resetToken);

  //------------------------------------
  // Expiration
  //------------------------------------

  const expiresAt =
    new Date(
      Date.now() +
      1000 * 60 * 60,
    );

  //------------------------------------
  // Save token
  //------------------------------------

  await authRepository.createPasswordReset(
    user.id,
    tokenHash,
    expiresAt,
  );

  //------------------------------------
  // Reset URL
  //------------------------------------

  const resetUrl =
    `${env.frontendUrl}/reset-password?token=${resetToken}`;

  //------------------------------------
  // Email HTML
  //------------------------------------

  const html =
    resetPasswordTemplate(
      user.username,
      resetUrl,
    );

  //------------------------------------
  // Send email
  //------------------------------------

  await mailService.send(
    user.email,
    "Reset your EthiopiaHub Images password",
    html,
  );

  //------------------------------------
  // Success
  //------------------------------------

  return {
    success: true,
    message:
      "If the email exists, a password reset link has been sent.",
  };
}

/**
 * Reset password
 */
async resetPassword(
  data: ResetPasswordInput,
) {
  //------------------------------------
  // Hash token
  //------------------------------------

  const tokenHash =
    hashToken(data.token);

  //------------------------------------
  // Find reset record
  //------------------------------------

  const reset =
    await authRepository.findPasswordResetByTokenHash(
      tokenHash,
    );

  if (!reset) {
    throw new Error(
      "Invalid reset token",
    );
  }

  //------------------------------------
  // Already used?
  //------------------------------------

  if (reset.usedAt) {
    throw new Error(
      "Reset token has already been used",
    );
  }

  //------------------------------------
  // Expired?
  //------------------------------------

  if (
    reset.expiresAt.getTime() <
    Date.now()
  ) {
    throw new Error(
      "Reset token has expired",
    );
  }

  //------------------------------------
  // Hash new password
  //------------------------------------

  const passwordHash =
    await hashPassword(
      data.password,
    );

  //------------------------------------
  // Update password
  //------------------------------------

  await authRepository.updatePassword(
    reset.userId,
    passwordHash,
  );

  //------------------------------------
  // Mark token as used
  //------------------------------------

  await authRepository.markPasswordResetAsUsed(
    reset.id,
  );

  //------------------------------------
  // Logout all devices
  //------------------------------------

  await authRepository.deleteSessionsByUserId(
    reset.userId,
  );

  //------------------------------------
  // Success
  //------------------------------------

  return {
    success: true,
    message:
      "Password reset successfully. Please login again.",
  };
}


/**
 * Current authenticated user
 */
async me(userId: string) {
  //------------------------------------
  // Find user
  //------------------------------------

  const user =
    await authRepository.findAuthenticatedUser(
      userId,
    );

  if (!user) {
    throw new Error("User not found");
  }

  //------------------------------------
  // Response
  //------------------------------------

  return {
    success: true,
    data: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role.name,
      emailVerified: user.emailVerified,
      status: user.status,
      createdAt: user.createdAt,
    },
  };
}


/**
 * Refresh access token
 */
async refresh(
  data: RefreshTokenInput,
) {
  //------------------------------------
  // Verify JWT
  //------------------------------------

  const payload =
    verifyRefreshToken(
      data.refreshToken,
    );

  //------------------------------------
  // Hash refresh token
  //------------------------------------

  const refreshTokenHash =
    hashToken(
      data.refreshToken,
    );

  //------------------------------------
  // Find session
  //------------------------------------

  const session =
    await authRepository.findSessionByRefreshTokenHash(
      refreshTokenHash,
    );

  if (!session) {
    throw new Error(
      "Invalid refresh token",
    );
  }

  //------------------------------------
  // Session revoked?
  //------------------------------------

  if (
    session.status ===
    "REVOKED"
  ) {
    throw new Error(
      "Session revoked",
    );
  }

  //------------------------------------
  // Session expired?
  //------------------------------------

  if (
    session.expiresAt.getTime() <
    Date.now()
  ) {
    await authRepository.deleteSession(
      session.id,
    );

    throw new Error(
      "Refresh token expired",
    );
  }

  //------------------------------------
  // User
  //------------------------------------

  const user =
    await authRepository.findById(
      payload.userId,
    );

  if (!user) {
    throw new Error(
      "User not found",
    );
  }

  //------------------------------------
  // Generate new Access Token
  //------------------------------------

  const accessToken =
    generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role.name,
    });

  //------------------------------------
  // Response
  //------------------------------------

  return {
    success: true,
    data: {
      accessToken,
    },
  };
}

async logout(
  data: LogoutInput,
) {
  verifyRefreshToken(
    data.refreshToken,
  );

  const refreshTokenHash =
    hashToken(data.refreshToken);

  const session =
    await authRepository.findSessionByRefreshTokenHash(
      refreshTokenHash,
    );

  if (!session) {
    throw new Error(
      "Session not found",
    );
  }

  await authRepository.revokeSession(
    session.id,
  );

  return {
    success: true,
    message: "Logout successful",
  };
}


}
export const authService =
  new AuthService();