import { Document, Model, model, models, Schema } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  username: string;
  email: string;
  avatar: string;
  city: {
    name: string;
    country: string;
    lat: string;
    long: string;
  };
  units: "standard" | "imperial" | "metric";
  timeFormat: 24 | 12;
  limits: {
    aqiLimit: number;
    lowTemp: number;
    highTemp: number;
  };
  savedCities: Schema.Types.ObjectId[];
}

type UserModel = Model<IUser>;

const userSchema = new Schema<IUser, UserModel>({
  clerkId: { type: String, unique: true, required: true, index: true },
  username: { type: String, unique: true, required: true, min: 3, max: 25 },
  email: { type: String, unique: true, required: true, min: 5, max: 50 },
  avatar: { type: String, required: true, min: 1, max: 512 },
  city: {
    name: { type: String, required: true, min: 1, max: 60, default: "Indore" },
    country: { type: String, required: true, min: 1, max: 60, default: "India" },
    lat: { type: String, required: true, min: 0, max: 100, default: "22.7015332" },
    long: { type: String, required: true, min: 0, max: 100, default: "75.8570363" },
  },
  units: { type: String, required: true, default: "metric" },
  timeFormat: { type: Number, required: true, default: 24 },
  limits: {
    aqiLimit: { type: Number, required: true, default: 100, min: 100, max: 500 },
    lowTemp: { type: Number, required: true, default: 10, min: -50, max: 25 }, // these default values are in clesius
    highTemp: { type: Number, required: true, default: 35, min: 10, max: 100 },
  },
  savedCities: { type: [Schema.Types.ObjectId], ref: "City" },
});

export const User: UserModel = models.User || model<IUser, UserModel>("User", userSchema);
