"use client";
import { useCallback, useEffect, useState } from "react";
import { BadgePlus, Eye, Pencil, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { DeleteMeals } from "@/actions/meals.action";
import {
  cuisines,
  dietaryPreferences,
  TResponseMeals,
} from "@/types/meals.type";
import { useFilter } from "@/components/shared/filter/ReuseableFilter";
import { IgetReviewData } from "@/types/reviews.type";
import { IProviderInfo } from "@/types/provider.type";
import {
  TGetCategory,
  TResponseCategoryData,
} from "@/types/category";
import { createMyMealColumns } from "./CreatemymealColumns";
import { TFilterField } from "@/types/filter.types";
import { FilterPanel } from "@/components/shared/filter/FilterInput";
import { ReusableTable } from "@/components/shared/ReuseableTable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ViewMealsData from "./ViewMealsData";
import { TUser } from "@/types/user.type";
import UpdateMeal from "./updateMeals";
import { Ipagination } from "@/types/pagination.type";
import PaginationPage from "./Pagination";
import AdminMealsUpdate from "./AdminUpdateMeals";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";

const MealTable = ({
  role,
  pagination,
  categories,
  initialmeals,
}: {
  role?: string;
  pagination: Ipagination;
  categories: TResponseCategoryData<{ user: TUser }>[];
  initialmeals: TResponseMeals<{
    category: TGetCategory;
    provider: IProviderInfo;
    reviews: IgetReviewData;
  }>[];
}) => {
  const router = useRouter();
  const [meals, setMeals] = useState(initialmeals);
  const [tableData, setTableData] = useState(initialmeals);
  const [viewData, setViewData] = useState<typeof tableData | null>(null);
  const { updateFilters, reset, isPending } = useFilter();
  const [open, setOpen] = useState(false);
  const [selectedmealid, setSelectedmealId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState(false);

  const [form, setForm] = useState({
    search: "",
    status: "",
    isAvailable: "",
    category_name: "",
    cuisine: "",
    price: null,
    dietaryPreference: "",
  });

  const columns = createMyMealColumns();

  useEffect(() => {
    setTableData(initialmeals ?? []);
  }, [initialmeals]);

  const handleDelete = async (id: string) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this meal?"
      )
    )
      return;

    try {
      const toastId = toast.loading("Deleting meal...");
      const res = await DeleteMeals(id);
      if (!res.data || !res.success) {
        toast.dismiss(toastId);
        toast.error(res.message || "Failed to delete meal.");
        return;
      }
      setMeals((prev) => prev.filter((meal) => meal.id !== id));
      toast.dismiss(toastId);
      toast.success(res.message || "Meal deleted successfully.");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong.");
    }
  };

  const handleChange = useCallback(
    (
      key: keyof typeof form,
      value: string | number | boolean
    ) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const handleApply = () => {
    updateFilters(form);
  };

  const handleReset = () => {
    setForm({
      search: "",
      status: "",
      isAvailable: "",
      category_name: "",
      cuisine: "",
      price: null,
      dietaryPreference: "",
    });
    reset();
  };

  const fields: TFilterField[] = [
    {
      type: "text",
      name: "search",
      label: "Search",
      placeholder: "Meal name or description",
      value: form.search,
      onChange: (val: string) => handleChange("search", val),
    },
    {
      type: "select",
      name: "status",
      label: "Status",
      value: form.status,
      onChange: (val: string) => handleChange("status", val),
      options: [
        { label: "Pending", value: "PENDING" },
        { label: "Approved", value: "APPROVED" },
        { label: "Rejected", value: "REJECTED" },
      ],
    },
    {
      type: "select",
      name: "isAvailable",
      label: "Available",
      value: form.isAvailable || "",
      onChange: (val: string) => handleChange("isAvailable", val),
      options: [
        { label: "Yes", value: "true" },
        { label: "No", value: "false" },
      ],
    },
    {
      type: "select",
      name: "cuisine",
      value: form.cuisine,
      placeholder: "Cuisine...",
      label: "Cuisine",
      onChange: (val) => handleChange("cuisine", val),
      options: cuisines.map((v) => ({ label: v, value: v })),
    },
    {
      type: "select",
      name: "dietaryPreference",
      value: form.dietaryPreference,
      placeholder: "e.g. Gluten Free",
      label: "Dietary Preference",
      onChange: (val) =>
        handleChange("dietaryPreference", val),
      options: dietaryPreferences.map((v) => ({
        label: v,
        value: v,
      })),
    },
    {
      type: "number",
      name: "price",
      label: "Price",
      value: form.price as any,
      onChange: (val) => handleChange("price", val),
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
        setSelectedmealId(item.id);
        setViewMode(false);
        setViewData(item);
        setOpen(true);
      },
    },
    {
      icon: Trash2,
      label: "Delete",
      onClick: (item: any) => {
        handleDelete(item.id);
      },
    },
  ];

  return (
    <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-center sm:text-left">
          Meal Management
        </h1>
        {role === "Provider" && (
          <Button
            className="flex items-center gap-2"
            onClick={() =>
              router.push(
                role === "Provider"
                  ? "/provider/dashboard/create-meals"
                  : ""
              )
            }
            size="lg"
            aria-label="Add Meal"
          >
            <BadgePlus size={18} />
            Add Meal
          </Button>
        )}
      </div>

      {/* Filter Card */}
      <div className="mb-8 bg-card border border-border p-6 rounded-xl shadow-sm">
        <section>
          <FilterPanel
            fields={fields}
            onApply={handleApply}
            onReset={handleReset}
            isPending={isPending}
          />
        </section>
      </div>

      {/* Table */}
      <div className="relative w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <AnimatePresence>
          {isPending && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm"
            >
              <Skeleton className="w-10 h-10 rounded-full mb-4" />
              <span className="text-muted-foreground text-sm font-medium">
                Loading data...
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="mb-6 overflow-x-auto rounded-xl shadow-sm border border-border bg-card">
          {tableData && Array.isArray(tableData) && tableData.length > 0 ? (
            <ReusableTable
              columns={columns as any}
              data={tableData}
              actions={actions}
            />
          ) : (
            <div className="p-8 text-center text-muted-foreground text-base select-none">
              No meals data found.
            </div>
          )}
        </div>
      </div>

      {/* Dialog */}
      <Dialog
        open={open}
        onOpenChange={(val) => {
          setOpen(val);
          if (!val) {
            setSelectedmealId(null);
            setViewData(null);
          }
        }}
      >
        <DialogContent className="max-w-md w-full rounded-xl p-0 bg-card">
          <DialogHeader className="flex flex-col items-center justify-center px-6 pt-8 pb-4 border-b border-border bg-card rounded-t-xl shadow-none">
            <DialogTitle className="text-2xl font-bold text-primary mb-2 tracking-tight text-center">
              {viewMode ? "Meal Details" : "Edit Meal"}
            </DialogTitle>
            <p
              id="dialog-description"
              className="text-base text-muted-foreground text-center"
            >
              {viewMode
                ? "View all details about your meal below."
                : "Edit the details of your meal below as needed."}
            </p>
          </DialogHeader>

          {/* Modal content scrollable, token-UI */}
          <div className="py-6 px-4 sm:px-8 max-h-[70vh] overflow-y-auto">
            <ViewMealsData
              viewData={
                Array.isArray(viewData) ? viewData[0] : viewData ?? undefined
              }
              viewMode={viewMode}
            />
            {!viewMode && selectedmealid && (
              <div className="mt-6">
                {role === "Admin" ? (
                  <AdminMealsUpdate id={selectedmealid} />
                ) : (
                  <UpdateMeal mealId={selectedmealid} />
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Pagination */}
      <div className="mt-8 flex justify-end">
        <PaginationPage pagination={pagination} />
      </div>
    </div>
  );
};

export default MealTable;