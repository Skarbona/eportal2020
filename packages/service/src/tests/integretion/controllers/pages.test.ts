import request from 'supertest';
import mongoose from 'mongoose';
import { Server } from 'http';

import appStartUp from '../../../app';
import Page from '../../../models/page';
import User from '../../../models/user';
import { signUpUser, createPage, getPage, updatePage } from '../../../utils/test-basic-calls';

const endpoint = '/api/pages/';

describe('Controller: Page', () => {
  let server: Server;

  beforeAll(async () => {
    server = await appStartUp;
  });

  afterEach(async () => {
    await Page.deleteMany({});
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await server.close();
  });

  describe('createPage Controller', () => {
    it('should create page', async () => {
      const user = await signUpUser(server);
      const page = await createPage(server, user.body.accessToken, user.body.userData.id);

      expect(page.status).toEqual(201);
      expect(page.body.page).toBeDefined();
      expect(page.body.page.content.title).toEqual('TITLE');
      expect(page.body.page.content.content).toEqual('CONTENT');
      expect(page.body.page.slug).toEqual('title');
    });

    it('should NOT create page if access token not provided', async () => {
      const page = await createPage(server, 'BAD-TOKEN', 'RANDOM-ID');

      expect(page.status).toEqual(401);
    });

    it('should return 422 if body is not valid', async () => {
      const user = await signUpUser(server);
      const withoutAuthor = await createPage(server, user.body.accessToken, '');
      const withoutContent = await createPage(server, user.body.accessToken, '', {
        content: {},
        author: user.body.userData.id,
      });
      const withoutEmptyTitle = await createPage(server, user.body.accessToken, '', {
        content: { title: '', content: 'CONTENT' },
        author: user.body.userData.id,
      });

      expect(withoutAuthor.status).toEqual(422);
      expect(withoutContent.status).toEqual(422);
      expect(withoutEmptyTitle.status).toEqual(422);
    });
  });

  describe('getPage Controller', () => {
    it('should get page', async () => {
      const user = await signUpUser(server);
      await createPage(server, user.body.accessToken, user.body.userData.id);
      const page = await getPage(server, user.body.accessToken, 'title');

      expect(page.status).toEqual(200);
      expect(page.body.page).toBeDefined();
      expect(page.body.page.content.title).toEqual('TITLE');
      expect(page.body.page.content.content).toEqual('CONTENT');
      expect(page.body.page.slug).toEqual('title');
    });

    it('should NOT return page data if access token not provided', async () => {
      const user = await signUpUser(server);
      await createPage(server, user.body.accessToken, user.body.userData.id);
      const page = await getPage(server, 'BAD-TOKEN', 'title');

      expect(page.status).toEqual(401);
    });
  });

  describe('updatePage Controller', () => {
    it('should update page', async () => {
      const user = await signUpUser(server);
      const createdPage = await createPage(server, user.body.accessToken, user.body.userData.id);
      const updatedPage = await updatePage(
        server,
        user.body.accessToken,
        createdPage.body.page.slug,
      );

      expect(updatedPage.status).toEqual(200);
      expect(updatedPage.body.page).toBeDefined();
      expect(updatedPage.body.page.content.title).toEqual('UPDATED TITLE');
      expect(updatedPage.body.page.content.content).toEqual('UPDATED CONTENT');
      expect(updatedPage.body.page.slug).toEqual('title');
    });

    it('should NOT update page if access token not provided', async () => {
      const user = await signUpUser(server);
      const createdPage = await createPage(server, user.body.accessToken, user.body.userData.id);
      const updatedPage = await updatePage(server, 'BAD-TOKEN', createdPage.body.page.slug);

      expect(updatedPage.status).toEqual(401);
    });
  });
});
