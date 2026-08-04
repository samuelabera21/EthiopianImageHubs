import { Request, Response, NextFunction } from "express";
import { favoriteService } from "../services/favorite.service";
import { imageIdParamsSchema } from "./image.schema";

export class FavoriteController {
  async favoriteImage(req: Request, res: Response, next: NextFunction) {
    try {
      const { imageId } = imageIdParamsSchema.parse(req.params);
      const result = await favoriteService.favoriteImage(req.user!.userId, imageId);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async unfavoriteImage(req: Request, res: Response, next: NextFunction) {
    try {
      const { imageId } = imageIdParamsSchema.parse(req.params);
      await favoriteService.unfavoriteImage(req.user!.userId, imageId);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export const favoriteController = new FavoriteController();
