/* eslint-disable @typescript-eslint/no-explicit-any */
import request, { Response } from 'supertest';
import { Server } from 'http';
import mongoose from 'mongoose';

import { ADMIN_TEST_PASS, ADMIN_TEST_USER } from '../constants/envs';

export const getCategories = (server: Server, token: string): Promise<Response> => {
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

export const signUpUser = (server: Server, email = 'test@test.pl'): Promise<Response> => {
  return request(server).post('/api/users/signup').send({
    password: 'aaAA1111',
    userName: 'AAAA',
    email,
  });
};

export const loginAdmin = (server: Server): Promise<Response> => {
  return request(server).post('/api/users/login').send({
    password: ADMIN_TEST_PASS,
    email: ADMIN_TEST_USER,
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

export const createPosts = (
  server: Server,
  token: string,
  authorId: string,
  body?: any,
): Promise<Response> => {
  const sendBody = {
    posts: [
      {
        content: {
          content: 'CONTENT',
          title: 'TITLE',
        },
        author: authorId,
        image: '',
        categories: [mongoose.Types.ObjectId()],
      },
      {
        content: {
          content: 'CONTENT2',
          title: 'TITLE2',
        },
        author: authorId,
        image: '',
        categories: [mongoose.Types.ObjectId()],
      },
    ],
  };

  return request(server)
    .post('/api/posts')
    .send(!body ? sendBody : { ...body })
    .set('Authorization', `Bearer ${token}`);
};

export const getPosts = (server: Server, token: string, query = ''): Promise<Response> => {
  return request(server)
    .get('/api/posts/' + query)
    .set('Authorization', `Bearer ${token}`);
};

export const savePost = (
  server: Server,
  token: string,
  authorId: string,
  postId?: string,
  body?: any,
): Promise<Response> => {
  const sendBody = {
    post: {
      content: {
        content: 'SAVED CONTENT',
        title: 'SAVED TITLE',
      },
      id: postId,
      categories: [mongoose.Types.ObjectId(), mongoose.Types.ObjectId()],
    },
  };

  return request(server)
    .patch('/api/posts')
    .send(!body ? sendBody : { ...body })
    .set('Authorization', `Bearer ${token}`);
};

export const createStripeCheckoutSession = (
  server: Server,
  body: { plan: '1 month' | '1 day' },
  token: string,
): Promise<Response> => {
  return request(server)
    .post('/api/payments/subscriptions')
    .send(body)
    .set('Authorization', `Bearer ${token}`);
};
