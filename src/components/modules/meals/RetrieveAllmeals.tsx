"use client";

import { useCallback, useEffect, useState } from "react";
import { Ipagination } from "@/types/pagination.type";
import {
  cuisines,
  dietaryPreferences,
  TResponseMeals,
} from "@/types/meals.type";
import { useFilter } from "@/components/shared/filter/ReuseableFilter";
import { TFilterField } from "@/types/filter.types";
import { FilterPanel } from "@/components/shared/filter/FilterInput";
import PaginationPage from "./Pagination";
import MealCard from "./MealCard";
import MealCardSkeleton from "../../Skeleton/MealCardSkeleton";
import { TResponseproviderData } from "@/types/provider.type";
import { TResponseCategoryData } from "@/types/category";
import { TUser } from "@/types/user.type";
import { motion, AnimatePresence } from "framer-motion";
import Notfounddata from "@/components/Notfounddata";

export default function RetrieveAllmeals({
  categories,
  initialMeals,
  pagination,
}: {
  categories: TResponseCategoryData<{ user: TUser }>[];
  initialMeals: TResponseMeals<{ provider: TResponseproviderData }>[];
  pagination: Ipagination;
}) {
  const { updateFilters, reset, isPending } = useFilter();
  const [isLoading, setIsLoading] = useState(true);

  const [mealsData, setMealsData] =useState<TResponseMeals<{ provider: TResponseproviderData }>[]>();

  useEffect(() => {
    if (categories.length > 0) {
      setMealsData(initialMeals  || []);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [categories]);

  const [form, setForm] = useState({
    search: "",
    cuisine: "",
    category_name: "",
    isAvailable: true,
    price: null,
    dietaryPreference: "",
  });

  const handleChange = useCallback(
    (key: keyof typeof form, value: string | number | boolean) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const handleApply = () => updateFilters(form);

  const handleReset = () => {
    setForm({
      search: "",
      cuisine: "",
      category_name: "",
      isAvailable: true,
      price: null,
      dietaryPreference: "",
    });
    reset();
  };

  const fields: TFilterField[] = [
    {
      type: "text",
      name: "search",
      value: form.search,
      placeholder: "Search meal name...",
      label: "search",
      onChange: (val) => handleChange("search", val),
    },
    {
      type: "select",
      name: "cuisine",
      value: form.cuisine,
      placeholder: "Cuisine...",
      label: "cuisine",
      onChange: (val) => handleChange("cuisine", val),
      options: cuisines.map((v) => ({ label: v, value: v })),
    },
    {
      type: "select",
      name: "category_name",
      label: "category_name",
      value: form.category_name,
      onChange: (val) => handleChange("category_name", val),
      options: categories.map((v) => ({ label: v.name, value: v.name })),
    },
    {
      type: "select",
      name: "isAvailable",
      label: "isAvailable",
      value: String(form.isAvailable),
      onChange: (val: string) => handleChange("isAvailable", val),
      options: [
        { label: "Yes", value: "true" },
        { label: "No", value: "false" },
      ],
    },
    {
      type: "number",
      name: "price",
      label: "Price",
      value: form.price as any,
      onChange: (val) => handleChange("price", val),
    },
    {
      type: "select",
      name: "dietaryPreference",
      value: form.dietaryPreference,
      placeholder: "e.g. Gluten Free",
      label: "dietaryPreference",
      onChange: (val) => handleChange("dietaryPreference", val),
      options: dietaryPreferences.map((v) => ({ label: v, value: v })),
    },
  ];

  return (
    <section className="w-full bg-background min-h-screen">
      <div className="container max-w-[1440px] mx-auto w-full p-6">
        <header className="text-center mb-8 mt-8">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight"
          >
            Bitebase — Smart Food Ordering Platform
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-muted-foreground mt-3 max-w-2xl mx-auto text-base md:text-lg"
          >
            Bitebase connects you with nearby restaurants and home chefs,
            offering a fast, smart, and seamless food ordering experience
            powered by modern technology.
          </motion.p>
        </header>
   

        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="mb-8 w-full flex justify-center"
        >
          <div className="w-full max-w-5xl bg-card border border-border rounded-xl shadow-sm p-6">
            <FilterPanel
              fields={fields}
              onApply={handleApply}
              onReset={handleReset}
              isPending={isPending}
            />
          </div>
        </motion.section>

        <div className="relative">
          <AnimatePresence>
            {isPending && (
              <motion.div
                key="filter-loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm rounded-xl"
                aria-busy="true"
                aria-live="polite"
              >
                <span className="relative flex h-14 w-14 mb-2">
                  <span className="absolute inset-0 animate-spin rounded-full border-4 border-t-primary border-b-accent border-l-transparent border-r-transparent bg-background" />
                </span>
                <span className="font-medium text-muted-foreground">
                  Filtering data...
                </span>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div
            key="meals-grid"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              xl:grid-cols-4
              gap-4
              mt-6
              min-h-[200px]
              "
          >
            {mealsData == undefined || mealsData === null ? (
              <Notfounddata
                content="No meals found. Try adjusting your filters or check back later!"
                emoji="🍽️"
              />
            ) : null}
      
       
            {isPending || isLoading
              ? Array.from({ length: initialMeals.length || 8 }).map((_, i) => (
                  <MealCardSkeleton key={i} />
                ))
              : mealsData?.map((meal) => {
                  return (
                    <MealCard
                      key={meal.id}
                      meal={
                        meal as TResponseMeals<{
                          provider: TResponseproviderData;
                        }>
                      }
                    />
                  );
                })}
          </motion.div>
        </div>
        <div className="mt-8 flex justify-center">
          <PaginationPage pagination={pagination} />
        </div>
      </div>
    </section>
  );
}
