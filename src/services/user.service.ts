import logger from "@/configs/logger";
import { UserMapper } from "@/mappers/user.mapper";
import { UserRepo } from "@/repositories/user.repo";
import { IUserRegistration } from "@/types/user";

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
      const user = await UserRepo.deleteUser(clerkId);

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
}
