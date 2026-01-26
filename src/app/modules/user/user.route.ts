import { Router } from "express";
import { UserController } from "./user.controller.js";

const router = Router();

router.post("/createUser", UserController.createUser);
router.get("/getUsers", UserController.getUsers);
export const UserRouter = router;
