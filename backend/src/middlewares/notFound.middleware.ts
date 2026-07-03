import { Request, Response } from "express";

export function notFoundMiddleware(
  req: Request,
  res: Response,
) {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
}