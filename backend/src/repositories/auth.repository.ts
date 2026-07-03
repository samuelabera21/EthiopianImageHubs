import { prisma } from "../config/database";

export class AuthRepository {
  /**
   * Find user by email
   */
  async findByEmail(email: string) {
    return prisma.user.findUnique({
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
  async findByUsername(username: string) {
    return prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  /**
   * Find user by ID
   */
  async findById(userId: string) {
    return prisma.user.findUnique({
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
  async createUser(data: {
    username: string;
    email: string;
    passwordHash: string;
    roleId: string;
  }) {
    return prisma.user.create({
      data,
    });
  }

  /**
   * Find role by name
   */
  async findRoleByName(name: string) {
    return prisma.role.findUnique({
      where: {
        name,
      },
    });
  }

  /**
   * Create email verification
   */
  async createEmailVerification(
    userId: string,
    tokenHash: string,
    expiresAt: Date,
  ) {
    return prisma.emailVerification.create({
      data: {
        userId,
        tokenHash,
        expiresAt,
      },
    });
  }

  /**
   * Create user session
   */
  async createSession(data: {
    userId: string;
    refreshTokenHash: string;
    expiresAt: Date;
    deviceName?: string;
    ipHash?: string;
    userAgent?: string;
  }) {
    return prisma.userSession.create({
      data,
    });
  }

  /**
   * Find session by refresh token hash
   */
  async findSessionByRefreshTokenHash(refreshTokenHash: string) {
    return prisma.userSession.findFirst({
      where: {
        refreshTokenHash,
      },
    });
  }

  /**
   * Revoke session
   */
  async revokeSession(sessionId: string) {
    return prisma.userSession.update({
      where: {
        id: sessionId,
      },
      data: {
        status: "REVOKED",
        revokedAt: new Date(),
      },
    });
  }
}

export const authRepository = new AuthRepository();