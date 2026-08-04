import { contributorApplicationRepository } from "../repositories/contributor.repository";
import { authRepository } from "../repositories/auth.repository";

export class ContributorApplicationService {
  /**
   * Apply to become a contributor
   */
  async apply(userId: string, data: { message?: string }) {
    // 1. Check if user already has an application
    const existingApp = await contributorApplicationRepository.findByUserId(userId);

    if (existingApp) {
      const error = new Error("You have already submitted a contributor application");
      (error as any).status = 409;
      throw error;
    }

    // 2. Create the application
    const application = await contributorApplicationRepository.create({
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
  async getApplication(userId: string) {
    const application = await contributorApplicationRepository.findByUserId(userId);

    if (!application) {
      const error = new Error("Contributor application not found");
      (error as any).status = 404;
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
  async getApplications(query: { status?: string; page?: string; limit?: string }) {
    const page = parseInt(query.page || "1", 10);
    const limit = parseInt(query.limit || "20", 10);
    const skip = (page - 1) * limit;

    const applications = await contributorApplicationRepository.findMany({
      skip,
      take: limit,
      status: query.status as any,
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
  async reviewApplication(
    applicationId: string,
    adminId: string,
    data: { status: "APPROVED" | "REJECTED"; adminNote?: string },
  ) {
    // 1. Find the application
    const application = await contributorApplicationRepository.findById(applicationId);

    if (!application) {
      const error = new Error("Contributor application not found");
      (error as any).status = 404;
      throw error;
    }

    if (application.status !== "PENDING") {
      const error = new Error(`Application is already ${application.status.toLowerCase()}`);
      (error as any).status = 400;
      throw error;
    }

    // 2. Update the application status
    const updatedApplication = await contributorApplicationRepository.updateStatus(
      applicationId,
      {
        status: data.status,
        reviewedById: adminId,
        adminNote: data.adminNote,
      },
    );

    // 3. If approved, update user's role to CONTRIBUTOR
    if (data.status === "APPROVED") {
      const contributorRole = await authRepository.findRoleByName("CONTRIBUTOR");
      if (!contributorRole) {
        const error = new Error("Role CONTRIBUTOR not found in the database");
        (error as any).status = 500;
        throw error;
      }

      await authRepository.updateUserRole(application.userId, contributorRole.id);
    }

    return {
      success: true,
      message: `Application has been ${data.status.toLowerCase()}`,
      data: updatedApplication,
    };
  }
}

export const contributorApplicationService = new ContributorApplicationService();
