import type { Command } from 'commander';
import * as helper from '@/cli/helpers';
import { Efile } from '@/types';
import { logger } from '@/utils';

export const init = (command: Command) => {
  command
    .command('init')
    .description('Initialize the project with default configuration')
    .action(() => {
      helper.init();
    });
};

export const reset = (command: Command) => {
  command
    .command('reset')
    .description('Reset the project (soft or hard)')
    .option('-s, --soft', 'Soft reset')
    .option('-h, --hard', 'Hard reset')
    .action((opts: { soft?: boolean; hard?: boolean }) => {
      if (opts.soft && opts.hard) {
        logger.error('Cannot use both --soft and --hard at the same time.', {
          terminate: true,
          code: 1,
        });
      } else if (opts.hard) {
        helper.reset('HARD');
      } else {
        helper.reset('SOFT');
      }
    });
};

export const test = (command: Command) => {
  command
    .command('test')
    .description('Run tests on all files')
    .action(() => {
      helper.test([...Object.values(Efile)]);
    });
};

export const mail = (command: Command) => {
  command
    .command('mail')
    .description('Generate or submit job mail')
    .option('-g, --generate', 'Generate new job mail')
    .option('-s, --submit', 'Submit job mail')
    .action(async (opts: { generate?: boolean; submit?: boolean }) => {
      const { email } = await import('@/core');

      if (opts.generate && opts.submit) {
        await Promise.all([email.generate(), email.submit()]);
      } else if (opts.generate) {
        await email.generate();
      } else if (opts.submit) {
        await email.submit();
      } else {
        logger.warn('No action specified. Use --generate or --submit.');
      }
    });
};
