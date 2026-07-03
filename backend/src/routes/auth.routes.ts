import { Router } from "express";

import { authController } from "../controllers/auth.controller";

import { validate } from "../middlewares/validation.middleware";

import {
  registerSchema,
} from "../validators/auth.validator";

const router = Router();

/**
 * POST /auth/register
 */
router.post(
  "/register",
  validate(registerSchema),
  authController.register.bind(authController),
);

export default router;