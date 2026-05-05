import { IGetMealData } from "@/types/meals.type";
import { IUpdatereviewData, TResponseReviewData } from "../types/reviews.type";
import { env } from "@/env";
import { ApiErrorResponse, ApiResponse } from "@/types/response.type";
import { ICreatereviewData, IgetReviewData } from "@/types/reviews.type";
import { cookies } from "next/headers";
import { TUser } from "@/types/user.type";
import { Ipagination } from "@/types/pagination.type";

export interface IModerateData {
  status:string;
}

const api_url = env.BACKEND_URL;

export const reviewService = {
  createReview: async (mealid: string, data: ICreatereviewData) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${api_url}/api/v1/meal/${mealid}/review`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
        cache: "no-store",
      });
      const body = await res.json();
      const result = body as ApiResponse<IgetReviewData>;
      if (!res.ok) {
        const error = body as ApiErrorResponse;
        return {
          success: error.success,
          message: error.message || "review create failed",
        };
      }

      return {success:result.success,message:result.message,data:result.data};
    } catch (e: any) {
      return { success: false, message: e.message, error: "Server error" };
    }
  },

  deleteReview: async (reviewid: string) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${api_url}/api/v1/review/${reviewid}`, {
        method: "DELETE",
        credentials: "include",
        headers: { Cookie: cookieStore.toString() },
        cache: "no-store",
      });

      const result = await res.json();
      const data = result as ApiResponse<IgetReviewData>;
      if (!res.ok) {
        const error = result as ApiErrorResponse;
        return {
          success: error.success,
          message: error.message || "Delete failed",
        };
      }

      return { success: data.success, message: data.message, data: data.data };
    } catch (e: any) {
      return { success: false, message: e.message, error: "Server error" };
    }
  },

  moderateReview: async (reviewId: string, data: IModerateData) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${api_url}/api/v1/review/${reviewId}/moderate`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
        cache: "no-store",
      });

      const body = await res.json();
        const result = body as ApiResponse<IgetReviewData>;
      if (!res.ok) {
        const error = result as ApiErrorResponse;
        return {
          success: error.success,
          message: error.message || "Delete failed",
        };
      }

      return { success: result.success, message: result.message, data: result.data };
    } catch (e: any) {
      return { success: false, message: e.message, error: "Server error" };
    }
  },

  reviewUpdate: async (reviewId: string, data: IUpdatereviewData) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${api_url}/api/v1/review/${reviewId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
        cache: "no-store",
      });

      const result = await res.json();
      if (!res.ok)
        return { success: false, message: result.message || "update failed" };

      return result;
    } catch (e: any) {
      return { success: false, message: e.message, error: "Server error" };
    }
  },

  getAllReviews: async () => {
    try {
      const res = await fetch(`${api_url}/api/v1/reviews`, {
        method: "GET",
        cache: "no-store",
      });

      const data = await res.json();
      if (!res.ok) {
        const error = data as ApiErrorResponse;
        return {
          success: error.success,
          message: error.message || "retrieve all reviews failed",
        };
      }
      return { success: data.success, message: data.message, data: data.data.result as TResponseReviewData<{meal:IGetMealData,customer:TUser,replies:any[]}>[],pagination:data.data.pagination as Ipagination};
    } catch (e: any) {
      return { success: false, message: e.message, error: "Server error" };
    }
  },
};
