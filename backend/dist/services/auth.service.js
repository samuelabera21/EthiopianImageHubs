"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.AuthService = void 0;
const auth_repository_1 = require("../repositories/auth.repository");
const env_1 = require("../config/env");
const mail_service_1 = require("./mail.service");
const verify_email_template_1 = require("../templates/verify-email.template");
const reset_password_template_1 = require("../templates/reset-password.template");
const password_1 = require("../utils/password");
const jwt_1 = require("../utils/jwt");
const token_1 = require("../utils/token");
class AuthService {
    /**
     * Register new user
     */
    async register(data) {
        //------------------------------------
        // Check email
        //------------------------------------
        const emailExists = await auth_repository_1.authRepository.findByEmail(data.email);
        if (emailExists) {
            throw new Error("Email already exists");
        }
        //------------------------------------
        // Check username
        //------------------------------------
        const usernameExists = await auth_repository_1.authRepository.findByUsername(data.username);
        if (usernameExists) {
            throw new Error("Username already exists");
        }
        //------------------------------------
        // Find default role
        //------------------------------------
        const role = await auth_repository_1.authRepository.findRoleByName("USER");
        if (!role) {
            throw new Error("Default role not found");
        }
        //------------------------------------
        // Hash password
        //------------------------------------
        const passwordHash = await (0, password_1.hashPassword)(data.password);
        //------------------------------------
        // Create user
        //------------------------------------
        const user = await auth_repository_1.authRepository.createUser({
            username: data.username,
            email: data.email,
            passwordHash,
            roleId: role.id,
        });
        //------------------------------------
        // Email verification token
        //------------------------------------
        const verificationToken = (0, token_1.generateToken)();
        const verificationTokenHash = (0, token_1.hashToken)(verificationToken);
        const verificationExpiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);
        await auth_repository_1.authRepository.createEmailVerification(user.id, verificationTokenHash, verificationExpiresAt);
        //------------------------------------
        // Verification URL
        //------------------------------------
        const verificationUrl = `${env_1.env.frontendUrl}/verify-email?token=${verificationToken}`;
        //------------------------------------
        // Email HTML
        //------------------------------------
        const html = (0, verify_email_template_1.verifyEmailTemplate)(user.username, verificationUrl);
        //------------------------------------
        // Send Email
        //------------------------------------
        await mail_service_1.mailService.send(user.email, "Verify your EthiopiaHub Images account", html);
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
        const accessToken = (0, jwt_1.generateAccessToken)(payload);
        const refreshToken = (0, jwt_1.generateRefreshToken)(payload);
        //------------------------------------
        // Store refresh token hash
        //------------------------------------
        const refreshTokenHash = (0, token_1.hashToken)(refreshToken);
        const refreshExpiresAt = new Date(Date.now() +
            1000 *
                60 *
                60 *
                24 *
                7);
        await auth_repository_1.authRepository.createSession({
            userId: user.id,
            refreshTokenHash,
            expiresAt: refreshExpiresAt,
        });
        //------------------------------------
        // Return response
        //------------------------------------
        return {
            success: true,
            message: "Registration successful. Please check your email to verify your account.",
            data: {
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: role.name,
                    emailVerified: user.emailVerified,
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
    async login(data) {
        //------------------------------------
        // Find user by email
        //------------------------------------
        const user = await auth_repository_1.authRepository.findByEmail(data.email);
        if (!user) {
            throw new Error("Invalid email or password");
        }
        //------------------------------------
        // Verify password
        //------------------------------------
        const passwordMatched = await (0, password_1.comparePassword)(data.password, user.passwordHash);
        if (!passwordMatched) {
            throw new Error("Invalid email or password");
        }
        //------------------------------------
        // Check account status
        //------------------------------------
        if (user.status !== "ACTIVE") {
            throw new Error("Your account is not active");
        }
        //------------------------------------
        // Remove old sessions (optional)
        //------------------------------------
        await auth_repository_1.authRepository.deleteSessionsByUserId(user.id);
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
        const accessToken = (0, jwt_1.generateAccessToken)(payload);
        const refreshToken = (0, jwt_1.generateRefreshToken)(payload);
        //------------------------------------
        // Hash Refresh Token
        //------------------------------------
        const refreshTokenHash = (0, token_1.hashToken)(refreshToken);
        const refreshExpiresAt = new Date(Date.now() +
            1000 *
                60 *
                60 *
                24 *
                7);
        //------------------------------------
        // Save Session
        //------------------------------------
        await auth_repository_1.authRepository.createSession({
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
                    emailVerified: user.emailVerified,
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
    async verifyEmail(token) {
        //------------------------------------
        // Hash token
        //------------------------------------
        const tokenHash = (0, token_1.hashToken)(token);
        //------------------------------------
        // Find verification record
        //------------------------------------
        const verification = await auth_repository_1.authRepository.findEmailVerificationByTokenHash(tokenHash);
        if (!verification) {
            throw new Error("Invalid verification token");
        }
        //------------------------------------
        // Already verified?
        //------------------------------------
        if (verification.verifiedAt) {
            throw new Error("Email already verified");
        }
        //------------------------------------
        // Token expired?
        //------------------------------------
        if (verification.expiresAt.getTime() <
            Date.now()) {
            throw new Error("Verification token has expired");
        }
        //------------------------------------
        // Activate account
        //------------------------------------
        await auth_repository_1.authRepository.verifyUser(verification.userId);
        //------------------------------------
        // Mark verification record
        //------------------------------------
        await auth_repository_1.authRepository.markEmailVerificationAsVerified(verification.id);
        //------------------------------------
        // Response
        //------------------------------------
        return {
            success: true,
            message: "Email verified successfully",
        };
    }
    /**
     * Forgot password
     */
    async forgotPassword(data) {
        //------------------------------------
        // Find user
        //------------------------------------
        const user = await auth_repository_1.authRepository.findByEmail(data.email);
        //------------------------------------
        // Never reveal whether user exists
        //------------------------------------
        if (!user) {
            return {
                success: true,
                message: "If the email exists, a password reset link has been sent.",
            };
        }
        //------------------------------------
        // Delete previous reset tokens
        //------------------------------------
        await auth_repository_1.authRepository.deletePasswordResetsByUserId(user.id);
        //------------------------------------
        // Generate token
        //------------------------------------
        const resetToken = (0, token_1.generateToken)();
        const tokenHash = (0, token_1.hashToken)(resetToken);
        //------------------------------------
        // Expiration
        //------------------------------------
        const expiresAt = new Date(Date.now() +
            1000 * 60 * 60);
        //------------------------------------
        // Save token
        //------------------------------------
        await auth_repository_1.authRepository.createPasswordReset(user.id, tokenHash, expiresAt);
        //------------------------------------
        // Reset URL
        //------------------------------------
        const resetUrl = `${env_1.env.frontendUrl}/reset-password?token=${resetToken}`;
        //------------------------------------
        // Email HTML
        //------------------------------------
        const html = (0, reset_password_template_1.resetPasswordTemplate)(user.username, resetUrl);
        //------------------------------------
        // Send email
        //------------------------------------
        await mail_service_1.mailService.send(user.email, "Reset your EthiopiaHub Images password", html);
        //------------------------------------
        // Success
        //------------------------------------
        return {
            success: true,
            message: "If the email exists, a password reset link has been sent.",
        };
    }
    /**
     * Reset password
     */
    async resetPassword(data) {
        //------------------------------------
        // Hash token
        //------------------------------------
        const tokenHash = (0, token_1.hashToken)(data.token);
        //------------------------------------
        // Find reset record
        //------------------------------------
        const reset = await auth_repository_1.authRepository.findPasswordResetByTokenHash(tokenHash);
        if (!reset) {
            throw new Error("Invalid reset token");
        }
        //------------------------------------
        // Already used?
        //------------------------------------
        if (reset.usedAt) {
            throw new Error("Reset token has already been used");
        }
        //------------------------------------
        // Expired?
        //------------------------------------
        if (reset.expiresAt.getTime() <
            Date.now()) {
            throw new Error("Reset token has expired");
        }
        //------------------------------------
        // Hash new password
        //------------------------------------
        const passwordHash = await (0, password_1.hashPassword)(data.password);
        //------------------------------------
        // Update password
        //------------------------------------
        await auth_repository_1.authRepository.updatePassword(reset.userId, passwordHash);
        //------------------------------------
        // Mark token as used
        //------------------------------------
        await auth_repository_1.authRepository.markPasswordResetAsUsed(reset.id);
        //------------------------------------
        // Logout all devices
        //------------------------------------
        await auth_repository_1.authRepository.deleteSessionsByUserId(reset.userId);
        //------------------------------------
        // Success
        //------------------------------------
        return {
            success: true,
            message: "Password reset successfully. Please login again.",
        };
    }
    /**
     * Current authenticated user
     */
    async me(userId) {
        //------------------------------------
        // Find user
        //------------------------------------
        const user = await auth_repository_1.authRepository.findAuthenticatedUser(userId);
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
    async refresh(data) {
        //------------------------------------
        // Verify JWT
        //------------------------------------
        const payload = (0, jwt_1.verifyRefreshToken)(data.refreshToken);
        //------------------------------------
        // Hash refresh token
        //------------------------------------
        const refreshTokenHash = (0, token_1.hashToken)(data.refreshToken);
        //------------------------------------
        // Find session
        //------------------------------------
        const session = await auth_repository_1.authRepository.findSessionByRefreshTokenHash(refreshTokenHash);
        if (!session) {
            throw new Error("Invalid refresh token");
        }
        //------------------------------------
        // Session revoked?
        //------------------------------------
        if (session.status ===
            "REVOKED") {
            throw new Error("Session revoked");
        }
        //------------------------------------
        // Session expired?
        //------------------------------------
        if (session.expiresAt.getTime() <
            Date.now()) {
            await auth_repository_1.authRepository.deleteSession(session.id);
            throw new Error("Refresh token expired");
        }
        //------------------------------------
        // User
        //------------------------------------
        const user = await auth_repository_1.authRepository.findById(payload.userId);
        if (!user) {
            throw new Error("User not found");
        }
        //------------------------------------
        // Generate new Access Token
        //------------------------------------
        const accessToken = (0, jwt_1.generateAccessToken)({
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
    async logout(data) {
        (0, jwt_1.verifyRefreshToken)(data.refreshToken);
        const refreshTokenHash = (0, token_1.hashToken)(data.refreshToken);
        const session = await auth_repository_1.authRepository.findSessionByRefreshTokenHash(refreshTokenHash);
        if (!session) {
            throw new Error("Session not found");
        }
        await auth_repository_1.authRepository.revokeSession(session.id);
        return {
            success: true,
            message: "Logout successful",
        };
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService();
