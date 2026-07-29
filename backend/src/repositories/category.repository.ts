import { prisma } from "../config/database";

export class CategoryRepository {
  async findAll() {
    return prisma.category.findMany({
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

  async findById(categoryId: string) {
    return prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });
  }
}

export const categoryRepository = new CategoryRepository();
