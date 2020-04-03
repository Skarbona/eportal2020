import { Router } from 'express';

import * as categoriesControllers from '../controllers/categories';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.use(authMiddleware);

router.post('/', categoriesControllers.createCategories);
router.get('/', categoriesControllers.getCategories);

export default router;
