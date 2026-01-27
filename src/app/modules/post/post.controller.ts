import type { NextFunction, Request, Response } from "express";
import catchAsync from "../../shared/catchAsync.js";
import sendResponse from "../../shared/sendResponse.js";
import httpStatus from "http-status";
import { postService } from "./post.service.js";
import { boolean } from "zod";
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
const getPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || "";
    const isFetured = req.query.isFetured
      ? req.query.isFetured === "true"
      : undefined;
    const tags = req.query.tags ? (req.query.tags as string).split(",") : [];
    const result = await postService.getPosts(
      page,
      limit,
      search as string,
      isFetured as boolean,
      tags as string[],
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      data: result,
      message: "Posts retrieved successfully",
    });
  },
);
const getPostById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    const result = await postService.getPostById(id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      data: result,
      message: "Post retrieved successfully",
    });
  },
);
const updatePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    const result = await postService.updatePost(id, req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      data: result,
      message: "Post updated successfully",
    });
  },
);
const deletePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await postService.deletePost(Number(req.params.id));
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      data: result,
      message: "Post deleted successfully",
    });
  },
);
const getPostStats = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await postService.getPostStats();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      data: result,
      message: "Post stats retrieved successfully",
    });
  },
);

export const postController = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostStats,
};
