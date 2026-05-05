import z from "zod";
import { TGetCategory } from "./category";
import { TUser } from "./user.type";
import { Ipagination } from "./pagination.type";
import { CreateMealData, UpdatemealData } from "@/validations/meal.validations";
import { IgetReviewData } from "./reviews.type";
export const cuisines = [
  "BANGLEDESHI",
  "ITALIAN",
  "CHINESE",
  "INDIAN",
  "MEXICAN",
  "THAI",
  "JAPANESE",
  "FRENCH",
  "MEDITERRANEAN",
  "AMERICAN",
  "MIDDLE_EASTERN"
] as const;

export const dietaryPreferences = [
  "HALAL",
  "VEGAN",
  "VEGETARIAN",
  "ANY",
  "GLUTEN_FREE",
  "KETO",
  "PALEO",
  "DAIRY_FREE",
  "NUT_FREE",
  "LOW_SUGAR"
] as const;

// create meal
export type TCreateMealsData=z.infer<typeof CreateMealData>

export type TCuisine = typeof cuisines[number];
export type TDietaryPreference = typeof dietaryPreferences[number];


export interface ReviewCustomer {
  id: string;
  name: string | null;
  image: string | null;
  email: string;
}
// update meal
export type TUpdateMealsData = z.infer<typeof UpdatemealData>;

export interface IGetAllmeals{
  data:IGetMealData[],
  pagination:Ipagination
}

export interface MealReview {
  id: string
  comment: string
  rating: number
  parentId: string | null
  customer?: ReviewCustomer
  status:"APPROVED" | "REJECTED"
  replies: MealReview[] 
}

export interface IGetMealData {
  id: string;
  title: string;
  description: string | null;
  images: string[] | null;
  date:string;
  location:string;
  price: number;
  isAvailable: boolean;
  dietaryPreference: TDietaryPreference;
  providerId: string;
  category_name: string;
  cuisine: TCuisine;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  updatedAt: string;
  avgRating?:number
  totalReviews?:number,
  deliverycharge?:number
}

export type TResponseMeals<T = unknown> = IGetMealData & T;

 export interface providerRating{
    averageRating:number
    totalReview:number
  };




export type UpdateMealsData = {
  title?: string;
  description?: string;
  image?: any;
  price?: number;
  isAvailable?: boolean;
  dietaryPreference?: TDietaryPreference;
  category_name?: string;
  cuisine?: TCuisine;
};
