import { env } from "@/env";
import { cookies } from "next/headers";
import { ApiErrorResponse, ApiResponse } from "@/types/response.type";
import { success } from "zod";
import { TCreateMealsData, TResponseMeals, TUpdateMealsData } from "@/types/meals.type";
import { revalidateTag } from "next/cache";
import { IProviderInfo, TResponseproviderData } from "@/types/provider.type";
import { IgetReviewData } from "@/types/reviews.type";
import { Ipagination } from "@/types/pagination.type";
import { TGetCategory } from "@/types/category";
import { TUser } from "@/types/user.type";
const api_url = env.BACKEND_URL;

export interface ServiceOptionds {
  cache?: RequestCache;
  revalidate?: number;
}
export interface GetMealsParams {
  search?: string;
}
export interface IMealStatus{
  status:string
}

export const mealsService = {
  createMeals: async (mealsdata: TCreateMealsData) => {
    const formData = new FormData();
    const cookieStore = await cookies();

    const { images, ...rest } = mealsdata;

    formData.append("data", JSON.stringify(rest));

    if (images && images.length > 0) {
      images.forEach((image) => {
        formData.append("files", image);
      });
    }
 
    try {
      const res = await fetch(`${api_url}/api/v1/provider/meal`, {
        method: "POST",
        headers: {
          Cookie: cookieStore.toString(),
        },
        body: formData,
      });
      revalidateTag("meal",'max')

      const data = await res.json();
      console.log(data,'data')

      const result = data as ApiResponse<TCreateMealsData>;
      if (!res.ok) {
        const error = data as ApiErrorResponse;
        return {
          success: error.success,
          message: error.message || "meal created failed",
        };
      }
      return {
        success: result.success,
        message: result.message || "meal created successfully",
        data: result.data,
      };
    } catch (error) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
  getAllmeals: async (params?: any, options?: ServiceOptionds) => {
    try {
      const url = new URL(`${api_url}/api/v1/meals`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, String(value));
          }
        });
      }

      const config: RequestInit = {};
      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }
      config.next = { ...config.next, revalidate:10,tags:["meal","meals"]};

      const res = await fetch(url.toString(), config);

      const data = await res.json();
      const result = data.data.data as TResponseMeals<{provider:TResponseproviderData<{user:TUser}>,reviews:IgetReviewData}>[]
      if (!res.ok) {
        const error = data as ApiErrorResponse;
        return {
          success: error.success,
          message: error.message || "retrieve all meals failed",
        };
      }
    
      return {
        success: data.success,
        message: data.message || "retrieve all meals successfully",
        data: result,
        pagination:data.data.pagination as Ipagination
      };
    } catch (error) {
      return { message: "something went wrong please try again" };
    }
  },
  getmealsown: async (params?: Record<string, any>, options?: ServiceOptionds) => {
    try {
      const cookieStore = await cookies();
      const url = new URL(`${api_url}/api/v1/provider/meals/own`);
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, String(value));
          }
        });
      }
      const config: RequestInit & { next?: any } = {
        credentials: "include",
        headers: { Cookie: cookieStore.toString() },
      };

      if (options?.cache) {
        config.cache = options.cache;
      }
      if (options?.revalidate) {
        config.next = { ...config.next, revalidate: options.revalidate };
      }
      config.next = { ...config.next, tags: ["meal","meals"] };

      const res = await fetch(url.toString(), config);
      const data = await res.json()
      if (!res.ok) {
        const error = data as ApiErrorResponse;
        return { success: error.success, message: error.message || "retrieve own meals failed" };
      }

      return {
        success: data.success,
        message: data.message || "retrieve own meals successfully",
        data: data.data.mealsData,
        pagination:data.data.pagination as Ipagination
      };
 
    } catch (error) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
  MealStatusUpdate: async (id: string, data: IMealStatus) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${api_url}/api/v1/meal/${id}`, {
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
       const result =body as ApiResponse<TResponseMeals>
      if(!res.ok){
        const error =body as ApiErrorResponse
        return {success:error.success,message:error.message || "meals status update failed"}
      }
      return result;
    } catch (error) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  getmealsbyid: async (id: string) => {
    try {
      const res = await fetch(`${api_url}/api/v1/meal/${id}`);
      const body = await res.json();
      const result = body as ApiResponse<TResponseMeals>
      if(!res.ok){
        const error=body as ApiErrorResponse
        return {success:error.success, message:error.message || "retrieve single meal failed"}
      }

      return {success:result.success,message:result.message || "retrieve signle meal successfully",result}
    } catch (error: any) {
      return {
        data: null,
        error: error.message,
      };
    }
  },

  handleDelete: async (id: string) => {
    try {
       const cookieStore = await cookies();
      const res = await fetch(`${api_url}/api/v1/provider/meal/${id}`, {
        method: "DELETE",
        credentials:"include",
        headers:{
          "Content-Type": "application/json",
          Cookie:cookieStore.toString()
        }
      });
      revalidateTag("meal",'max')
      const data = await res.json();
      const result = data as ApiResponse<TResponseMeals>
      if (!res.ok) {
        const error =data as ApiErrorResponse
        return {success:error.success,message:error.message}
      }
      return {success:result.success,message:result.message,data:result.data};
    } catch (error: any) {
      return {success:false,message:"something went wrong please try again"}
    }
  },
  updateMeals: async (id: string, mealsdata: TUpdateMealsData) => {
    try {
      const cookieStore = await cookies();
      const formData = new FormData();

      const { images, ...rest } = mealsdata;
  
      formData.append("data", JSON.stringify(rest));
      if (images) {
        formData.append("files", images);
      }
      revalidateTag("meal",'max')
      const res = await fetch(`${api_url}/api/v1/provider/meal/${id}`, {
        method: "PUT",
        credentials: "include",
        next:{tags:["category"]},
        headers: {
          Cookie: cookieStore.toString(),
        },
        body:formData,
      });
      const data = await res.json();
      const result = data as ApiResponse<TResponseMeals>
      if (!res.ok) {
        const error =data as ApiErrorResponse
        return {
          success: error.success,
          message:error.message || "meal update failed",
        };
      }
      return { success: result.success, message:result.message|| "Meal updated successfully", data:result };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || "An error occurred while updating the meal",
      };
    }
  },
  getmealsforadmin: async (params?: any) => {
    try {
      const cookieStore = await cookies();
      const url = new URL(`${api_url}/api/v1/admin/meals`);
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, String(value));
          }
        });
      }
      const res = await fetch(url.toString(), {
        credentials: "include",
        headers: {
          Cookie: cookieStore.toString(),
        },
        next: {
          tags: ["meals","meal"],
        },
      });
      const data = await res.json();
      const result = data.data.data as TResponseMeals<{provider:TResponseproviderData<{user:TUser}>,reviews:IgetReviewData}>[]
      if (!res.ok) {
        const error = data as ApiErrorResponse;
        return {
          success: error.success,
          message: error.message || "retrieve all meals failed",
        };
      }
      return {
        success: data.success,
        message: data.message || "retrieve all meals successfully",
        data: result,
        pagination:data.data.pagination as Ipagination
      };
    } catch (error: any) {
      return {
        data: null,
        error: error.message,
        message: "someting went wrong please try again",
      };
    }
  },
};
