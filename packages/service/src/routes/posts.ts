import { Router } from 'express';

import * as controllers from '../controllers/posts';
import { authMiddleware, isAdminMiddleWare } from '../middlewares/auth';
import * as validate from '../validation/posts';
import checkValidation from '../middlewares/check-validation';

const router = Router();

router.use(authMiddleware);

router.post('/', validate.createPosts, checkValidation, controllers.createPosts);
router.get('/', validate.getPosts, checkValidation, controllers.getPosts);

router.use(isAdminMiddleWare);
router.patch('/', validate.savePosts, checkValidation, controllers.savePosts);

export default router;
