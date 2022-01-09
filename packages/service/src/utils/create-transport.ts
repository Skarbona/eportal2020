import { createTransport, Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import { EMAIL_HOST, EMAIL_PASS, EMAIL_USER } from '../constants/envs';

const createEmailTransporter = (): Transporter<SMTPTransport.SentMessageInfo> =>
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
