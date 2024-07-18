import logger from "@/configs/logger";
import { LocationService } from "@/services/location.service";
import { ApiError } from "@/utils/apiError";
import { ApiResponse } from "@/utils/apiResponse";
import { HttpStatusCode } from "@/utils/httpCodes";
import { RequestHandler } from "express";

export class LocationController {
  static getLocations: RequestHandler = async (req, res, next) => {
    try {
      const { city } = req.query;

      const locations = await LocationService.geocode(city as string);

      if (!locations) {
        throw new ApiError(HttpStatusCode.INTERNAL_SERVER_ERROR, "Failed to fetch locations!");
      }

      return res
        .status(HttpStatusCode.OK)
        .json(new ApiResponse(HttpStatusCode.OK, "Locations fetched successfully!", locations.data));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };
}
