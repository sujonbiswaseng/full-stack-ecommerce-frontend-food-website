"use client";

import { updateMeal } from "@/actions/meals.action";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";
import { Label } from "../../ui/label";
import {
  cuisines,
  dietaryPreferences,
  UpdateMealsData,
} from "@/types/meals.type";
import { UpdatemealData } from "@/validations/meal.validations";
import { Input } from "@/components/ui/input";

const UpdateMeal = ({ mealId }: { mealId: string }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [mealData, setMealData] = useState<UpdateMealsData>({});
  const parsedata = UpdatemealData.safeParse(mealData);
  const [loading, setLoading] = useState(false);

  const handleInput = (field: keyof UpdateMealsData, value: any) =>
    setMealData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!parsedata.success) {
      toast.error(
        parsedata.error.issues[0]?.message || "Please check the fields",
      );
      return;
    }
    setLoading(true);
    const data = await updateMeal(mealId, parsedata.data!);
    setLoading(false);
    if (!data) {
      toast.error("Failed to update meal");
    } else {
      toast.success("Meal updated successfully");
      setMealData({});
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-2 py-8 bg-gradient-to-tr from-green-50 to-blue-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white dark:bg-gray-950 rounded-2xl shadow-xl p-6 md:p-10 space-y-7 transition"
        autoComplete="off"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center text-indigo-900 dark:text-indigo-100 mb-4">
          Update Meal
        </h2>

        {/* Name & Price Row */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex flex-col gap-1.5">
            <Label htmlFor="mealName" className="font-medium">
              Meal Name
            </Label>
            <input
              id="mealName"
              type="text"
              placeholder="Meal name"
              value={mealData.title ?? ""}
              onChange={(e) => handleInput("title", e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-800 p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition"
              autoComplete="off"
            />
          </div>
          <div className="flex-1 flex flex-col gap-1.5">
            <Label htmlFor="price" className="font-medium">
              Price (৳)
            </Label>
            <input
              id="price"
              type="number"
              step="0.01"
              placeholder="Price"
              value={mealData.price ?? ""}
              onChange={(e) => {
                setMealData((prev)=>({...prev,price:Number(e.target.value)}))
              }
              }
              className="w-full border border-gray-300 dark:border-gray-800 p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition"
              autoComplete="off"
            />
            {parsedata.error?.issues.find((i) => i.path[0] === "price") && (
              <span className="text-xs text-red-600 block">
                {
                  parsedata.error.issues.find((i) => i.path[0] === "price")
                    ?.message
                }
              </span>
            )}
          </div>
        </div>

        {/* Image URL Field */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="image" className="font-medium">
            Image (optional)
          </Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                if (file.size > 1 * 1024 * 1024) {
                  toast.error("Image size must be less than 1MB!");
                  e.target.value = "";
                  setMealData((prev: UpdateMealsData) => ({
                    ...prev,
                    image: undefined,
                  }));
                  setPreview(null);
                  return;
                }
                setMealData((prev: UpdateMealsData) => ({
                  ...prev,
                  image: file,
                }));
                setPreview(URL.createObjectURL(file));
              } else {
                // If file cleared, set as undefined (optional)
                setMealData((prev: UpdateMealsData) => ({
                  ...prev,
                  image: undefined,
                }));
                setPreview(null);
              }
            }}
          />
          {/* Optional note for user */}
          <span className="text-xs text-gray-500">Image is optional. If not selected, existing image will remain.</span>
 

          {parsedata.error?.issues.find((i) => i.path[0] === "image") && (
            <span className="text-xs text-red-600 block">
              {
                parsedata.error.issues.find((i) => i.path[0] === "image")
                  ?.message
              }
            </span>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="description" className="font-medium">
            Description
          </Label>
          <textarea
            id="description"
            rows={3}
            placeholder="Describe this meal"
            value={mealData.description ?? ""}
            onChange={(e) => handleInput("description", e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-800 p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition resize-none"
            autoComplete="off"
          />
        </div>

        {/* Dropdowns: Cuisine / Dietary */}
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1 flex flex-col gap-1.5">
            <Label htmlFor="cuisine" className="font-medium">
              Cuisine
            </Label>
            <select
              id="cuisine"
              value={mealData.cuisine ?? ""}
              onChange={(e) =>
                handleInput(
                  "cuisine",
                  (e.target.value as (typeof cuisines)[number]) || undefined,
                )
              }
              className="w-full border border-gray-300 dark:border-gray-800 p-3 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition"
            >
              <option value="">Select a cuisine</option>
              {cuisines.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 flex flex-col gap-1.5">
            <Label htmlFor="dietaryPreference" className="font-medium">
              Dietary Preference
            </Label>
            <select
              id="dietaryPreference"
              value={mealData.dietaryPreference ?? ""}
              onChange={(e) =>
                handleInput(
                  "dietaryPreference",
                  (e.target.value as (typeof dietaryPreferences)[number]) ||
                    undefined,
                )
              }
              className="w-full border border-gray-300 dark:border-gray-800 p-3 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition"
            >
              <option value="">Select dietary preference</option>
              {dietaryPreferences.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Availability Switch */}
        <div className="flex items-center gap-3 mt-1">
          <input
            id="isAvailable"
            type="checkbox"
            checked={!!mealData.isAvailable}
            onChange={(e) => handleInput("isAvailable", e.target.checked)}
            className="accent-green-500 w-5 h-5 rounded"
          />
          <Label htmlFor="isAvailable" className="font-medium select-none">
            Available
          </Label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-5 py-3 rounded-lg font-semibold bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-lg hover:from-green-600 hover:to-blue-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateMeal;
