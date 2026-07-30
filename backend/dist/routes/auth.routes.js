"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const auth_validator_1 = require("../validators/auth.validator");
const router = (0, express_1.Router)();
/**
 * POST /auth/register
 */
router.post("/register", (0, validation_middleware_1.validate)(auth_validator_1.registerSchema), auth_controller_1.authController.register.bind(auth_controller_1.authController));
router.post("/login", (0, validation_middleware_1.validate)(auth_validator_1.loginSchema), auth_controller_1.authController.login);
/**
 * GET /auth/verify-email
 */
router.get("/verify-email", auth_controller_1.authController.verifyEmail.bind(auth_controller_1.authController));
/**
 * POST /auth/forgot-password
 */
router.post("/forgot-password", (0, validation_middleware_1.validate)(auth_validator_1.forgotPasswordSchema), auth_controller_1.authController.forgotPassword.bind(auth_controller_1.authController));
/**
 * POST /auth/reset-password
 */
router.post("/reset-password", (0, validation_middleware_1.validate)(auth_validator_1.resetPasswordSchema), auth_controller_1.authController.resetPassword.bind(auth_controller_1.authController));
/**
 * GET /auth/me
 */
router.get("/me", auth_middleware_1.authenticate, auth_controller_1.authController.me.bind(auth_controller_1.authController));
router.post("/refresh", (0, validation_middleware_1.validate)(auth_validator_1.refreshTokenSchema), auth_controller_1.authController.refresh.bind(auth_controller_1.authController));
router.post("/logout", (0, validation_middleware_1.validate)(auth_validator_1.logoutSchema), auth_controller_1.authController.logout.bind(auth_controller_1.authController));
exports.default = router;
