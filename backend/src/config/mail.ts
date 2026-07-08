import nodemailer from "nodemailer";

import { env } from "./env";

export const transporter =
  nodemailer.createTransport({
    host: env.smtpHost,

    port: env.smtpPort,

    secure: false,

    auth: {
      user: env.smtpUser,

      pass: env.smtpPass,
    },
  });