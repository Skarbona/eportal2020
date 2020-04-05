import { Router } from 'express';

import * as categoriesControllers from '../controllers/categories';
import { authMiddleware } from '../middlewares/auth';
import * as validate from '../validation/categories';

const router = Router();

router.use(authMiddleware);

router.post('/', validate.createCategories, categoriesControllers.createCategories);
router.get('/', validate.getCategories, categoriesControllers.getCategories);

export default router;
