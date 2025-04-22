import { Router } from "express";
import auth from "./auth.route.ts";
import users from "./users.route.ts";
import { type RequestHandler } from "express-serve-static-core";

interface RouteConfig {
  path: string;
  route: RequestHandler;
  middleware?: RequestHandler[];
}

const router = Router();

const apiRoutes: RouteConfig[] = [
  {
    path: "/auth",
    route: auth,
    middleware: [],
  },
  {
    path: "/users",
    route: users,
    middleware: [],
  },
];

apiRoutes.forEach(({ path, route, middleware = [] }) => {
  router.use(path, ...middleware, route);
});

export default router;
