import type { GoogleSpreadsheetWorksheet } from 'google-spreadsheet';
import sheets from '@/config/google-spreadsheet.config';
import type { IJobApplication } from '@/types';
import { JOB_APPLICATION_COLUMNS } from '@/types';
import { formatDate, generateId } from '@/utils';

class JobApplication {
  private now = formatDate();
  constructor(private sheet: Promise<GoogleSpreadsheetWorksheet>) {}

  setHeaders = async (customOrder?: string[]) => {
    const sheet = await this.sheet;
    await sheet.setHeaderRow(customOrder || [...JOB_APPLICATION_COLUMNS]);
    return { success: true };
  };

  insert = async (data: Omit<IJobApplication, 'id' | 'created_at' | 'updated_at'>) => {
    await this.setHeaders();

    const row = await (await this.sheet).addRow({
      id: generateId(),
      created_at: this.now,
      updated_at: this.now,
      website: data.website,
      contact: data.contact,
      position: data.position,
      submission_link: data.submission_link,
      job_source: data.job_source,
      status: data.status,
      location: data.location,
    });

    return {
      id: row.get('id'),
      created_at: row.get('created_at'),
      updated_at: row.get('updated_at'),
      website: row.get('website'),
      contact: row.get('contact'),
      position: row.get('position'),
      submission_link: row.get('submission_link'),
      job_source: row.get('job_source'),
      status: row.get('status'),
      location: row.get('location'),
    } as IJobApplication;
  };

  find = async (
    criteria?: Partial<Pick<IJobApplication, 'position' | 'status' | 'location' | 'contact'>>,
    meta?: { page?: number; limit?: number }
  ): Promise<IJobApplication[]> => {
    const offset = ((meta?.page || 1) - 1) * (meta?.limit || 20);
    const rows = await (await this.sheet).getRows({ limit: meta?.limit || 20, offset });

    const all = rows.map((row) => ({
      id: row.get('id') || '',
      created_at: row.get('created_at') || '',
      updated_at: row.get('updated_at') || '',
      website: row.get('website') || '',
      contact: row.get('contact') || '',
      position: row.get('position') || '',
      submission_link: row.get('submission_link') || '',
      job_source: row.get('job_source') || '',
      status: row.get('status') || '',
      location: row.get('location') || '',
    }));

    if (!criteria) return all;

    return all.filter((app) => {
      if (
        criteria.position &&
        !app.position.toLowerCase().includes(criteria.position.toLowerCase())
      )
        return false;
      if (criteria.status && app.status !== criteria.status) return false;
      if (criteria.location && app.location !== criteria.location) return false;
      if (criteria.contact && app.contact !== criteria.contact) return false;
      return true;
    });
  };

  update = async (
    id: string,
    data: Partial<Omit<IJobApplication, 'id' | 'created_at' | 'updated_at'>>
  ) => {
    const rows = await (await this.sheet).getRows({ limit: 10000 });
    const row = rows.find((r) => r.get('id') === id);

    if (!row) {
      throw new Error(`Job application with id ${id} not found`);
    }

    row.set('updated_at', this.now);
    if (data.website !== undefined) row.set('website', data.website);
    if (data.contact !== undefined) row.set('contact', data.contact);
    if (data.position !== undefined) row.set('position', data.position);
    if (data.submission_link !== undefined) row.set('submission_link', data.submission_link);
    if (data.job_source !== undefined) row.set('job_source', data.job_source);
    if (data.status !== undefined) row.set('status', data.status);
    if (data.location !== undefined) row.set('location', data.location);

    await row.save();

    return {
      id: row.get('id'),
      created_at: row.get('created_at'),
      updated_at: row.get('updated_at'),
      website: row.get('website'),
      contact: row.get('contact'),
      position: row.get('position'),
      submission_link: row.get('submission_link'),
      job_source: row.get('job_source'),
      status: row.get('status'),
      location: row.get('location'),
    } as IJobApplication;
  };

  delete = async (id: string) => {
    const rows = await (await this.sheet).getRows({ limit: 10000 });
    const row = rows.find((r) => r.get('id') === id);

    if (!row) {
      throw new Error(`Job application with id ${id} not found`);
    }

    await row.delete();
    return { success: true };
  };

  formatCells = async (options?: {
    headerAlignment?: 'LEFT' | 'CENTER' | 'RIGHT';
    columnAlignments?: Partial<Record<keyof IJobApplication, 'LEFT' | 'CENTER' | 'RIGHT'>>;
  }) => {
    const sheet = await this.sheet;
    const sheetId = sheet.sheetId;

    const requests: unknown[] = [
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
      Object.entries(options.columnAlignments).forEach(([key, alignment]) => {
        const columnIndex = JOB_APPLICATION_COLUMNS.indexOf(key as keyof IJobApplication);
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
      });
    }

    await sheet._spreadsheet._makeBatchUpdateRequest(requests);

    return { success: true };
  };
}

const jobApplication = new JobApplication(sheets());

export default jobApplication;
