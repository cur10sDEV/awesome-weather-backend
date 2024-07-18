import { IUserDTO } from "@/dtos/user.dto";
import { IUser } from "@/models/user.model";
import { HydratedDocument } from "mongoose";

export class UserMapper {
  static toDTO(data: HydratedDocument<IUser>): IUserDTO {
    return {
      data: {
        id: data._id,
        username: data.username,
        clerkId: data.clerkId,
        avatar: data.avatar,
        email: data.email,
        city: {
          name: data.city.name,
          country: data.city.country,
          lat: data.city.lat,
          lon: data.city.lon,
        },
        units: data.units,
        timeFormat: data.timeFormat,
        limits: {
          aqiLimit: data.limits.aqiLimit,
          lowTemp: data.limits.lowTemp,
          highTemp: data.limits.highTemp,
        },
        savedCities: data.savedCities,
      },
    };
  }
}
