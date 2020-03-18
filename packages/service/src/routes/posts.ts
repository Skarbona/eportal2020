import { Router } from 'express';

import * as postsControllers from '../controllers/posts';

const router = Router();

router.post('/', postsControllers.createPosts);
router.get('/', postsControllers.getPosts);

export default router;
