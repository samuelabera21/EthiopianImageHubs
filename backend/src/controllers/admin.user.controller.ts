import { Request, Response, NextFunction } from "express";
import { adminUserService } from "../services/admin.user.service";
import { getUsersSchema, updateRoleSchema, updateStatusSchema } from "../validators/admin.validator";

export class AdminUserController {
  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const query = getUsersSchema.parse({ query: req.query }).query;
      const result = await adminUserService.getUsers({
        page: parseInt(query.page || "1", 10),
        limit: parseInt(query.limit || "10", 10),
        search: query.search,
        role: query.role,
        status: query.status,
      });

      res.status(200).json({
        success: true,
        message: "Users retrieved successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUserRole(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const { roleName } = updateRoleSchema.parse({ body: req.body }).body;

      const user = await adminUserService.updateUserRole(userId, roleName);

      res.status(200).json({
        success: true,
        message: "User role updated successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUserStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const { status } = updateStatusSchema.parse({ body: req.body }).body;

      const user = await adminUserService.updateUserStatus(userId, status);

      res.status(200).json({
        success: true,
        message: "User status updated successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const adminUserController = new AdminUserController();
