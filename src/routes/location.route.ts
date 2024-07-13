import { LocationController } from "@/controllers/location.controller";
import { Router } from "express";

const router = Router();

router.get("/search", LocationController.getLocations);

export default router;
