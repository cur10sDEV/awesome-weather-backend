import logger from "@/configs/logger";
import { UserMapper } from "@/mappers/user.mapper";
import { UserRepo } from "@/repositories/user.repo";
import { UserRegistration } from "@/schemas/user.schema";

export class UserService {
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

  static async createUser(data: UserRegistration) {
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

  static async updateUser(data: UserRegistration) {
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
