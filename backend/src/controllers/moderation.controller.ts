import { Request, Response, NextFunction } from "express";
import { imageService } from "../services/image.service";
import { approveImageSchema, rejectImageSchema } from "../validators/moderation.validator";
import { imageIdParamsSchema, getImagesQuerySchema } from "./image.schema";

export class ModerationController {
  async getPendingImages(req: Request, res: Response, next: NextFunction) {
    try {
      const query = getImagesQuerySchema.parse(req.query);
      const options = { ...query, moderationStatus: "PENDING" as const };
      
      const images = await imageService.getImages(options);
      return res.status(200).json(images);
    } catch (error) {
      next(error);
    }
  }

  async approveImage(req: Request, res: Response, next: NextFunction) {
    try {
      const { imageId } = imageIdParamsSchema.parse(req.params);
      const data = approveImageSchema.parse(req.body);

      const result = await imageService.approveImage(imageId, req.user.userId, data.moderationNote);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async rejectImage(req: Request, res: Response, next: NextFunction) {
    try {
      const { imageId } = imageIdParamsSchema.parse(req.params);
      const data = rejectImageSchema.parse(req.body);

      const result = await imageService.rejectImage(imageId, req.user.userId, data.moderationNote);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const moderationController = new ModerationController();
