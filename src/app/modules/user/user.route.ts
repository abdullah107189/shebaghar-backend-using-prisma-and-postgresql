import { Router } from "express";
import { UserController } from "./user.controller.js";

const router = Router();

router.get("/getUsers", UserController.getUsers);
router.get("/getUser/:id", UserController.getUserById);
router.post("/createUser", UserController.createUser);
export const UserRouter = router;
