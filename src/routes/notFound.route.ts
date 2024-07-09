import { HttpStatusCode } from "@/types";
import { ApiError } from "@/utils/apiError";
import { Router } from "express";

const router = Router();

router.get("/", (req, res, next) => {
  try {
    throw new ApiError(HttpStatusCode.NOT_FOUND, "This api route does not exist");
  } catch (error) {
    next(error);
  }
});

export default router;
