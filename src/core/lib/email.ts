import fs from 'node:fs';
import { resolve } from 'node:path';
import { markdownToHtml } from 'mth-htm';
import { createTransport, type Transporter } from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import OpenAIBase from 'openai';
import * as prompts from '@/constants/prompts';
import data from '@/core/data';
import { Efile, type IJobxApply, type TLocation } from '@/types';
import { logger, ROOT } from '@/utils';
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
      auth: {
        user: data.credentials.lsa_user,
        pass: data.credentials.lsa_pass,
      },
    });
  }

  private extractInfoFromContext = async () => {
    const context = fs.readFileSync(
      resolve(ROOT, data.AditionalFile.context.path),
      'utf-8'
    );

    return JSON.parse(
      (
        await this.#client.responses.create({
          model: 'gpt-4o-mini',
          input: prompts.exactJobInfo(context),
        })
      ).output_text
    ) as Pick<
      IJobxApply,
      | 'company'
      | 'company_email'
      | 'company_website'
      | 'location'
      | 'position'
      | 'attachment_type'
    >;
  };

  generate = async () => {
    try {
      logger.start('AI is thingking....');
      const context = fs.readFileSync(
        resolve(ROOT, data.AditionalFile.context.path),
        'utf-8'
      );

      const info = await this.extractInfoFromContext();

      const apply = {
        ...JSON.parse(
          fs.readFileSync(resolve(ROOT, Efile['jobx.apply.json']), 'utf-8')
        ),
        ...info,
      } as IJobxApply;

      fs.writeFileSync(
        resolve(ROOT, Efile['jobx.apply.json']),
        JSON.stringify(apply, null, 2),
        'utf-8'
      );

      const email = (
        await this.#client.responses.create({
          model: 'gpt-4o-mini',
          input: prompts.emailPrompts({
            jobxApply: data.apply,
            jobxConfig: data.config,
            context,
            attachmentType: info.attachment_type,
          }),
        })
      ).output_text;

      fs.writeFileSync(resolve(ROOT, Efile['jobx.mail.md']), email, 'utf-8');
      logger.success('Job email generated successfully');
    } catch (error) {
      logger.error((error as Error).message, { code: 1, terminate: true });
    }
  };

  reset = async () => {
    logger.start('Resetting job email');
    try {
      setTimeout(() => {
        fs.writeFileSync(resolve(ROOT, Efile['jobx.mail.md']), '');
        logger.success('Job email reset successfully');
      }, 1500);
    } catch {
      logger.error('Failed to reset job email', { terminate: true, code: 1 });
    }
  };

  submit = async () => {
    try {
      logger.start('Sending job email');
      await this.#transport.sendMail({
        subject: data.apply.subject,
        from: data.credentials.lsa_user,
        to: data.apply.company_email,
        html: await markdownToHtml(
          fs.readFileSync(resolve(ROOT, Efile['jobx.mail.md']), 'utf-8')
        ),
        attachments: [
          {
            filename: `${data.config.profile.name}-${data.apply.attachment_type}.psf`,
            path: `jobx.${data.apply.attachment_type?.toLowerCase() || 'cv'}.pdf`,
            contentType: 'application/pdf',
          },
        ],
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
      logger.error(`Failed to send job email\n${(error as Error).message}`, {
        code: 1,
        terminate: true,
      });
    }
  };
}

export default new Email();
