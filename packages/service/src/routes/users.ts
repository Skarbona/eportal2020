import { Router } from 'express';

import * as usersControllers from '../controllers/users';

const router = Router();

router.post('/signup', usersControllers.signUp);
router.post('/login', usersControllers.Login);

router.get('/:id', usersControllers.getUser);
router.patch('/:id', usersControllers.updateUser);

export default router;
