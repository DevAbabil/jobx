import type { IJobApplication, IJobxConfig, IJobxCredentials } from '@/types';

export const JOB_APPLICATION_COLUMNS: (keyof IJobApplication)[] = [
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

export const JOBX_CREDENTIALS_FIELDS: (keyof IJobxCredentials)[] = [
  'client_email',
  'private_key',
  'spreadsheet_id',
  'lsa_pass',
  'lsa_user',
  'open_ai_secret',
] as const;

export const JOBX_CONFIG_FIELDS: (keyof IJobxConfig)[] = [
  'profile',
  'links',
  'contact',
  'skills',
] as const;
