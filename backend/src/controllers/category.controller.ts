import { Request, Response, NextFunction } from "express";

import { categoryRepository } from "../repositories/category.repository";
import { categoryService } from "../services/category.service";
import { categoryParamsSchema, createCategorySchema, updateCategorySchema } from "../validators/category.validator";

export class CategoryController {
  /**
   * Get all categories
   */
  async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await categoryRepository.findAll();

      return res.json({ success: true, data: categories });
    } catch (error) {
      next(error);
    }
  }

  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const data = createCategorySchema.parse(req.body);
      const result = await categoryService.createCategory(data);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = categoryParamsSchema.parse(req.params);
      const data = updateCategorySchema.parse(req.body);
      const result = await categoryService.updateCategory(id, data);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = categoryParamsSchema.parse(req.params);
      const result = await categoryService.deleteCategory(id);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const categoryController = new CategoryController();
