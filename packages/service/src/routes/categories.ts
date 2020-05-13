import { Router } from 'express';

import * as categoriesControllers from '../controllers/categories';
import { authMiddleware, isAdminMiddleWare } from '../middlewares/auth';
import * as validate from '../validation/categories';

const router = Router();

router.use(authMiddleware);

router.get('/', validate.getCategories, categoriesControllers.getCategories);

router.use(isAdminMiddleWare);

router.post('/', validate.createCategories, categoriesControllers.createCategories);

export default router;
