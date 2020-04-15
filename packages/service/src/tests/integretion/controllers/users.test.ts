import request, { Response } from 'supertest';
import mongoose from 'mongoose';
import { Server } from 'http';

import appStartUp from '../../../app';
import User from '../../../models/user';

const endpoint = '/api/users/';

const signUpUser = (server: Server): Promise<Response> => {
  return request(server)
    .post(endpoint + '/signup')
    .send({
      password: 'aaAA1111',
      userName: 'AAAA',
      email: 'test@test.pl',
    });
};

describe('Controller: Users', () => {
  let server: Server;

  beforeAll(async () => {
    server = await appStartUp;
  });

  afterEach(async () => {
    await User.deleteMany({});
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
  });
});