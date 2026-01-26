import { Router } from "express";
import { postController } from "./post.controller.js";

const router = Router();

router.post("/createPost", postController.createPost);
export const postRouter = router;
