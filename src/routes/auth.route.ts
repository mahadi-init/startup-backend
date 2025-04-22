import { Router } from "express";
import { validateRequest } from "../middlewares/validate-request";
import { loginSchema, registerSchema } from "../validations/auth.schema";
import { login, register, logout } from "../controllers/auth.controller";

const router = Router();

// POST /auth/login
router.post(
  "/login",
  validateRequest(loginSchema), // Request validation middleware
  login, // Controller
);

// POST /auth/register
router.post("/register", validateRequest(registerSchema), register);

// POST /auth/logout
router.post(
  "/logout",
  // Optional: add authentication middleware
  logout,
);

export default router;
