import type { NextFunction, Request, Response } from "express";
import catchAsync from "../../shared/catchAsync.js";
import sendResponse from "../../shared/sendResponse.js";
import httpStatus from "http-status";
import { postService } from "./post.service.js";
const createPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await postService.createPost(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      data: result,
      message: "Post created successfully",
    });
  },
);

export const postController = {
  createPost,
};
