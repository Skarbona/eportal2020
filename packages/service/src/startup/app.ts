import { config } from 'dotenv';
import { Express } from 'express';
import dbConnection from './db';

config();

export const appServer = (app: Express) => app.listen(process.env.PORT || 5000);

export default async (app: Express) => {
  try {
    await dbConnection();
    return appServer(app);
  } catch (e) {
    console.log(e);
  }
};
