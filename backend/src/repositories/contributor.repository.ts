import { prisma } from "../config/database";
import { Prisma } from "../generated/prisma/client";

export class ContributorApplicationRepository {
  /**
   * Find application by user ID
   */
  async findByUserId(userId: string) {
    return prisma.contributorApplication.findUnique({
      where: {
        userId,
      },
    });
  }

  /**
   * Find application by ID
   */
  async findById(applicationId: string) {
    return prisma.contributorApplication.findUnique({
      where: {
        id: applicationId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          }
        }
      }
    });
  }

  /**
   * Create a new contributor application
   */
  async create(data: { userId: string; message?: string }) {
    return prisma.contributorApplication.create({
      data: {
        userId: data.userId,
        message: data.message,
        status: "PENDING",
      },
    });
  }

  /**
   * Update application status (Admin Review)
   */
  async updateStatus(
    applicationId: string,
    data: {
      status: "APPROVED" | "REJECTED";
      reviewedById: string;
      adminNote?: string;
    },
  ) {
    return prisma.contributorApplication.update({
      where: {
        id: applicationId,
      },
      data: {
        status: data.status,
        reviewedById: data.reviewedById,
        adminNote: data.adminNote,
        reviewedAt: new Date(),
      },
    });
  }

  /**
   * Find many applications (Admin List)
   */
  async findMany(params: {
    skip?: number;
    take?: number;
    status?: "PENDING" | "APPROVED" | "REJECTED";
  }) {
    const { skip, take, status } = params;

    const where: Prisma.ContributorApplicationWhereInput = {};

    if (status) {
      where.status = status;
    }

    return prisma.contributorApplication.findMany({
      where,
      skip,
      take,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          }
        }
      }
    });
  }
}

export const contributorApplicationRepository = new ContributorApplicationRepository();
