import { envs } from "../../config/envs";
import nodemailer from "nodemailer";

interface MailOptions {
  to: string;
  subject: string;
  htmlBody: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_ACCESS_TOKEN,
    },
  });

  async sendMail(options:MailOptions) {
    try {
      const { to, subject, htmlBody } = options;
      const sendInfo = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody
      });
      console.log(sendInfo);
    } catch (error) {
      console.log(error);
    }
  };
}