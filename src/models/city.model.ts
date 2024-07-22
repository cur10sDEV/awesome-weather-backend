import { Document, Model, model, models, Schema } from "mongoose";

export interface ICity extends Document {
  name: string;
  country: string;
  lat: string;
  lon: string;
}

type CityModel = Model<ICity>;

const citySchema = new Schema<ICity>({
  name: { type: String, required: true, min: 3, max: 60 },
  country: { type: String, required: true, min: 3, max: 60 },
  lat: { type: String, required: true, min: 1, max: 100 },
  lon: { type: String, required: true, min: 1, max: 100 },
});

export const City: CityModel = models.City || model<ICity, CityModel>("City", citySchema);
