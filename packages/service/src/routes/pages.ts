import { Router } from 'express';

import * as validate from '../validation/pages';
import * as controllers from '../controllers/pages';
import { isAdminMiddleWare } from '../middlewares/auth';
import checkValidation from '../middlewares/check-validation';

const router = Router();

router.get('/:slug', validate.getPage, checkValidation, controllers.getPage);

router.use(isAdminMiddleWare);

router.post('/', validate.createPage, checkValidation, controllers.createPage);
router.patch('/:slug', validate.updatePage, checkValidation, controllers.updatePage);

export default router;
