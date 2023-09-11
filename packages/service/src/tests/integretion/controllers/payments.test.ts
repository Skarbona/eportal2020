import mongoose from 'mongoose';
import { Server } from 'http';

import User from '../../../models/user';
import appStartUp from '../../../app';
import { signUpUser, createStripeCheckoutSession } from '../../../utils/test-basic-calls';

describe('Controller: Payments', () => {
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

  describe('createStripeCheckoutSession Controller', () => {
    // TODO: How to mock this on CI
    it.skip('should successful start checkout for 1 month', async () => {
      const user = await signUpUser(server);
      const response = await createStripeCheckoutSession(
        server,
        { plan: '1 month' },
        user.body.accessToken,
      );
      expect(response.status).toEqual(200);
    });
    // TODO: How to mock this on CI
    it.skip('should successful start checkout for 1 day', async () => {
      const user = await signUpUser(server);
      const response = await createStripeCheckoutSession(
        server,
        { plan: '1 day' },
        user.body.accessToken,
      );
      expect(response.status).toEqual(200);
    });

    it('should NOT return data if access token not provided', async () => {
      const response = await createStripeCheckoutSession(server, { plan: '1 day' }, '');
      expect(response.status).toEqual(401);
    });

    it('should return 500 if body is not valid', async () => {
      const user = await signUpUser(server);
      const response = await createStripeCheckoutSession(
        server,
        { plan: 'no-existing-plan' as any },
        user.body.accessToken,
      );
      expect(response.status).toEqual(500);
    });
  });
});
