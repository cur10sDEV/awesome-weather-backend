import logger from "@/configs/logger";
import { UserService } from "@/services/user.service";
import { ApiError } from "@/utils/apiError";
import { ApiResponse } from "@/utils/apiResponse";
import { HttpStatusCode } from "@/utils/httpCodes";
import { RequestHandler } from "express";

export class UserController {
  static getUserProfile: RequestHandler = async (req, res, next) => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        throw new ApiError(HttpStatusCode.UNAUTHORIZED, "Unauthorized access!");
      }

      const user = await UserService.getUserProfile(userId);

      if (!user) {
        throw new ApiError(HttpStatusCode.NOT_FOUND, "User profile does not exist!");
      }

      return res
        .status(HttpStatusCode.OK)
        .json(new ApiResponse(HttpStatusCode.OK, "User profile fetched successfully!", user.data));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };

  static updateUserSettings: RequestHandler = async (req, res, next) => {
    try {
      const userId = req.user?.id;
      const data = req.body;

      if (!userId) {
        throw new ApiError(HttpStatusCode.UNAUTHORIZED, "Unauthorized access!");
      }

      const isUpdated = await UserService.updateUserSettings(userId, data);

      if (!isUpdated) {
        throw new ApiError(HttpStatusCode.INTERNAL_SERVER_ERROR, "Failed to update user settings!");
      }

      return res
        .status(HttpStatusCode.OK)
        .json(new ApiResponse(HttpStatusCode.OK, "User settings updated successfully!"));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };

  static getSavedCities: RequestHandler = async (req, res, next) => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        throw new ApiError(HttpStatusCode.UNAUTHORIZED, "Unauthorized access!");
      }

      const savedCities = await UserService.getSavedCities(userId);

      if (!savedCities) {
        throw new ApiError(HttpStatusCode.INTERNAL_SERVER_ERROR, "Failed to fetch saved cities!");
      }

      return res
        .status(HttpStatusCode.OK)
        .json(new ApiResponse(HttpStatusCode.OK, "User's saved cities fetched successfully!", savedCities.data));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };

  static addCity: RequestHandler = async (req, res, next) => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        throw new ApiError(HttpStatusCode.UNAUTHORIZED, "Unauthorized access!");
      }

      const data = req.body;

      const isAdded = UserService.addNewSaveCity(userId, data);

      if (!isAdded) {
        throw new ApiError(HttpStatusCode.INTERNAL_SERVER_ERROR, "Failed to add city to saved cities!");
      }

      return res
        .status(HttpStatusCode.OK)
        .json(new ApiResponse(HttpStatusCode.OK, "City added to saved cities successfully!"));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };
}
