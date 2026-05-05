"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { CreateCategory } from "@/validations/category.schema";
import { categoryCreate } from "@/actions/category";
import { motion, AnimatePresence } from "framer-motion";

export function CreateCategoryForm() {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      image: null as File | null,
    },
    validators: {
      onSubmit: CreateCategory as any,
    },
    onSubmit: async ({ value }) => {
      setLoading(true);
      const toastId = toast.loading("Creating category...", {
        theme: "colored",
        position: "bottom-right",
      });

      try {
        const res = await categoryCreate(value as any);

        toast.dismiss(toastId);

        if (!res?.success) {
          toast.error(res?.message || "Category creation failed", {
            theme: "colored",
            position: "bottom-right",
          });
          setLoading(false);
          return;
        }

        toast.success(res.result?.message || "Category created successfully!", {
          theme: "colored",
          position: "bottom-right",
        });
        setPreview(null);
        form.reset();
      } catch (error) {
        toast.dismiss(toastId);
        toast.error("Something went wrong! Please try again.", {
          theme: "colored",
          position: "bottom-right",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="max-w-[420px] mx-auto w-full px-4">
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Card className="bg-card border border-border rounded-xl shadow-sm w-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl text-primary font-semibold">
              Create Category
            </CardTitle>
            <CardDescription className="text-muted-foreground text-base mt-1">
              Add a new category with a name and image.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              id="category-form"
              autoComplete="off"
              tabIndex={-1}
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
              className="flex flex-col gap-6"
              aria-label="Create Category Form"
            >
              <FieldGroup className="flex flex-col gap-6">
                <form.Field
                  name="name"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel
                          htmlFor={field.name}
                          className="text-sm font-medium text-foreground"
                        >
                          Category Name<span className="text-destructive ml-1">*</span>
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          autoComplete="off"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="Enter category name"
                          className="bg-input border border-border focus:ring-2 focus:ring-ring focus:border-ring text-foreground placeholder:text-muted-foreground"
                          disabled={loading}
                          required
                        />
                        <AnimatePresence>
                          {isInvalid && (
                            <motion.div
                              key="field-error"
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 6 }}
                              transition={{ duration: 0.25 }}
                            >
                              <FieldError errors={field.state.meta.errors} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="image"
                  children={(field) => (
                    <Field>
                      <FieldLabel className="text-sm font-medium text-foreground">
                        Category Image<span className="text-destructive ml-1">*</span>
                      </FieldLabel>
                      <Input
                        type="file"
                        accept="image/*"
                        aria-label="Category Image"
                        className="bg-input border border-border focus:ring-2 focus:ring-ring focus:border-ring file:mr-2 file:px-3 file:rounded-md file:bg-muted file:text-foreground"
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
                          } else {
                            field.handleChange(null);
                            setPreview(null);
                          }
                        }}
                        disabled={loading}
                        required
                      />

                      <AnimatePresence>
                        {preview && (
                          <motion.div
                            key="image-preview"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.3 }}
                            className="w-full"
                          >
                            <div className="w-full max-w-[192px] mx-auto mt-4 aspect-[4/3] rounded-lg bg-muted border border-border overflow-hidden flex items-center justify-center">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={preview}
                                alt="Category Preview"
                                className="object-cover w-full h-full rounded-lg"
                                loading="lazy"
                                draggable={false}
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Field>
                  )}
                />
              </FieldGroup>
            </form>
          </CardContent>
          <CardFooter className="flex flex-row items-center justify-end gap-4 border-t border-border pt-6">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                form.reset();
                setPreview(null);
              }}
              disabled={loading}
              className="px-4"
            >
              Reset
            </Button>
            <Button
              type="submit"
              form="category-form"
              className="px-6 font-semibold"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin border-2 border-ring border-t-transparent rounded-full" />
                  Adding...
                </span>
              ) : (
                "Add Category"
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}