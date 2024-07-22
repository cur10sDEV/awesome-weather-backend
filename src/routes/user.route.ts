import { UserController } from "@/controllers/user.controller";
import validate from "@/middlewares/validate";
import { updateUserSchema } from "@/schemas";
import { addCitySchema } from "@/schemas/user.schema";
import { Router } from "express";

const router = Router();

router.get("/me", UserController.getUserProfile);
router.put("/settings", validate(updateUserSchema), UserController.updateUserSettings);
router.get("/savedCities", UserController.getSavedCities);
router.post("/savedCities", validate(addCitySchema), UserController.addCity);

export default router;
