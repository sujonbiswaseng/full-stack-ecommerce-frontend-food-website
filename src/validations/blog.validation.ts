import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  content: z.string().min(1, { message: "Content is required." }),
  images: z
    .union([z.array(z.instanceof(File)).min(1, "At least 1 image is required"), z.array(z.string()).min(1, "At least 1 image is required")]),
    mealid: z.string().optional().nullable(),
});

export const updateBlogSchema = z
  .object({
    title: z.string().optional(),
    content: z.string().optional(),
    images: z.any().optional(),
    mealid: z.string().optional().nullable(),
  })