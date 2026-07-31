"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contributor_controller_1 = require("../controllers/contributor.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const authorize_middleware_1 = require("../middlewares/authorize.middleware");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const contributor_validator_1 = require("../validators/contributor.validator");
const router = (0, express_1.Router)();
/**
 * POST /contributors/apply
 * Allows an authenticated USER to submit an application.
 */
router.post("/apply", auth_middleware_1.authenticate, (0, authorize_middleware_1.authorize)(["USER"]), (0, validation_middleware_1.validate)(contributor_validator_1.applyContributorSchema), contributor_controller_1.contributorApplicationController.apply.bind(contributor_controller_1.contributorApplicationController));
/**
 * GET /contributors/application
 * Returns the authenticated user's contributor application.
 */
router.get("/application", auth_middleware_1.authenticate, (0, authorize_middleware_1.authorize)(["USER", "CONTRIBUTOR", "MODERATOR", "ADMIN"]), contributor_controller_1.contributorApplicationController.getApplication.bind(contributor_controller_1.contributorApplicationController));
exports.default = router;
