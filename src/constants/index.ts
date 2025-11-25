import type { IJobxApply, IJobxConfig, IJobxCredentials } from '@/types';

export const jobxFileContent: {
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
