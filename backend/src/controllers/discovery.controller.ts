import { Request, Response, NextFunction } from "express";
import { discoveryService } from "../services/discovery.service";
import { getSearchSuggestionsSchema, getRecommendedImagesSchema } from "../validators/discovery.validator";

export class DiscoveryController {
  async getFeaturedImages(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = Number(req.query.limit) || 10;
      const result = await discoveryService.getFeaturedImages(limit);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getTrendingImages(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = Number(req.query.limit) || 10;
      const result = await discoveryService.getTrendingImages(limit);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getRecommendedImages(req: Request, res: Response, next: NextFunction) {
    try {
      const imageId = req.params.imageId as string;
      const { limit } = getRecommendedImagesSchema.parse(req.query);
      const result = await discoveryService.getRecommendedImages(imageId, limit);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getSearchSuggestions(req: Request, res: Response, next: NextFunction) {
    try {
      const query = getSearchSuggestionsSchema.parse(req.query);
      const result = await discoveryService.getSearchSuggestions(query);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const discoveryController = new DiscoveryController();
