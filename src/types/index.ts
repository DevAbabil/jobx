export enum Efile {
  'jobx.apply.json' = 'jobx.apply.json',
  'jobx.config.json' = 'jobx.config.json',
  'jobx.credentials.json' = 'jobx.credentials.json',
  'jobx.mail.md' = 'jobx.mail.md',
}

export interface IJobxCredentials {
  client_email: string;
  private_key: string;
  spreadsheet_id: string;
  lsa_user: string;
  lsa_pass: string;
  open_ai_secret: string;
}

export enum EJobxConfigGroups {
  profile = 'profile',
  links = 'links',
  contact = 'contact',
  skills = 'skills',
}

export interface IJobxConfig {
  profile: {
    name?: string;
    address?: string;
  };
  links: {
    github?: string;
    portfolio?: string;
    linkedIn?: string;
  };
  contact: {
    email?: string;
    phone?: string;
  };
  skills: string[];
}

export interface IJobxApply {
  company: string;
  company_email: string;
  company_website: string;
  subject: string;
  position: string;
  experience: string;
  education: string;
  job_source: string;
  location: TLocation;
}

export type TStatus = 'Pending' | 'Applied' | 'Hired' | 'Responsed' | 'Terminate' | 'Closed';

export type TLocation = 'Remote' | 'Onsite';

export interface IJobApplication {
  id: string;
  created_at: string;
  updated_at: string;
  website: string;
  contact: string;
  position: string;
  submission_link: string;
  job_source: string;
  status: TStatus;
  location: TLocation;
}
