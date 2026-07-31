import { Request, Response, NextFunction } from "express";
import { contributorApplicationService } from "../services/contributor.service";

export class ContributorApplicationController {
  /**
   * POST /contributors/apply
   */
  async apply(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await contributorApplicationService.apply(req.user!.userId, req.body);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /contributors/application
   */
  async getApplication(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await contributorApplicationService.getApplication(req.user!.userId);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /admin/contributor-applications
   */
  async getApplications(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await contributorApplicationService.getApplications({
        status: req.query.status as string | undefined,
        page: req.query.page as string | undefined,
        limit: req.query.limit as string | undefined,
      });
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * PATCH /admin/contributor-applications/:applicationId
   */
  async reviewApplication(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await contributorApplicationService.reviewApplication(
        req.params.applicationId as string,
        req.user!.userId,
        req.body,
      );
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const contributorApplicationController = new ContributorApplicationController();
