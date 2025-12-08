import { execSync } from 'node:child_process';
import colors from 'colors';
import fetch from 'node-fetch';
import semver from 'semver';
import pkg from '@/constants/pkg';
import logger from '@/utils/logger';

const figlet = require('figlet');

(async () => {
  const packageName = 'jobx';
  const localVersion = pkg.version;

  try {
    const res = await fetch(`https://registry.npmjs.org/${packageName}`);
    const data = await res.json();
    const latestVersion = (data as { 'dist-tags': { latest: string } })[
      'dist-tags'
    ].latest;

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
    const errorMessage = err instanceof Error ? err.message : String(err);
    logger.error(
      colors.red.bold(`Failed to check or update version: ${errorMessage}`)
    );
  }
})();
