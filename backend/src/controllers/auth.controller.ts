import { Request, Response, NextFunction } from "express";

import { authService } from "../services/auth.service";

export class AuthController {
  /**
   * POST /auth/register
   */
  async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await authService.register(req.body);

      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();