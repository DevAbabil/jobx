import * as helper from '@cli/helpers';
import { Efile } from '@src/types';
import { logger } from '@utils';
import Table from 'cli-table3';
import type { Command } from 'commander';

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
      const { email } = await import('@src/core');
      await email.generate();
    });

  mail
    .command('submit')
    .description('Submit job mail')
    .action(async () => {
      const { email } = await import('@src/core');
      await email.submit();
    });
};

export const sheet = (command: Command) => {
  const sheet = command
    .command('sheet')
    .description('Manage Google Sheets job records');

  const table = new Table({
    head: ['Field', 'Value'],
    colWidths: [20, 70],
    wordWrap: true,
  });

  sheet
    .command('find')
    .description('Find all job records with pagination')
    .option('-p, --page <page>', 'Page number', '1')
    .option('-l, --limit <limit>', 'Records per page', '20')
    .option('-i, --id <id>', 'Find by specific ID')
    .action(async (options: { page: string; limit: string; id?: string }) => {
      logger.start('Finding job records...');
      const { spreadsheets } = await import('@src/core');

      const page = Number.parseInt(options.page, 10);
      const limit = Number.parseInt(options.limit, 10);

      if (Number.isNaN(page) || page < 1) {
        return logger.error('Page must be a positive number', {
          code: 1,
          terminate: true,
        });
      }

      if (Number.isNaN(limit) || limit < 1) {
        return logger.error('Limit must be a positive number', {
          code: 1,
          terminate: true,
        });
      }

      const criteria = options.id ? { id: options.id } : undefined;
      const result = await spreadsheets.find(criteria, { page, limit });

      if (!result || result.length === 0) {
        const message = options.id
          ? `No record found with id: ${options.id}`
          : 'No records found';
        return logger.warn(message, {
          code: 1,
          terminate: true,
        });
      }

      if (options.id) {
        logger.success(`Found record with id: ${options.id}`);
      } else {
        // Get total count
        const totalRecords = await spreadsheets.count();
        const startRecord = (page - 1) * limit + 1;
        const endRecord = startRecord + result.length - 1;
        logger.success(
          `Found ${result.length} record(s) (showing ${startRecord}-${endRecord} of ${totalRecords} total)`
        );
      }

      result.forEach((record, index) => {
        if (index > 0) {
          table.push([{ colSpan: 2, content: '*'.repeat(88) }]);
        }
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
      const { spreadsheets } = await import('@src/core');
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

      const { spreadsheets } = await import('@src/core');

      const result = await spreadsheets.update(id, { [field]: value });

      if (!result)
        return logger.error(`Record not updated! may be not available!`, {
          code: 1,
          terminate: true,
        });

      for (const [key, value] of Object.entries(result)) {
        table.push([key, value]);
      }

      console.log(table.toString());
    });
};
