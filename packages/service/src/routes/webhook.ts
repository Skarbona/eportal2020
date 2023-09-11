import express, { Router } from 'express';

import * as controllers from '../controllers/webhook';

const router = Router();

router.post('/listen-stripe', express.raw({ type: '*/*' }), controllers.listenStripe);

export default router;
