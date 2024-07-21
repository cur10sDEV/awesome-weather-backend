import { ISavedCitiesDTO, IUserDTO, IUserProfileDTO } from "@/dtos/user.dto";
import { IUser } from "@/models/user.model";
import { HydratedDocument } from "mongoose";

interface ISavedCitiesDTOInputItem {
  city: {
    _id: string;
    name: string;
    lat: string;
    lon: string;
    country: string;
  };
  weather: {
    dateTime: number;
    temp: number;
    feelsLike: number;
    main: string;
    description: string;
    pressure: number;
    humidity: number;
    windSpeed: number;
    pop: number;
    uvi: number;
    sunrise: number;
    sunset: number;
  };
}

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
          aqi: data.limits.aqi,
          lowTemp: data.limits.lowTemp,
          highTemp: data.limits.highTemp,
        },
        savedCities: data.savedCities,
      },
    };
  }

  static toProfileDTO(data: HydratedDocument<IUser>): IUserProfileDTO {
    return {
      data: {
        city: {
          name: data.city.name,
          country: data.city.country,
          lat: data.city.lat,
          lon: data.city.lon,
        },
        units: data.units,
        timeFormat: data.timeFormat,
        limits: {
          aqi: data.limits.aqi,
          highTemp: data.limits.highTemp,
          lowTemp: data.limits.lowTemp,
        },
      },
    };
  }

  static toSavedCitiesDTO(data: ISavedCitiesDTOInputItem[]): ISavedCitiesDTO {
    return {
      data: data.map((item) => {
        return {
          id: item.city._id,
          name: item.city.name,
          country: item.city.country,
          lat: item.city.lat,
          lon: item.city.lon,
          weather: {
            temp: item.weather.temp,
            main: item.weather.main,
          },
        };
      }),
    };
  }
}
