import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { jobxCredentials } from '@/helpers';

const sheets = async () => {
  const serviceAccountAuth = new JWT({
    email: jobxCredentials.client_email,
    key: jobxCredentials.private_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const doc = new GoogleSpreadsheet(jobxCredentials.spreadsheet_id, serviceAccountAuth);
  await doc.loadInfo();
  return doc.sheetsByIndex[0];
};

export default sheets;
