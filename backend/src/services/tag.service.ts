import { tagRepository } from "../repositories/tag.repository";
import { CreateTagInput, UpdateTagInput } from "../validators/tag.validator";

export class TagService {
  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  async getTags() {
    const tags = await tagRepository.findAll();
    return {
      success: true,
      message: "Tags retrieved successfully",
      data: tags,
    };
  }

  async createTag(data: CreateTagInput) {
    const slug = this.generateSlug(data.name);

    const existingTag = await tagRepository.findByNameOrSlug(data.name, slug);
    if (existingTag) {
      throw Object.assign(new Error("Tag with this name or slug already exists"), { status: 409 });
    }

    const tag = await tagRepository.createTag({
      name: data.name,
      slug,
    });

    return {
      success: true,
      message: "Tag created successfully",
      data: tag,
    };
  }

  async updateTag(tagId: string, data: UpdateTagInput) {
    const existing = await tagRepository.findById(tagId);
    if (!existing) {
      throw Object.assign(new Error("Tag not found"), { status: 404 });
    }

    const slug = this.generateSlug(data.name);

    if (existing.name !== data.name || existing.slug !== slug) {
      const duplicate = await tagRepository.findByNameOrSlug(data.name, slug);
      if (duplicate && duplicate.id !== tagId) {
        throw Object.assign(new Error("Another tag with this name already exists"), { status: 409 });
      }
    }

    const updatedTag = await tagRepository.updateTag(tagId, {
      name: data.name,
      slug,
    });

    return {
      success: true,
      message: "Tag updated successfully",
      data: updatedTag,
    };
  }

  async deleteTag(tagId: string) {
    const existing = await tagRepository.findById(tagId);
    if (!existing) {
      throw Object.assign(new Error("Tag not found"), { status: 404 });
    }

    // In a real scenario, we might prevent deleting if it's used. 
    // Wait, the schema has `imageTags ImageTag[]`. Let's allow cascade delete or delete if we want.
    // Actually Prisma schema handles it, `ImageTag` will be cascade deleted or we just delete it.
    await tagRepository.deleteTag(tagId);

    return {
      success: true,
      message: "Tag deleted successfully",
    };
  }
}

export const tagService = new TagService();
