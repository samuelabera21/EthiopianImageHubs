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
 * Admin endpoints for Contributor Applications
 * All routes mounted at /admin/contributor-applications are restricted to ADMIN.
 */
router.use(auth_middleware_1.authenticate, (0, authorize_middleware_1.authorize)(["ADMIN"]));
/**
 * GET /admin/contributor-applications
 */
router.get("/", contributor_controller_1.contributorApplicationController.getApplications.bind(contributor_controller_1.contributorApplicationController));
/**
 * PATCH /admin/contributor-applications/:applicationId
 */
router.patch("/:applicationId", (0, validation_middleware_1.validate)(contributor_validator_1.reviewApplicationSchema), contributor_controller_1.contributorApplicationController.reviewApplication.bind(contributor_controller_1.contributorApplicationController));
exports.default = router;
