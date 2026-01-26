import type { NextFunction, Request, Response } from "express";
import catchAsync from "../../shared/catchAsync.js";
import { userService } from "./user.service.js";
import sendResponse from "../../shared/sendResponse.js";
import httpStatus from "http-status";
const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const result = await userService.createUser(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      data: req.body,
      message: "User created successfully",
    });
  },
);

export const UserController = {
  createUser,
};
