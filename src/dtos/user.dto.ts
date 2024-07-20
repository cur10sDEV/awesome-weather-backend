import { Schema } from "mongoose";

export interface IUserDTO {
  data: {
    id: string;
    clerkId: string;
    username: string;
    email: string;
    avatar: string;
    city: {
      name: string;
      country: string;
      lat: string;
      lon: string;
    };
    units: "standard" | "imperial" | "metric";
    timeFormat: 24 | 12;
    limits: {
      aqi: number;
      lowTemp: number;
      highTemp: number;
    };
    savedCities: Schema.Types.ObjectId[];
  };
}

export interface IUserProfileDTO {
  data: {
    city: {
      name: string;
      country: string;
      lat: string;
      lon: string;
    };
    units: "standard" | "imperial" | "metric";
    timeFormat: 24 | 12;
    limits: {
      aqi: number;
      lowTemp: number;
      highTemp: number;
    };
  };
}
