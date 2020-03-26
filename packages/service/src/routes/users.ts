import { Router } from 'express';

import * as usersControllers from '../controllers/users';

const router = Router();

router.post('/', usersControllers.signUp);
router.get('/:id', usersControllers.getUser);
router.patch('/:id', usersControllers.updateUser);

export default router;
