// Columns for Provider Meals Table (for MyMealsTable, matching data set @file_context_0)
import CopyableId from "@/components/shared/CopyAndRoutebyId";

export const createMyMealColumns = () => [
  {
    key: "id",
    label: "Meal ID",
    render: (row: any) => (
      <CopyableId
        href={`/meals/${row.id}`}
        id={row.id}
        showShort={row.id?.slice(0, 8)}
        className="bg-white border border-gray-200 text-indigo-700 px-2 py-1 rounded-lg shadow-sm font-mono transition hover:border-indigo-400 hover:text-indigo-900"
      />
    ),
  },
  {
    key: "image",
    label: "Image",
    render: (row: any) =>
      row.image ? (
        <img
          alt={row.title}
          src={row.images[0]}
          className="w-14 h-14 rounded-full object-cover border border-gray-300 shadow"
          style={{ backgroundColor: "#f3f4f6" }}
        />
      ) : (
        <span className="text-gray-400 italic px-2 py-1 rounded bg-gray-100 border border-gray-200">
          No image
        </span>
      ),
  },
  {
    key: "title",
    label: "Meal Name",
    render: (row: any) => (
      <span className="font-semibold text-indigo-900 truncate max-w-[160px] block">
        {row.title}
      </span>
    ),
  },
  {
    key: "description",
    label: "Description",
    render: (row: any) => (
      <span className="text-gray-600 line-clamp-2 max-w-[260px] bg-white block px-2 py-1 rounded border border-gray-100">
        {row.description ? `${row.description.slice(0, 10)}${row.description.length > 10 ? "..." : ""}` : ""}
      </span>
    ),
  },
  {
    key: "price",
    label: "Price",
    render: (row: any) =>
      typeof row.price !== "undefined" ? (
        <span className="font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded">
          ৳{Number(row.price).toFixed(2)}
        </span>
      ) : (
        <span className="text-gray-400 italic">N/A</span>
      ),
  },
  {
    key: "category_name",
    label: "Category",
    render: (row: any) => (
      <span className="capitalize px-2 py-1 rounded-md bg-gray-100 text-gray-900 font-medium border border-gray-200">
        {row.category_name ? `${row.category_name.slice(0, 20)}${row.category_name.length > 20 ? "..." : ""}` : ""}
   
      </span>
    ),
  },
  {
    key: "cuisine",
    label: "Cuisine",
    render: (row: any) => (
      <span className="capitalize px-2 py-1 rounded-md bg-gray-50 text-gray-700 font-medium border border-gray-100">
        {row.cuisine}
      </span>
    ),
  },
  {
    key: "isAvailable",
    label: "Available",
    render: (row: any) =>
      row.isAvailable ? (
        <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-semibold border border-green-200">
          Yes
        </span>
      ) : (
        <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded-full text-xs font-semibold border border-red-200">
          No
        </span>
      ),
  },
  {
    key: "status",
    label: "Status",
    render: (row: any) => {
      let colorClass = "";
      let bgClass = "";
      let borderClass = "";
      let text = "";
      switch (row.status) {
        case "APPROVED":
          colorClass = "text-green-800";
          bgClass = "bg-green-100";
          borderClass = "border border-green-200";
          text = "Approved";
          break;
        case "PENDING":
          colorClass = "text-yellow-800";
          bgClass = "bg-yellow-50";
          borderClass = "border border-yellow-200";
          text = "Pending";
          break;
        case "REJECTED":
          colorClass = "text-red-700";
          bgClass = "bg-red-100";
          borderClass = "border border-red-200";
          text = "Rejected";
          break;
        default:
          colorClass = "text-gray-600";
          bgClass = "bg-gray-50";
          borderClass = "border border-gray-100";
          text = row.status;
      }
      return (
        <span
          className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold ${colorClass} ${bgClass} ${borderClass} min-w-[85px] text-center`}
        >
          {text}
        </span>
      );
    },
  },
  {
    key: "createdAt",
    label: "Created At",
    render: (row: any) => {
      const date = new Date(row.createdAt);
      return (
        <span className="text-xs px-2 py-1 rounded bg-gray-50 text-gray-700 border border-gray-100 font-medium">
          {isNaN(date.getTime())
            ? "-"
            : date.toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
        </span>
      );
    },
  },
];