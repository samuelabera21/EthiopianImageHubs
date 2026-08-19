import { Request, Response, NextFunction } from "express";
import { collectionService } from "../services/collection.service";
import {
  createCollectionSchema,
  updateCollectionSchema,
  addImageToCollectionSchema,
} from "../validators/collection.validator";

export class CollectionController {
  async createCollection(req: Request, res: Response, next: NextFunction) {
    try {
      const { body } = createCollectionSchema.parse({ body: req.body });
      const result = await collectionService.createCollection(req.user.userId, body);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getCollectionById(req: Request, res: Response, next: NextFunction) {
    try {
      const collectionId = req.params.id as string;
      const result = await collectionService.getCollectionById(
        collectionId,
        req.user?.userId,
        req.user?.role
      );
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getCollections(req: Request, res: Response, next: NextFunction) {
    try {
      const ownerId = req.query.ownerId as string | undefined;
      const isPublicQuery = req.query.isPublic;
      let isPublic: boolean | undefined = undefined;
      if (isPublicQuery === "true") isPublic = true;
      if (isPublicQuery === "false") isPublic = false;

      const page = req.query.page ? Number(req.query.page) : 1;
      const limit = req.query.limit ? Number(req.query.limit) : 20;

      const result = await collectionService.getCollections({
        ownerId,
        isPublic,
        userId: req.user?.userId,
        page,
        limit,
      });

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateCollection(req: Request, res: Response, next: NextFunction) {
    try {
      const collectionId = req.params.id as string;
      const { body } = updateCollectionSchema.parse({ body: req.body });
      const result = await collectionService.updateCollection(
        collectionId,
        req.user.userId,
        req.user.role,
        body
      );
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteCollection(req: Request, res: Response, next: NextFunction) {
    try {
      const collectionId = req.params.id as string;
      const result = await collectionService.deleteCollection(
        collectionId,
        req.user.userId,
        req.user.role
      );
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async addImageToCollection(req: Request, res: Response, next: NextFunction) {
    try {
      const collectionId = req.params.id as string;
      const { body } = addImageToCollectionSchema.parse({ body: req.body });
      const result = await collectionService.addImageToCollection(
        collectionId,
        body.imageId,
        req.user.userId,
        req.user.role
      );
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async removeImageFromCollection(req: Request, res: Response, next: NextFunction) {
    try {
      const collectionId = req.params.id as string;
      const imageId = req.params.imageId as string;
      const result = await collectionService.removeImageFromCollection(
        collectionId,
        imageId,
        req.user.userId,
        req.user.role
      );
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const collectionController = new CollectionController();
