import express from "express";
import { userController } from "./user.controller.js";
const router = express.Router();

router.post("/create-patient", userController.createPatient);
export const userRoutes = router;
