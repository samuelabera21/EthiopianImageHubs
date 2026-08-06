import { Request, Response, NextFunction } from "express";
import { profileService } from "../services/profile.service";
import { profileParamsSchema, portfolioQuerySchema, updateProfileSchema } from "../validators/profile.validator";

export class ProfileController {
  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const { username } = profileParamsSchema.parse(req.params);
      const result = await profileService.getProfile(username);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getPortfolio(req: Request, res: Response, next: NextFunction) {
    try {
      const { username } = profileParamsSchema.parse(req.params);
      const { page, pageSize } = portfolioQuerySchema.parse(req.query);
      
      const result = await profileService.getPortfolio(username, page, pageSize);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const data = updateProfileSchema.parse(req.body);
      const result = await profileService.updateProfile(req.user.userId, data);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateAvatar(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await profileService.updateAvatar(req.user.userId, req.file!);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const profileController = new ProfileController();
