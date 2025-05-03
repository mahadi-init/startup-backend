import { getXataClient } from "../xata";
import { type NextFunction, type Request, type Response } from "express";

const xata = getXataClient();

export const getAllUsers = async (
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await xata.db.Users.getMany();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

export const addUser = async (
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await xata.db.Users.create({
      full_name: "mahadi",
      email: "mahadi@gmail.com",
      password: "123456",
    });

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
