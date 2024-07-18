import z from "zod";

export const getWeatherSchema = z.object({
  body: z.object({}),
  params: z.object({}),
  query: z.object({
    lat: z
      .string()
      .min(1, { message: "Latitude must be provided" })
      .max(20, { message: "Latitude's length should not exceed 20 characters" }),
    lon: z
      .string()
      .min(1, { message: "Longitude must be provided" })
      .max(20, { message: "Longitude's length should not exceed 20 characters" }),
    units: z.optional(z.enum(["metric", "standard", "imperial"])),
    lang: z.optional(
      z
        .string()
        .min(1, { message: "Language must be defined" })
        .max(5, { message: "Language should be less than or equal to 5 characters" })
    ),
  }),
});

export type GetWeatherSchema = z.infer<typeof getWeatherSchema>;
