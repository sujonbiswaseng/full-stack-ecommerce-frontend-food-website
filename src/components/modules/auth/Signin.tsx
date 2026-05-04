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
import { authClient } from "@/lib/authClient";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { LoginSchema } from "@/validations/auth.validation";
import { forgotPasswordEmailOTPAction, userLogin } from "@/actions/auth.actions";
import { createAuthClient } from "better-auth/react";
import { FormInput } from "@/components/shared/FormInput";
import { useState } from "react";

export function SigninForm() {
  const authClient = createAuthClient();

  const [email, setemail] = useState("");
  const signIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };
  const router = useRouter();

  const handleDemoLogin = async () => {
    const demoCredentials = {
      email: "user@foodhub.com",
      password: "user123"
    };

    const toastId = toast.loading("Signing in with demo account...");
    try {
      const loginuser = await userLogin(demoCredentials);
      if (loginuser && loginuser.success) {
        toast.update(toastId, {
          render: "Welcome to FoodHub! 🎉",
          type: "success",
          isLoading: false,
          autoClose: 2000
        });
        router.push("/");
      } else {
        toast.update(toastId, {
          render: loginuser?.message || "Demo login failed",
          type: "error",
          isLoading: false,
          autoClose: 3000
        });
      }
    } catch (error) {
      toast.update(toastId, {
        render: "Demo login failed. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000
      });
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
        const loginuser = await userLogin(value);
        if (!loginuser || !loginuser.success) {
          toast.dismiss(toastId);
          toast.error(loginuser.message || "login failed", { theme: "dark" });
          return;
        }
        localStorage.removeItem("foodhub-cart");
        toast.dismiss(toastId);
        toast.success(loginuser.message || 'User logged in successfully', { theme: "dark" });
        router.push("/profile");
      } catch (error) {
        toast.dismiss(toastId);
        toast.error("Something went wrong, please try again.");
      }
    },
  });

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

  return (
    <Card className="w-full sm:max-w-md mx-auto bg-card border-border shadow-xl">
      <CardHeader>
        <CardTitle className="mx-auto font-bold text-2xl text-card-foreground">Welcome Back</CardTitle>
        <CardDescription className="mx-auto text-muted-foreground text-center">
          Please sign in to your account to continue
        </CardDescription>
        <div className="text-xs text-primary font-medium text-center mt-3 bg-primary/10 py-2 rounded-md">
          <p>Demo: user@foodhub.com / user123</p>
        </div>
      </CardHeader>
      <CardContent>
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <FieldGroup>
            <form.Field
              validators={{ onChange: LoginSchema.shape.email }}
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid} className="mb-4">
                    <FieldLabel htmlFor={field.name} className="text-foreground">Email Address</FieldLabel>
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
                      aria-invalid={isInvalid}
                      placeholder="you@example.com"
                      autoComplete="email"
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
              validators={{ onChange: LoginSchema.shape.password }}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <div className="flex items-center justify-between mb-1">
                      <FieldLabel htmlFor={field.name} className="text-foreground mb-0">Password</FieldLabel>
                      <button
                        type="button"
                        className="text-xs text-primary hover:text-primary/80 hover:underline focus:outline-none transition-colors font-medium"
                        onClick={async () => {
                          if (!email) {
                            toast.error("Please enter your email first.", {
                              theme: "dark",
                            });
                            return;
                          }
                          const res = await handleForgetPassword(email);
                          if (res?.success) {
                            const encodedEmail = encodeURIComponent(email);
                            router.push(`/reset-password?email=${encodedEmail}`);
                          }
                        }}
                        tabIndex={0}
                      >
                        Forgot password?
                      </button>
                    </div>
                    <FormInput
                      field={field}
                      label=""
                      isPassword
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Enter your password"
                      name={field.name}
                      value={field.state.value}
                      autoComplete="current-password"
                      className="bg-background border-input"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} className="text-destructive text-xs mt-1" />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <div className="flex flex-col gap-3 px-6 mt-2">
        <Button
          onClick={() => signIn()}
          variant="outline"
          type="button"
          className="w-full bg-background hover:bg-accent hover:text-accent-foreground"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </Button>
        <Button
          onClick={handleDemoLogin}
          type="button"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
        >
          🚀 Try Demo Account
        </Button>
        <Button
          onClick={()=>router.push("/register")}
          variant="outline"
          type="button"
          className="w-full border-primary text-primary hover:bg-primary/10"
        >
          Create an Account
        </Button>
      </div>

      <CardFooter className="flex flex-col gap-4 mt-6 border-t border-border pt-6 pb-6">
        <Field orientation="horizontal" className="w-full gap-3">
          <Button type="button" variant="ghost" onClick={() => form.reset()} className="w-1/2 hover:bg-accent">
            Reset
          </Button>
          <Button type="submit" form="login-form" className="w-1/2 shadow-md">
            Sign In
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
