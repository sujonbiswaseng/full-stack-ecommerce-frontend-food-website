"use client";
import { useStore } from "@tanstack/react-form";
import { useForm } from "@tanstack/react-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import { registerUser } from "@/services/auth.service";
import { createUserSchema } from "@/validations/auth.validation";
import { useState } from "react";
import { UserPlus, ArrowRight, RefreshCw, Home, LogIn } from "lucide-react";
import { FormInput } from "@/components/shared/FormInput";
import Link from "next/link";

export function SignupForm() {
  const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      image: null as File | null,
      phone: "",
      role: "",
      restaurantName: "",
      address: "",
      description: "",
    },
    validators: {
      onSubmit: createUserSchema as any,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating account...");
      try {
        const data = await registerUser(value as any);
        if (!data || !data.success || data.error) {
          toast.dismiss(toastId);
          toast.error(data.message || "User creation failed.");
          return;
        }

        toast.dismiss(toastId);
        toast.success(data.message || "Signup successful!");
        alert("The OTP is valid for only 10 minutes. Please check your email.");
        localStorage.removeItem("BiteBase-cart");
        router.push(`/verify-email?email=${value.email}`);
      } catch (error: any) {
        toast.dismiss(toastId);
        toast.error("Something went wrong. Please try again.");
      }
    },
  });
  const role = useStore(form.store, (state) => state.values.role);

  // -- Navigation handlers
  const handleGoHome = () => router.push("/");
  const handleGoLogin = () => router.push("/login");

  return (
    <div className="flex min-h-[85vh] items-center justify-center bg-background p-3">
      <Card className="w-full max-w-lg rounded-2xl shadow-xl border border-border bg-card">
        <CardHeader className="flex flex-col items-center pb-2 gap-1">
          <span className="rounded-full bg-primary/10 p-3 mb-1">
            <UserPlus className="text-primary w-6 h-6" />
          </span>
          <div>
                <Link
                  href="/"
                  className="
                    text-sm
                    font-medium
                    text-[var(--primary)]
                    hover:underline
                    transition-colors
                  "
                  style={{
                    transition: "color .2s",
                  }}
                >
                  ← Back to Home
                </Link>
              </div>
          <CardTitle className="font-extrabold tracking-tight text-2xl text-foreground text-center">
            Create an Account
          </CardTitle>
          <p className="text-sm text-muted-foreground font-medium mt-1 text-center">
            Join BiteBase to discover, order, or provide amazing food experiences.
          </p>
        </CardHeader>
        <CardContent>
          <form
            id="sign-up-user"
            autoComplete="off"
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Field
                validators={{ onChange: createUserSchema.shape.name }}
                name="name"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid} className="mb-1">
                      <FieldLabel htmlFor={field.name} className="text-foreground">Full Name</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="John Doe"
                        className="bg-background border-input"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} className="text-destructive text-xs mt-1" />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="email"
                validators={{ onChange: createUserSchema.shape.email }}
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid} className="mb-1">
                      <FieldLabel htmlFor={field.name} className="text-foreground">Email Address</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="email"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="you@example.com"
                        autoComplete="off"
                        className="bg-background border-input"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} className="text-destructive text-xs mt-1" />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="password"
                validators={{ onChange: createUserSchema.shape.password }}
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid} className="mb-1">
                      <FormInput
                      field={field}
                      label="Password"
                      isPassword
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Create a strong password"
                      name={field.name}
                      value={field.state.value}
                      autoComplete="new-password"
                      className="bg-background border-input"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} className="text-destructive text-xs mt-1" />
                    )}
                    </Field>
                  );
                }}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <form.Field
                  name="role"
                  validators={{ onChange: createUserSchema.shape.role }}
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name} className="text-foreground">Account Type</FieldLabel>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                        >
                          <option value="">Select a role</option>
                          <option value="Customer">Customer</option>
                          <option value="Provider">Provider</option>
                        </select>

                        {isInvalid && <FieldError errors={field.state.meta.errors} className="text-destructive text-xs mt-1" />}
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="phone"
                  validators={{ onChange: createUserSchema.shape.phone }}
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name} className="text-foreground">Phone Number</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="+880..."
                          className="bg-background border-input"
                          autoComplete="tel"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} className="text-destructive text-xs mt-1" />
                        )}
                      </Field>
                    );
                  }}
                />
              </div>

              <form.Field
                name="image"
                children={(field) => (
                  <Field>
                    <FieldLabel className="text-foreground">Profile Image *</FieldLabel>

                    <Input
                      type="file"
                      accept="image/*"
                      className="cursor-pointer file:cursor-pointer file:bg-primary file:text-primary-foreground file:border-0 file:rounded-md file:px-4 file:py-1 file:mr-4 file:font-semibold hover:file:bg-primary/90 bg-background border-input py-1"
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
                      <div className="mt-3">
                         <img
                          src={preview}
                          className="w-24 h-24 rounded-full object-cover border-2 border-primary/20 shadow-sm"
                          alt="Profile preview"
                        />
                      </div>
                    )}
                  </Field>
                )}
              />

              {role === "Provider" && (
                <div className="space-y-4 pt-4 mt-2 border-t border-border">
                  <h4 className="font-semibold text-foreground">Provider Details</h4>
                  <form.Field
                    name="restaurantName"
                    validators={{
                      onChange: createUserSchema.shape.restaurantName as any,
                    }}
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field data-invalid={isInvalid} className="mb-2">
                          <FieldLabel htmlFor={field.name} className="text-foreground">
                            Restaurant/Business Name
                          </FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            placeholder="Awesome Kitchen"
                            className="bg-background border-input"
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} className="text-destructive text-xs mt-1" />
                          )}
                        </Field>
                      );
                    }}
                  />

                  <form.Field
                    name="address"
                    validators={{
                      onChange: createUserSchema.shape.address as any,
                    }}
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field data-invalid={isInvalid} className="mb-2">
                          <FieldLabel htmlFor={field.name} className="text-foreground">Address</FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            placeholder="Full business address"
                            className="bg-background border-input"
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} className="text-destructive text-xs mt-1" />
                          )}
                        </Field>
                      );
                    }}
                  />

                  <form.Field
                    name="description"
                    validators={{
                      onChange: createUserSchema.shape.description as any,
                    }}
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name} className="text-foreground">
                            Restaurant Description
                          </FieldLabel>
                          <Textarea
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            placeholder="Briefly describe what you offer..."
                            className="bg-background border-input resize-none"
                            rows={3}
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} className="text-destructive text-xs mt-1" />
                          )}
                        </Field>
                      );
                    }}
                  />
                </div>
              )}
            </FieldGroup>

            <div className="flex justify-between gap-2 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={handleGoHome}
                className="flex items-center gap-2 font-medium text-muted-foreground hover:text-foreground"
              >
                <Home className="w-4 h-4 mr-1" /> Home
              </Button>
              <Button
                type="button"
                variant="link"
                onClick={handleGoLogin}
                className="flex items-center gap-1 text-primary font-bold"
              >
                <LogIn className="w-4 h-4 mr-1" /> Login instead
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-4 pt-4 border-t border-border mt-2">
          <Field orientation="horizontal" className="flex gap-4 w-full">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              className="w-1/3 border-border bg-background hover:bg-accent hover:text-accent-foreground"
            >
              <RefreshCw className="w-4 h-4 sm:mr-2" /> <span className="hidden sm:inline">Reset</span>
            </Button>
            <Button
              type="submit"
              form="sign-up-user"
              className="w-2/3 shadow-md font-semibold"
            >
              Create Account <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Field>
          <span className="text-xs text-muted-foreground font-medium text-center">
            By signing up, you agree to our{" "}
            <a href="#" className="font-semibold text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="font-semibold text-primary hover:underline">
              Privacy Policy
            </a>
            .
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}