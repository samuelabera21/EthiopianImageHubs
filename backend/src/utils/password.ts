import bcrypt from "bcrypt";
import { env } from "../config/env";

/**
 * Hash a plain password
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, env.bcryptSaltRounds);
}

/**
 * Compare plain password with stored hash
 */
export async function comparePassword(
  password: string,
  passwordHash: string,
): Promise<boolean> {
  return bcrypt.compare(password, passwordHash);
}