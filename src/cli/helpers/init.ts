import fs from 'node:fs';
import jobxFileContent from '@/constants/jobx-file-content';
import { logger } from '@/utils';

export const init = (reset?: 'HARD' | 'SOFT') => {
  const existFile = Object.entries(jobxFileContent).filter(([_, { path }]) => fs.existsSync(path));

  if (existFile.length && !reset) {
    const files = `[ ${existFile.map(([file]) => `'${file}'`).join(', ')} ]`;
    logger.error(`Initialization failed because the following files already exist: ${files}`, {
      terminate: true,
      code: 1,
    });
  }

  if (reset === 'SOFT') {
    const { path, data } = jobxFileContent['jobx.apply.json'];
    console.log(path, data);
    fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
  }

  if (reset === 'HARD') {
    Object.values(jobxFileContent).forEach(({ path, data }) => {
      fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
    });
  }
};
