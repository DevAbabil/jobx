import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { jobxServiceAccount } from '@/helpers';

const sheets = async () => {
  const serviceAccountAuth = new JWT({
    email: jobxServiceAccount.client_email,
    key: jobxServiceAccount.private_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const doc = new GoogleSpreadsheet(jobxServiceAccount.spreadsheet_id, serviceAccountAuth);
  await doc.loadInfo();
  return doc.sheetsByIndex[0];
};

export default sheets;
