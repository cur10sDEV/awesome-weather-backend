import { Units } from "@/types";
import z from "zod";

// min and max values are min and max values of all units respectively
export const updateUserSchema = z.object({
  body: z.object({
    city: z.object({
      name: z.string().min(1).max(60),
      country: z.string().min(1).max(60),
      lat: z.string().min(1).max(100),
      lon: z.string().min(1).max(60),
    }),
    units: z.nativeEnum(Units),
    timeFormat: z.coerce.number().refine(
      (tf) => {
        if (tf === 12 || tf === 24) return true;
        else false;
      },
      { message: "Time format should only be 12 or 24" }
    ),
    limits: z.object({
      aqi: z.coerce.number().min(100).max(500),
      lowTemp: z.coerce.number().min(-58).max(299),
      highTemp: z.coerce.number().min(10).max(374),
    }),
  }),
  params: z.object({}),
  query: z.object({}),
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;

export const addCitySchema = z.object({
  body: z.object({
    name: z.string().min(1).max(60),
    country: z.string().min(1).max(60),
    lat: z.string().min(1).max(100),
    lon: z.string().min(1).max(60),
  }),
  params: z.object({}),
  query: z.object({}),
});

export type AddNewSavedCitySchema = z.infer<typeof addCitySchema>;
