import { HttpStatusCode, ReqWithUser } from "@/types";
import { ApiError } from "@/utils/apiError";
import { RequestHandler } from "express";

export const isAuth: RequestHandler = async (req: ReqWithUser, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new ApiError(HttpStatusCode.UNAUTHORIZED, "Unauthorized!");
    }

    // const user = await User.findOne({ clerkId: authHeader });

    // if (!user) {
    //   throw new ApiError(HttpStatusCode.UNAUTHORIZED, "Unauthorized!");
    // }

    // req.userId = user._id;
    next();
  } catch (error) {
    next(error);
  }
};
