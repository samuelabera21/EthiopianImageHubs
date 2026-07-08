import {
  Request,
  Response,
  NextFunction,
} from "express";

import { verifyAccessToken } from "../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
        role: string;
      };
    }
  }
}

/**
 * Require Authentication
 */
export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    //------------------------------------
    // Authorization Header
    //------------------------------------

    const authorization =
      req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing",
      });
    }

    //------------------------------------
    // Bearer Token
    //------------------------------------

    const [type, token] =
      authorization.split(" ");

    if (
      type !== "Bearer" ||
      !token
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization header",
      });
    }

    //------------------------------------
    // Verify JWT
    //------------------------------------

    const payload =
      verifyAccessToken(token);

    //------------------------------------
    // Attach user
    //------------------------------------

    req.user = {
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    };

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired access token",
    });
  }
}