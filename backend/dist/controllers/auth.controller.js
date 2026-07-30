"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const env_1 = require("../config/env");
class AuthController {
    /**
     * POST /auth/register
     */
    async register(req, res, next) {
        try {
            const result = await auth_service_1.authService.register(req.body);
            return res.status(201).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * POST /auth/login
     */
    async login(req, res, next) {
        try {
            const result = await auth_service_1.authService.login(req.body);
            return res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /auth/verify-email
     */
    async verifyEmail(req, res, next) {
        try {
            const token = req.query.token;
            const result = await auth_service_1.authService.verifyEmail(token);
            if (req.headers.accept?.includes("text/html")) {
                const frontendUrl = env_1.env.frontendUrl || "http://localhost:3001";
                return res.redirect(`${frontendUrl}/verify-email?token=${encodeURIComponent(token)}`);
            }
            return res.status(200).json(result);
        }
        catch (error) {
            if (req.headers.accept?.includes("text/html")) {
                const frontendUrl = env_1.env.frontendUrl || "http://localhost:3001";
                const token = req.query.token || "";
                return res.redirect(`${frontendUrl}/verify-email?token=${encodeURIComponent(token)}`);
            }
            next(error);
        }
    }
    /**
     * POST /auth/forgot-password
     */
    async forgotPassword(req, res, next) {
        try {
            // const result =
            //   await authService.forgotPassword(
            //     req.body.email,
            //   );
            const result = await auth_service_1.authService.forgotPassword(req.body);
            return res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * POST /auth/reset-password
     */
    async resetPassword(req, res, next) {
        try {
            const result = await auth_service_1.authService.resetPassword(req.body);
            return res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /auth/me
     */
    async me(req, res, next) {
        try {
            const result = await auth_service_1.authService.me(req.user.userId);
            return res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * POST /auth/refresh
     */
    async refresh(req, res, next) {
        try {
            const result = await auth_service_1.authService.refresh(req.body);
            return res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async logout(req, res, next) {
        try {
            const result = await auth_service_1.authService.logout(req.body);
            return res
                .status(200)
                .json(result);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AuthController = AuthController;
exports.authController = new AuthController();
