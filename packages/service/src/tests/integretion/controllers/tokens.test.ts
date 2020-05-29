import request from 'supertest';
import mongoose from 'mongoose';
import { Server } from 'http';

import appStartUp from '../../../app';
import User from '../../../models/user';
import { signUpUser } from '../../../utils/test-basic-calls';

describe('Controller: Tokens', () => {
  let server: Server;

  beforeAll(async () => {
    server = await appStartUp;
  });

  afterEach(async () => {
    await User.deleteMany({ name: { $ne: 'eportal_admin' } });
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await server.close();
  });

  describe('refresh Controller', () => {
    it('should return new tokens', async () => {
      const user = await signUpUser(server);
      const refresh = await request(server)
        .get('/api/token/refresh')
        .set('Authorization', `Bearer NOT_VALID_ANYMORE_ACCESS_TOKEN ${user.body.refreshToken}`);

      expect(refresh.status).toEqual(200);
      expect(refresh.body.accessToken).toBeDefined();
      expect(refresh.body.refreshToken).toBeDefined();
    });

    it('should NOT return new tokens if no valid refreshToken', async () => {
      const refresh = await request(server)
        .get('/api/token/refresh')
        .set('Authorization', 'Bearer I-AM-NOT_VALID NOT_VALID-ALSO');

      expect(refresh.status).toEqual(401);
    });
  });
});
