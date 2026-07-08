import { transporter } from "../config/mail";
import { env } from "../config/env";

export class MailService {
  async send(
    to: string,
    subject: string,
    html: string,
  ) {
    return transporter.sendMail({
      from: env.mailFrom,

      to,

      subject,

      html,
    });
  }
}

export const mailService =
  new MailService();