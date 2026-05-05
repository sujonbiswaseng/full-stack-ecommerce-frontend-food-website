"use client";

import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { toast } from "react-toastify";
import { useState } from "react";

import Link from "next/link";
import { createAuthClient } from "better-auth/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { LoginSchema } from "@/validations/auth.validation";
import { forgotPasswordEmailOTPAction } from "@/actions/auth.actions";
import { loginUser } from "@/services/auth.service";
import { FormInput } from "@/components/shared/FormInput";

const Admin_Demo_Email = "admin123@gmail.com";
const Admin_Demo_PASSWORD = "Admin123!@#";

const Demo_User_Email = "sujonbiswasdev@gmail.com";
const Demo_User_Password = "Sujon12!@";

const cardFade = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export function SigninForm() {
  const router = useRouter();
  const [email, setemail] = useState("");

  const authClient = createAuthClient();

  const signIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  const handleForgetPassword = async (email: string) => {
    if (!email) {
      toast.error("Please enter your email first.", { theme: "dark" });
      return { success: false };
    }
    try {
      const toastId = toast.loading("Sending reset OTP...");
      const res = await forgotPasswordEmailOTPAction({ email });
      toast.dismiss(toastId);

      if (res.success) {
        toast.success(res.message || "Password reset OTP sent!", {
          theme: "dark",
        });
        alert("You have only 10 minutes to validate the OTP sent to your email.");
        return { success: true };
      } else {
        toast.error(res.message || "Failed to send OTP.", { theme: "dark" });
        return { success: false };
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong.", { theme: "dark" });
      return { success: false };
    }
  };

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: LoginSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Signing in...");
      try {
        const res = await loginUser(value);
        if (!res.success) {
          toast.dismiss(toastId);
          toast.error(res.message || "Login failed", { theme: "dark" });
          return;
        }
        router.refresh();
        toast.dismiss(toastId);
        toast.success(res.message || "User logged in successfully!", {
          theme: "dark",
        });
        router.push("/dashboard");
      } catch (error) {
        toast.dismiss(toastId);
        toast.error("Something went wrong, please try again.");
      }
    },
  });

  const fillDemoCredentials = () => {
    form.setFieldValue("email", Admin_Demo_Email);
    form.setFieldValue("password", Admin_Demo_PASSWORD);
  };

  const fillUserDemoCredentials = () => {
    form.setFieldValue("email", Demo_User_Email);
    form.setFieldValue("password", Demo_User_Password);
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="container max-w-[1440px] min-h-screen flex flex-col justify-center items-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={cardFade}
          className="w-full flex justify-center items-center"
        >
          <Card className="w-full max-w-full sm:max-w-md md:max-w-lg border border-border bg-card shadow-md rounded-2xl">
            <CardHeader className="flex flex-col items-center px-6 pt-8 pb-0 gap-4">
              <div className="w-full flex flex-row items-center justify-between mb-2">
                <Link
                  href="/"
                  className="text-sm font-semibold text-primary hover:underline focus-visible:ring-2 focus-visible:ring-ring rounded transition px-0.5 py-0.5"
                  tabIndex={0}
                >
                  ← Home
                </Link>
                <span className="sr-only">Your SaaS Logo</span>
                <Image
                  src="/logo.svg"
                  alt="Logo"
                  width={28}
                  height={28}
                  className="object-contain"
                  priority
                />
              </div>
              <CardTitle className="text-2xl font-semibold text-card-foreground leading-tight">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground font-normal">
                Sign in to your account to continue
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pt-6 pb-2 flex flex-col gap-6">
              <div className="flex gap-4 w-full">
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1 min-h-[40px] border border-border text-secondary-foreground bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors text-sm font-medium"
                  onClick={fillDemoCredentials}
                >
                  Admin Demo
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1 min-h-[40px] border border-border text-secondary-foreground bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors text-sm font-medium"
                  onClick={fillUserDemoCredentials}
                >
                  User Demo
                </Button>
              </div>

              <form
                id="signin-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  form.handleSubmit();
                }}
                className="flex flex-col gap-6"
                autoComplete="off"
                noValidate
              >
                <FieldGroup className="flex flex-col gap-4">
                  <form.Field
                    name="email"
                    validators={{ onChange: LoginSchema.shape.email }}
                  >
                    {(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field className="flex flex-col gap-2" data-invalid={isInvalid}>
                          <FieldLabel
                            htmlFor={field.name}
                            className="text-sm font-medium text-card-foreground"
                          >
                            Email address
                          </FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            type="email"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => {
                              field.handleChange(e.target.value);
                              setemail(e.target.value);
                            }}
                            placeholder="you@company.com"
                            autoComplete="off"
                            aria-invalid={isInvalid}
                            className={`bg-input border border-border ring-0 focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground rounded-md w-full min-h-[40px] px-3 transition ${isInvalid ? "border-accent ring-accent" : ""}`}
                          />
                          {isInvalid && (
                            <FieldError
                              errors={field.state.meta.errors}
                              className="mt-1 text-xs text-accent-foreground"
                            />
                          )}
                        </Field>
                      );
                    }}
                  </form.Field>
                  <form.Field
                    name="password"
                    validators={{ onChange: LoginSchema.shape.password }}
                  >
                    {(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field className="flex flex-col gap-2" data-invalid={isInvalid}>
                          <div className="flex items-center justify-between">
                            <FieldLabel
                              htmlFor={field.name}
                              className="text-sm font-medium text-card-foreground"
                            >
                              Password
                            </FieldLabel>
                            <button
                              type="button"
                              className="text-xs font-semibold text-primary hover:underline focus-visible:ring-2 focus-visible:ring-ring rounded transition"
                              aria-label="Forgot password"
                              onClick={async () => {
                                if (!email) {
                                  toast.error(
                                    "Please enter your email first.",
                                    { theme: "dark" }
                                  );
                                  return;
                                }
                                const res = await handleForgetPassword(email);
                                if (res?.success) {
                                  const encodedEmail = encodeURIComponent(email);
                                  router.push(`/reset-password?email=${encodedEmail}`);
                                }
                              }}
                            >
                              Forgot password?
                            </button>
                          </div>
                          <FormInput
                            field={field}
                            isPassword
                            className={`bg-input border border-border ring-0 focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground rounded-md w-full min-h-[40px] px-3 transition ${isInvalid ? "border-accent ring-accent" : ""}`}
                          />
                          {isInvalid && (
                            <FieldError
                              errors={field.state.meta.errors}
                              className="mt-1 text-xs text-accent-foreground"
                            />
                          )}
                        </Field>
                      );
                    }}
                  </form.Field>
                </FieldGroup>
              </form>

              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-border" aria-hidden />
                <span className="text-xs text-muted-foreground select-none">or</span>
                <div className="flex-1 h-px bg-border" aria-hidden />
              </div>

              <Button
                type="button"
                variant="ghost"
                className="w-full min-h-[40px] flex items-center justify-center gap-2 border border-border bg-card hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring transition-colors font-medium"
                onClick={signIn}
                aria-label="Sign in with Google"
              >
                <svg
                  className="h-5 w-5"
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 24 24"
                >
                  <g>
                    <circle cx="12" cy="12" r="12" fill="currentColor" className="text-input" />
                    <path
                      fill="#EA4335"
                      d="M12 10.8v3.6h5.1c-.225 1.2-1.35 3.525-5.1 3.525-3.075 0-5.625-2.55-5.625-5.625s2.55-5.625 5.625-5.625c1.755 0 2.94.75 3.615 1.425l2.46-2.4C16.62 4.05 14.55 3 12 3a8.996 8.996 0 000 18c5.175 0 8.55-3.675 8.55-8.85 0-.6-.075-1.05-.165-1.5H12z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 21c2.43 0 4.47-.81 5.94-2.19l-2.88-2.34c-.81.54-1.86.87-3.06.87-2.355 0-4.35-1.59-5.07-3.72H3.06v2.34A8.97 8.97 0 0012 21z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M6.93 13.62A5.38 5.38 0 016.6 12c0-.57.09-1.13.25-1.62v-2.34H3.06A9.02 9.02 0 003 12c0 1.41.33 2.76.93 3.96l2.88-2.34z"
                    />
                    <path
                      fill="#4285F4"
                      d="M12 6.75c1.305 0 2.47.45 3.39 1.32l2.55-2.55C16.47 3.87 14.43 3 12 3 9.24 3 6.81 4.53 5.19 6.66l2.94 2.34C8.37 8.19 10.05 6.75 12 6.75z"
                    />
                    <path fill="none" d="M3 3h18v18H3z" />
                  </g>
                </svg>
                <span>Sign in with Google</span>
              </Button>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 items-center px-6 pb-8 pt-4">
              <div className="text-sm text-center w-full">
                <span className="text-muted-foreground">Don't have an account? </span>
                <Link
                  className="text-primary font-semibold hover:underline cursor-pointer focus-visible:ring-2 focus-visible:ring-ring rounded transition"
                  href="/register"
                >
                  Sign up
                </Link>
              </div>
              <div className="flex w-full gap-4 mt-1">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => form.reset()}
                  className="flex-1 border border-border bg-card text-muted-foreground hover:text-accent-foreground hover:bg-accent transition-colors min-h-[40px]"
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  form="signin-form"
               
                  className="flex-1 min-h-[40px] text-primary-foreground"
                >
                  Submit
                </Button>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}