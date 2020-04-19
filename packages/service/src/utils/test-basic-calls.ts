import request, { Response } from 'supertest';
import { Server } from 'http';

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
