import type { GoogleSpreadsheetWorksheet } from 'google-spreadsheet';
import { GoogleSpreadsheet as GoogleSpreadsheetLib } from 'google-spreadsheet';
import { sheetAuth } from '@/config/auth';

import data from '@/data';
import type { IJobApplication } from '@/types';
import { formatDate, generateId } from '@/utils';

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
    await (await this.sheet()).setHeaderRow(JOB_APPLICATION_COLUMNS);
    return { success: true };
  };

  insert = async (data: Partial<Omit<T, 'id'>>): Promise<T> => {
    const now = formatDate();
    const row = await (await this.sheet()).addRow({
      ...data,
      id: generateId(),
      created_at: now,
      updated_at: now,
    });

    return this.mapRowToRecord(row);
  };

  find = async (criteria?: Partial<T>, meta?: { page?: number; limit?: number }): Promise<T[]> => {
    const offset = ((meta?.page || 1) - 1) * (meta?.limit || 20);
    const rows = await (await this.sheet()).getRows({ limit: meta?.limit || 20, offset });

    const all = rows.map((row) => this.mapRowToRecord(row));

    if (!criteria) return all;

    return all.filter((record) => this.matchesCriteria(record, criteria));
  };

  update = async (
    id: string,
    data: Partial<Omit<T, 'id' | 'created_at' | 'updated_at'>>
  ): Promise<T> => {
    const rows = await (await this.sheet()).getRows({ limit: 10000 });
    const row = rows.find((r) => r.get('id') === id);

    if (!row) {
      throw new Error(`Record with id ${id} not found`);
    }

    const now = formatDate();
    row.set('updated_at', now);

    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) {
        row.set(key, value);
      }
    }

    await row.save();

    return this.mapRowToRecord(row);
  };

  delete = async (id: string) => {
    const rows = await (await this.sheet()).getRows({ limit: 10000 });
    const row = rows.find((r) => r.get('id') === id);

    if (!row) {
      throw new Error(`Record with id ${id} not found`);
    }

    await row.delete();
    return { success: true };
  };

  formatCells = async (options?: {
    headerAlignment?: 'LEFT' | 'CENTER' | 'RIGHT';
    columnAlignments?: Partial<Record<keyof T, 'LEFT' | 'CENTER' | 'RIGHT'>>;
  }) => {
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
    return { success: true };
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
