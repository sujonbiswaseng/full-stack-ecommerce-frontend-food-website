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
  const [preview, setPreview] = useState<string[]>([]);
  const [category, setcategory] = useState<TGetCategory[] | undefined>()
  const router = useRouter()
  const form = useForm({
    defaultValues: {
      title: "",
      deliverycharge:0,
      date: "",
      location: "",
      description: "",
      images: [] as File[],
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
        setPreview([])
        // form.reset()
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
                   
                    <div className="flex gap-1">
                       <FieldLabel htmlFor={field.name}>title</FieldLabel>
                    <span style={{ color: "red" }}>*</span>
                    </div>
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
              name="images"
              validators={{ onChange: CreateMealData.shape.images as any }}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <div className="flex gap-2">
                      <FieldLabel>Event Images (Max 3)</FieldLabel>{" "}
                      <span style={{ color: "red" }}>*</span>
                    </div>

                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);

                        if (!files.length) return;

                        if (files.length > 3) {
                          toast.error("Maximum 3 images allowed");
                          return;
                        }

                        const oversized = files.find(
                          (file) => file.size > 6 * 1024 * 1024,
                        );

                        if (oversized) {
                          toast.error("Each image must be less than 6MB");
                          return;
                        }

                        field.handleChange(files);

                        const urls = files.map((file) =>
                          URL.createObjectURL(file),
                        );

                        setPreview(urls);
                      }}
                    />

                    {preview.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                        {preview.map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt="preview"
                            className="h-28 w-full rounded-md object-cover border"
                          />
                        ))}
                      </div>
                    )}

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            <form.Field
              name="price"
                  validators={{ onChange: CreateMealData.shape.price as any }}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                   
                    <div className="flex gap-1">
                       <FieldLabel htmlFor={field.name}>price</FieldLabel>
                    <span style={{ color: "red" }}>*</span>
                    </div>
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
              name="location"
              validators={{ onChange: CreateMealData.shape.location }}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      location <span style={{ color: "red" }}>*</span>
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value ?? ""}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Enter the event venue"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
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
                   
                    <div className="flex gap-1">
                       <FieldLabel htmlFor={field.name}>deliverycharge</FieldLabel>
                    <span style={{ color: "red" }}>*</span>
                    </div>
                    <select
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(Number(e.target.value))}
                      aria-invalid={isInvalid}
                      className={`
                        w-full
                        bg-background
                        text-foreground
                        border
                        border-border
                        rounded-lg
                        px-4
                        py-3
                        focus:outline-none
                        focus:ring-2
                        focus:ring-ring
                        shadow-md
                        transition
                        duration-200
                        appearance-none
                        ${isInvalid ? 'border-destructive ring-destructive' : ''}
                      `}
                      style={{
                        minHeight: "48px",
                        fontSize: "1rem",
                        fontWeight: 500,
                      }}
                    >
                      <option value="">Select delivery charge</option>
                      <option className="text-foreground"
                            style={{
                              backgroundColor: "#23272b", // fallback for dark bg
                              color: "#f5f6fa", // visible on dark
                              padding: "8px 12px",
                            }} value={0}>0</option>
                      <option className="text-foreground"
                            style={{
                              backgroundColor: "#23272b", // fallback for dark bg
                              color: "#f5f6fa", // visible on dark
                              padding: "8px 12px",
                            }} value={120}>120</option>
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
                    
                    <div className="flex gap-1">
<FieldLabel htmlFor={field.name}>cuisine</FieldLabel>
                    <span style={{ color: "red" }}>*</span>
                    </div>
                    <select
                       className={`
                        w-full
                        bg-background
                        text-foreground
                        border
                        border-border
                        rounded-lg
                        px-4
                        py-3
                        focus:outline-none
                        focus:ring-2
                        focus:ring-ring
                        shadow-md
                        transition
                        duration-200
                        appearance-none
                        ${isInvalid ? 'border-destructive ring-destructive' : ''}
                      `}
                      style={{
                        minHeight: "48px",
                        fontSize: "1rem",
                        fontWeight: 500,
                      }}
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e:any) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                    >
                      <option value="">Select a cuisines</option>
                      {cuisines?.map((item: any, index: number) => <option className="text-foreground"
                            style={{
                              backgroundColor: "#23272b", // fallback for dark bg
                              color: "#f5f6fa", // visible on dark
                              padding: "8px 12px",
                            }}>{item}</option>)}
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
                  
                    <div className="flex gap-1">
                        <FieldLabel htmlFor={field.name}>Category Name</FieldLabel>
                    <span style={{ color: "red" }}>*</span>
                    </div>

                    <div className="relative">
                      <select
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        aria-describedby={isInvalid ? `${field.name}-error` : undefined}
                        className={`
                          w-full
                          bg-background
                          text-foreground
                          border
                          border-border
                          rounded-lg
                          px-4
                          py-3
                          focus:outline-none
                          focus:ring-2
                          focus:ring-ring
                          shadow-md
                          transition
                          duration-200
                          appearance-none
                          ${isInvalid ? 'border-destructive ring-destructive' : ''}
                        `}
                        style={{
                          minHeight: "48px",
                          fontSize: "1rem",
                          fontWeight: 500,
                        }}
                      >
                        <option value="" className="text-muted-foreground">
                          Select a category
                        </option>
                        {data.map((item: any, index: number) => (
                          <option
                            key={index}
                            value={item.name}
                            className="text-foreground"
                            style={{
                              backgroundColor: "#23272b", // fallback for dark bg
                              color: "#f5f6fa", // visible on dark
                              padding: "8px 12px",
                            }}
                          >
                            {item.name}
                          </option>
                        ))}
                      </select>
                 
                      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <svg width="20" height="20" fill="none" aria-hidden="true">
                          <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
               
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />


<form.Field
              name="date"
              validators={{ onChange: CreateMealData.shape.date }}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Date <span style={{ color: "red" }}>*</span>
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="date"
                      value={field.state.value ?? ""}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Select the event date"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
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
                   
                    <div className="flex gap-1">
                       <FieldLabel htmlFor={field.name}>dietaryPreference</FieldLabel>
                    <span style={{ color: "red" }}>*</span>
                    </div>
                    
                    <select
                       className={`
                        w-full
                        bg-background
                        text-foreground
                        border
                        border-border
                        rounded-lg
                        px-4
                        py-3
                        focus:outline-none
                        focus:ring-2
                        focus:ring-ring
                        shadow-md
                        transition
                        duration-200
                        appearance-none
                        ${isInvalid ? 'border-destructive ring-destructive' : ''}
                      `}
                      style={{
                        minHeight: "48px",
                        fontSize: "1rem",
                        fontWeight: 500,
                      }}
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e:any) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                    >
                      <option value="">Select a dietaryPreference</option>
                      {dietaryPreferences?.map((item: any, index: number) => <option  key={index}
                          
                            className="text-foreground"
                            style={{
                              backgroundColor: "#23272b", // fallback for dark bg
                              color: "#f5f6fa", // visible on dark
                              padding: "8px 12px",
                            }}  value={item} >{item}</option>)}
                    </select>
                  <div className="text-[10px]">
                  {isInvalid && (
                      <p className="text-destructive text-red-500"> This field is required</p>
                 
                    )}
                  </div>
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