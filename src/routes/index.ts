import { Router } from "express";
import auth from "./auth.route.ts";
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
];

apiRoutes.forEach(({ path, route, middleware = [] }) => {
  router.use(path, ...middleware, route);
});

export default router;
