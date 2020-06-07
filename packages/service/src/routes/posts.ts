import { Router } from 'express';

import * as controllers from '../controllers/posts';
import { authMiddleware } from '../middlewares/auth';
import * as validate from '../validation/posts';
import checkValidation from '../middlewares/check-validation';

const router = Router();

router.use(authMiddleware);

router.post('/', validate.createPosts, checkValidation, controllers.createPosts);
router.get('/', validate.getPosts, checkValidation, controllers.getPosts);

export default router;
