import { config } from 'dotenv';

config({ path: '.env-test' });

jest.setTimeout(30000);
