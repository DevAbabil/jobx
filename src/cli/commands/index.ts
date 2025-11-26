import type { Command } from 'commander';
import * as helper from '@/cli/helpers';
import { email } from '@/core';
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
  command
    .command('reset')
    .description('Reset the project (soft or hard)')
    .option('-s, --soft', 'Soft reset')
    .option('-h, --hard', 'Hard reset')
    .action((opts: { soft?: boolean; hard?: boolean }) => {
      if (opts.hard) return helper.reset('HARD');
      helper.reset('SOFT');
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
    .description('Generate new job mail')
    .command('mail')
    .option('-g, --generate', 'Generate new job mail')
    .option('-s, --submit', 'Submit job mail')
    .action(async (opts: { generate: boolean; submit: boolean }) => {
      if (opts.generate && opts.submit) {
        Promise.all([await email.generate(), await email.submit()]);
      } else if (opts.generate) {
        email.generate();
      } else if (opts.submit) {
        email.submit();
      }
    });
};
