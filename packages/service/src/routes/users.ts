import { Router } from 'express';

import * as usersControllers from '../controllers/users';
import { authMiddleware } from '../middlewares/auth';
import * as validate from '../validation/users';

const router = Router();

router.post('/signup', validate.signUp, usersControllers.signUp);
router.post('/login', validate.login, usersControllers.Login);

router.use(authMiddleware);

router.get('/', validate.getUserData, usersControllers.getUserData);
router.get('/:id', validate.getUserData, usersControllers.getUserData);

router.patch('/', validate.updateUser, usersControllers.updateUser);
router.patch('/:id', validate.updateUser, usersControllers.updateUser);

export default router;
