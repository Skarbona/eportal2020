import mongoose from 'mongoose';

import { DB_USER, DB_PASS, DB_HOST, DB_NAME } from '../constants/envs';

export default async (): Promise<void> => {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );
    console.log('Mongoose connected');
  } catch (err) {
    console.log(err);
  }
};
