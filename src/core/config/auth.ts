import data from '@src/core/data';
import { JWT } from 'google-auth-library';

export const sheetAuth = new JWT({
  email: data.credentials.client_email,
  key: data.credentials.private_key,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});
