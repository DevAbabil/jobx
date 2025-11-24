import { Efile, type IJobxApply, type IJobxConfig, type IJobxCredentials } from '@/types';
import { loadJson, requireProperties, validateInnerFields } from '@/utils';

const jobxCredentials = (): IJobxCredentials => {
  const serviceAccountFile = Efile['jobx.credentials.json'];
  const sa = loadJson<IJobxCredentials>(serviceAccountFile);

  requireProperties(sa, serviceAccountFile, [
    'client_email',
    'private_key',
    'spreadsheet_id',
    'lsa_pass',
    'lsa_user',
    'open_ai_secret',
    'auth_client_id',
    'auth_client_secret',
  ] as (keyof IJobxCredentials)[]);

  Object.entries(sa).forEach(([prop, value]) => {
    if (!value || !value.toString().trim()) {
      console.error(`Missing property '${prop}' in ${serviceAccountFile}`);
      process.exit(1);
    }
  });

  return sa;
};

const jobxConfig = (): IJobxConfig => {
  const jobxConfigFile = Efile['jobx.config.json'];
  const config = loadJson<IJobxConfig>(jobxConfigFile);

  requireProperties(config, jobxConfigFile, [
    'profile',
    'links',
    'contact',
    'skills',
  ] as (keyof IJobxConfig)[]);

  (Object.keys(config) as []).forEach((field) => {
    validateInnerFields(config[field] as Record<string, string>, field, jobxConfigFile);
  });

  return config;
};

const jobxApply = (): Partial<IJobxApply> => {
  const jobxApplyFile = Efile['jobx.apply.json'];
  const apply = loadJson<Partial<IJobxApply>>(jobxApplyFile);
  requireProperties(apply, Efile['jobx.apply.json'], ['company_email'] as (keyof IJobxApply)[]);
  return apply;
};

export default {
  apply: jobxApply(),
  config: jobxConfig(),
  credentials: jobxCredentials(),
} as { apply: Partial<IJobxApply>; config: IJobxConfig; credentials: IJobxCredentials };
