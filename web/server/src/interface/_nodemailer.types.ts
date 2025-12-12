import { SentMessageInfo } from "nodemailer/lib/smtp-transport";

export interface ITemplate {
  name: string;
  data: Record<string, unknown>;
}
export interface ISendEmailOptions {
  to: string;
  subject: string;
  template?: ITemplate;
}

export type TSendMail = (
  options: ISendEmailOptions
) => Promise<SentMessageInfo>;
