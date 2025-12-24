import type { NextFunction, Request, Response } from "express";
import catchAsync from "../shared/catchAsync.js";
import { userService } from "./user.service.js";
import sendResponse from "../shared/sendResponse.js";

const createPatient = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;
    const result = await userService.createPatient(user);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Patient created successfully",
      data: result,
    });
  }
);
const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userService.getAllUsers();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Get all user successfully",
      data: result,
    });
  }
);

export const userController = { createPatient, getAllUsers };
