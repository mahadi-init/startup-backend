import { db } from "../db";
import { usersTable } from "../db/tables/users.table";
import { type NextFunction, type Request, type Response } from "express";

export const getAllUsers = async (
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await db.select().from(usersTable);
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};
