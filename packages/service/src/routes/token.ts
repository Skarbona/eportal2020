import { Router } from 'express';

import { authMiddleware, authRefreshMiddleware } from '../middlewares/auth';
import * as tokenControllers from '../controllers/token';

const router = Router();

router.use(authMiddleware);
router.use(authRefreshMiddleware);

router.get('/refresh', tokenControllers.refresh);

export default router;
