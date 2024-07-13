import z from "zod";

export const getLocationSchema = z.object({
  body: z.object({}),
  params: z.object({}),
  query: z.object({
    city: z
      .string()
      .min(1, { message: "City name must be provided" })
      .max(60, { message: "City name's length should not exceed 60 characters" }),
  }),
});

export type GetLocationSchema = z.infer<typeof getLocationSchema>;
