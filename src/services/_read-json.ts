import { file, IJobxConfig, IServiceAccount } from "@/types";
import { loadJson, requireProperties, validateInnerFields } from "@/utils";

export const serviceAccount: IServiceAccount = (() => {
  const serviceAccountFile = file["jobx.service-account.json"];
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
  const jobxConfigFile = file["jobx.config.json"];
  const config = loadJson<IJobxConfig>(jobxConfigFile);

  requireProperties(config, jobxConfigFile, [
    "profile",
    "links",
    "contact",
    "skills",
  ]);

  (Object.keys(config) as []).forEach((groupName) => {
    validateInnerFields(
      config[groupName] as Record<string, string>,
      groupName,
      file["jobx.config.json"]
    );
  });

  return config;
})();
