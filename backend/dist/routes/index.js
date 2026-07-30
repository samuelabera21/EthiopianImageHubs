"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const category_routes_1 = __importDefault(require("./category.routes"));
const image_routes_1 = __importDefault(require("./image.routes"));
const router = (0, express_1.Router)();
router.get("/", (_, res) => {
    res.json({
        success: true,
        message: "Welcome to EthiopiaHub Images API",
        version: "v1",
    });
});
router.get("/health", (_, res) => {
    res.json({
        success: true,
        message: "API is healthy",
        timestamp: new Date(),
    });
});
/**
 * Authentication
 */
router.use("/auth", auth_routes_1.default);
/**
 * Categories
 */
router.use("/categories", category_routes_1.default);
/**
 * Images
 */
router.use("/images", image_routes_1.default);
exports.default = router;
