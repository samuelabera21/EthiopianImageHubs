import { transporter } from "../config/mail";

async function testMail() {
  try {
    await transporter.verify();

    console.log(
      "✅ SMTP Connected Successfully",
    );
  } catch (error) {
    console.error(error);
  }
}

testMail();