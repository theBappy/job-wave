import { z } from "zod";

export const companySchema = z.object({
  name: z.string().min(5, "Company name must be at least 5 characters long"),
  location: z.string().min(1, "Location must be defined"),
  about: z
    .string()
    .min(10, "Please provide some information about your company"),
  logo: z.string().min(1, "Please upload your company logo"),
  website: z.string().url("Please enter a valid URL"),
  xAccount: z.string().optional(),
});
