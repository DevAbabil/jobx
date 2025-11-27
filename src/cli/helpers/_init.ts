import fs from 'node:fs';
import jobxFileContent from '@/constants/jobx-file-content';
import { logger } from '@/utils';

const init = () => {
  const existFile = Object.entries(jobxFileContent).filter(([_, { path }]) =>
    fs.existsSync(path)
  );

  if (existFile.length) {
    return logger.error(`Directory is not empty`, {
      terminate: true,
      code: 1,
    });
  }

  Object.entries(jobxFileContent).forEach(([_file, { path, data }]) => {
    fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
  });
};

export default init;
