import { Efile } from '@/types';
import { loadJson, logger } from '@/utils';

interface PackageJson {
  name: string;
  version: string;
  description: string;
  repository?: {
    type: string;
    url: string;
  };
  keywords?: string[];
  author?: string;
  license?: string;
  homepage?: string;
}

const pkg = ((): PackageJson => {
  try {
    return loadJson<PackageJson>(Efile['package.json']);
  } catch {
    logger.error(`Failed to load package.json or invaldi format of package.json`);
    process.exit(1);
  }
})();

export default pkg;
