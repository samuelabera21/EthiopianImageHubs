"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRepository = exports.CategoryRepository = void 0;
const database_1 = require("../config/database");
class CategoryRepository {
    async findAll() {
        return database_1.prisma.category.findMany({
            select: {
                id: true,
                name: true,
                slug: true,
                description: true,
                createdAt: true,
                updatedAt: true,
            },
            orderBy: {
                name: "asc",
            },
        });
    }
    async findById(categoryId) {
        return database_1.prisma.category.findUnique({
            where: {
                id: categoryId,
            },
        });
    }
}
exports.CategoryRepository = CategoryRepository;
exports.categoryRepository = new CategoryRepository();
