import logger from "@/configs/logger";
import { UserMapper } from "@/mappers/user.mapper";
import { UserRepo } from "@/repositories/user.repo";
import { AddCitySchema, UpdateUserSchema } from "@/schemas/user.schema";
import { Units } from "@/types";
import { IUserRegistration } from "@/types/user";
import { WeatherService } from "./weather.service";

export class UserService {
  static async getUserProfile(userId: string) {
    try {
      const user = await UserRepo.getUserById(userId);

      if (!user) {
        return null;
      }

      const userProfileDto = UserMapper.toProfileDTO(user);

      return userProfileDto;
    } catch (error) {
      logger.error(error);
      return null;
    }
  }

  static async getUserByClerkId(clerkId: string) {
    try {
      const user = await UserRepo.getUserByClerkId(clerkId);

      if (!user) {
        return null;
      }

      const userDto = UserMapper.toDTO(user);
      return userDto;
    } catch (err) {
      logger.error(err);
      return null;
    }
  }

  static async createUser(data: IUserRegistration) {
    try {
      const user = await UserRepo.createUser(data);

      if (!user) {
        return null;
      }

      const userDto = UserMapper.toDTO(user);
      return userDto;
    } catch (err) {
      logger.error(err);
      return null;
    }
  }

  static async updateUser(data: IUserRegistration) {
    try {
      const user = await UserRepo.updateUser(data);

      if (!user) {
        return null;
      }

      const userDto = UserMapper.toDTO(user);
      return userDto;
    } catch (err) {
      logger.error(err);
      return null;
    }
  }

  static async deleteUser(clerkId: string) {
    try {
      const isDeleted = await UserRepo.deleteUser(clerkId);

      if (!isDeleted) {
        return null;
      }

      return isDeleted;
    } catch (err) {
      logger.error(err);
      return null;
    }
  }

  static async updateUserSettings(userId: string, data: UpdateUserSchema) {
    try {
      const res = await UserRepo.updateUserSettings(userId, data);

      if (!res) {
        return false;
      }

      return true;
    } catch (error) {
      logger.error(error);
      return null;
    }
  }

  static async getSavedCities(userId: string) {
    try {
      const user = await UserRepo.getUserWithSavedCities(userId);

      if (!user) {
        return null;
      }

      const savedCities = user.savedCities.map((city) => ({
        _id: String(city._id),
        name: city.name,
        lat: city.lat,
        lon: city.lon,
        country: city.country,
      }));

      const weatherPromises = savedCities.map((city) =>
        WeatherService.getWeatherData(city.lat, city.lon, Units[user.units])
      );

      const weatherResults = await Promise.all(weatherPromises);

      const savedCitiesWithWeatherInfo = savedCities.map((city, index) => {
        if (weatherResults[index] === null || weatherResults[index] === undefined) {
          return null;
        }
        return {
          city: { ...city },
          weather: weatherResults[index].data.current,
        };
      });

      const validSavedCitiesWithWeatherInfo = savedCitiesWithWeatherInfo.filter((item) => item !== null);

      const savedCitiesDto = UserMapper.toSavedCitiesDTO(validSavedCitiesWithWeatherInfo);

      return savedCitiesDto;
    } catch (error) {
      logger.error(error);
      return null;
    }
  }

  static async addNewSaveCity(userId: string, data: AddCitySchema) {
    try {
      const isAdded = await UserRepo.addNewSaveCity(userId, data);

      if (!isAdded) {
        return null;
      }

      return true;
    } catch (error) {
      logger.error(error);
      return null;
    }
  }

  static async removeSavedCity(userId: string, cityId: string) {
    try {
      const isRemoved = await UserRepo.removeSavedCity(userId, cityId);

      if (!isRemoved) {
        return null;
      }

      return true;
    } catch (error) {
      logger.error(error);
      return null;
    }
  }
}
