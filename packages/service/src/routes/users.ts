import { Router } from "express";

import * as usersControllers from "../controllers/users";

const router = Router();

router.post("/", usersControllers.signUp);

export default router;