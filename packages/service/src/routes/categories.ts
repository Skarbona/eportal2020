import { Router } from 'express';

import * as categoriesControllers from '../controllers/categories';

const router = Router();

router.post('/', categoriesControllers.createCategories);
router.get('/', categoriesControllers.getCategories);

export default router;
