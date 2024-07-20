import { UserController } from "@/controllers/user.controller";
import validate from "@/middlewares/validate";
import { updateUserSchema } from "@/schemas";
import { Router } from "express";

const router = Router();

router.get("/me", UserController.getUserProfile);
router.put("/settings", validate(updateUserSchema), UserController.updateUserSettings);

export default router;
