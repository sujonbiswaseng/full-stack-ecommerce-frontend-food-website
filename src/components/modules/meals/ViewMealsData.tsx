import { TGetCategory } from '@/types/category';
import { TResponseMeals } from '@/types/meals.type';
import { IProviderInfo } from '@/types/provider.type';
import { IgetReviewData } from '@/types/reviews.type';
import Link from 'next/link';
import React from 'react';

interface IMealCategory {
  category_name: string;
}

interface IMealProvider {
  providerId: string;
}

const ViewMealsData = ({
  viewMode,
  viewData
}: {
  viewMode: boolean;
  viewData?: TResponseMeals<{category:TGetCategory,provider:IProviderInfo,reviews:IgetReviewData}>;
  
}) => {
  if (!viewMode || !viewData) return null;

  return (
    <div>
      <div className="rounded-2xl border border-gray-100 bg-white shadow-xl px-4 sm:px-6 py-6 space-y-8 overflow-y-scroll">
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <div className="flex-shrink-0 w-28 h-28 flex items-center justify-center border border-blue-100 rounded-xl bg-gradient-to-tr from-blue-50 to-indigo-50 shadow-inner overflow-hidden">
            {viewData.images ? (
              <img
                src={viewData?.images[0]}
                alt={viewData.title ?? 'Meal'}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <span className="text-5xl text-blue-200">
                <svg width={50} height={50} viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="9" fill="#E0E7FF" />
                  <text
                    x="50%"
                    y="55%"
                    textAnchor="middle"
                    fill="#64748b"
                    fontSize="12"
                    dy=".3em"
                  >
                    🍽️
                  </text>
                </svg>
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="mb-1 font-bold text-2xl text-indigo-900 truncate">
              {viewData.title.slice(0,10)}....
            </h3>
           
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <div className="flex items-center gap-2">
                <span className="text-gray-400">
                  <svg width={18} height={18} fill="none" viewBox="0 0 24 24">
                    <path
                      d="M15 2v2m-6-2v2m-5 4h16M5 6v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6"
                      stroke="#6366F1"
                      strokeWidth={1.3}
                    />
                  </svg>
                </span>
                <span className="font-medium text-gray-600">
                  {viewData.createdAt
                    ? new Date(viewData.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })
                    : '-'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">
                  <svg width={18} height={18} fill="none" viewBox="0 0 24 24">
                    <path
                      d="M21 10.5V6a2 2 0 0 0-2-2h-2M3 6a2 2 0 0 1 2-2h2M3 18v-3M16 18h2a2 2 0 0 0 2-2v-2M3 10.5V18c0 1.1.9 2 2 2h2M12 8v4l3 2"
                      stroke="#6366F1"
                      strokeWidth={1.3}
                    />
                  </svg>
                </span>
                <span className="font-medium text-gray-600">
                  {viewData.category_name || '-'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 text-[15px]">
          <div>
            <span className="text-gray-500 font-medium">Meal ID:</span>
            <span className="block mt-0.5 font-mono text-sm text-gray-700 select-all bg-gray-50 rounded px-2 py-1">
              <div className="flex items-center gap-2">
                <Link
                  href={`/meals/${viewData.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {viewData.id.slice(0,10)}....
                </Link>
                <button
                  type="button"
                  className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-gray-500 hover:text-indigo-700 text-xs bg-gray-100 hover:bg-indigo-50 transition"
                  title="Copy Meal ID"
                  onClick={() => {
                    navigator.clipboard.writeText(viewData.id ?? "");
                    if (typeof window !== "undefined") {
                      import("react-toastify").then(({ toast }) => {
                        toast.success("Meal ID copied to clipboard!");
                      });
                    }
            
                  }}
                >
                  Copy
                </button>
              </div>
         
         
            </span>
          </div>
          <div>
            <span className="text-gray-500 font-medium">Status:</span>
            <span className={`inline-block ml-2 px-2 py-[2px] rounded font-semibold text-xs border
              ${
                viewData.status === "PENDING"
                  ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                  : viewData.status === "APPROVED"
                  ? "bg-green-50 text-green-700 border-green-200"
                  : viewData.status === "REJECTED"
                  ? "bg-red-50 text-red-700 border-red-200"
                  : viewData.status === "BANNED"
                  ? "bg-gray-800 text-white border-gray-600"
                  : "bg-gray-50 text-gray-500 border"
              }`}>
              {viewData.status}
            </span>
          </div>
          <div>
            <span className="text-gray-500 font-medium">Description:</span>
            <span className="block mt-0.5 text-gray-800 font-semibold">{viewData.description?.slice(0,10)}...</span>
          </div>
          <div>
            <span className="text-gray-500 font-medium">Price:</span>
            <span className="block mt-0.5 font-semibold text-gray-800">৳{viewData.price}</span>
          </div>
          <div>
          <span className="text-gray-500 font-medium">deliverycharge:</span>
          <h3 className="mb-1 font-bold text-2xl text-indigo-900 truncate">
              {viewData.deliverycharge}
            </h3>
          </div>
          <div>
            <span className="text-gray-500 font-medium">Available:</span>
            <span className="block mt-0.5">
              {viewData.isAvailable ? "Yes" : "No"}
            </span>
          </div>
          <div>
            <span className="text-gray-500 font-medium">Dietary Preference:</span>
            <span className="block mt-0.5">{viewData.dietaryPreference || '-'}</span>
          </div>
          <div>
            <span className="text-gray-500 font-medium">Cuisine:</span>
            <span className="block mt-0.5">{viewData.cuisine || '-'}</span>
          </div>
          <div>
            <span className="text-gray-500 font-medium">provider ID:</span>
            <span className="block mt-0.5 font-mono text-sm text-gray-700 select-all bg-gray-50 rounded px-2 py-1">
              <div className="flex items-center gap-2">
                <Link
                  href={`/providers/${viewData.providerId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {viewData.providerId.slice(0,10)}....
                </Link>
                <button
                  type="button"
                  className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-gray-500 hover:text-indigo-700 text-xs bg-gray-100 hover:bg-indigo-50 transition"
                  title="Copy Meal ID"
                  onClick={() => {
                    navigator.clipboard.writeText(viewData.providerId ?? "");
                    if (typeof window !== "undefined") {
                      import("react-toastify").then(({ toast }) => {
                        toast.success("provider ID copied to clipboard!");
                      });
                    }
            
                  }}
                >
                  Copy
                </button>
              </div>
         
         
            </span>
          </div>
          {typeof viewData.avgRating !== 'undefined' && (
            <div>
              <span className="text-gray-500 font-medium">Average Rating:</span>
              <span className="block mt-0.5">{viewData.avgRating ?? '-'}</span>
            </div>
          )}
          {typeof viewData.totalReviews !== 'undefined' && (
            <div>
              <span className="text-gray-500 font-medium">Total Reviews:</span>
              <span className="block mt-0.5">{viewData.totalReviews ?? '-'}</span>
            </div>
          )}
          <div className="sm:col-span-2">
            <span className="text-gray-500 font-medium">Created At:</span>
            <span className="block mt-0.5">
              {viewData.createdAt
                ? new Date(viewData.createdAt).toLocaleString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : '-'}
            </span>
          </div>
          <div className="sm:col-span-2">
            <span className="text-gray-500 font-medium">Last Updated:</span>
            <span className="block mt-0.5">
              {viewData.updatedAt
                ? new Date(viewData.updatedAt).toLocaleString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : '-'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMealsData;