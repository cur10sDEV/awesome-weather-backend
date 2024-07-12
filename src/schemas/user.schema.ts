import z from "zod";

export const userRegistrationSchema = z.object({
  clerkId: z.string().min(1).max(128),
  email: z.string().trim().email().min(3).max(25),
  avatar: z.string().trim().min(1).max(512),
  username: z.string().trim().min(3).max(25),
});

export type UserRegistration = z.infer<typeof userRegistrationSchema>;
