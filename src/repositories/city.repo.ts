import { Models } from "@/models";
import { AddNewSavedCitySchema } from "@/schemas/user.schema";

export class CityRepo {
  static async createCity(data: AddNewSavedCitySchema) {
    const newCity = await Models.City.create({
      ...data.body,
    });

    return newCity;
  }
}
