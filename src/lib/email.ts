import fs from 'node:fs';
import { resolve } from 'node:path';
import { markdownToHtml } from 'mth-htm';
import { createTransport, type Transporter } from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import OpenAIBase from 'openai';
import data from '@/data';
import { emailPrompts } from '@/promts';
import { Efile } from '@/types';
import { ROOT } from '@/utils';
import { logger } from './logger';

class Email {
  #client: OpenAIBase;
  #transport: Transporter<SMTPTransport.SentMessageInfo, SMTPTransport.Options>;

  constructor() {
    this.#client = new OpenAIBase({ apiKey: data.credentials.open_ai_secret });
    this.#transport = createTransport({
      service: 'Gmail',
      secure: true,
      port: 465,
      auth: { user: data.credentials.lsa_user, pass: data.credentials.lsa_pass },
    });
  }

  generate = async () => {
    logger.start('Processing to generate new job email!');
    const email = (
      await this.#client.responses.create({
        model: 'gpt-4o-mini',
        input: emailPrompts({ jobxApply: data.apply, jobxConfig: data.config }),
      })
    ).output_text;

    fs.writeFileSync(resolve(ROOT, Efile['jobx.mail.md']), email, 'utf-8');
    logger.success('New job email has been generated!');
  };

  reset = async () => {
    logger.start('Processing to reset job email!');
    try {
      setTimeout(() => {
        fs.writeFileSync(resolve(ROOT, Efile['jobx.mail.md']), '');
        logger.success('New job email has been reset!');
      }, 1500);
    } catch {
      logger.error('Failed to reset job mail');
    }
  };

  submit = async () => {
    logger.start('Processing to sending job email!');
    try {
      const info = await this.#transport.sendMail({
        subject: data.apply.subject,
        from: data.credentials.lsa_user,
        to: data.apply.company_email,
        html: await markdownToHtml(fs.readFileSync(resolve(ROOT, Efile['jobx.mail.md']), 'utf-8')),
      });

      logger.success('Job email has sended successfully!');
    } catch (error) {
      logger.error('Failed to send job mail');
    }
  };
}

export default new Email();
