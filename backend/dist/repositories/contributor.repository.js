"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contributorApplicationRepository = exports.ContributorApplicationRepository = void 0;
const database_1 = require("../config/database");
class ContributorApplicationRepository {
    /**
     * Find application by user ID
     */
    async findByUserId(userId) {
        return database_1.prisma.contributorApplication.findUnique({
            where: {
                userId,
            },
        });
    }
    /**
     * Find application by ID
     */
    async findById(applicationId) {
        return database_1.prisma.contributorApplication.findUnique({
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
    async create(data) {
        return database_1.prisma.contributorApplication.create({
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
    async updateStatus(applicationId, data) {
        return database_1.prisma.contributorApplication.update({
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
    async findMany(params) {
        const { skip, take, status } = params;
        const where = {};
        if (status) {
            where.status = status;
        }
        return database_1.prisma.contributorApplication.findMany({
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
exports.ContributorApplicationRepository = ContributorApplicationRepository;
exports.contributorApplicationRepository = new ContributorApplicationRepository();
