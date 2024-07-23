import { Models } from "@/models";
import { AddCitySchema } from "@/schemas/user.schema";

export class CityRepo {
  static async createCity(data: AddCitySchema) {
    const newCity = await Models.City.create({
      ...data.body,
    });

    return newCity;
  }

  static async getCityById(id: string) {
    const city = await Models.City.findById(id);

    return city;
  }
}
