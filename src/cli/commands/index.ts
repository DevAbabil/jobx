import type { Command } from 'commander';
import * as helper from '@/cli/helpers';
import { Efile } from '@/types';

export const init = (command: Command) => {
  command
    .command('init')
    .description('Initialize the project with default configuration')
    .action(() => {
      helper.init();
    });
};

export const reset = (command: Command) => {
  const reset = command
    .command('reset')
    .description('Reset the project (soft or hard)');

  reset
    .command('soft')
    .description('Perform a soft reset')
    .action(() => {
      helper.reset('SOFT');
    });

  reset
    .command('hard')
    .description('Perform a hard reset')
    .action(() => {
      helper.reset('HARD');
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
  const mail = command
    .command('mail')
    .description('Generate or submit job mail');

  mail
    .command('generate')
    .description('Generate new job mail')
    .action(async () => {
      const { email } = await import('@/core');
      await email.generate();
    });

  mail
    .command('submit')
    .description('Submit job mail')
    .action(async () => {
      const { email } = await import('@/core');
      await email.submit();
    });
};
