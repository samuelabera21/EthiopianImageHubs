"use strict";
// import { createHash, randomBytes } from "crypto";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.hashToken = hashToken;
// /**
//  * Generate a cryptographically secure random token.
//  */
// export function generateRandomToken(length = 32): string {
//   return randomBytes(length).toString("hex");
// }
// /**
//  * Hash a token before saving it in the database.
//  */
// export function hashToken(token: string): string {
//   return createHash("sha256").update(token).digest("hex");
// }
const crypto_1 = __importDefault(require("crypto"));
/**
 * Generate a secure random token
 */
function generateToken(length = 32) {
    return crypto_1.default.randomBytes(length).toString("hex");
}
/**
 * Hash a token before storing in database
 */
function hashToken(token) {
    return crypto_1.default
        .createHash("sha256")
        .update(token)
        .digest("hex");
}
