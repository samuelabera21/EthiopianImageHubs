import { Router } from "express";

import { authController } from "../controllers/auth.controller";

const router = Router();

/**
 * POST /api/v1/auth/register
 */
router.post(
  "/register",
  authController.register.bind(authController),
);

export default router;