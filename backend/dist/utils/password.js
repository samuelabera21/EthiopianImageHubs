"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;
const bcrypt_1 = __importDefault(require("bcrypt"));
const env_1 = require("../config/env");
/**
 * Hash a plain password
 */
async function hashPassword(password) {
    return bcrypt_1.default.hash(password, env_1.env.bcryptSaltRounds);
}
/**
 * Compare plain password with stored hash
 */
async function comparePassword(password, passwordHash) {
    return bcrypt_1.default.compare(password, passwordHash);
}
