import { Router } from "express";
import { UserController } from "./user.controller.js";

const router = Router();

router.post("/createUser", UserController.createUser);

export const UserRouter = router;
