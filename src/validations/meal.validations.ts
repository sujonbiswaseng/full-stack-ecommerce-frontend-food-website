import { allowedDomains } from "@/lib/domain";
import { cuisines, dietaryPreferences } from "@/types/meals.type";
import z from "zod";

export const CreateMealData = z.object({
  title: z.string().min(1, "meals name is required"),
  description: z.string().min(5, "description atleast 5 character"),
  deliverycharge: z.number(),
  images: z.any().default([]),
  location: z.string().min(3, "Location is required"),
  date: z
  .string()
  .refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  })
  .transform((val) => new Date(val).toISOString()),
  price: z
  .preprocess((val) => {
    if (val === "" || val === null) return 0;
    return Number(val);
  }, z
    .number()
    .min(60, { message: "Fee must be at least 60 Taka." })
    .max(6000, { message: "Fee cannot exceed 6000 Taka." })
    .optional()
  ),
  isAvailable: z.boolean(),
  dietaryPreference: z.enum(dietaryPreferences),
  category_name: z.string().min(1, "category name is required"),
  cuisine: z.enum(cuisines),
});

// update meals

export const UpdatemealData = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  image: z.any().optional(),
  price: z.number().min(60,"price must be al least 60 taka").optional(),
  isAvailable: z.boolean().optional(),
  category_name: z.string().optional(),
  cuisine: z.enum([
      "BANGLEDESHI", "ITALIAN", "CHINESE", "INDIAN", "MEXICAN", 
      "THAI", "JAPANESE", "FRENCH", "MEDITERRANEAN", 
      "AMERICAN", "MIDDLE_EASTERN"
  ]).optional(),
  dietaryPreference: z.enum([
      "HALAL", "VEGAN", "VEGETARIAN", "ANY", "GLUTEN_FREE", 
      "KETO", "PALEO", "DAIRY_FREE", "NUT_FREE", "LOW_SUGAR"
  ]).optional()
});

