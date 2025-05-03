import { Router } from "express";
import { addUser, getAllUsers } from "../controllers/users.controller";

const router = Router();

// POST /user/all
router.get("/all", getAllUsers);
router.get("/create", addUser);

export default router;
