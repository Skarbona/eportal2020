import { Router } from 'express';

import * as controllers from '../controllers/categories';
import { authMiddleware, isAdminMiddleWare } from '../middlewares/auth';
import * as validate from '../validation/categories';
import checkValidation from '../middlewares/check-validation';

const router = Router();

router.use(authMiddleware);

router.get('/', validate.getCategories, checkValidation, controllers.getCategories);

router.use(isAdminMiddleWare);

router.post('/', validate.createCategories, checkValidation, controllers.createCategories);

export default router;
