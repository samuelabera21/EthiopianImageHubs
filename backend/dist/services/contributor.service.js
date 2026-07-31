"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contributorApplicationService = exports.ContributorApplicationService = void 0;
const contributor_repository_1 = require("../repositories/contributor.repository");
const auth_repository_1 = require("../repositories/auth.repository");
class ContributorApplicationService {
    /**
     * Apply to become a contributor
     */
    async apply(userId, data) {
        // 1. Check if user already has an application
        const existingApp = await contributor_repository_1.contributorApplicationRepository.findByUserId(userId);
        if (existingApp) {
            const error = new Error("You have already submitted a contributor application");
            error.status = 409;
            throw error;
        }
        // 2. Create the application
        const application = await contributor_repository_1.contributorApplicationRepository.create({
            userId,
            message: data.message,
        });
        return {
            success: true,
            message: "Contributor application submitted successfully",
            data: application,
        };
    }
    /**
     * Get application for the authenticated user
     */
    async getApplication(userId) {
        const application = await contributor_repository_1.contributorApplicationRepository.findByUserId(userId);
        if (!application) {
            const error = new Error("Contributor application not found");
            error.status = 404;
            throw error;
        }
        return {
            success: true,
            message: "Application retrieved successfully",
            data: application,
        };
    }
    /**
     * Admin: Get all applications
     */
    async getApplications(query) {
        const page = parseInt(query.page || "1", 10);
        const limit = parseInt(query.limit || "20", 10);
        const skip = (page - 1) * limit;
        const applications = await contributor_repository_1.contributorApplicationRepository.findMany({
            skip,
            take: limit,
            status: query.status,
        });
        return {
            success: true,
            message: "Applications retrieved successfully",
            data: applications,
        };
    }
    /**
     * Admin: Review application
     */
    async reviewApplication(applicationId, adminId, data) {
        // 1. Find the application
        const application = await contributor_repository_1.contributorApplicationRepository.findById(applicationId);
        if (!application) {
            const error = new Error("Contributor application not found");
            error.status = 404;
            throw error;
        }
        if (application.status !== "PENDING") {
            const error = new Error(`Application is already ${application.status.toLowerCase()}`);
            error.status = 400;
            throw error;
        }
        // 2. Update the application status
        const updatedApplication = await contributor_repository_1.contributorApplicationRepository.updateStatus(applicationId, {
            status: data.status,
            reviewedById: adminId,
            adminNote: data.adminNote,
        });
        // 3. If approved, update user's role to CONTRIBUTOR
        if (data.status === "APPROVED") {
            const contributorRole = await auth_repository_1.authRepository.findRoleByName("CONTRIBUTOR");
            if (!contributorRole) {
                const error = new Error("Role CONTRIBUTOR not found in the database");
                error.status = 500;
                throw error;
            }
            await auth_repository_1.authRepository.updateUserRole(application.userId, contributorRole.id);
        }
        return {
            success: true,
            message: `Application has been ${data.status.toLowerCase()}`,
            data: updatedApplication,
        };
    }
}
exports.ContributorApplicationService = ContributorApplicationService;
exports.contributorApplicationService = new ContributorApplicationService();
