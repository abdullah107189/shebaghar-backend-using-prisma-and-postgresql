import { Router } from "express";
import { postController } from "./post.controller.js";

const router = Router();

router.get("/getPosts", postController.getPosts);
router.get("/getPost/:id", postController.getPostById);
router.get("/getPostStats", postController.getPostStats);

router.post("/createPost", postController.createPost);
router.patch("/updatePost/:id", postController.updatePost);
router.delete("/deletePost/:id", postController.deletePost);
export const postRouter = router;
