import logger from "@/configs/logger";
import { WeatherService } from "@/services/weather.service";
import { Units } from "@/types";
import { ApiError } from "@/utils/apiError";
import { ApiResponse } from "@/utils/apiResponse";
import { HttpStatusCode } from "@/utils/httpCodes";
import { RequestHandler } from "express";

export class WeatherController {
  static getWeather: RequestHandler = async (req, res, next) => {
    try {
      const { lat, lon, units, lang } = req.query;

      const weather = await WeatherService.getWeatherData(
        lat as string,
        lon as string,
        Units[units as keyof typeof Units],
        lang as string
      );

      const aqi = await WeatherService.getAQI(lat as string, lon as string);

      // TODO: get city's name from location service by reverse geocoding and add to response data

      if (!weather || !aqi) {
        throw new ApiError(HttpStatusCode.INTERNAL_SERVER_ERROR, "Failed to fetch data!");
      }

      return res
        .status(HttpStatusCode.OK)
        .json(new ApiResponse(HttpStatusCode.OK, "Weather fetched successfully!", { ...weather.data, ...aqi.data }));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };
}
