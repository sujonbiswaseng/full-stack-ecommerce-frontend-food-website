"use client";
import { useCallback, useEffect, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { TResponseOrderData } from "@/types/order/order.type";
import { useRouter } from "next/navigation";
import { useFilter } from "@/components/shared/filter/ReuseableFilter";
import { TFilterField } from "@/types/filter.types";
import { FilterPanel } from "@/components/shared/filter/FilterInput";
import { ReusableTable } from "@/components/shared/ReuseableTable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Ipagination } from "@/types/pagination.type";
import PaginationPage from "../meals/Pagination";
import { TGetCategory, TResponseCategoryData } from "@/types/category";
import { createCategoryColumns } from "./CreateCategoriesColumn";
import { toast } from "react-toastify";
import { deleteCategory } from "@/actions/category";
import ViewCategoryData from "./ViewCategory";
import Categoryupdate from "./UpdateCategoryForm";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";

const CategoryTable = ({
  pagination,
  category,
}: {
  pagination: Ipagination;
  category: TResponseCategoryData[];
}) => {
  const router = useRouter();
  const [tableData, setTableData] = useState<TResponseCategoryData[]>(category);
  const [viewData, setViewData] = useState<TResponseOrderData | null>(null);
  const { updateFilters, reset, isPending } = useFilter();
  const [open, setOpen] = useState(false);

  const [selectedcategoryid, setselectedcategoryid] = useState<string | null>(
    null
  );
  const [viewMode, setViewMode] = useState(false);
  const [status, setstatus] = useState("");
  const [form, setForm] = useState({
    name: "",
    image: "",
    createdAt: "",
    adminId: "",
    id: "",
  });

  const columns = createCategoryColumns();

  useEffect(() => {
    setTableData(category ?? []);
  }, [category]);

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
      image: "",
      createdAt: "",
      adminId: "",
      id: "",
    };
    setForm(defaultForm);
    reset();
  };

  const fields: TFilterField[] = [
    {
      type: "text",
      name: "name",
      label: "Name",
      placeholder: "Search by name",
      value: form.name,
      onChange: (val: string) => handleChange("name", val),
    },
    {
      type: "date",
      name: "createdAt",
      label: "Created At",
      placeholder: "YYYY-MM-DD",
      value: form.createdAt,
      onChange: (val: string) => handleChange("createdAt", val),
    },
    {
      type: "text",
      name: "adminId",
      label: "Admin ID",
      placeholder: "Search by admin ID",
      value: form.adminId,
      onChange: (val: string) => handleChange("adminId", val),
    },
    {
      type: "text",
      name: "id",
      label: "Category ID",
      placeholder: "Search by category ID",
      value: form.id,
      onChange: (val: string) => handleChange("id", val),
    },
  ];

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
        setselectedcategoryid(item.id);
        setViewMode(false);
        setViewData(item);
        setstatus(item.status);
        setOpen(true);
      },
    },
    {
      icon: Trash2,
      label: "Delete",
      onClick: (category: TGetCategory) => {
        handleDelete(category.id);
      },
      className: "text-destructive",
    },
  ];

  const handleDelete = useCallback(
    async (categoryId: string) => {
      try {
        if (
          !window.confirm(
            "Are you sure you want to delete this category? This action cannot be undone.",
          )
        ) {
          return;
        }
        const toastId = toast.loading("Deleting category. Please wait...");
        const resp = await deleteCategory(categoryId);
        toast.dismiss(toastId);
        if (resp.success) {
          router.refresh();
          setTableData((prev) =>
            prev.filter((category) => category.id !== categoryId),
          );
          toast.success("Category deleted successfully.");
        } else {
          toast.error(
            resp.message ||
              "Failed to delete the category. Please try again. If the issue persists, contact technical support for assistance.",
          );
        }
      } catch (error: any) {
        toast.dismiss();
        toast.error(
          "An unexpected error occurred while deleting the category. Please try again." +
            (error?.message ? ` (${error.message})` : ""),
        );
      }
    },
    [router],
  );

  return (
    <main className="w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-10 py-8">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div className="flex items-center gap-4">
          <span className="rounded-xl bg-accent p-2 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-primary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="4" width="18" height="16" rx="4" />
              <path d="M7 8h10M7 12h10M7 16h4" />
            </svg>
          </span>
          <h1 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight">
            Category Management
          </h1>
        </div>
        <Button
          className="flex gap-2"
          size="lg"
          onClick={() => router.push("/admin/dashboard/create-category")}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v8M8 12h8" />
          </svg>
          <span>Add Category</span>
        </Button>
      </header>

      <AnimatePresence>
        <motion.section
          key="filter-panel"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="mb-8 bg-card rounded-2xl border border-border shadow-sm"
        >
          <div className="p-6">
            <FilterPanel
              fields={fields}
              onApply={handleApply}
              onReset={handleReset}
              isPending={isPending}
            />
          </div>
        </motion.section>
      </AnimatePresence>

      <section className="relative w-full rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        <AnimatePresence>
          {isPending && (
            <motion.div
              key="category-table-skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm"
            >
              <Skeleton className="h-10 w-10 rounded-full mb-4" />
              <div className="w-full max-w-lg">
                <Skeleton className="h-8 w-full mb-2" />
                <Skeleton className="h-8 w-full mb-2" />
                <Skeleton className="h-8 w-full" />
              </div>
              <p className="text-sm font-medium text-muted-foreground mt-4">
                Filtering data...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="overflow-x-auto bg-card rounded-2xl">
          {tableData && Array.isArray(tableData) && tableData.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ReusableTable
                columns={columns as any}
                data={tableData}
                actions={actions}
              />
            </motion.div>
          ) : (
            <div className="p-8 text-center text-muted-foreground text-base select-none">
              No category data found.
            </div>
          )}
        </div>
      </section>

      <Dialog
        open={open}
        onOpenChange={(val) => {
          setOpen(val);
          if (!val) {
            setselectedcategoryid(null);
            setViewData(null);
          }
        }}
      >
        <DialogContent className="max-w-md w-full rounded-2xl p-0 bg-card text-card-foreground">
          <DialogHeader className="flex flex-col items-center justify-center p-6 pb-4 border-b border-border rounded-t-2xl shadow-none">
            <DialogTitle className="text-2xl font-bold text-foreground mb-2 text-center">
              {viewMode ? "Category Details" : "Edit Category"}
            </DialogTitle>
            <p
              id="dialog-description"
              className="text-base text-muted-foreground text-center"
            >
              {viewMode
                ? "Please review all the details of your selected category below."
                : "You can update the details of your selected category in the form below."}
            </p>
          </DialogHeader>

          <div className="py-6 px-4 sm:px-8" style={{ maxHeight: "70vh", overflowY: "auto" }}>
            <ViewCategoryData
              viewData={
                Array.isArray(viewData)
                  ? viewData[0]
                  : viewData ?? undefined
              }
              viewMode={viewMode}
            />
            {!viewMode && selectedcategoryid && (
              <div className="mt-6">
                <Categoryupdate categoryid={selectedcategoryid} />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <footer className="mt-8">
        <PaginationPage pagination={pagination} />
      </footer>
    </main>
  );
};

export default CategoryTable;
