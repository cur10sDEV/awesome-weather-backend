import { WeatherController } from "@/controllers/weather.controller";
import validate from "@/middlewares/validate";
import { getWeatherSchema } from "@/schemas";
import { Router } from "express";

const router = Router();

router.get("/", validate(getWeatherSchema), WeatherController.getWeather);

export default router;
