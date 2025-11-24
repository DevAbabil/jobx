import { JOB_APPLICATION_COLUMNS } from '@/constants';
import { jobxCredentials } from '@/helpers';
import GoogleSpreadsheet from '@/lib/google-spreadsheets';
import type { IJobApplication } from '@/types';

export default new GoogleSpreadsheet<IJobApplication>(JOB_APPLICATION_COLUMNS, {
  client_email: jobxCredentials.client_email,
  private_key: jobxCredentials.private_key,
  spreadsheet_id: jobxCredentials.spreadsheet_id,
});
