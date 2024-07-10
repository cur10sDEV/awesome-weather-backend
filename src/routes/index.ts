import { isAuth } from "@/middlewares/isAuth";
import { Router } from "express";
import healthCheckRouter from "./healthCheck.route";
import notFoundRouter from "./notFound.route";
import userRouter from "./user.route";

const router = Router();

// health-check
router.use("/health-check", healthCheckRouter);

// user routes
router.use("/users", isAuth, userRouter);

// 404 routes
router.use("*", notFoundRouter);

export default router;
