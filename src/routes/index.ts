import { isAuth } from "@/middlewares/isAuth";
import { Router } from "express";
import healthCheckRouter from "./healthCheck.route";
import locationRouter from "./location.route";
import notFoundRouter from "./notFound.route";
import userRouter from "./user.route";
import weatherRouter from "./weather.route";

const router = Router();

// health-check
router.use("/health-check", healthCheckRouter);

// user routes
router.use("/users", isAuth, userRouter);

// location routes
router.use("/location", isAuth, locationRouter);

// weather routes
router.use("/weather", isAuth, weatherRouter);

// 404 routes
router.use("*", notFoundRouter);

export default router;
