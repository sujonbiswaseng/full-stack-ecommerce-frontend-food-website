import CopyableId from "@/components/shared/CopyAndRoutebyId";
import React from "react";
import { format } from "date-fns";
import { TResponseReviewData } from "@/types/reviews.type";
import { TUser } from "@/types/user.type";
import { IGetMealData } from "@/types/meals.type";

// Professional data interface based on @file_context_0


const ViewReviewData = ({ viewData }:{viewData: TResponseReviewData<{meal:IGetMealData,customer:TUser,replies:any[]}>}) => {
  if (!viewData) return null;



  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-8">
      {/* REVIEW SECTION */}
      <section className="bg-gradient-to-b from-white to-blue-50 dark:from-gray-950 dark:to-gray-900 rounded-2xl shadow-xl p-6 md:p-10 flex flex-col gap-5">
        <h2 className="text-2xl md:text-3xl font-extrabold text-blue-900 dark:text-indigo-100 tracking-tight mb-2">
          Review Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-[15px]">
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Review ID</span>
            <CopyableId id={viewData.id} showShort={viewData.id.slice(0, 8) as any} />
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Status</span>
            <span
              className={`inline-block px-2.5 py-0.5 rounded-full border font-bold text-xs uppercase tracking-wider shadow-sm ${viewData.status || "bg-gray-100 text-gray-600 border-gray-200"}`}
            >
              {viewData.status}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Meal ID</span>
            <CopyableId id={viewData.mealId} href={`/meals/${viewData.mealId}`} showShort={viewData.mealId.slice(0, 8) as any} />
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Parent Review</span>
            {viewData.parentId ? (
              <CopyableId id={viewData.parentId} showShort={viewData.parentId.slice(0, 8) as any} />
            ) : (
              <span className="italic text-gray-500">N/A</span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Created At</span>
            <span className="text-gray-800 dark:text-gray-200 font-mono">
              {viewData.createdAt ? format(new Date(viewData.createdAt), "dd/MM/yyyy HH:mm") : "-"}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Last Updated</span>
            <span className="text-gray-700 dark:text-gray-400 font-mono">
              {viewData.updatedAt ? format(new Date(viewData.updatedAt), "dd/MM/yyyy HH:mm") : "-"}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Rating</span>
            <span className="flex items-center gap-1 text-yellow-500 font-bold text-lg">
              {viewData.rating}
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.545l6.564-.955L10 0l2.946 5.59 6.564.955-4.755 4.998 1.123 6.545z" />
              </svg>
              <span className="text-gray-700 dark:text-gray-200 text-sm ml-1">/ 5</span>
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Comment</span>
            <span className="bg-gray-50 dark:bg-gray-800 rounded-md px-3 py-2 text-gray-900 dark:text-gray-100 break-words border border-gray-100 dark:border-gray-800 shadow-inner">
              {viewData.comment.slice(0,15)}...
            </span>
          </div>
        </div>
      </section>

      {/* CUSTOMER SECTION */}
      <section className="bg-gradient-to-b from-white to-lime-50 dark:from-gray-950 dark:to-gray-900 rounded-2xl shadow-xl p-6 md:p-10 flex flex-col gap-5">
        <h2 className="text-2xl md:text-3xl font-extrabold text-green-900 dark:text-green-200 tracking-tight mb-2">
          Customer Details
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          {viewData.customer?.image ? (
            <img
              src={viewData.customer.image}
              alt={viewData.customer.name}
              className="w-20 h-20 md:w-28 md:h-28 rounded-full border-2 border-green-400 dark:border-green-700 shadow-lg object-cover"
            />
          ) : (
            <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-2xl text-gray-400">
              <svg fill="none" viewBox="0 0 24 24" className="w-10 h-10" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A11.963 11.963 0 0012 20c2.257 0 4.383-.623 6.195-1.696M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
          )}
          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <span className="font-semibold text-gray-700 dark:text-gray-300">Name</span>
              <div className="text-gray-900 dark:text-gray-100">{viewData.customer?.name ?? "-"}</div>
            </div>
            <div>
              <span className="font-semibold text-gray-700 dark:text-gray-300">Email</span>
              <div className="text-gray-900 dark:text-gray-100 break-all">{viewData.customer?.email ?? "-"}</div>
            </div>
            <div>
              <span className="font-semibold text-gray-700 dark:text-gray-300">Role</span>
              <span className="inline-block px-2 py-0.5 rounded bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 text-xs font-bold uppercase">
                {viewData.customer?.role ?? "-"}
              </span>
            </div>
            <div>
              <span className="font-semibold text-gray-700 dark:text-gray-300">Status</span>
              <span className={`inline-block px-2 py-0.5 rounded text-xs ${viewData.customer?.isActive ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"} font-semibold`}>
                {viewData.customer?.isActive ? "Active" : "Inactive"}
              </span>
            </div>
            <div>
              <span className="font-semibold text-gray-700 dark:text-gray-300">User ID</span>
              <CopyableId id={viewData.customer?.id} href={`/profile/user/${viewData.customer?.id}`} showShort={viewData.customer?.id?.slice(0, 8) as any} />
            </div>
            <div>
              <span className="font-semibold text-gray-700 dark:text-gray-300">Joined</span>
              <span className="text-gray-700 dark:text-gray-300 font-mono">{viewData.customer?.createdAt ? format(new Date(viewData.customer.createdAt), "dd/MM/yyyy") : "-"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* MEAL SECTION */}
      <section className="bg-gradient-to-b from-white to-fuchsia-50 dark:from-gray-950 dark:to-gray-900 rounded-2xl shadow-xl p-6 md:p-10 flex flex-col gap-5">
        <h2 className="text-2xl md:text-3xl font-extrabold text-fuchsia-900 dark:text-fuchsia-200 tracking-tight mb-2">
          Meal Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-7">
          <div>
            <span className="font-semibold text-gray-700 dark:text-gray-300">Title</span>
            <div className="text-gray-900 dark:text-gray-100">{viewData.meal.title ?? <span className="italic text-gray-400">No Title</span>}</div>
          </div>
          <div>
            <span className="font-semibold text-gray-700 dark:text-gray-300">Meal ID</span>
            <CopyableId id={viewData.mealId} href={`/meals/${viewData.mealId}`} showShort={viewData.mealId.slice(0, 8) as any} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewReviewData;