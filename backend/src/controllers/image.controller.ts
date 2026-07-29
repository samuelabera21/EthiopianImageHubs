import { Request, Response, NextFunction } from "express";

import { getImagesQuerySchema, imageIdParamsSchema } from "./image.schema";
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
    // Validate and parse query parameters
    const query = getImagesQuerySchema.parse(req.query);

    const result = await imageService.getImages(query);

    // Normalize image paths for web compatibility
    const normalizedImages = result.data.map(image => ({
      ...image,
      storageKey: image.storageKey ? image.storageKey.replace(/\\/g, "/") : image.storageKey,
    }));
    return res.json({
      ...result,
      data: normalizedImages,
    });
  } catch (error) {
    next(error);
  }
}

  /**
   * Get image by ID
   */
  async getImageById(req: Request, res: Response, next: NextFunction) {
    try {
      // Validate and parse path parameters
      const { imageId } = imageIdParamsSchema.parse(req.params);

      const result = await imageService.getImageById(imageId);

      if (!result || !result.data) {
        return res.status(404).json({ success: false, message: "Image not found" });
      }

      // Normalize image path for web compatibility
      if (result.data.storageKey) {
        result.data.storageKey = result.data.storageKey.replace(/\\/g, "/");
      }

      return res.json(result);
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
        imageIdParamsSchema.parse(req.params).imageId, // imageId is already a UUID here
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
        imageIdParamsSchema.parse(req.params).imageId, // imageId is already a UUID here
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
        imageIdParamsSchema.parse(req.params).imageId, // imageId is already a UUID here
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
        imageIdParamsSchema.parse(req.params).imageId, // imageId is already a UUID here
        req.user.userId,
      );

    return res.json(result);
  } catch (error) {
    next(error);
  }
}

}

export const imageController = new ImageController();
