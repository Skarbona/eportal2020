import { createTransport } from 'nodemailer';

import { EMAIL_HOST, EMAIL_PASS, EMAIL_USER } from '../constants/envs';

const createEmailTransporter = () =>
  createTransport({
    host: EMAIL_HOST,
    port: 465,
    secure: true,
    debug: true,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

export default createEmailTransporter;
