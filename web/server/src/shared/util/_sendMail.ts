import nodemailer from "nodemailer";
import ejs from "ejs";
import { join } from "path";
import { ENV } from "@/config";
import { TSendMail } from "@/interface";

export const mailTransporter = nodemailer.createTransport({
  service: "Gmail",
  secure: true,
  port: 465,
  auth: {
    user: ENV.LSA_USER,
    pass: ENV.LSA_PASS,
  },
});

export const sendMail: TSendMail = async (options) => {
  const { subject, to, template } = options;

  const html = await ejs.renderFile(
    join(process.cwd(), "src", "shared", "templates", `${template?.name}.ejs`),
    template?.data
  );

  return mailTransporter.sendMail({
    from: ENV.LSA_USER,
    to,
    subject,
    html,
  });
};
