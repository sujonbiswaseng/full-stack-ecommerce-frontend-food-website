// Columns for Provider Meals Table (for MyMealsTable, matching data set @file_context_0)
import CopyableId from "@/components/shared/CopyAndRoutebyId";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export const createMyMealColumns = () => [
  {
    key: "id",
    label: "Meal ID",
    render: (row: any) => (
      <CopyableId
        href={`/meals/${row.id}`}
        id={row.id}
        showShort={row.id?.slice(0, 8)}
        className="bg-card border border-border text-primary px-2 py-1 rounded-md font-mono hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition"
      />
    ),
  },
  {
    key: "images",
    label: "Image",
    render: (row: any) =>
      row.images && row.images.length > 0 ? (
        <div className="flex items-center justify-center w-14 h-14 rounded-full overflow-hidden bg-muted-foreground/5 border border-border ring-0">
          <img
            alt={row.title ?? "Meal Image"}
            src={"/images/default-meal.jpg"}
            width={56}
            height={56}
            className="object-cover w-14 h-14 rounded-full"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-secondary border border-border">
          <span className="text-muted-foreground text-xs font-medium select-none">No image</span>
        </div>
      ),
  },
  {
    key: "title",
    label: "Meal Name",
    render: (row: any) => (
      <span className="font-semibold text-foreground truncate max-w-[160px] block" title={row.title}>
        {row.title}
      </span>
    ),
  },
  {
    key: "description",
    label: "Description",
    render: (row: any) => (
      <span className="text-muted-foreground line-clamp-2 max-w-[260px] bg-input block px-2 py-1 rounded border border-border">
        {row.description
          ? `${row.description.slice(0, 40)}${row.description.length > 40 ? "..." : ""}`
          : ""}
      </span>
    ),
  },
  {
    key: "price",
    label: "Price",
    render: (row: any) =>
      typeof row.price !== "undefined" ? (
        <span className="font-semibold text-green-700 bg-green-50/80 px-2 py-0.5 rounded text-sm">
          ৳{Number(row.price).toFixed(2)}
        </span>
      ) : (
        <span className="text-muted-foreground italic">N/A</span>
      ),
  },
  {
    key: "category_name",
    label: "Category",
    render: (row: any) => (
      <Badge
        variant="secondary"
        className="truncate capitalize px-2 py-1 rounded-md border border-border font-medium max-w-[120px]"
      >
        {row.category_name
          ? `${row.category_name.slice(0, 20)}${row.category_name.length > 20 ? "..." : ""}`
          : ""}
      </Badge>
    ),
  },
  {
    key: "cuisine",
    label: "Cuisine",
    render: (row: any) => (
      <Badge
        variant="outline"
        className="truncate capitalize px-2 py-1 rounded-md border border-border font-normal bg-card text-muted-foreground max-w-[110px]"
      >
        {row.cuisine}
      </Badge>
    ),
  },
  {
    key: "isAvailable",
    label: "Available",
    render: (row: any) =>
      row.isAvailable ? (
        <Badge
          variant="secondary"
          className="bg-green-100 text-green-800 border-green-200 px-2 py-0.5 rounded-full text-xs font-semibold"
        >
          Yes
        </Badge>
      ) : (
        <Badge
          variant="secondary"
          className="bg-red-50 text-red-700 border-red-200 px-2 py-0.5 rounded-full text-xs font-semibold"
        >
          No
        </Badge>
      ),
  },
  {
    key: "status",
    label: "Status",
    render: (row: any) => {
      let className = "";
      let text = "";
      switch (row.status) {
        case "APPROVED":
          className = "bg-green-100 text-green-800 border-green-200";
          text = "Approved";
          break;
        case "PENDING":
          className = "bg-accent/30 text-accent border-accent";
          text = "Pending";
          break;
        case "REJECTED":
          className = "bg-red-100 text-red-700 border-red-200";
          text = "Rejected";
          break;
        default:
          className = "bg-card text-muted-foreground border-border";
          text = row.status;
      }
      return (
        <Badge
          variant="secondary"
          className={`min-w-[85px] text-center px-3 py-1 rounded-lg text-xs font-semibold border ${className}`}
        >
          {text}
        </Badge>
      );
    },
  },
  {
    key: "createdAt",
    label: "Created At",
    render: (row: any) => {
      const date = new Date(row.createdAt);
      const value = isNaN(date.getTime())
        ? "-"
        : date.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
      return (
        <span className="text-xs px-2 py-1 rounded bg-input text-muted-foreground border border-border font-medium">
          {value.slice(0,11)}
        </span>
      );
    },
  },
];