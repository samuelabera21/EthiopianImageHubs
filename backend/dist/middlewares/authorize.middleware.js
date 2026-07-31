"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = authorize;
/**
 * Require Authorization
 * Checks if the authenticated user's role is included in the allowed roles.
 */
function authorize(roles) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "Forbidden: insufficient permissions",
            });
        }
        next();
    };
}
