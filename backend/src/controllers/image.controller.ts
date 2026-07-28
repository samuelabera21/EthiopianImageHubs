import { Request, Response, NextFunction } from "express";

import { imageService } from "../services/image.service";

export class ImageController {
  /**
   * Upload image
   */
  async uploadImage(req: Request, res: Response, next: NextFunction) {
    try {
      const image = await imageService.uploadImage(
        req.user.userId,
        req.file!,
        req.body,
      );

      return res.status(201).json(image);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get images
   */
/**
 * Get images
 */
async getImages(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const images =
      await imageService.getImages({
        page: req.query.page
          ? Number(req.query.page)
          : undefined,

        limit: req.query.limit
          ? Number(req.query.limit)
          : undefined,

        categoryId:
          req.query.categoryId as string,

        ownerId:
          req.query.ownerId as string,

        visibility:
          req.query.visibility as
            | "PUBLIC"
            | "PRIVATE"
            | "UNLISTED",

        status:
          req.query.status as
            | "ACTIVE"
            | "DELETED",

        search:
          req.query.search as string,

        location:
          req.query.location as string,

        tagId:
          req.query.tagId as string,

        sortBy:
          req.query.sortBy as
            | "createdAt"
            | "title"
            | "fileSize",

        sortOrder:
          req.query.sortOrder as
            | "asc"
            | "desc",
      });

    return res.json(images);
  } catch (error) {
    next(error);
  }
}

  /**
   * Get image by ID
   */
  async getImageById(req: Request, res: Response, next: NextFunction) {
    try {
      const image = await imageService.getImageById(
        req.params.imageId as string,
      );

      return res.json(image);
    } catch (error) {
      next(error);
    }
  }

async updateImage(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const result =
      await imageService.updateImage(
        req.params.imageId as string,
        req.user.userId,
        req.body,
      );

    return res.json(result);
  } catch (error) {
    next(error);
  }
}

  async deleteImage(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await imageService.deleteImage(
        req.params.imageId as string,
        req.user.userId,
      );

      return res.json(result);
    } catch (error) {
      next(error);
    }
  }


async permanentlyDeleteImage(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const result =
      await imageService.permanentlyDeleteImage(
        req.params.imageId as string,
        req.user.userId,
      );

    return res.json(result);
  } catch (error) {
    next(error);
  }
}


/**
 * Restore image
 */
async restoreImage(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const result =
      await imageService.restoreImage(
        req.params.imageId as string,
        req.user.userId,
      );

    return res.json(result);
  } catch (error) {
    next(error);
  }
}

}

export const imageController = new ImageController();
