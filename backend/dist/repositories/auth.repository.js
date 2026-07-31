"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRepository = exports.AuthRepository = void 0;
const database_1 = require("../config/database");
class AuthRepository {
    /**
     * Find user by email
     */
    async findByEmail(email) {
        return database_1.prisma.user.findUnique({
            where: {
                email,
            },
            include: {
                role: true,
            },
        });
    }
    /**
     * Find user by username
     */
    async findByUsername(username) {
        return database_1.prisma.user.findUnique({
            where: {
                username,
            },
        });
    }
    /**
     * Find user by ID
     */
    async findById(userId) {
        return database_1.prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                role: true,
            },
        });
    }
    /**
     * Create user
     */
    async createUser(data) {
        return database_1.prisma.user.create({
            data,
        });
    }
    /**
     * Find role by name
     */
    async findRoleByName(name) {
        return database_1.prisma.role.findUnique({
            where: {
                name,
            },
        });
    }
    /**
     * Create email verification
     */
    async createEmailVerification(userId, tokenHash, expiresAt) {
        return database_1.prisma.emailVerification.create({
            data: {
                userId,
                tokenHash,
                expiresAt,
            },
        });
    }
    /**
     * Find email verification by token hash
     */
    async findEmailVerificationByTokenHash(tokenHash) {
        return database_1.prisma.emailVerification.findUnique({
            where: {
                tokenHash,
            },
        });
    }
    /**
     * Mark email verification as completed
     */
    async markEmailVerificationAsVerified(id) {
        return database_1.prisma.emailVerification.update({
            where: {
                id,
            },
            data: {
                verifiedAt: new Date(),
            },
        });
    }
    /**
     * Verify user email and activate account
     */
    async verifyUser(userId) {
        return database_1.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                emailVerified: true,
                status: "ACTIVE",
            },
        });
    }
    /**
     * Delete email verification token
     */
    async deleteEmailVerification(id) {
        return database_1.prisma.emailVerification.delete({
            where: {
                id,
            },
        });
    }
    /**
     * Create password reset token
     */
    async createPasswordReset(userId, tokenHash, expiresAt) {
        return database_1.prisma.passwordReset.create({
            data: {
                userId,
                tokenHash,
                expiresAt,
            },
        });
    }
    /**
     * Find password reset by token hash
     */
    // async findPasswordResetByTokenHash(
    //   tokenHash: string,
    // ) {
    //   return prisma.passwordReset.findFirst({
    //     where: {
    //       tokenHash,
    //     },
    //   });
    // }
    async findPasswordResetByTokenHash(tokenHash) {
        return database_1.prisma.passwordReset.findUnique({
            where: {
                tokenHash,
            },
        });
    }
    /**
     * Mark password reset as used
     */
    async markPasswordResetAsUsed(id) {
        return database_1.prisma.passwordReset.update({
            where: {
                id,
            },
            data: {
                usedAt: new Date(),
            },
        });
    }
    /**
     * Delete previous password reset tokens
     */
    async deletePasswordResetsByUserId(userId) {
        return database_1.prisma.passwordReset.deleteMany({
            where: {
                userId,
            },
        });
    }
    /**
     * Create user session
     */
    async createSession(data) {
        return database_1.prisma.userSession.create({
            data,
        });
    }
    /**
     * Find session by refresh token hash
     */
    async findSessionByRefreshTokenHash(refreshTokenHash) {
        return database_1.prisma.userSession.findFirst({
            where: {
                refreshTokenHash,
            },
        });
    }
    /**
     * Delete all active sessions for a user
     */
    async deleteSessionsByUserId(userId) {
        return database_1.prisma.userSession.deleteMany({
            where: {
                userId,
            },
        });
    }
    /**
     * Revoke session
     */
    async revokeSession(sessionId) {
        return database_1.prisma.userSession.update({
            where: {
                id: sessionId,
            },
            data: {
                status: "REVOKED",
                revokedAt: new Date(),
            },
        });
    }
    /**
     * Update user password
     */
    async updatePassword(userId, passwordHash) {
        return database_1.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                passwordHash,
            },
        });
    }
    /**
     * Update user role
     */
    async updateUserRole(userId, roleId) {
        return database_1.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                roleId,
            },
            include: {
                role: true,
            },
        });
    }
    /**
     * Find authenticated user
     */
    async findAuthenticatedUser(userId) {
        return database_1.prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                role: true,
            },
        });
    }
    /**
     * Delete session
     */
    async deleteSession(sessionId) {
        return database_1.prisma.userSession.delete({
            where: {
                id: sessionId,
            },
        });
    }
    /**
     * Rotate refresh token
     */
    async updateSessionRefreshToken(sessionId, refreshTokenHash, expiresAt) {
        return database_1.prisma.userSession.update({
            where: {
                id: sessionId,
            },
            data: {
                refreshTokenHash,
                expiresAt,
            },
        });
    }
}
exports.AuthRepository = AuthRepository;
exports.authRepository = new AuthRepository();
