import { Express } from 'express';
import dbConnection from './db';
import { Server } from 'http';
import Stripe from 'stripe';

import { PORT, STRIPE_SECRET } from '../constants/envs';

export const appServer = (app: Express): Server => app.listen(PORT || 5015);

export const stripe = new Stripe(STRIPE_SECRET, { apiVersion: '2022-11-15' });

export default async (app: Express): Promise<Server> => {
  try {
    await dbConnection();
    return appServer(app);
  } catch (e) {
    console.log(e);
  }
};
