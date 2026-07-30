"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = generateAccessToken;
exports.generateRefreshToken = generateRefreshToken;
exports.verifyAccessToken = verifyAccessToken;
exports.verifyRefreshToken = verifyRefreshToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
/**
 * Generate Access Token
 */
function generateAccessToken(payload) {
    return jsonwebtoken_1.default.sign(payload, env_1.env.jwtAccessSecret, {
        expiresIn: env_1.env.jwtAccessExpiresIn,
    });
}
/**
 * Generate Refresh Token
 */
function generateRefreshToken(payload) {
    return jsonwebtoken_1.default.sign(payload, env_1.env.jwtRefreshSecret, {
        expiresIn: env_1.env.jwtRefreshExpiresIn,
    });
}
/**
 * Verify Access Token
 */
function verifyAccessToken(token) {
    return jsonwebtoken_1.default.verify(token, env_1.env.jwtAccessSecret);
}
/**
 * Verify Refresh Token
 */
function verifyRefreshToken(token) {
    return jsonwebtoken_1.default.verify(token, env_1.env.jwtRefreshSecret);
}
