import { Router } from 'express';

import * as controllers from '../controllers/users';
import { authMiddleware, isAdminMiddleWare } from '../middlewares/auth';
import * as validate from '../validation/users';
import checkValidation from '../middlewares/check-validation';

const router = Router();

router.post('/signup', validate.signUp, checkValidation, controllers.signUp);
router.post('/login', validate.login, checkValidation, controllers.Login);
router.post('/reset-password', validate.resetPassword, checkValidation, controllers.resetPassword);

router.use(authMiddleware);

router.get('/', validate.getUserData, checkValidation, controllers.getUserData);
router.get('/:id', validate.getUserData, checkValidation, controllers.getUserData);

router.patch('/', validate.updateUser, checkValidation, controllers.updateUser);
router.patch('/:id', validate.updateUser, checkValidation, controllers.updateUser);

router.patch(
  '/favourites/:postId',
  validate.saveFavourites,
  checkValidation,
  controllers.saveFavourites,
);

router.delete(
  '/favourites/:postId',
  validate.saveFavourites,
  checkValidation,
  controllers.saveFavourites,
);

router.delete('/', validate.deleteUser, checkValidation, controllers.deleteUser);
router.delete('/:id', validate.deleteUser, checkValidation, controllers.deleteUser);

router.use(isAdminMiddleWare);

router.post('/signup-admin', validate.signUp, checkValidation, controllers.signUp);

export default router;
