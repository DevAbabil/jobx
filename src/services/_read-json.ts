import {
  Efile,
  IJobxConfig,
  IServiceAccount,
  EJobxConfigGroups,
} from "@/types";
import { loadJson, requireProperties, validateInnerFields } from "@/utils";

export const serviceAccount: IServiceAccount = (() => {
  const serviceAccountFile = Efile["jobx.service-account.json"];
  const sa = loadJson<IServiceAccount>(serviceAccountFile);

  Object.entries(sa).forEach(([prop, value]) => {
    if (!value || !value.toString().trim()) {
      console.error(`Missing property '${prop}' in ${serviceAccountFile}`);
      process.exit(1);
    }
  });

  return sa;
})();

export const jobxConfig: IJobxConfig = (() => {
  const jobxConfigFile = Efile["jobx.config.json"];
  const config = loadJson<IJobxConfig>(jobxConfigFile);

  requireProperties(config, jobxConfigFile, Object.keys(EJobxConfigGroups));

  (Object.keys(config) as []).forEach((groupName) => {
    validateInnerFields(
      config[groupName] as Record<string, string>,
      groupName,
      jobxConfigFile
    );
  });

  return config;
})();
