import { WeatherController } from "@/controllers/weather.controller";
import { Router } from "express";

const router = Router();

router.get("/", WeatherController.getWeather);

export default router;
