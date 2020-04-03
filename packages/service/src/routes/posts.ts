import { Router } from 'express';

import * as postsControllers from '../controllers/posts';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.use(authMiddleware);

router.post('/', postsControllers.createPosts);
router.get('/', postsControllers.getPosts);

export default router;
