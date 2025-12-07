import { resolve } from 'node:path';
import {
  Efile,
  type IJobxApply,
  type IJobxConfig,
  type IJobxCredentials,
} from '@/types';
import { ROOT } from '@/utils';

const data: {
  apply: Partial<Record<keyof IJobxApply, string>>;
  config: IJobxConfig;
  credentials: Record<keyof IJobxCredentials, string>;
} = {
  apply: {
    subject: '<write subject line of the email>',
    company_email: '<write company email>',
    company: '<write company name>',
    company_website: '<write company website URL>',
    education: '<write your education info>',
    experience: '<write your experience>',
    job_source: '<write where you found the job>',
    location: '<write job/company location>',
    position: '<write job position title>',
  },
  config: {
    contact: {
      email: '<your email address>',
      phone: '<your phone number>',
    },
    links: {
      github: '<your github link>',
      linkedIn: '<your linkedin link>',
      portfolio: '<your portfolio website>',
    },
    profile: {
      address: '<your address>',
      name: '<your full name>',
    },
    skills: ['<skill-1>', '<skill-2>', '<skill-3>'],
  },
  credentials: {
    client_email: '<google service account client email>',
    private_key: '<google service account private key>',
    open_ai_secret: '<your openai secret key>',
    spreadsheet_id: '<google spreadsheet id>',
    lsa_pass: '<smtp or login service password>',
    lsa_user: '<smtp or login service username>',
  },
};

const jobxFileContent: Record<
  keyof typeof Efile,
  { path: string; data: unknown }
> = {
  'jobx.apply.json': {
    path: resolve(ROOT, Efile['jobx.apply.json']),
    data: data.apply,
  },
  'jobx.config.json': {
    path: resolve(ROOT, Efile['jobx.config.json']),
    data: data.config,
  },
  'jobx.credentials.json': {
    path: resolve(ROOT, Efile['jobx.credentials.json']),
    data: data.credentials,
  },
  'jobx.mail.md': {
    path: resolve(ROOT, Efile['jobx.mail.md']),
    data: '',
  },
  'jobx.resume.pdf': {
    path: resolve(ROOT, Efile['jobx.resume.pdf']),
    data: '',
  },
  'jobx.cv.md': {
    path: resolve(ROOT, Efile['jobx.cv.md']),
    data: '',
  },
  'jobx.context.md': {
    path: resolve(ROOT, Efile['jobx.context.md']),
    data: '',
  },
};

export default jobxFileContent;
