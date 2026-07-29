import { Request, Response, NextFunction } from "express";

import { categoryRepository } from "../repositories/category.repository";

export class CategoryController {
  /**
   * Get all categories
   */
  async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await categoryRepository.findAll();

      return res.json({
        success: true,
        message: "Categories retrieved successfully",
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const categoryController = new CategoryController();
