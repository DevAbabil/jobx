import fs from 'node:fs';
import colors from 'colors';
import jobxFileContent from '@/constants/jobx-file-content';
import { logger } from '@/utils';

const init = () => {
  const existFile = Object.entries(jobxFileContent).filter(([_, { path }]) =>
    fs.existsSync(path)
  );

  if (existFile.length) {
    const files = `[ ${existFile.map(([file]) => `'${file}'`).join(', ')} ]`;
    logger.error(
      `Initialization failed because the following files already exist: ${colors.green(files)}`,
      {
        terminate: true,
        code: 1,
      }
    );
  }
};

export default init;
