import dotenv from "dotenv";

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",

  port: Number(process.env.PORT) || 5000,

  databaseUrl: process.env.DATABASE_URL!,

  jwtAccessSecret: process.env.JWT_ACCESS_SECRET!,

  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET!,

  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN!,

  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN!,

  bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS) || 12,
};