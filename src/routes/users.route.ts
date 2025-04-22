import { Router } from "express";
import { getAllUsers } from "../controllers/users.controller";

const router = Router();

// POST /user/all
router.get("/all", getAllUsers);

export default router;
