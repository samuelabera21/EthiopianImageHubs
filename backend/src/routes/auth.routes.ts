import { Router } from "express";

import { authController } from "../controllers/auth.controller";

import { validate } from "../middlewares/validation.middleware";

import { authenticate } from "../middlewares/auth.middleware";
import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  refreshTokenSchema,
  logoutSchema,
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

router.post(
  "/login",
  validate(loginSchema),
  authController.login,
);

/**
 * GET /auth/verify-email
 */
router.get(
  "/verify-email",
  authController.verifyEmail.bind(
    authController,
  ),
);


/**
 * POST /auth/forgot-password
 */
router.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  authController.forgotPassword.bind(
    authController,
  ),
);


/**
 * POST /auth/reset-password
 */
router.post(
  "/reset-password",
  validate(resetPasswordSchema),
  authController.resetPassword.bind(
    authController,
  ),
);


/**
 * GET /auth/me
 */
router.get(
  "/me",
  authenticate,
  authController.me.bind(authController),
);


router.post(
  "/refresh",
  validate(refreshTokenSchema),
  authController.refresh.bind(
    authController,
  ),
);

router.post(
  "/logout",
  validate(logoutSchema),
  authController.logout.bind(
    authController,
  ),
);

export default router;