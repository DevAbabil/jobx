import Table from 'cli-table3';
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

export const sheet = (command: Command) => {
  const sheet = command
    .command('sheet')
    .description('Manage Google Sheets job records');

  sheet
    .command('find <id>')
    .description('Find job by submitted ID')
    .action(async (id: string) => {
      logger.start('Finding job records...');
      const { spreadsheets } = await import('@/core');
      const result = await spreadsheets.find({ id });

      if (!result || result.length === 0)
        return logger.warn(`No record found with id: ${id}`, {
          code: 1,
          terminate: true,
        });

      logger.success(`A record found with id: ${id}`);

      const table = new Table({
        head: ['Field', 'Value'],
        colWidths: [20, 70],
        wordWrap: true,
      });

      result.forEach((record) => {
        for (const [key, value] of Object.entries(record)) {
          table.push([key, value]);
        }
      });

      console.log(table.toString());
    });

  sheet
    .command('delete <id>')
    .description('Delete job by submitted ID')
    .action(async (id: string) => {
      const { spreadsheets } = await import('@/core');
      spreadsheets.delete(id);
    });

  sheet
    .command('update <id> <field> <value>')
    .description('Update submitted job field/value')
    .action(async (id: string, field: string, value: string) => {
      if (field === 'id')
        return logger.error(`id can not be updated`, {
          code: 1,
          terminate: true,
        });

      const { spreadsheets } = await import('@/core');

      const result = await spreadsheets.update(id, { [field]: value });

      if (!result)
        return logger.error(`Record not updated! may be not available!`, {
          code: 1,
          terminate: true,
        });

      const table = new Table({
        head: ['Field', 'Value'],
        colWidths: [20, 70],
        wordWrap: true,
      });

      for (const [key, value] of Object.entries(result)) {
        table.push([key, value]);
      }

      console.log(table.toString());
    });
};
