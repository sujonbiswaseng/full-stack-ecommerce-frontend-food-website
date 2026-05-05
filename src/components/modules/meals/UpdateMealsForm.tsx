"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field";
import { UpdatemealData } from "@/validations/meal.validations";
import { updateMeal } from "@/actions/meals.action";
import { UpdateMealsData } from "@/types/meals.type";


export function UpdateMealsForm({
  id,
  onSuccess,
  initialData,
}: {
  id: string;
  onSuccess: (updated: any) => void;
  initialData: UpdateMealsData;
}) {
  const form = useForm({
    defaultValues: {
      title: initialData.title || "",
      description: initialData.description || "",
      image: initialData.image || "",
      price: initialData.price ?? "",
      isAvailable: initialData.isAvailable ?? true,
      category_name: initialData.category_name || "",
      cuisine: initialData.cuisine || "",
      dietaryPreference: initialData.dietaryPreference || "",
    },
    validators: { onSubmit: UpdatemealData as any },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Updating meal data... Please wait.");
      try {
        const res = await updateMeal(id, value as UpdateMealsData);
        toast.dismiss(toastId);
        if (!res.success) {
          toast.error(res.message || "Failed to update meal. Please check your inputs and try again.");
          return;
        }
        toast.success(res.message || "Meal updated successfully!");
        onSuccess(res.data);
      } catch (err) {
        toast.dismiss(toastId);
        toast.error("Something went wrong");
      }
    },
  });

  // For select options based on enums in UpdatemealData
  const cuisineOptions = [
    "BANGLEDESHI", "ITALIAN", "CHINESE", "INDIAN", "MEXICAN",
    "THAI", "JAPANESE", "FRENCH", "MEDITERRANEAN",
    "AMERICAN", "MIDDLE_EASTERN"
  ];
  const dietaryOptions = [
    "HALAL", "VEGAN", "VEGETARIAN", "ANY", "GLUTEN_FREE",
    "KETO", "PALEO", "DAIRY_FREE", "NUT_FREE", "LOW_SUGAR"
  ];

  return (
    <Card className="w-full max-w-md mx-auto border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-center">Update Meal</CardTitle>
        <CardDescription className="text-center">Edit the information for this meal</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="update-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="title"
              validators={{ onChange: UpdatemealData.shape.title as any }}
            >
              {(field) => (
                <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                  <FieldLabel>Meal Name</FieldLabel>
                  <input
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="w-full border rounded p-2"
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>
      

            <form.Field
              name="price"
              validators={{ onChange: UpdatemealData.shape.price as any }}
            >
              {(field) => (
                <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                  <FieldLabel>Price (৳)</FieldLabel>
                  <input
                    type="number"
                    value={field.state.value}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.handleChange(value === "" ? "" : Number(value));
                    }}
                    onBlur={field.handleBlur}
                    className="w-full border rounded p-2"
                    min={1}
                    max={1000}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>
            <form.Field
              name="isAvailable"
              validators={{ onChange: UpdatemealData.shape.isAvailable as any }}
            >
              {(field) => (
                <Field>
                  <FieldLabel>Available</FieldLabel>
                  <select
                    value={field.state.value ? "true" : "false"}
                    onChange={(e) => field.handleChange(e.target.value === "true")}
                    onBlur={field.handleBlur}
                    className="w-full border rounded p-2"
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>
            <form.Field
              name="category_name"
              validators={{ onChange: UpdatemealData.shape.category_name as any }}
            >
              {(field) => (
                <Field>
                  <FieldLabel>Category</FieldLabel>
                  <input
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="w-full border rounded p-2"
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>
            <form.Field
              name="cuisine"
              validators={{ onChange: UpdatemealData.shape.cuisine as any }}
            >
              {(field) => (
                <Field>
                  <FieldLabel>Cuisine</FieldLabel>
                  <select
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="w-full border rounded p-2"
                  >
                    <option value="">Select Cuisine</option>
                    {cuisineOptions.map((cuisine) => (
                      <option key={cuisine} value={cuisine}>
                        {cuisine}
                      </option>
                    ))}
                  </select>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>
            <form.Field
              name="dietaryPreference"
              validators={{ onChange: UpdatemealData.shape.dietaryPreference as any }}
            >
              {(field) => (
                <Field>
                  <FieldLabel>Dietary Preference</FieldLabel>
                  <select
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="w-full border rounded p-2"
                  >
                    <option value="">Select Dietary Preference</option>
                    {dietaryOptions.map((diet) => (
                      <option key={diet} value={diet}>
                        {diet}
                      </option>
                    ))}
                  </select>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Reset
        </Button>
        <Button type="submit" form="update-form">
          Update
        </Button>
      </CardFooter>
    </Card>
  );
}