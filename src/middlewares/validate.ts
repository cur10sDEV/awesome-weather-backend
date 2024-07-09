import { HttpStatusCode } from "@/types";
import { ApiError } from "@/utils/apiError";
import { NextFunction, Request, Response } from "express";
import { AnyZodObject, z } from "zod";

const validate =
  <T extends AnyZodObject>(schema: T) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (error: any) {
      let err = error;

      if (err instanceof z.ZodError) {
        err = err.issues.map((e) => ({ path: e.path[0], message: e.message }));
      }

      next(new ApiError(HttpStatusCode.BAD_REQUEST, err[0]?.message || err?.message || "Bad Request"));
    }
  };

export default validate;
