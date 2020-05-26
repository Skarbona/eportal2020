import { config } from 'dotenv';

config();

export default (): Error | void => {
  if (
    !process.env.DB_USER ||
    !process.env.DB_PASS ||
    !process.env.DB_NAME ||
    !process.env.DB_HOST ||
    !process.env.JWT_ACCESS_TOKEN ||
    !process.env.JWT_REFRESH_TOKEN ||
    !process.env.PORTAL_ADRESS
  ) {
    throw new Error(
      `Not all required envs defined! 
        DB_USER: ${!!process.env.DB_USER}, 
        DB_PASS: ${!!process.env.DB_PASS},
        DB_NAME: ${!!process.env.DB_NAME}, 
        DB_HOST: ${!!process.env.DB_HOST},
        JWT_ACCESS_TOKEN: ${!!process.env.JWT_ACCESS_TOKEN},
        JWT_REFRESH_TOKEN: ${!!process.env.JWT_REFRESH_TOKEN},
        PORTAL_ADRESS: ${!!process.env.PORTAL_ADRESS}`,
    );
  }
};
