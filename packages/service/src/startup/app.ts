import { Express } from 'express';
import dbConnection from './db';
import { Server } from 'http';

import { PORT } from '../constants/envs';

export const appServer = (app: Express): Server => app.listen(PORT || 5000);

export default async (app: Express): Promise<Server> => {
  try {
    await dbConnection();
    return appServer(app);
  } catch (e) {
    console.log(e);
  }
};
