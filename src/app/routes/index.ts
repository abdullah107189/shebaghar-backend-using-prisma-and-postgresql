import express from "express";
import { userRoutes } from "../modules/user.routes.js";
const router = express.Router();
const moduleRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
];
moduleRoutes.forEach((route) => {
  // console.log(route);
  router.use(route.path, route.route);
});

export default router;
