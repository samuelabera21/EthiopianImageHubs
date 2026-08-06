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
      include: {
        _count: {
          select: { images: true },
        },
      }
    });
  }

  async findByNameOrSlug(name: string, slug: string) {
    return prisma.category.findFirst({
      where: {
        OR: [{ name }, { slug }],
      },
    });
  }

  async createCategory(data: { name: string; slug: string; description?: string }) {
    return prisma.category.create({ data });
  }

  async updateCategory(id: string, data: { name?: string; slug?: string; description?: string }) {
    return prisma.category.update({
      where: { id },
      data,
    });
  }

  async deleteCategory(id: string) {
    return prisma.category.delete({
      where: { id },
    });
  }
}

export const categoryRepository = new CategoryRepository();
