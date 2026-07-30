"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundMiddleware = notFoundMiddleware;
function notFoundMiddleware(req, res) {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
    });
}
