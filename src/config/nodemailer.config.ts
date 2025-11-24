import nodemailer from 'nodemailer';
import { jobxCredentials } from '@/helpers';

const mailTransporter = nodemailer.createTransport({
  service: 'Gmail',
  secure: true,
  port: 465,
  auth: {
    user: jobxCredentials.lsa_user,
    pass: jobxCredentials.lsa_pass,
  },
});

export default mailTransporter;
