import { Request, Response, NextFunction } from "express";
import { downloadService } from "../services/download.service";
import { imageIdParamsSchema } from "./image.schema";
import { downloadHistoryQuerySchema } from "../validators/download.validator";

export class DownloadController {
  async downloadImage(req: Request, res: Response, next: NextFunction) {
    try {
      const { imageId } = imageIdParamsSchema.parse(req.params);
      const userId = req.user?.userId;
      const ipHash = req.ip;
      const userAgent = req.headers["user-agent"];

      const result = await downloadService.downloadImage(imageId, userId, ipHash, userAgent);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getDownloadHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, pageSize } = downloadHistoryQuerySchema.parse(req.query);
      const userId = req.user!.userId;

      const result = await downloadService.getDownloadHistory(userId, page, pageSize);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const downloadController = new DownloadController();
