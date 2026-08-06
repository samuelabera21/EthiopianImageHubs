import { Request, Response, NextFunction } from "express";
import { tagService } from "../services/tag.service";
import { createTagSchema, tagParamsSchema, updateTagSchema } from "../validators/tag.validator";

export class TagController {
  async getTags(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await tagService.getTags();
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async createTag(req: Request, res: Response, next: NextFunction) {
    try {
      const data = createTagSchema.parse(req.body);
      const result = await tagService.createTag(data);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateTag(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = tagParamsSchema.parse(req.params);
      const data = updateTagSchema.parse(req.body);
      const result = await tagService.updateTag(id, data);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteTag(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = tagParamsSchema.parse(req.params);
      const result = await tagService.deleteTag(id);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const tagController = new TagController();
