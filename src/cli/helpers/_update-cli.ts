import { execSync } from 'node:child_process';
import colors from 'colors';
import figlet from 'figlet';
import fetch from 'node-fetch';
import semver from 'semver';
import pkg from '@/constants/pkg';
import logger from '@/utils/logger';

(async () => {
  const packageName = 'jobx';
  const localVersion = pkg.version;

  try {
    const res = await fetch(`https://registry.npmjs.org/${packageName}/latest`);
    const data = await res.json();
    const latestVersion = (data as { version: string }).version;

    if (semver.lt(localVersion, latestVersion)) {
      console.log(
        `\n${colors.rainbow(
          figlet.textSync('JobX CLI', { horizontalLayout: 'full' })
        )}\n`
      );
      console.log(colors.gray(`\nCurrent Version: ${localVersion}\n`));

      logger.warn(
        `⬆ New version available: ${colors.yellow(latestVersion)} (current: ${localVersion})`
      );

      logger.start(
        colors.cyan(
          'Updating JobX CLI globally... This might take a few seconds!'
        )
      );
      execSync(`npm i -g ${packageName}`, { stdio: 'inherit' });

      logger.success(colors.green.bold('Updated successfully!\n'));
      logger.appreciation();
    }
  } catch (err: unknown) {
    logger.error(colors.red.bold('Failed to check or update version'), {
      code: 1,
      terminate: true,
    });
    if (err instanceof Error) {
      logger.error(colors.red(err.message), { code: 1, terminate: true });
    } else {
      logger.error(colors.red(String(err)), { code: 1, terminate: true });
    }
  }
})();
