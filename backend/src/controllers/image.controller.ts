import { Request, Response, NextFunction } from "express";

import { imageService } from "../services/image.service";

export class ImageController {

  /**
   * Upload image
   */
  async uploadImage(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const image =
        await imageService.uploadImage(
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
      });

    return res.json(images);
  } catch (error) {
    next(error);
  }
}

}

export const imageController =
  new ImageController();