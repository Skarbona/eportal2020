import request from 'supertest';
import mongoose from 'mongoose';
import appStartUp from '../../../app';
import User from '../../../models/user';
import { loginAdmin, signUpUser } from '../../../utils/test-basic-calls';
import { ServerWithClose } from '../../../utils/server-interface';
import nodemailer from 'nodemailer';

jest.mock('nodemailer', () => {
  const original = jest.requireActual('nodemailer');
  return {
    ...original,
    createTransport: () => ({
      sendMail: jest.fn().mockResolvedValue({ messageId: 'mocked' }),
    }),
  };
});

const endpoint = '/api/users/';

describe('Controller: Users', () => {
  let server: ServerWithClose;

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

  describe('signUp Controller', () => {
    it('should signUp user', async () => {
      const response = await signUpUser(server);

      expect(response.status).toEqual(201);
      expect(response.body.userData.gameDefaults).toBeDefined();
      expect(response.body.userData.email).toEqual('test@test.pl');
      expect(response.body.userData.name).toEqual('AAAA');
      expect(response.body.userData.type).toEqual('user');
      expect(response.body.userData.id).toBeDefined();
      expect(response.body.userData.date).toBeDefined();
      expect(response.body.userData.password).not.toBeDefined();
      expect(response.body.accessToken).toBeDefined();
      expect(response.body.refreshToken).toBeDefined();
    });

    it('should signUp Admin User', async () => {
      const admin = await loginAdmin(server);
      const response = await request(server)
        .post('/api/users/signup-admin')
        .send({
          password: 'aaAA1111',
          userName: 'NewAdmin',
          email: 'admin@test.pl',
        })
        .set('Authorization', `Bearer ${admin.body.accessToken}`);

      expect(response.status).toEqual(201);
      expect(response.body.userData.gameDefaults).toBeDefined();
      expect(response.body.userData.email).toEqual('admin@test.pl');
      expect(response.body.userData.name).toEqual('NewAdmin');
      expect(response.body.userData.type).toEqual('admin');
      expect(response.body.userData.id).toBeDefined();
      expect(response.body.userData.date).toBeDefined();
      expect(response.body.userData.password).not.toBeDefined();
      expect(response.body.accessToken).toBeDefined();
      expect(response.body.refreshToken).toBeDefined();
    });

    it('should NOT signUp Admin User if not admin user sending request', async () => {
      const user = await signUpUser(server);
      const response = await request(server)
        .post('/api/users/signup-admin')
        .send({
          password: 'aaAA1111',
          userName: 'NewAdmin',
          email: 'admin@test.pl',
        })
        .set('Authorization', `Bearer ${user.body.accessToken}`);

      expect(response.status).toEqual(401);
    });

    it('should NOT signUp user if body data are not correct', async () => {
      const emptyBody = await request(server)
        .post(endpoint + '/signup')
        .send();
      const invalidEmail = await request(server)
        .post(endpoint + '/signup')
        .send({
          password: 'aaAA1111',
          userName: 'AAAA',
          email: 'test@test',
        });
      const invalidPassword = await request(server)
        .post(endpoint + '/signup')
        .send({
          password: 'aaAA11',
          userName: 'AAAA',
          email: 'test@test',
        });
      const invalidUserName = await request(server)
        .post(endpoint + '/signup')
        .send({
          password: 'aaAA11',
          userName: 'AAA',
          email: 'test@test',
        });

      expect(emptyBody.status).toEqual(400);
      expect(invalidEmail.status).toEqual(400);
      expect(invalidPassword.status).toEqual(400);
      expect(invalidUserName.status).toEqual(400);
    });

    it('should NOT signUp user if userName or Email already exist', async () => {
      await signUpUser(server);

      const userNameExist = await request(server)
        .post(endpoint + '/signup')
        .send({
          password: 'bbBB1111',
          userName: 'AAAA',
          email: 'test2@test2.pl',
        });

      const emailExist = await request(server)
        .post(endpoint + '/signup')
        .send({
          password: 'bbBB1111',
          userName: 'BBBB',
          email: 'test@test.pl',
        });
      expect(userNameExist.status).toEqual(422);
      expect(emailExist.status).toEqual(422);
    });
  });

  describe('Login Controller', () => {
    it('should Login user', async () => {
      await signUpUser(server);

      const response = await request(server)
        .post(endpoint + '/login')
        .send({
          password: 'aaAA1111',
          email: 'test@test.pl',
        });

      expect(response.status).toEqual(200);
      expect(response.body.userData.gameDefaults).toBeDefined();
      expect(response.body.userData.email).toEqual('test@test.pl');
      expect(response.body.userData.name).toEqual('AAAA');
      expect(response.body.userData.type).toEqual('user');
      expect(response.body.userData.id).toBeDefined();
      expect(response.body.userData.date).toBeDefined();
      expect(response.body.userData.password).not.toBeDefined();
      expect(response.body.accessToken).toBeDefined();
      expect(response.body.refreshToken).toBeDefined();
    });

    it('should NOT Login user if not correct data provided', async () => {
      await signUpUser(server);

      const invalidPassword = await request(server)
        .post(endpoint + '/login')
        .send({
          password: 'aaAA1111111',
          email: 'test@test.pl',
        });

      const notExistEmail = await request(server)
        .post(endpoint + '/login')
        .send({
          password: 'aaAA1111',
          email: 'test@test.com',
        });

      expect(invalidPassword.status).toEqual(401);
      expect(notExistEmail.status).toEqual(401);
    });

    it('should NOT Login user if body data are not correct', async () => {
      await signUpUser(server);

      const emptyBody = await request(server)
        .post(endpoint + '/login')
        .send();
      const invalidEmail = await request(server)
        .post(endpoint + '/login')
        .send({
          password: 'aaAA1111',
          email: 'test@test',
        });
      const invalidPassword = await request(server)
        .post(endpoint + '/login')
        .send({
          password: 'aaAA11',
          email: 'test@test.pl',
        });
      expect(emptyBody.status).toEqual(400);
      expect(invalidEmail.status).toEqual(400);
      expect(invalidPassword.status).toEqual(400);
    });
  });

  describe('resetPassword Controller', () => {
    it('should send an email', async () => {
      await signUpUser(server, 'test@chiliit.pl');

      const response = await request(server)
        .post(endpoint + '/reset-password/')
        .send({
          email: 'test@chiliit.pl',
        });

      expect(response.status).toEqual(202);
      expect(response.body.msg).toBeDefined();
    });

    it('should not send an email if no email provided', async () => {
      await signUpUser(server);

      const response = await request(server).post(endpoint + '/reset-password/');
      expect(response.status).toEqual(400);
    });

    it('should not send an email if user not exist', async () => {
      await signUpUser(server);

      const response = await request(server)
        .post(endpoint + '/reset-password/')
        .send({
          email: 'test2@test2.pl',
        });

      expect(response.status).toEqual(401);
    });
  });

  describe('getUserData Controller', () => {
    it('should return userData', async () => {
      const user = await signUpUser(server);

      const response = await request(server)
        .get(endpoint)
        .set('Authorization', `Bearer ${user.body.accessToken}`);

      expect(response.status).toEqual(200);
      expect(response.body.user).toBeDefined();
      expect(response.body.user.email).toEqual('test@test.pl');
      expect(response.body.user.name).toEqual('AAAA');
      expect(response.body.user.type).toEqual('user');
      expect(response.body.user.id).toBeDefined();
      expect(response.body.user.gameDefaults).toBeDefined();
      expect(response.body.user.date).toBeDefined();
      expect(response.body.user.password).not.toBeDefined();
    });

    it('should NOT return userData if access token not provided', async () => {
      await signUpUser(server);

      const response = await request(server).get(endpoint);

      expect(response.status).toEqual(401);
    });

    it('should return 404 if user does not exist', async () => {
      const user = await signUpUser(server);
      await request(server)
        .delete(endpoint)
        .set('Authorization', `Bearer ${user.body.accessToken}`);

      const response = await request(server)
        .get(endpoint)
        .set('Authorization', `Bearer ${user.body.accessToken}`);

      expect(response.status).toEqual(404);
    });
  });

  describe('saveFavourites Controller', () => {
    it('should save favourite posts', async () => {
      const user = await signUpUser(server);
      const postId = mongoose.Types.ObjectId();

      const patch = await request(server)
        .patch(endpoint + '/favourites/' + postId)
        .set('Authorization', `Bearer ${user.body.accessToken}`);

      expect(patch.status).toEqual(200);
      expect(patch.body.user.favouritesPosts[0]).toEqual(postId.toString());

      const remove = await request(server)
        .patch(endpoint + '/favourites/' + postId)
        .set('Authorization', `Bearer ${user.body.accessToken}`);

      expect(remove.status).toEqual(200);
      expect(remove.body.user.favouritesPosts.length).toEqual(0);
    });

    it('should NOT update userData if access token not provided', async () => {
      await signUpUser(server);
      const postId = mongoose.Types.ObjectId();

      const patch = await request(server).patch(endpoint + '/favourites/' + postId);

      expect(patch.status).toEqual(401);
    });

    it('should return 404 if user does not exist', async () => {
      const user = await signUpUser(server);
      const postId = mongoose.Types.ObjectId();
      await request(server)
        .delete(endpoint)
        .set('Authorization', `Bearer ${user.body.accessToken}`);

      const patch = await request(server)
        .patch(endpoint + '/favourites/' + postId)
        .set('Authorization', `Bearer ${user.body.accessToken}`);

      expect(patch.status).toEqual(404);
    });
  });

  describe('updateUser Controller', () => {
    it('should update user password', async () => {
      const user = await signUpUser(server);

      const response = await request(server)
        .patch(endpoint)
        .send({
          password: 'NewPassword11',
        })
        .set('Authorization', `Bearer ${user.body.accessToken}`);

      const loginUser = await request(server)
        .post(endpoint + '/login')
        .send({
          password: 'NewPassword11',
          email: 'test@test.pl',
        });

      expect(response.status).toEqual(200);
      expect(loginUser.status).toEqual(200);
      expect(response.body.user).toBeDefined();
    });

    it('should NOT update userData if access token not provided', async () => {
      await signUpUser(server);

      const response = await request(server).patch(endpoint).send({
        password: 'NewPassword11',
      });

      expect(response.status).toEqual(401);
    });

    it('should return 404 if user does not exist', async () => {
      const user = await signUpUser(server);
      await request(server)
        .delete(endpoint)
        .set('Authorization', `Bearer ${user.body.accessToken}`);

      const response = await request(server)
        .patch(endpoint)
        .send({
          password: 'NewPassword11',
        })
        .set('Authorization', `Bearer ${user.body.accessToken}`);

      expect(response.status).toEqual(404);
    });
  });

  describe('deleteUser Controller', () => {
    it('should delete user', async () => {
      const user = await signUpUser(server);

      const response = await request(server)
        .delete(endpoint)
        .set('Authorization', `Bearer ${user.body.accessToken}`);

      const loginUser = await request(server)
        .post(endpoint + '/login')
        .send({
          password: 'aaAA1111',
          email: 'test@test.pl',
        });

      expect(response.status).toEqual(200);
      expect(loginUser.status).toEqual(401);
    });

    it('should NOT delete user if access token not provided', async () => {
      await signUpUser(server);

      const response = await request(server).delete(endpoint);

      expect(response.status).toEqual(401);
    });

    it('should return 404 if user does not exist', async () => {
      const user = await signUpUser(server);
      await request(server)
        .delete(endpoint)
        .set('Authorization', `Bearer ${user.body.accessToken}`);

      const response = await request(server)
        .delete(endpoint)
        .set('Authorization', `Bearer ${user.body.accessToken}`);

      expect(response.status).toEqual(404);
    });
  });
});
