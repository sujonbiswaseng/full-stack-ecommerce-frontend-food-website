'use server'

import { RagService } from "@/services/rag.service";

export const Ingestmeals = async () => {
  const response = await RagService.Ingestmeals();
  return response;
};

export const QueryMeals = async (query: string) => {
  const response = await RagService.Query(query);
  return response;
};