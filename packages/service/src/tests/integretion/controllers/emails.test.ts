import request from 'supertest';
import nodemailer from 'nodemailer';

import appStartUp from '../../../app';
import { ServerWithClose } from '../../../utils/server-interface';

jest.mock('nodemailer', () => {
  const original = jest.requireActual('nodemailer');
  return {
    ...original,
    createTransport: () => ({
      sendMail: jest.fn().mockResolvedValue({ messageId: 'mocked' }),
    }),
  };
});

const endpoint = '/api/emails/';

describe('Controller: Emails', () => {
  let server: ServerWithClose;

  beforeAll(async () => {
    server = await appStartUp;
  });

  afterAll(async () => {
    await server.close();
  });

  describe('contactForm Controller', () => {
    it('should send an email', async () => {
      const response = await request(server)
        .post(endpoint + '/contact-form/')
        .send({
          email: 'test@chiliit.pl',
          message: 'Message from contact Form',
        });

      expect(response.status).toEqual(202);
      expect(response.body.msg).toBeDefined();
    });

    it('should not send an email if no message provided', async () => {
      const response = await request(server)
        .post(endpoint + '/contact-form/')
        .send({
          email: 'test@chiliit.pl',
        });
      expect(response.status).toEqual(400);
    });
  });
});
