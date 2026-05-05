"use client"
import { useForm } from "@tanstack/react-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea";
import { createmeals } from "@/actions/meals.action";
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { TGetCategory, TResponseCategoryData } from "@/types/category"
import { getCategory } from "@/actions/category"
import { cuisines, dietaryPreferences, IGetMealData, TCreateMealsData } from "@/types/meals.type"
import { CreateMealData } from "@/validations/meal.validations"
import { TUser } from "@/types/user.type"
export function MealsForm({data}:{data:TResponseCategoryData<{meals:IGetMealData,user:TUser}>[]}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [category, setcategory] = useState<TGetCategory[] | undefined>()
  const router = useRouter()
  const form = useForm({
    defaultValues: {
      title: "",
      deliverycharge:0,
      description: "",
      image: null as File | null,
      price: 0,
      isAvailable: true,
      dietaryPreference: 'ANY',
      category_name: "",
      cuisine: 'BANGLEDESHI',
    },
    validators: {
      onSubmit: CreateMealData as any,
    },
    onSubmit: async ({ value }:{value:TCreateMealsData}) => {
      const toastid = toast.loading("meals creating.........")
      try {
        const res = await createmeals(value)
        if (res.error || !res.data || !res.success) {
          toast.dismiss(toastid)
          toast.error(res.message)
          return;
        }
        toast.dismiss(toastid)
        toast.success("Meal created successfully! 🎉 Please wait about 10 seconds for it to appear.")
        setPreview(null)
        form.reset()
      } catch (error) {
        toast.dismiss(toastid)
        toast.error("Something went wrong, please try again.");
      }
    },
  })


  return (
    <Card className="w-full sm:max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create New Meal</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="bug-report-form"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            <form.Field
              name="title"
                 validators={{ onChange: CreateMealData.shape.title }}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>title</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="please enter your title"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />

<form.Field
              name="image"
              children={(field) => (
                <Field>
                  <FieldLabel>Image *</FieldLabel>

                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        if (file.size > 1 * 1024 * 1024) {
                          toast.error("Image size must be less than 1MB!");
                          e.target.value = "";
                          field.handleChange(null);
                          setPreview(null);
                          return;
                        }
                        field.handleChange(file);
                        setPreview(URL.createObjectURL(file));
                      }
                    }}
                  />

                  {preview && (
                    <img
                      src={preview}
                      className="h-32 rounded-md object-cover mt-2"
                    />
                  )}
                </Field>
              )}
            />

            <form.Field
              name="price"
                  validators={{ onChange: CreateMealData.shape.price as any }}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>price</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(Number(e.target.value))}
                      aria-invalid={isInvalid}
                      placeholder="please enter your price"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />

<form.Field
              name="deliverycharge"
                  validators={{ onChange: CreateMealData.shape.deliverycharge as any }}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>deliverycharge</FieldLabel>
                    <select
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(Number(e.target.value))}
                      aria-invalid={isInvalid}
                      className="border-amber-50 shadow-sm px-2 py-2.5"
                    >
                      <option value="">Select delivery charge</option>
                      <option value={0}>0</option>
                      <option value={120}>120</option>
                    </select>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
               
                  </Field>
                )
              }}
            />
            <form.Field
              name="cuisine"
                  validators={{ onChange: CreateMealData.shape.cuisine}}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>cuisine</FieldLabel>
                    <select
                      className="border-amber-50 shadow-sm px-2 py-2.5"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e:any) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                    >
                      <option value="">Select a cuisines</option>
                      {cuisines?.map((item: any, index: number) => <option value={item} key={index}>{item}</option>)}
                    </select>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />


            <form.Field
              name="category_name"
                  validators={{ onChange: CreateMealData.shape.category_name }}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Category Name</FieldLabel>

                    <select
                      className="border-amber-50 shadow-sm px-2 py-2.5"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                    >
                      <option value="">Select a category</option>
                      {data.map((item: any, index: number) => <option key={index}>{item.name}</option>)}
                    </select>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />

            <form.Field
              name="dietaryPreference"
                  validators={{ onChange: CreateMealData.shape.dietaryPreference }}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>dietaryPreference</FieldLabel>
                    <select
                      className="border-amber-50 overflow-scroll shadow-sm px-2 py-2.5"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e:any) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                    >
                      <option value="">Select a dietaryPreference</option>
                      {dietaryPreferences?.map((item: any, index: number) => <option value={item} key={index}>{item}</option>)}
                    </select>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}

            />

            <form.Field
              name="description"
                  validators={{ onChange: CreateMealData.shape.description }}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>description</FieldLabel>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="please enter your description"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />
            <form.Field
              name="isAvailable"
                  validators={{ onChange: CreateMealData.shape.isAvailable }}
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid} className="flex gap-3 items-center ">

                    <div className="flex items-center gap-2">
                      <FieldLabel htmlFor={field.name}>isAvailable</FieldLabel>
                      <input
                        type="checkbox"
                        id={field.name}
                        name={field.name}
                        checked={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(e.target.checked)
                        }
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="bug-report-form">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}