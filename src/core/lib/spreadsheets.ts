import type { GoogleSpreadsheetWorksheet } from 'google-spreadsheet';
import { GoogleSpreadsheet as GoogleSpreadsheetLib } from 'google-spreadsheet';
import { sheetAuth } from '@/core/config/auth';
import data from '@/core/data';
import type { IJobApplication, TStatus } from '@/core/types';
import { formatDate, generateId } from '@/core/utils';
import { logger } from './logger';

export const JOB_APPLICATION_COLUMNS: (keyof IJobApplication)[] = [
  'id',
  'created_at',
  'updated_at',
  'website',
  'contact',
  'position',
  'submission_link',
  'job_source',
  'status',
  'location',
] as const;

const status: readonly TStatus[] = [
  'Applied',
  'Closed',
  'Hired',
  'Pending',
  'Responsed',
  'Terminate',
] as const;

class Spreadsheet<T extends { id: string; created_at: string; updated_at: string }> {
  private sheet: () => Promise<GoogleSpreadsheetWorksheet>;

  constructor(
    private columns: (keyof T)[],
    config: {
      client_email: string;
      private_key: string;
      spreadsheet_id: string;
    }
  ) {
    this.sheet = async () => {
      const doc = new GoogleSpreadsheetLib(config.spreadsheet_id, sheetAuth);

      await doc.loadInfo();
      return doc.sheetsByIndex[0];
    };
  }

  setHeaders = async () => {
    logger.start('Setting spreadsheet headers');
    try {
      await (await this.sheet()).setHeaderRow(JOB_APPLICATION_COLUMNS);
      logger.success('Headers set successfully');
      return { success: true };
    } catch (error) {
      logger.error(
        `Failed to set headers: ${error instanceof Error ? error.message : String(error)}`
      );
      return { success: false };
    }
  };

  insert = async (
    data: Omit<T, 'id' | 'created_at' | 'updated_at'> & { status: TStatus }
  ): Promise<T | null> => {
    status.forEach(() => {
      if (!status.includes(data.status)) {
        logger.error(`status must be in [${status.join(' ')}]`);
      }
    });

    logger.start('Inserting new record');

    try {
      const now = formatDate();
      const row = await (await this.sheet()).addRow({
        ...data,
        id: generateId(),
        created_at: now,
        updated_at: now,
      });

      const record = this.mapRowToRecord(row);
      logger.success(`Record inserted with id '${record.id}'`);
      return record;
    } catch (error) {
      logger.error(
        `Failed to insert record: ${error instanceof Error ? error.message : String(error)}`
      );
      return null;
    }
  };

  find = async (criteria?: Partial<T>, meta?: { page?: number; limit?: number }): Promise<T[]> => {
    logger.start('Fetching records');
    try {
      const offset = ((meta?.page || 1) - 1) * (meta?.limit || 20);
      const rows = await (await this.sheet()).getRows({ limit: meta?.limit || 20, offset });

      const all = rows.map((row) => this.mapRowToRecord(row));

      const results = criteria
        ? all.filter((record) => this.matchesCriteria(record, criteria))
        : all;
      logger.success(`Found ${results.length} record(s)`);
      return results;
    } catch (error) {
      logger.error(
        `Failed to fetch records: ${error instanceof Error ? error.message : String(error)}`
      );
      return [];
    }
  };

  update = async (
    id: string,
    data: Partial<Omit<T, 'id' | 'created_at' | 'updated_at'>> & { status: TStatus }
  ): Promise<T | null> => {
    status.forEach(() => {
      if (!status.includes(data.status)) {
        logger.error(`status must be in [${status.join(' ')}]`);
      }
    });

    logger.start(`Updating record with id '${id}'`);
    try {
      const rows = await (await this.sheet()).getRows({ limit: 10000 });
      const row = rows.find((r) => r.get('id') === id);

      if (!row) {
        logger.error(`Record with id '${id}' not found`);
        return null;
      }

      const now = formatDate();
      row.set('updated_at', now);

      for (const [key, value] of Object.entries(data)) {
        if (value !== undefined) {
          row.set(key, value);
        }
      }

      await row.save();

      const record = this.mapRowToRecord(row);
      logger.success(`Record with id '${id}' updated successfully`);
      return record;
    } catch (error) {
      logger.error(
        `Failed to update record: ${error instanceof Error ? error.message : String(error)}`
      );
      return null;
    }
  };

  delete = async (id: string) => {
    logger.start(`Deleting record with id '${id}'`);
    try {
      const rows = await (await this.sheet()).getRows({ limit: 10000 });
      const row = rows.find((r) => r.get('id') === id);

      if (!row) {
        logger.error(`Record with id '${id}' not found`);
        return { success: false };
      }

      await row.delete();
      logger.success(`Record with id '${id}' deleted successfully`);
      return { success: true };
    } catch (error) {
      logger.error(
        `Failed to delete record: ${error instanceof Error ? error.message : String(error)}`
      );
      return { success: false };
    }
  };

  formatCells = async (options?: {
    headerAlignment?: 'LEFT' | 'CENTER' | 'RIGHT';
    columnAlignments?: Partial<Record<keyof T, 'LEFT' | 'CENTER' | 'RIGHT'>>;
  }) => {
    try {
      logger.start('Formatting cells');
      const sheetId = (await this.sheet()).sheetId;

      const requests: Record<string, unknown>[] = [
        {
          repeatCell: {
            range: {
              sheetId,
              startRowIndex: 0,
              endRowIndex: 1,
            },
            cell: {
              userEnteredFormat: {
                horizontalAlignment: options?.headerAlignment || 'CENTER',
                textFormat: { bold: true },
              },
            },
            fields: 'userEnteredFormat(horizontalAlignment,textFormat)',
          },
        },
      ];

      if (options?.columnAlignments) {
        for (const [key, alignment] of Object.entries(options.columnAlignments)) {
          const columnIndex = this.columns.indexOf(key as keyof T);
          if (columnIndex !== -1) {
            requests.push({
              repeatCell: {
                range: {
                  sheetId,
                  startRowIndex: 1,
                  startColumnIndex: columnIndex,
                  endColumnIndex: columnIndex + 1,
                },
                cell: {
                  userEnteredFormat: {
                    horizontalAlignment: alignment,
                  },
                },
                fields: 'userEnteredFormat.horizontalAlignment',
              },
            });
          }
        }
      }

      (await this.sheet())._spreadsheet._makeBatchUpdateRequest(requests);
      logger.success('Cells formatted successfully');
      return { success: true };
    } catch (error) {
      logger.error(
        `Failed to format cells: ${error instanceof Error ? error.message : String(error)}`
      );
      return { success: false };
    }
  };

  private mapRowToRecord = (row: { get: (key: string) => unknown }): T => {
    const record = {} as T;
    for (const column of this.columns) {
      record[column] = (row.get(column as string) || '') as T[keyof T];
    }
    return record;
  };

  private matchesCriteria = (record: T, criteria: Partial<T>): boolean => {
    for (const [key, value] of Object.entries(criteria)) {
      if (value === undefined) continue;

      const recordValue = record[key as keyof T];

      if (typeof value === 'string' && typeof recordValue === 'string') {
        if (!recordValue.toLowerCase().includes(value.toLowerCase())) {
          return false;
        }
      } else if (recordValue !== value) {
        return false;
      }
    }
    return true;
  };
}

export default new Spreadsheet<IJobApplication>(JOB_APPLICATION_COLUMNS, {
  client_email: data.credentials.client_email,
  private_key: data.credentials.private_key,
  spreadsheet_id: data.credentials.spreadsheet_id,
});
