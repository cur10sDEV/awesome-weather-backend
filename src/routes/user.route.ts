import { UserController } from "@/controllers/user.controller";
import { Router } from "express";

const router = Router();

router.get("/me", UserController.getUserProfile);

export default router;
