"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
const jwt_1 = require("../utils/jwt");
/**
 * Require Authentication
 */
function authenticate(req, res, next) {
    try {
        //------------------------------------
        // Authorization Header
        //------------------------------------
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(401).json({
                success: false,
                message: "Authorization header missing",
            });
        }
        //------------------------------------
        // Bearer Token
        //------------------------------------
        const [type, token] = authorization.split(" ");
        if (type !== "Bearer" ||
            !token) {
            return res.status(401).json({
                success: false,
                message: "Invalid authorization header",
            });
        }
        //------------------------------------
        // Verify JWT
        //------------------------------------
        const payload = (0, jwt_1.verifyAccessToken)(token);
        //------------------------------------
        // Attach user
        //------------------------------------
        req.user = {
            userId: payload.userId,
            email: payload.email,
            role: payload.role,
        };
        next();
    }
    catch {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired access token",
        });
    }
}
