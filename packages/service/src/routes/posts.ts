import { Router } from 'express';

import * as postsControllers from '../controllers/posts';
import { authMiddleware } from '../middlewares/auth';
import * as validate from '../validation/posts';

const router = Router();

router.use(authMiddleware);

router.post('/', validate.createPosts, postsControllers.createPosts);
router.get('/', validate.getPosts, postsControllers.getPosts);

export default router;
