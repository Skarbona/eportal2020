import request from 'supertest';
import mongoose from 'mongoose';
import { Server } from 'http';

import appStartUp from '../../../app';
import Category from '../../../models/category';
import User from '../../../models/user';
import { signUpUser, createCategories, getCategories } from '../../../utils/test-basic-calls';

const endpoint = '/api/categories/';

describe('Controller: Category', () => {
  let server: Server;

  beforeAll(async () => {
    server = await appStartUp;
  });

  afterEach(async () => {
    await Category.deleteMany({});
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await server.close();
  });

  describe('createCategories Controller', () => {
    it('should create category', async () => {
      const user = await signUpUser(server);
      const categories = await createCategories(server, user.body.accessToken);

      expect(categories.status).toEqual(201);
      expect(categories.body.categories).toBeDefined();
      expect(categories.body.categories.length).toEqual(2);
      expect(categories.body.categories[0].name).toEqual('cat no1');
      expect(categories.body.categories[0].slug).toEqual('cat-no1');
      expect(categories.body.categories[0].description).toEqual('description1');
      expect(categories.body.categories[0]._id).toBeDefined();
      expect(categories.body.categories[0].date).toBeDefined();
      expect(categories.body.categories[0].children).toBeDefined();
    });

    it('should NOT return userData if access token not provided', async () => {
      const response = await request(server)
        .post(endpoint)
        .send({
          categories: [
            { name: 'cat no1', description: 'description1' },
            { name: 'cat no2', description: 'description2' },
          ],
        });

      expect(response.status).toEqual(401);
    });

    it('should return 422 if body is not valid', async () => {
      const user = await signUpUser(server);
      const withOutNames = await createCategories(server, user.body.accessToken, {
        categories: [{ description: 'description1' }, { name: '', description: 'description2' }],
      });

      const emptyCategories = await createCategories(server, user.body.accessToken, {
        categories: [{ description: 'description1' }, { name: '', description: 'description2' }],
      });

      expect(withOutNames.status).toEqual(422);
      expect(emptyCategories.status).toEqual(422);
    });

    it('should update parent categories with new childs', async () => {
      const user = await signUpUser(server);
      const createdCategories = await createCategories(server, user.body.accessToken);

      const childCategory = await createCategories(server, user.body.accessToken, {
        categories: [
          {
            name: 'cat no3',
            description: 'cat no3',
            parent: createdCategories.body.categories[1]._id,
          },
        ],
      });

      const categories = await getCategories(server, user.body.accessToken);
      expect(categories.body.categories).toHaveLength(3);
      expect(categories.body.categories[1].children).toHaveLength(1);
      expect(categories.body.categories[1].children[0]._id).toEqual(
        childCategory.body.categories[0]._id,
      );
    });
  });

  describe('getCategories Controller', () => {
    it('should get all created categories', async () => {
      const user = await signUpUser(server);
      await createCategories(server, user.body.accessToken);

      const categories = await getCategories(server, user.body.accessToken);
      expect(categories.body.categories).toHaveLength(2);
    });

    it('should get only selected category', async () => {
      const user = await signUpUser(server);
      const createdCats = await createCategories(server, user.body.accessToken);

      const categories = await request(server)
        .get('/api/categories?ids=' + createdCats.body.categories[1]._id)
        .set('Authorization', `Bearer ${user.body.accessToken}`);

      expect(categories.body.categories).toHaveLength(1);
      expect(categories.body.categories[0]._id).toEqual(createdCats.body.categories[1]._id);
    });
  });
});
