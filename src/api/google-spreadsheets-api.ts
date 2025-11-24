import type { GoogleSpreadsheetWorksheet } from 'google-spreadsheet';
import sheets from '@/config/spreadsheet';
import type { IJobApplication } from '@/types';
import { generateId } from '@/utils';

class JobApplication {
  constructor(private sheet: Promise<GoogleSpreadsheetWorksheet>) {}

  setHeaders = async (customOrder?: string[]) => {
    const sheet = await this.sheet;
    const defaultOrder: (keyof IJobApplication)[] = [
      'id',
      'date',
      'website',
      'contact',
      'position',
      'submission_link',
      'job_source',
      'status',
      'location',
    ];
    await sheet.setHeaderRow(customOrder || defaultOrder);
    return { success: true };
  };

  insert = async (data: Omit<IJobApplication, 'id'>) => {
    const row = await (await this.sheet).addRow({
      id: generateId(),
      date: data.date,
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
      date: row.get('date'),
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
    criteria?: Partial<Pick<IJobApplication, 'position' | 'status' | 'location' | 'contact'>>
  ): Promise<IJobApplication[]> => {
    const rows = await (await this.sheet).getRows();

    const all = rows.map((row) => ({
      id: row.get('id') || '',
      date: row.get('date') || '',
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

  update = async (id: string, data: Partial<Omit<IJobApplication, 'id'>>) => {
    const rows = await (await this.sheet).getRows();
    const row = rows.find((r) => r.get('id') === id);

    if (!row) {
      throw new Error(`Job application with id ${id} not found`);
    }

    if (data.date !== undefined) row.set('date', data.date);
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
      date: row.get('date'),
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
    const rows = await (await this.sheet).getRows();
    const row = rows.find((r) => r.get('id') === id);

    if (!row) {
      throw new Error(`Job application with id ${id} not found`);
    }

    await row.delete();
    return { success: true };
  };
}

const jobApplication = new JobApplication(sheets());

export default jobApplication;
