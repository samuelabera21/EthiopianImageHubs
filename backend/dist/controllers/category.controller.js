"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryController = exports.CategoryController = void 0;
const category_repository_1 = require("../repositories/category.repository");
class CategoryController {
    /**
     * Get all categories
     */
    async getCategories(req, res, next) {
        try {
            const categories = await category_repository_1.categoryRepository.findAll();
            return res.json({ success: true, data: categories });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.CategoryController = CategoryController;
exports.categoryController = new CategoryController();
