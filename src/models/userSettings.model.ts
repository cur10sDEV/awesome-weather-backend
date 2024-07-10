import { model, models, Schema } from "mongoose";

export interface IUserSettings extends Document {
  userId: Schema.Types.ObjectId;
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

const userSettingsSchema = new Schema<IUserSettings>({
  userId: { type: Schema.Types.ObjectId, required: true, unique: true },
  city: {
    name: { type: String, required: true, min: 1, max: 60, default: "Indore" },
    country: { type: String, required: true, min: 1, max: 60, default: "India" },
    lat: { type: String, required: true, min: 0, max: 100, default: "22.7015332" },
    long: { type: String, required: true, min: 0, max: 100, default: "75.8570363" },
  },
  units: { type: String, required: true, default: "metric" },
  timeFormat: { type: Number, required: true, default: 24 },
  limits: {
    aqiLimit: { type: Number, required: true, min: 100, max: 500 },
    lowTemp: { type: Number, required: true, default: 10, min: -50, max: 25 }, // these default values are in clesius
    highTemp: { type: Number, required: true, default: 35, min: 10, max: 100 },
  },
  savedCities: { type: [Schema.Types.ObjectId], ref: "City" },
});

export const UserSettings = models.UserSettings || model("UserSettings", userSettingsSchema);
