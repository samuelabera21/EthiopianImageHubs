import { Request, Response, NextFunction } from "express";
import { likeService } from "../services/like.service";
import { imageIdParamsSchema } from "./image.schema";

export class LikeController {
  async likeImage(req: Request, res: Response, next: NextFunction) {
    try {
      const { imageId } = imageIdParamsSchema.parse(req.params);
      const result = await likeService.likeImage(req.user!.userId, imageId);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async unlikeImage(req: Request, res: Response, next: NextFunction) {
    try {
      const { imageId } = imageIdParamsSchema.parse(req.params);
      await likeService.unlikeImage(req.user!.userId, imageId);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export const likeController = new LikeController();
