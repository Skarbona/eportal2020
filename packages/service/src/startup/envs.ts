import { config } from 'dotenv';

config();

export default () => {
  if (
    !process.env.DB_USER ||
    !process.env.DB_PASS ||
    !process.env.DB_NAME ||
    !process.env.DB_HOST ||
    !process.env.JWT_ACCESS_TOKEN ||
    !process.env.JWT_REFRESH_TOKEN
  ) {
    throw new Error('Not all required envs defined!');
  }
};
