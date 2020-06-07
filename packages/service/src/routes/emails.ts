import { Router } from 'express';

import * as controllers from '../controllers/emails';
import * as validate from '../validation/emails';
import checkValidation from '../middlewares/check-validation';

const router = Router();

router.post('/contact-form', validate.contactForm, checkValidation, controllers.contactForm);

export default router;
