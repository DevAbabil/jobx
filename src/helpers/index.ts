import { JOBX_CONFIG_FIELDS, JOBX_CREDENTIALS_FIELDS } from '@/constants';
import { Efile, type IJobxConfig, type IJobxCredentials } from '@/types';
import { loadJson, requireProperties, validateInnerFields } from '@/utils';

export const jobxCredentials: IJobxCredentials = (() => {
  const serviceAccountFile = Efile['jobx.credentials.json'];
  const sa = loadJson<IJobxCredentials>(serviceAccountFile);

  requireProperties(sa, serviceAccountFile, JOBX_CREDENTIALS_FIELDS);

  Object.entries(sa).forEach(([prop, value]) => {
    if (!value || !value.toString().trim()) {
      console.error(`Missing property '${prop}' in ${serviceAccountFile}`);
      process.exit(1);
    }
  });

  return sa;
})();

export const jobxConfig: IJobxConfig = (() => {
  const jobxConfigFile = Efile['jobx.config.json'];
  const config = loadJson<IJobxConfig>(jobxConfigFile);

  requireProperties(config, jobxConfigFile, JOBX_CONFIG_FIELDS);

  (Object.keys(config) as []).forEach((field) => {
    validateInnerFields(config[field] as Record<string, string>, field, jobxConfigFile);
  });

  return config;
})();
