import { Router } from "express";

import usersController from "../controllers/users-controller";

const router = Router();

router.get("/", usersController.getUsers);

router.post("/signup", usersController.postSignup);

router.post("/login", usersController.postLogin);

export default router;
