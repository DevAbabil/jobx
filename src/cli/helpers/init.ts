import fs from 'node:fs';
import { resolve } from 'node:path';
import { jobxFileContent } from '@/constants/jobx-file-content';
import { Efile } from '@/types';
import { logger, ROOT } from '@/utils';

type TInitConfig = {
  isReset?: boolean;
  resetFiles?: (keyof typeof Efile)[];
};

const FILE_PATHS = {
  apply: resolve(ROOT, Efile['jobx.apply.json']),
  config: resolve(ROOT, Efile['jobx.config.json']),
  credentials: resolve(ROOT, Efile['jobx.credentials.json']),
  mail: resolve(ROOT, Efile['jobx.mail.md']),
} as const;

const FILE_CONTENT_MAP = {
  'jobx.apply.json': { path: FILE_PATHS.apply, content: jobxFileContent.apply },
  'jobx.config.json': { path: FILE_PATHS.config, content: jobxFileContent.config },
  'jobx.credentials.json': { path: FILE_PATHS.credentials, content: jobxFileContent.credentials },
  'jobx.mail.md': { path: FILE_PATHS.mail, content: '' },
} as Record<keyof typeof Efile, { path: string; content: unknown }>;

const checkExistingFiles = (): boolean => {
  const existingFiles = Object.values(Efile).filter((file) => fs.existsSync(resolve(ROOT, file)));

  if (existingFiles.length > 0) {
    logger.error(`Initialization failed! Files already exist: ${existingFiles.join(', ')}`);
    return false;
  }
  return true;
};

const writeFile = (fileName: keyof typeof Efile, isReset: boolean) => {
  const fileConfig = FILE_CONTENT_MAP[fileName];
  const content =
    typeof fileConfig.content === 'string'
      ? fileConfig.content
      : JSON.stringify(fileConfig.content, null, 2);

  fs.writeFileSync(fileConfig.path, content, 'utf-8');

  if (isReset) {
    logger.info(`'${fileName}' has been reset`);
  }
};

export const init = (config?: TInitConfig) => {
  const { isReset = false, resetFiles = [] } = config || {};

  if (!isReset && !checkExistingFiles()) {
    return;
  }

  const filesToWrite = isReset && resetFiles.length > 0 ? resetFiles : Object.keys(Efile);

  for (const fileName of filesToWrite) {
    writeFile(fileName as keyof typeof Efile, isReset);
  }

  if (!isReset) {
    logger.success('Jobx initialized successfully! Configuration files created.');
  }
};
