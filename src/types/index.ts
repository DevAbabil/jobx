export enum Efile {
  'jobx.apply.json' = 'jobx.apply.json',
  'jobx.config.json' = 'jobx.config.json',
  'jobx.service-account.json' = 'jobx.service-account.json',
}

export interface IServiceAccount {
  client_email: string;
  private_key: string;
  spreadsheet_id: string;
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

export interface IJobApplication {
  id: string;
  date: string;
  website: string;
  contact: string;
  position: string;
  submission_link: string;
  job_source: string;
  status: string;
  location: string;
}
