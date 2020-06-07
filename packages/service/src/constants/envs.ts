import { config } from 'dotenv';

config();

export const NODE_ENV = process.env.NODE_ENV;
export const ADMIN_TEST_USER = process.env.ADMIN_TEST_USER;
export const ADMIN_TEST_PASS = process.env.ADMIN_TEST_PASS;

export const DB_USER = process.env.DB_USER;
export const DB_HOST = process.env.DB_HOST;
export const DB_NAME = process.env.DB_NAME;
export const DB_PASS = process.env.DB_PASS;

export const JWT_ACCESS_TOKEN = process.env.JWT_ACCESS_TOKEN;
export const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN;

export const EMAIL_HOST = process.env.EMAIL_HOST;
export const EMAIL_USER = process.env.EMAIL_USER;
export const EMAIL_PASS = process.env.EMAIL_PASS;
export const PORTAL_ADRESS = process.env.PORTAL_ADRESS;

export const PORT = process.env.PORT;
