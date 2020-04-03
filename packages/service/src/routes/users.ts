import { Router } from 'express';

import * as usersControllers from '../controllers/users';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.post('/signup', usersControllers.signUp);
router.post('/login', usersControllers.Login);

router.use(authMiddleware);

router.get('/', usersControllers.getUserData);
router.get('/:id', usersControllers.getUserData);

router.patch('/', usersControllers.updateUser);
router.patch('/:id', usersControllers.updateUser);

export default router;
