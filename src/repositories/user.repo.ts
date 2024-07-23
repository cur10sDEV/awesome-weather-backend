import { runInTransaction } from "@/libs/mongoose/runInTransation";
import { Models } from "@/models";
import { ICity } from "@/models/city.model";
import { AddCitySchema, UpdateUserSchema } from "@/schemas/user.schema";
import { IUserRegistration } from "@/types/user";
import { HydratedDocument } from "mongoose";

export class UserRepo {
  static async getUserById(userId: string) {
    const user = await Models.User.findById(userId);

    return user;
  }

  static async getUserByClerkId(clerkId: string) {
    const user = await Models.User.findOne({ clerkId: clerkId });

    return user;
  }

  static async createUser(data: IUserRegistration) {
    const user = await Models.User.create({
      clerkId: data.clerkId,
      email: data.email,
      avatar: data.avatar,
      username: data.username,
    });

    return user;
  }

  static async updateUser(data: IUserRegistration) {
    const user = await Models.User.findOneAndUpdate(
      { clerkId: data.clerkId },
      {
        clerkId: data.clerkId,
        email: data.email,
        avatar: data.avatar,
        username: data.username,
      }
    );

    return user;
  }

  static async deleteUser(clerkId: string) {
    const user = await Models.User.findOneAndDelete({ clerkId: clerkId });

    return user;
  }

  static async updateUserSettings(userId: string, data: UpdateUserSchema) {
    const updatedSettings = await Models.User.findByIdAndUpdate(userId, {
      ...data,
    });

    return updatedSettings !== null;
  }

  static async getUserWithSavedCities(userId: string) {
    const user = await Models.User.findById(userId).populate<{ savedCities: HydratedDocument<ICity>[] }>("savedCities");

    return user;
  }

  static async addNewSaveCity(userId: string, data: AddCitySchema) {
    // run a db transaction to create a new city and add it to user's saved cities
    return await runInTransaction(async (session) => {
      // create a new city
      const newCity = await Models.City.create(
        [
          {
            ...data,
          },
        ],
        { session }
      );

      // save to user saved cities
      await Models.User.findByIdAndUpdate(
        userId,
        {
          $push: { savedCities: newCity[0]._id },
        },
        { session }
      );
    });
  }

  static async removeSavedCity(userId: string, cityId: string) {
    return await runInTransaction(async (session) => {
      const city = await Models.City.findByIdAndDelete(cityId, {
        session,
      });

      await Models.User.findByIdAndUpdate(
        userId,
        {
          $pull: { savedCities: city?._id },
        },
        { session }
      );
    });
  }
}
