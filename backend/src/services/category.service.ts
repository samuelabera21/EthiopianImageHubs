import { categoryRepository } from "../repositories/category.repository";
import { CreateCategoryInput, UpdateCategoryInput } from "../validators/category.validator";

export class CategoryService {
  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  async createCategory(data: CreateCategoryInput) {
    const slug = this.generateSlug(data.name);

    const existing = await categoryRepository.findByNameOrSlug(data.name, slug);
    if (existing) {
      throw Object.assign(new Error("Category with this name or slug already exists"), { status: 409 });
    }

    const category = await categoryRepository.createCategory({
      name: data.name,
      slug,
      description: data.description,
    });

    return {
      success: true,
      message: "Category created successfully",
      data: category,
    };
  }

  async updateCategory(categoryId: string, data: UpdateCategoryInput) {
    const existing = await categoryRepository.findById(categoryId);
    if (!existing) {
      throw Object.assign(new Error("Category not found"), { status: 404 });
    }

    let slug = existing.slug;
    if (data.name && existing.name !== data.name) {
      slug = this.generateSlug(data.name);
      const duplicate = await categoryRepository.findByNameOrSlug(data.name, slug);
      if (duplicate && duplicate.id !== categoryId) {
        throw Object.assign(new Error("Another category with this name already exists"), { status: 409 });
      }
    }

    const updated = await categoryRepository.updateCategory(categoryId, {
      name: data.name,
      slug: data.name ? slug : undefined,
      description: data.description,
    });

    return {
      success: true,
      message: "Category updated successfully",
      data: updated,
    };
  }

  async deleteCategory(categoryId: string) {
    const existing = await categoryRepository.findById(categoryId);
    if (!existing) {
      throw Object.assign(new Error("Category not found"), { status: 404 });
    }

    // Safely prevent deleting category if it has images
    // Note: The _count comes from the repository include we added
    if ((existing as any)._count?.images > 0) {
      throw Object.assign(new Error("Cannot delete category with associated images"), { status: 400 });
    }

    await categoryRepository.deleteCategory(categoryId);

    return {
      success: true,
      message: "Category deleted successfully",
    };
  }
}

export const categoryService = new CategoryService();
