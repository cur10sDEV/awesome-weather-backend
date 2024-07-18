import { model, models, Schema } from "mongoose";

export interface ICity extends Document {
  name: string;
  country: string;
  lat: string;
  lon: string;
}

const citySchema = new Schema<ICity>({
  name: { type: String, required: true, min: 3, max: 60 },
  country: { type: String, required: true, min: 3, max: 60 },
  lat: { type: String, required: true, min: 1, max: 100 },
  lon: { type: String, required: true, min: 1, max: 100 },
});

export const City = models.City || model("City", citySchema);
