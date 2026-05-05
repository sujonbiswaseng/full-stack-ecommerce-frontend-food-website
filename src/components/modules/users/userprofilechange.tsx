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
import { useRouter } from "next/navigation";
import { TUpdateuserbyAdmin } from "@/types/user.type";
import { updateuserdata } from "@/actions/user.actions";
import { motion } from "framer-motion";

export function UpdateUserForm({
  id,
  onSuccess,
  defaultValues,
}: {
  id: string;
  onSuccess: any;
  defaultValues?: Partial<TUpdateuserbyAdmin>;
}) {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      role: "",
      status: "",
      ...(defaultValues || {}),
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Updating user...");
      try {
        const filtered = Object.fromEntries(
          Object.entries(value).filter(
            ([, v]) => v !== undefined && v !== null && v !== ""
          )
        );
        const res = await updateuserdata(id, filtered);
        toast.dismiss(toastId);
        if (!res.success) {
          toast.error(
            res.message ||
              "Failed to update user. Please check your inputs and try again."
          );
          return;
        }
        router.refresh();
        onSuccess(false);
        toast.success(res.message || "User updated successfully!");
      } catch (err) {
        toast.dismiss(toastId);
        toast.error("Something went wrong");
      }
    },
  });

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="bg-card border border-border shadow-md w-full">
        <CardContent className="p-6 pt-4">
          <form
            id="update-user-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="flex flex-col gap-6"
            aria-label="Update user form"
            autoComplete="off"
          >
            <FieldGroup className="flex flex-col gap-4">
              <form.Field name="email">
                {(field) => (
                  <Field className="flex flex-col gap-2">
                    <FieldLabel htmlFor="user-email">Email</FieldLabel>
                    <input
                      id="user-email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      placeholder="name@example.com"
                      required
                      className="w-full px-4 py-2 rounded-md border border-border bg-input text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
                    />
                    <FieldError
                      errors={field.state.meta.errors}
                      className="mt-1"
                    />
                  </Field>
                )}
              </form.Field>
              <form.Field name="role">
                {(field) => (
                  <Field className="flex flex-col gap-2">
                    <FieldLabel htmlFor="user-role">Role</FieldLabel>
                    <select
                      id="user-role"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      className="w-full px-4 py-2 rounded-md border border-border bg-input text-card-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
                    >
                      <option value="">Select Role (optional)</option>
                      {["Customer", "Admin", "Provider"].map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                    <FieldError
                      errors={field.state.meta.errors}
                      className="mt-1"
                    />
                  </Field>
                )}
              </form.Field>
              <form.Field name="status">
                {(field) => (
                  <Field className="flex flex-col gap-2">
                    <FieldLabel htmlFor="user-status">Status</FieldLabel>
                    <select
                      id="user-status"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      className="w-full px-4 py-2 rounded-md border border-border bg-input text-card-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
                    >
                      <option value="">Select Status (optional)</option>
                      {["activate", "suspend"].map((s) => (
                        <option key={s} value={s}>
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </option>
                      ))}
                    </select>
                    <FieldError
                      errors={field.state.meta.errors}
                      className="mt-1"
                    />
                  </Field>
                )}
              </form.Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end gap-4 bg-card p-6 rounded-b-xl border-t border-border">
          <Button
            type="button"
            variant="secondary"
            onClick={() => form.reset()}
            className="min-w-[96px]"
          >
            Reset
          </Button>
          <Button
            type="submit"
            form="update-user-form"
            
            className="min-w-[96px]"
          >
            Update
          </Button>
        </CardFooter>
      </Card>
    </motion.section>
  );
}