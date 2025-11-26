import { Efile, type IJobxApply, type IJobxConfig, type IJobxCredentials } from '@/types';
import { loadJson } from '@/utils';

const credentials: IJobxCredentials = loadJson<IJobxCredentials>(Efile['jobx.credentials.json']);
const config: IJobxConfig = loadJson<IJobxConfig>(Efile['jobx.config.json']);
const apply: Partial<IJobxApply> = loadJson<Partial<IJobxApply>>(Efile['jobx.apply.json']);

export default { credentials, config, apply };
