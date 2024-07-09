import { ApiResponse } from "@/utils/apiResponse";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json(new ApiResponse(200, "The API service is working fine"));
  } catch (error: any) {
    next(error);
  }
});

export default router;
