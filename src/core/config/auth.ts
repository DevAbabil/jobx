import { JWT } from 'google-auth-library';
import data from '@/core/data';

export const sheetAuth = new JWT({
  email: data.credentials.client_email,
  key: data.credentials.private_key,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});
