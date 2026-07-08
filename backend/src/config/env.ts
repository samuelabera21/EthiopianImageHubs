// import dotenv from "dotenv";

// dotenv.config();

// export const env = {
//   nodeEnv: process.env.NODE_ENV ?? "development",

//   port: Number(process.env.PORT) || 5000,

//   databaseUrl: process.env.DATABASE_URL!,

//   jwtAccessSecret: process.env.JWT_ACCESS_SECRET!,

//   jwtRefreshSecret: process.env.JWT_REFRESH_SECRET!,

//   jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN!,

//   jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN!,

//   bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS) || 12,
// };

import dotenv from "dotenv";

dotenv.config();

export const env = {
  //------------------------------------
  // App
  //------------------------------------

  nodeEnv:
    process.env.NODE_ENV ??
    "development",

  port:
    Number(process.env.PORT) ||
    5000,

  //------------------------------------
  // Database
  //------------------------------------

  databaseUrl:
    process.env.DATABASE_URL!,

  //------------------------------------
  // JWT
  //------------------------------------

  jwtAccessSecret:
    process.env.JWT_ACCESS_SECRET!,

  jwtRefreshSecret:
    process.env.JWT_REFRESH_SECRET!,

  jwtAccessExpiresIn:
    process.env.JWT_ACCESS_EXPIRES_IN!,

  jwtRefreshExpiresIn:
    process.env.JWT_REFRESH_EXPIRES_IN!,

  //------------------------------------
  // Password
  //------------------------------------

  bcryptSaltRounds:
    Number(
      process.env.BCRYPT_SALT_ROUNDS,
    ) || 12,

  //------------------------------------
  // Mail
  //------------------------------------

  smtpHost:
    process.env.SMTP_HOST!,

  smtpPort:
    Number(process.env.SMTP_PORT),

  smtpUser:
    process.env.SMTP_USER!,

  smtpPass:
    process.env.SMTP_PASS!,

  mailFrom:
    process.env.MAIL_FROM!,

  backendUrl: process.env.BACKEND_URL!,

  //------------------------------------
  // Frontend
  //------------------------------------

  frontendUrl:
    process.env.FRONTEND_URL!,
};