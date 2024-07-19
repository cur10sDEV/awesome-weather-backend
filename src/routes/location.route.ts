import { LocationController } from "@/controllers/location.controller";
import validate from "@/middlewares/validate";
import { getLocationSchema } from "@/schemas";
import { Router } from "express";

const router = Router();

router.get("/search", validate(getLocationSchema), LocationController.getLocations);

export default router;
