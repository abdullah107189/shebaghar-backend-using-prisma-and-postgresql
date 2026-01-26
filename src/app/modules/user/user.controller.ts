import type { NextFunction, Request, Response } from "express";
import catchAsync from "../../shared/catchAsync.js";
import { userService } from "./user.service.js";
import sendResponse from "../../shared/sendResponse.js";
import httpStatus from "http-status";
const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userService.createUser(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      data: result,
      message: "User created successfully",
    });
  },
);

const getUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getUsers();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: "Users retrieved successfully",
  });
});
const getUserById = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getUserById(Number(req.params.id));
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: "User retrieved successfully",
  });
});

export const UserController = {
  createUser,
  getUsers,
  getUserById,
};
