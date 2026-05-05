"use client";
import Link from "next/link";
import { useState } from "react";
import { BadgePlus, Eye, Pen, Trash } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Status, StatusIndicator, StatusLabel } from "../../ui/status";
import { IGetMealData } from "@/types/meals.type";
import { DeleteMeals } from "@/actions/meals.action";

const columns = [
  { key: "id", label: "ID" },
  { key: "image", label: "Image" },
  { key: "title", label: "Name" },
  { key: "description", label: "Description" },
  { key: "price", label: "Price" },
  { key: "category_name", label: "Category" },
  { key: "cuisine", label: "Cuisine" },
  { key: "isAvailable", label: "Available" },
  { key: "status", label: "status" },
  { key: "actions", label: "Actions" },
];

const AdminMealsTable = ({ initialmeals }: { initialmeals: IGetMealData[] }) => {
  const router = useRouter();
  const [meals, setMeals] = useState(initialmeals);
  const [search, setSearch] = useState("");

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this meal?")) return;

    try {
      const res =await DeleteMeals(id)
      if (!res.success || !res.data) {
        toast.error(res.message || "Failed to delete meal.");
      }

      setMeals(meals.filter((meal: any) => meal.id !== id));
      toast.success(res.message || "Meal deleted successfully.");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong.");
    }
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-center sm:text-left">
          Meal Management
        </h1>

        <button
          onClick={() => router.push("/admin/dashboard/create-meals")}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-2.5 rounded-xl shadow-lg hover:scale-105 transition duration-300"
        >
          <BadgePlus size={18} />
          Add Meal
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search meals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-80 px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none shadow-sm"
        />
      </div>

      {/* Table */}
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">

            {/* Table Head */}
            <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className="px-5 py-3 font-semibold whitespace-nowrap">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-100">
              {meals.length > 0 ? (
                meals.map((meal: any, index: number) => (
                  <tr
                    key={meal.id}
                    className="hover:bg-indigo-50 transition duration-200"
                  >
                    <td className="px-5 py-4 font-medium">
                      {index + 1}
                    </td>

                    <td className="px-5 py-4">
                      <img
                        src={meal.images[0] ?? "/images/default-meal.jpg"}
                        alt={meal.title}
                        className="w-14 h-14 object-cover rounded-xl shadow-md"
                      />
                    </td>

                    <td className="px-5 py-4 font-semibold text-indigo-600">
                      <Link href={`/meals/${meal.id}`} className="hover:underline">
                        {meal.title.substring(0, 8)}
                        {meal.title.length > 8 && "..."}
                      </Link>
                    </td>

                    <td className="px-5 py-4 text-gray-600 max-w-[180px] truncate">
                      {meal.description}
                    </td>

                    <td className="px-5 py-4 font-semibold text-gray-800">
                      ${meal.price.toFixed(2)}
                    </td>

                    <td className="px-5 py-4">{meal.category_name}</td>

                    <td className="px-5 py-4">{meal.cuisine}</td>

                    <td className="px-5 py-4">
                      {meal.isAvailable ? (
                        <Status variant="success" className="bg-green-500 text-white px-3 py-1 rounded-full text-xs">
                          <StatusIndicator />
                          <StatusLabel>Available</StatusLabel>
                        </Status>
                      ) : (
                        <Status variant="error" className="bg-red-500 text-white px-3 py-1 rounded-full text-xs">
                          <StatusIndicator />
                          <StatusLabel>Unavailable</StatusLabel>
                        </Status>
                      )}
                    </td>


                    <td className="px-5 py-4">
                      {(() => {
                        const status = meal.status;

                        const statusStyles: any = {
                          APPROVED: "bg-green-500 text-white",
                          PENDING: "bg-yellow-500 text-white",
                          REJECTED: "bg-red-500 text-white",
                        };

                        const variantMap: any = {
                          APPROVED: "success",
                          PENDING: "warning",
                          REJECTED: "error",
                        };

                        return (
                          <Status
                            variant={variantMap[status] || "default"}
                            className={`${statusStyles[status] || "bg-gray-400 text-white"} px-3 py-1 rounded-full text-xs`}
                          >
                            <StatusIndicator />
                            <StatusLabel>{status}</StatusLabel>
                          </Status>
                        );
                      })()}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Link href={`/meals/${meal.id}`}>
                          <Eye className="w-4 h-4 text-indigo-500 hover:text-indigo-700 transition" />
                        </Link>

                        <Link href={`/admin-dashboard/meals/${meal.id}`}>
                          <Pen className="w-4 h-4 text-green-500 hover:text-green-700 transition" />
                        </Link>

                        <button onClick={() => handleDelete(meal.id)}>
                          <Trash className="w-4 h-4 text-red-500 hover:text-red-700 transition" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="text-center py-10 text-gray-400">
                    No meals found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default AdminMealsTable;