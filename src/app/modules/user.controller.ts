import type { NextFunction, Request, Response } from "express";
import catchAsync from "../shared/catchAsync.js";
import { userService } from "./user.service.js";

const createPatient = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;
    const result = await userService.createPatient(user);
    // console.log(result);
    console.log("hello");
  }
);
export const userController = { createPatient };
