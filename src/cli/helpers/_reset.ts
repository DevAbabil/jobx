import fs from 'node:fs';
import jobxFileContent from '@/constants/jobx-file-content';
import { logger } from '@/utils';

const reset = (reset?: 'HARD' | 'SOFT') => {
  if (reset === 'SOFT') {
    const { path, data } = jobxFileContent['jobx.apply.json'];
    fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
    logger.info(`Jobx has been reseted softly!`);
  }

  if (reset === 'HARD') {
    Object.values(jobxFileContent).forEach(({ path, data }) => {
      if (path.includes('.pdf') && fs.existsSync(path)) {
        fs.unlinkSync(path);
      } else if (!path.includes('.pdf')) {
        fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
      }
    });
    logger.info(`Jobx has been reseted!`);
  }
};

export default reset;
