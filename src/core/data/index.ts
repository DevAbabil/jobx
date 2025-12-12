import { resolve } from 'node:path';
import {
  Efile,
  type IAdditionalFile,
  type IJobxApply,
  type IJobxConfig,
  type IJobxCredentials,
} from '@src/types';
import { loadJson, ROOT } from '@utils/index';

const credentials: IJobxCredentials = loadJson<IJobxCredentials>(
  Efile['jobx.credentials.json']
);
const config: IJobxConfig = loadJson<IJobxConfig>(Efile['jobx.config.json']);
const apply: Partial<IJobxApply> = loadJson<Partial<IJobxApply>>(
  Efile['jobx.apply.json']
);

const AditionalFile: IAdditionalFile = {
  context: {
    name: Efile['jobx.context.txt'],
    path: resolve(ROOT, 'jobx.context.txt'),
  },
  resume: {
    name: Efile['jobx.resume.pdf'],
    path: resolve(ROOT, Efile['jobx.resume.pdf']),
  },
  cv: {
    name: Efile['jobx.cv.pdf'],
    path: resolve(ROOT, Efile['jobx.cv.pdf']),
  },
};

export default { credentials, config, apply, AditionalFile };
