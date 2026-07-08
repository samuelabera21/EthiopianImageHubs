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
   * Find email verification by token hash
   */
  async findEmailVerificationByTokenHash(
    tokenHash: string,
  ) {
    return prisma.emailVerification.findUnique({
      where: {
        tokenHash,
      },
    });
  }

/**
 * Mark email verification as completed
 */
async markEmailVerificationAsVerified(
  id: string,
) {
  return prisma.emailVerification.update({
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
  async verifyUser(userId: string) {
    return prisma.user.update({
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
  async deleteEmailVerification(id: string) {
    return prisma.emailVerification.delete({
      where: {
        id,
      },
    });
  }


/**
 * Create password reset token
 */
async createPasswordReset(
  userId: string,
  tokenHash: string,
  expiresAt: Date,
) {
  return prisma.passwordReset.create({
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

async findPasswordResetByTokenHash(
  tokenHash: string,
) {
  return prisma.passwordReset.findUnique({
    where: {
      tokenHash,
    },
  });
}

/**
 * Mark password reset as used
 */
async markPasswordResetAsUsed(
  id: string,
) {
  return prisma.passwordReset.update({
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
async deletePasswordResetsByUserId(
  userId: string,
) {
  return prisma.passwordReset.deleteMany({
    where: {
      userId,
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
  async findSessionByRefreshTokenHash(
    refreshTokenHash: string,
  ) {
    return prisma.userSession.findFirst({
      where: {
        refreshTokenHash,
      },
    });
  }

  /**
   * Delete all active sessions for a user
   */
  async deleteSessionsByUserId(userId: string) {
    return prisma.userSession.deleteMany({
      where: {
        userId,
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

/**
 * Update user password
 */
async updatePassword(
  userId: string,
  passwordHash: string,
) {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      passwordHash,
    },
  });
}


/**
 * Find authenticated user
 */
async findAuthenticatedUser(userId: string) {
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
 * Delete session
 */
async deleteSession(
  sessionId: string,
) {
  return prisma.userSession.delete({
    where: {
      id: sessionId,
    },
  });
}


/**
 * Rotate refresh token
 */
async updateSessionRefreshToken(
  sessionId: string,
  refreshTokenHash: string,
  expiresAt: Date,
) {
  return prisma.userSession.update({
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

export const authRepository =
  new AuthRepository();