import { Router } from 'express';

import * as validate from '../validation/pages';
import * as pagesControllers from '../controllers/pages';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.use(authMiddleware);

router.get('/:slug', validate.getPage, pagesControllers.getPage);
router.post('/', validate.createPage, pagesControllers.createPage);
router.patch('/:slug', validate.updatePage, pagesControllers.updatePage);

export default router;
