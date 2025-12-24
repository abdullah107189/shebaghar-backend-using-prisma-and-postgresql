import express from "express";
import { userController } from "./user.controller.js";
const router = express.Router();

router.get("/getAllUsers", userController.getAllUsers);
router.post("/create-patient", userController.createPatient);
export const userRoutes = router;
