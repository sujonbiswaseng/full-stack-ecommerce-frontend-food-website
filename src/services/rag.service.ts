import { env } from "@/env";
import { ApiErrorResponse } from "@/types/response.type";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const API_BASE_URL = env.BACKEND_URL;
if (!API_BASE_URL) {
  throw new Error("API_BASE_URL is not defined. Please set NEXT_PUBLIC_API_BASE_URL in your environment variables.");
}

export const RagService = {

    Ingestmeals: async () => {
        const storeCookies = await cookies();
        try {
          const response = await fetch(`${API_BASE_URL}/api/v1/rag/ingest-meals`, {
            credentials:"include",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Cookie: storeCookies.toString(),
            },
          });
          const body = await response.json();
          if (!response.ok) {
            const error = body as ApiErrorResponse;
            return {
              success: false,
              message: error.message,
            };
          }
          return {
            success: true,
            message: body.message || "ingest meals successfully",
            data: body.data,
          };
        } catch (error) {
          return { success: false, message: "Something went wrong. Please try again." };
        }
      },
      Query: async (prompt:string) => {
        const storeCookies = await cookies();
        try {
          const response = await fetch(`${API_BASE_URL}/api/v1/rag/query`, {
            credentials:"include",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Cookie: storeCookies.toString(),
            },
            body:JSON.stringify({query:prompt})
          });
          const body = await response.json();
          if (!response.ok) {
            const error = body as ApiErrorResponse;
            return {
              success: false,
              message: error.message,
            };
          }
          return {
            success: true,
            message: body.message || "query successfully",
            data: body.data.answer.meal,
          };
        } catch (error) {
          return { success: false, message: "Something went wrong. Please try again." };
        }
      },


}