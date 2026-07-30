"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("../controllers/category.controller");
const router = (0, express_1.Router)();
/**
 * GET /categories
 */
router.get("/", category_controller_1.categoryController.getCategories.bind(category_controller_1.categoryController));
exports.default = router;
