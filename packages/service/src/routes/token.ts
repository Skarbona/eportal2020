import { Router } from 'express';

import { authRefreshMiddleware } from '../middlewares/auth';
import * as tokenControllers from '../controllers/token';

const router = Router();

router.use(authRefreshMiddleware);

router.get('/refresh', tokenControllers.refresh);

export default router;
