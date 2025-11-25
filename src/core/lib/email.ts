import fs from 'node:fs';
import { resolve } from 'node:path';
import { markdownToHtml } from 'mth-htm';
import { createTransport, type Transporter } from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import OpenAIBase from 'openai';
import data from '@/core/data';
import { emailPrompts } from '@/core/promts';
import { Efile, type TLocation } from '@/core/types';
import { ROOT } from '@/core/utils';
import { logger } from './logger';
import spreadsheets from './spreadsheets';

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
    logger.start('Generating new job email');
    const email = (
      await this.#client.responses.create({
        model: 'gpt-4o-mini',
        input: emailPrompts({ jobxApply: data.apply, jobxConfig: data.config }),
      })
    ).output_text;

    fs.writeFileSync(resolve(ROOT, Efile['jobx.mail.md']), email, 'utf-8');
    logger.success('Job email generated successfully');
  };

  reset = async () => {
    logger.start('Resetting job email');
    try {
      setTimeout(() => {
        fs.writeFileSync(resolve(ROOT, Efile['jobx.mail.md']), '');
        logger.success('Job email reset successfully');
      }, 1500);
    } catch {
      logger.error('Failed to reset job email');
    }
  };

  submit = async () => {
    logger.start('Sending job email');
    try {
      await this.#transport.sendMail({
        subject: data.apply.subject,
        from: data.credentials.lsa_user,
        to: data.apply.company_email,
        html: await markdownToHtml(fs.readFileSync(resolve(ROOT, Efile['jobx.mail.md']), 'utf-8')),
      });

      logger.success('Job email sent successfully');

      await spreadsheets.insert({
        website: data.apply.company_website || 'N/A',
        contact: data.apply.company_email || 'N/A',
        job_source: data.apply.job_source || 'N/A',
        location: data.apply.location as TLocation,
        position: data.apply.position as string,
        status: 'Applied',
        submission_link: 'update it now',
      });
    } catch (error) {
      logger.error('Failed to send job email');
    }
  };
}

export default new Email();
