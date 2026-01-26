import express from "express";
import { UserRouter } from "../modules/user/user.route.js";
import { postRouter } from "../modules/post/post.route.js";
const router = express.Router();
const moduleRoutes = [
  {
    path: "/user",
    route: UserRouter,
  },
  {
    path: "/post",
    route: postRouter,
  },
  // {
  //     path:'/another-path',
  //     route: another route
  // }
];
moduleRoutes.forEach((route) => {
  console.log(route);
  router.use(route.path, route.route);
});

export default router;
