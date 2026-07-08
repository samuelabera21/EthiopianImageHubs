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
/**
 * POST /auth/login
 */
async login(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const result =
      await authService.login(req.body);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

/**
 * GET /auth/verify-email
 */
async verifyEmail(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.query.token as string;

    const result =
      await authService.verifyEmail(
        token,
      );

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

/**
 * POST /auth/forgot-password
 */
async forgotPassword(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    // const result =
    //   await authService.forgotPassword(
    //     req.body.email,
    //   );


const result =
  await authService.forgotPassword(
    req.body,
  );
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}


/**
 * POST /auth/reset-password
 */
async resetPassword(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const result =
      await authService.resetPassword(
        req.body,
      );

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

/**
 * GET /auth/me
 */
async me(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const result =
      await authService.me(
        req.user!.userId,
      );

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}


/**
 * POST /auth/refresh
 */
async refresh(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const result =
      await authService.refresh(
        req.body,
      );

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async logout(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const result =
      await authService.logout(
        req.body,
      );

    return res
      .status(200)
      .json(result);
  } catch (error) {
    next(error);
  }
}



}

export const authController = new AuthController();