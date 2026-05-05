"use client";

import { useCallback, useEffect, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TResponseUserData } from "@/types/user.type";
import { Ipagination } from "@/types/pagination.type";
import { useFilter } from "@/components/shared/filter/ReuseableFilter";
import { TFilterField } from "@/types/filter.types";
import { deleteUser } from "@/actions/user.actions";
import { createUserColumns } from "./CreateUserColums";
import { FilterPanel } from "@/components/shared/filter/FilterInput";
import { ReusableTable } from "@/components/shared/ReuseableTable";
import PaginationPage from "@/components/shared/pagination";
import ViewUserData from "./ViewUserData";
import { UpdateUserForm } from "./userprofilechange";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

// Token-based container class for consistent enterprise layout
const containerClass = "max-w-[1440px] mx-auto w-full px-4 sm:px-6 md:px-8";

export default function UserTable({
  users,
  pagination,
}: {
  users: TResponseUserData<{ accounts: { password: string } }>[];
  pagination?: Ipagination;
}) {
  const [tableData, setTableData] = useState(users);
  const [open, setOpen] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [viewData, setViewData] = useState<any>(null);
  const router = useRouter();
  const { updateFilters, reset, isPending } = useFilter();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    status: "",
    phone: "",
    image: "",
    isActive: false,
    emailVerified: false,
  });

  console.log(viewData, "id");
  useEffect(() => {
    setTableData(users ?? []);
  }, [users]);

  const handleChange = useCallback(
    (key: keyof typeof form, value: string | number | boolean) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const handleApply = () => {
    updateFilters(form);
  };

  const handleReset = () => {
    const defaultForm = {
      name: "",
      email: "",
      role: "",
      status: "",
      phone: "",
      image: "",
      isActive: false,
      emailVerified: false,
    };
    setForm(defaultForm);
    reset();
  };

  const fields: TFilterField[] = [
    {
      type: "text",
      name: "name",
      label: "Name",
      value: form.name,
      onChange: (val: string) => handleChange("name", val),
    },
    {
      type: "text",
      name: "email",
      label: "Email",
      value: form.email,
      onChange: (val: string) => handleChange("email", val),
    },
    {
      type: "text",
      name: "phone",
      label: "Phone",
      value: form.phone,
      onChange: (val: string) => handleChange("phone", val),
    },
    {
      type: "select",
      name: "role",
      label: "Role",
      value: form.role,
      onChange: (val: string) => handleChange("role", val),
      options: [
        { label: "Admin", value: "Admin" },
        { label: "Customer", value: "Customer" },
        { label: "Provider", value: "Provider" },
      ],
    },
    {
      type: "select",
      name: "status",
      label: "Status",
      value: form.status,
      onChange: (val: string) => handleChange("status", val),
      options: [
        { label: "Activate", value: "activate" },
        { label: "Suspend", value: "suspend" },
      ],
    },
    {
      type: "select",
      name: "emailVerified",
      label: "Email Verified",
      value: String(form.emailVerified),
      onChange: (val: string) => handleChange("emailVerified", val),
      options: [
        { label: "No", value: "false" },
        { label: "Yes", value: "true" },
      ],
    },
    {
      type: "select",
      name: "isActive",
      label: "isActive",
      value: String(form.isActive),
      onChange: (val: string) => handleChange("isActive", val),
      options: [
        { label: "No", value: "false" },
        { label: "Yes", value: "true" },
      ],
    },
  ];

  const handleDeleteUser = useCallback(
    async (id: string) => {
      try {
        if (
          !window.confirm(
            "Are you sure you want to delete this user? This action cannot be undone.",
          )
        )
          return;
        const toastId = toast.loading("Deleting user. Please wait...");
        const resp = await deleteUser(id);
        toast.dismiss(toastId);

        if (resp.success) {
          setTableData((prev) => prev.filter((item) => item.id !== id));
          router.refresh();
          toast.success(resp.message || "Deleted successfully");
        } else {
          toast.error(
            resp.message || "Failed to delete. Please contact support.",
          );
        }
      } catch (error: any) {
        toast.dismiss();
        toast.error("Something went wrong. " + (error?.message || ""));
      }
    },
    [router],
  );

  const actions = [
    {
      icon: Eye,
      label: "View",
      onClick: (item: any) => {
        setViewData(item);
        setViewMode(true);
        setOpen(true);
      },
    },
    {
      icon: Pencil,
      label: "Edit",
      onClick: (item: any) => {
        setSelectedUserId(item.id);
        setViewMode(false);
        setOpen(true);
      },
      className: "text-primary",
    },
    {
      icon: Trash2,
      label: "Delete",
      onClick: (item: any) => handleDeleteUser(item.id),
      className: "text-destructive",
    },
  ];
  const columns = createUserColumns();

  return (
    <main className={`${containerClass} py-6`}>
      <section className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl bg-card border border-border shadow"
        >
          <div className="p-6 flex flex-col gap-6">
            <FilterPanel
              fields={fields}
              onApply={handleApply}
              onReset={handleReset}
              isPending={isPending}
            />
          </div>
        </motion.div>
      </section>

      <section className="relative mb-10">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow">
          <AnimatePresence>
            {isPending && (
              <motion.div
                className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/70 backdrop-blur transition-all"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Skeleton className="w-12 h-12 rounded-full mb-4" />
                <span className="text-muted-foreground text-base font-medium">
                  Filtering data...
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="overflow-x-auto">
            {Array.isArray(tableData) && tableData.length > 0 ? (
              <ReusableTable
                columns={columns as any}
                data={tableData}
                actions={actions}
              />
            ) : isPending ? (
              <div className="p-8 w-full flex flex-col gap-4 items-center">
                <Skeleton className="h-8 w-2/3 rounded" />
                <Skeleton className="h-8 w-1/2 rounded" />
                <Skeleton className="h-8 w-1/4 rounded" />
              </div>
            ) : (
              <div className="p-8 text-center text-muted-foreground text-base select-none">
                No users data found.
              </div>
            )}
          </div>
        </div>
      </section>

      <Dialog
        open={open}
        onOpenChange={(val) => {
          setOpen(val);
          if (!val) setViewData(null);
        }}
      >
        <DialogContent className="max-w-md w-full rounded-xl p-0 bg-card">
          <DialogHeader className="flex flex-col items-center justify-center px-6 pt-8 pb-4 border-b border-border bg-card rounded-t-xl shadow-none">
            <DialogTitle className="text-2xl font-bold text-primary mb-2 tracking-tight text-center">
              {viewMode ? "User Details" : "Edit User"}
            </DialogTitle>
            <p className="text-base text-muted-foreground mb-0 text-center">
              {viewMode
                ? "Review all user profile info below."
                : "Update status or details as needed."}
            </p>
          </DialogHeader>

          {!viewMode && !viewData && selectedUserId && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="py-6 px-6"
            >
              <UpdateUserForm
                id={selectedUserId}
                onSuccess={(updated: any) => {
                  setOpen(updated);
                  setSelectedUserId(null);
                }}
              />
            </motion.div>
          )}
          {viewData && viewMode === true ? (
            <ViewUserData
              viewData={
                Array.isArray(viewData) ? viewData[0] : (viewData ?? undefined)
              }
              viewMode={viewMode}
            />
          ) : null}
        </DialogContent>
      </Dialog>

      <footer className="flex justify-center py-6">
        <PaginationPage pagination={pagination as Ipagination} />
      </footer>
    </main>
  );
}
