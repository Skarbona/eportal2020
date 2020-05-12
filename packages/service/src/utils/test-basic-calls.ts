import request, { Response } from 'supertest';
import { Server } from 'http';

export const getCategories = (server: Server, token: string, body?: any): Promise<Response> => {
  return request(server).get('/api/categories').set('Authorization', `Bearer ${token}`);
};

export const createCategories = (server: Server, token: string, body?: any): Promise<Response> => {
  const sendBody = {
    categories: [
      { name: 'cat no1', description: 'description1' },
      { name: 'cat no2', description: 'description2' },
    ],
  };
  return request(server)
    .post('/api/categories')
    .send(!body ? sendBody : { ...body })
    .set('Authorization', `Bearer ${token}`);
};

export const signUpUser = (server: Server): Promise<Response> => {
  return request(server).post('/api/users/signup').send({
    password: 'aaAA1111',
    userName: 'AAAA',
    email: 'test@test.pl',
  });
};

export const getPage = (server: Server, token: string, slug: string): Promise<Response> => {
  return request(server)
    .get('/api/pages/' + slug)
    .set('Authorization', `Bearer ${token}`);
};

export const createPage = (
  server: Server,
  token: string,
  authorId: string,
  body?: any,
): Promise<Response> => {
  const sendBody = {
    content: {
      content: 'CONTENT',
      title: 'TITLE',
    },
    author: authorId,
  };

  return request(server)
    .post('/api/pages')
    .send(!body ? sendBody : { ...body })
    .set('Authorization', `Bearer ${token}`);
};

export const updatePage = (
  server: Server,
  token: string,
  slug: string,
  body?: any,
): Promise<Response> => {
  const sendBody = {
    content: {
      content: 'UPDATED CONTENT',
      title: 'UPDATED TITLE',
    },
  };

  return request(server)
    .patch('/api/pages/' + slug)
    .send(!body ? sendBody : { ...body })
    .set('Authorization', `Bearer ${token}`);
};
