import { allowedDomains } from "@/lib/domain";
import z from "zod";

export const CreateCategory = z.object({
  name: z.string().min(1, "Name is required"),
  image: z.any()
});
export const UpdateCategory = z.object({
  name: z.string().optional(),
  image:z.any().optional(),
})