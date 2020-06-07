import { checkSchema } from 'express-validator';

import { email } from './shared';

const message = {
  isString: {
    errorMessage: 'Please provide valid ids string',
  },
  isLength: {
    options: { min: 1 },
    errorMessage: 'Message must include at least 1 character',
  },
};

export const contactForm = checkSchema({ email, message });
