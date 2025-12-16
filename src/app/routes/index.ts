import express from "express";
const router = express.Router();
const moduleRoutes = [
  {
    path: "/",
    route: router,
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
