import { revalidateTag } from 'next/cache';
import { env } from "@/env"
import { cookies } from "next/headers"
import { TResponseUserData, TUpdateuserbyAdmin, TUpdateUserInput, TUser } from '@/types/user.type';
import { ApiErrorResponse, ApiResponse } from '@/types/response.type';
import { IProviderInfo } from '@/types/provider.type';
import { Ipagination } from '@/types/pagination.type';

const api_url=env.BACKEND_URL

export const userService={
    updateUser:async(updateUser:TUpdateUserInput)=>{  
  try {
    const cookieStore = await cookies()
    const res = await fetch(`${api_url}/api/v1/user/profile/update`, {
      method: "PUT",
      credentials:"include",
      cache:"no-store",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(updateUser),
    });
    revalidateTag("user",'max')
    const data= await res.json();
    const result =data as ApiResponse<TUser> 
    if (!res.ok) {
      const error=data as ApiErrorResponse
       return { message: error.message || "An error occurred while updating" }
    }
    return { success: true, message: "user updated successfully", result };
  } catch (error: any) {
  
    return { success: false, error: error.message || "An error occurred while updating" };
  }
    },
     DeleteUserown: async () => {
            try {
                const cookieStore = await cookies()
                const res = await fetch(`${api_url}/api/v1/user/profile/own`, {
                    method:"DELETE",
                    credentials: "include",
                    headers: {
                        Cookie: cookieStore.toString()
                    },
                })
                revalidateTag("user",'max')
                const body = await res.json()
                const result = body as ApiResponse<TUser>
                if(!res.ok){
                  const error= body as ApiErrorResponse
                  return {
                    message:error.message || "user deleted successfully"
                  }
                }
             return {result,message: result.message||"user deleted successfully"}
            } catch (error: any) {
                return {
                    data: null,
                    error: error.message
                }
            }
    
        },

        updateUserByADmin: async (id: string, body: Partial<TUpdateuserbyAdmin>) => {
          try {
            const cookieStore = await cookies();
            const res = await fetch(`${api_url}/api/v1/admin/profile/${id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString()
              },
              credentials: "include",
              body: JSON.stringify(body)
            });
            const data = await res.json();
            revalidateTag("user",'max')
            if (!res.ok) {
              return { success: false, message: data?.message || "Failed to update user", errors: data?.errors };
            }
            return { success: data.success, message: data.message || "User updated successfully", user: data.data };
          } catch (error: any) {
            return { success: false, message: error.message || "An error occurred while updating user" };
          }
        },
        getAllusers: async (params?: any) => {
          try {
            const cookieStore = await cookies();
            const url = new URL(`${api_url}/api/v1/admin/users`);
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
                tags: ["user",'users'],
              },
            });
            const data = await res.json();
            if (!res.ok) {
              const error = data as ApiErrorResponse;
              return {
                success: error.success,
                message: error.message || "retrieve all users successfully",
              };
            }
            return {success:data.success,message:data.message,data:data.data.data as TResponseUserData<{ accounts: { password: string; }}>[],pagination:data.data.pagination as Ipagination};
          } catch (error: any) {
            return {
              data: null,
              error: error.message,
              message: "someting went wrong please try again",
            };
          }
        },
        getuserbyid: async (id: string) => {
          try {
            const cookieStore = await cookies();
            const res = await fetch(`${api_url}/api/v1/user/profile/${id}`, {
              credentials: "include",
              headers: {
                Cookie: cookieStore.toString(),
              },
              next: {
                tags: ["user"],
              },
            });
            const body = await res.json();
            const result = body as ApiResponse<TUser>;
            if (!res.ok) {
              const error = body as ApiErrorResponse;
              return {
                success: error.success,
                message: error.message || "retrieve single user failed",
              };
            }
            return result;
          } catch (error: any) {
            return {
              data: null,
              error: error.message,
            };
          }
        },
        DeleteUser: async (id: string) => {
          try {
            const cookieStore = await cookies();
            const res = await fetch(`${api_url}/api/v1/user/profile/${id}`, {
              method: "DELETE",
              credentials: "include",
              headers: {
                Cookie: cookieStore.toString(),
              }
            });
            revalidateTag("user",'max')
            const body = await res.json();
                const result = body as ApiResponse<TUser>;
                      if (!res.ok) {
                          const error = body as ApiErrorResponse
                        return { success:error.success,message:error.message || "user deleted failed"};
                      }
                      return result;
          } catch (error: any) {
            return {
              data: null,
              error: error.message,
            };
          }
        },
    

}