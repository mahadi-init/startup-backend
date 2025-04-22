import { type AnyZodObject } from "zod";
import { type Request, type Response, type NextFunction } from "express";

export const validateRequest =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: any) {
      res.status(400).json({ success: false, errors: error.errors });
    }
  };
