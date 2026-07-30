"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailService = exports.MailService = void 0;
const mail_1 = require("../config/mail");
const env_1 = require("../config/env");
class MailService {
    async send(to, subject, html) {
        return mail_1.transporter.sendMail({
            from: env_1.env.mailFrom,
            to,
            subject,
            html,
        });
    }
}
exports.MailService = MailService;
exports.mailService = new MailService();
