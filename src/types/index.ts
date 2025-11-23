export enum Efile {
  "jobx.apply.json" = "jobx.apply.json",
  "jobx.config.json" = "jobx.config.json",
  "jobx.service-account.json" = "jobx.service-account.json",
}

export interface IServiceAccount {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
  universe_domain: string;
}

export enum EJobxConfigGroups {
  profile = "profile",
  links = "links",
  contact = "contact",
  skills = "skills",
}

export interface IJobxConfig {
  [EJobxConfigGroups.profile]: {
    name?: string;
    address?: string;
  };
  [EJobxConfigGroups.links]: {
    github?: string;
    portfolio?: string;
    linkedIn?: string;
  };
  [EJobxConfigGroups.contact]: {
    email?: string;
    phone?: string;
  };
  [EJobxConfigGroups.skills]: string[];
}
