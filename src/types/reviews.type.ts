import { createReviewsData, moderateData, updateReviewsData } from "@/validations/review.validation";
import z from "zod";
import { TUser } from "./user.type";
import { IGetMealData } from "./meals.type";

// create reviews type
export type ICreatereviewData=z.infer<typeof createReviewsData>

// update reviews type
export type IUpdatereviewData=z.infer<typeof updateReviewsData>

// moderate reviews type
export type ImoderateUpdatereviewData=z.infer<typeof moderateData>


// retrieve reviews data

export interface IgetReviewData{
    id: string,
    customerId: string,
    mealId: string,
    parentId: string | null,
    rating: number,
    status: string,
    comment: string,
    createdAt: string,
    updatedAt: string,
    customer?:TUser,
    replies: IgetReviewData[] 
}

export type TResponseReviewData<T = unknown> = IgetReviewData & T;