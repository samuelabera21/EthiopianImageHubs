import { prisma } from "../config/database";

export class TagRepository {
  async findAll() {
    return prisma.tag.findMany({
      orderBy: { name: "asc" },
    });
  }

  async findById(id: string) {
    return prisma.tag.findUnique({
      where: { id },
      include: {
        _count: {
          select: { imageTags: true },
        },
      },
    });
  }

  async findByNameOrSlug(name: string, slug: string) {
    return prisma.tag.findFirst({
      where: {
        OR: [{ name }, { slug }],
      },
    });
  }

  async createTag(data: { name: string; slug: string }) {
    return prisma.tag.create({ data });
  }

  async updateTag(id: string, data: { name: string; slug: string }) {
    return prisma.tag.update({
      where: { id },
      data,
    });
  }

  async deleteTag(id: string) {
    return prisma.tag.delete({
      where: { id },
    });
  }
}

export const tagRepository = new TagRepository();
