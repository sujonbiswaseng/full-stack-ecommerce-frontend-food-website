import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({

  server: {
    BACKEND_URL: z.url(),
    FRONTEND_URL: z.string().min(1),
    AUTH_URL:z.string(),
    API_URL:z.string(),
    ACCESS_TOKEN_SECRET:z.string(),
    REFRESH_TOKEN_SECRET:z.string()
  },
  client: {
    NEXT_PUBLIC_test: z.string().min(1),
  },
  runtimeEnv: {
    BACKEND_URL: process.env.BACKEND_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
    AUTH_URL: process.env.AUTH_URL,
    API_URL:process.env.API_URL,
    NEXT_PUBLIC_test:process.env.NEXT_PUBLIC_test,
    ACCESS_TOKEN_SECRET:process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET:process.env.REFRESH_TOKEN_SECRET
  },
});