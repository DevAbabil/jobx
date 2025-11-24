import type { IJobApplication } from '@/types';

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
