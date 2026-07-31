"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contributorApplicationController = exports.ContributorApplicationController = void 0;
const contributor_service_1 = require("../services/contributor.service");
class ContributorApplicationController {
    /**
     * POST /contributors/apply
     */
    async apply(req, res, next) {
        try {
            const result = await contributor_service_1.contributorApplicationService.apply(req.user.userId, req.body);
            return res.status(201).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /contributors/application
     */
    async getApplication(req, res, next) {
        try {
            const result = await contributor_service_1.contributorApplicationService.getApplication(req.user.userId);
            return res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /admin/contributor-applications
     */
    async getApplications(req, res, next) {
        try {
            const result = await contributor_service_1.contributorApplicationService.getApplications({
                status: req.query.status,
                page: req.query.page,
                limit: req.query.limit,
            });
            return res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * PATCH /admin/contributor-applications/:applicationId
     */
    async reviewApplication(req, res, next) {
        try {
            const result = await contributor_service_1.contributorApplicationService.reviewApplication(req.params.applicationId, req.user.userId, req.body);
            return res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ContributorApplicationController = ContributorApplicationController;
exports.contributorApplicationController = new ContributorApplicationController();
