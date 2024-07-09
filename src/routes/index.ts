import { Router } from "express";
import healthCheckRouter from "./healthCheck.route";
import notFoundRouter from "./notFound.route";

const router = Router();

// health-check
router.use("/health-check", healthCheckRouter);

// courses
router.use("*", notFoundRouter);

export default router;
