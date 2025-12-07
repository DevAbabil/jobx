import { resolve } from 'node:path';
import {
  Efile,
  type IAdditionalFile,
  type IJobxApply,
  type IJobxConfig,
  type IJobxCredentials,
} from '@/types';
import { loadJson, ROOT } from '@/utils';

const credentials: IJobxCredentials = loadJson<IJobxCredentials>(
  Efile['jobx.credentials.json']
);
const config: IJobxConfig = loadJson<IJobxConfig>(Efile['jobx.config.json']);
const apply: Partial<IJobxApply> = loadJson<Partial<IJobxApply>>(
  Efile['jobx.apply.json']
);

const AditionalFile: IAdditionalFile = {
  context: {
    name: Efile['jobx.context.md'],
    path: resolve(ROOT, 'jobx.context.txt'),
  },
  resume: {
    name: Efile['jobx.resume.pdf'],
    path: resolve(ROOT, Efile['jobx.resume.pdf']),
  },
  cv: {
    name: Efile['jobx.cv.md'],
    path: resolve(ROOT, Efile['jobx.cv.md']),
  },
};

export default { credentials, config, apply, AditionalFile };
