"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mail_1 = require("../config/mail");
async function testMail() {
    try {
        await mail_1.transporter.verify();
        console.log("✅ SMTP Connected Successfully");
    }
    catch (error) {
        console.error(error);
    }
}
testMail();
