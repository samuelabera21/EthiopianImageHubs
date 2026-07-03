// import { createHash, randomBytes } from "crypto";

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


import crypto from "crypto";

/**
 * Generate a secure random token
 */
export function generateToken(length = 32): string {
  return crypto.randomBytes(length).toString("hex");
}

/**
 * Hash a token before storing in database
 */
export function hashToken(token: string): string {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
}