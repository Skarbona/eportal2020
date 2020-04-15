import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

export default async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
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
