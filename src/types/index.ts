export enum Efile {
  'jobx.apply.json' = 'jobx.apply.json',
  'jobx.config.json' = 'jobx.config.json',
  'jobx.credentials.json' = 'jobx.credentials.json',
}

export interface IJobxCredentials {
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

export const JOB_APPLICATION_COLUMNS: readonly (keyof IJobApplication)[] = [
  'id',
  'created_at',
  'updated_at',
  'website',
  'contact',
  'position',
  'submission_link',
  'job_source',
  'status',
  'location',
] as const;
