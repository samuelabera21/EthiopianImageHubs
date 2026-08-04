import { prisma } from "../config/database";
import { UserStatus } from "../generated/prisma/client";
import { Prisma } from "../generated/prisma/client";

export class AdminUserService {
  async getUsers(query: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    status?: UserStatus;
  }) {
    const { page = 1, limit = 10, search, role, status } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.UserWhereInput = {};

    if (search) {
      where.OR = [
        { email: { contains: search, mode: "insensitive" } },
        { username: { contains: search, mode: "insensitive" } },
      ];
    }

    if (role) {
      where.role = {
        name: role.toUpperCase(),
      };
    }

    if (status) {
      where.status = status;
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          role: true,
          profile: true,
        },
      }),
      prisma.user.count({ where }),
    ]);

    return {
      users: users.map(user => {
        // Strip sensitive info
        const { passwordHash, ...safeUser } = user;
        return safeUser;
      }),
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async updateUserRole(userId: string, roleName: string) {
    const role = await prisma.role.findUnique({
      where: { name: roleName.toUpperCase() },
    });

    if (!role) {
      throw Object.assign(new Error("Role not found"), { status: 404 });
    }

    const user = await prisma.user.findUnique({ where: { id: userId }, include: { role: true } });
    if (!user) {
      throw Object.assign(new Error("User not found"), { status: 404 });
    }

    // Prevent removing last admin (optional check, but good for safety)
    if (user.role.name === "ADMIN" && roleName.toUpperCase() !== "ADMIN") {
      const adminCount = await prisma.user.count({
        where: { role: { name: "ADMIN" } },
      });
      if (adminCount <= 1) {
        throw Object.assign(new Error("Cannot remove the last administrator"), { status: 400 });
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { roleId: role.id },
      include: { role: true, profile: true },
    });

    const { passwordHash, ...safeUser } = updatedUser;
    return safeUser;
  }

  async updateUserStatus(userId: string, status: UserStatus) {
    const user = await prisma.user.findUnique({ where: { id: userId }, include: { role: true } });
    if (!user) {
      throw Object.assign(new Error("User not found"), { status: 404 });
    }

    if (user.role.name === "ADMIN" && status === "SUSPENDED") {
      const adminCount = await prisma.user.count({
        where: { role: { name: "ADMIN" }, status: "ACTIVE" },
      });
      if (adminCount <= 1) {
        throw Object.assign(new Error("Cannot suspend the last active administrator"), { status: 400 });
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { status },
      include: { role: true, profile: true },
    });

    const { passwordHash, ...safeUser } = updatedUser;
    return safeUser;
  }
}

export const adminUserService = new AdminUserService();
