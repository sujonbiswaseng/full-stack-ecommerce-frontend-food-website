import React from "react";
import Link from "next/link";
import CopyableId from "@/components/shared/CopyAndRoutebyId";

// Type for the order object
interface OrderItem {
  createdAt: string;
  id: string;
  meal: {
    id: string;
    title: string;
    description: string;
    price: number;
  };
  price: number;
  quantity: number;
  updatedAt: string;
}

interface OrderData {
  address: string;
  createdAt: string;
  customerId: string;
  first_name: string;
  last_name: string;
  paymentStatus:string;
  id: string;
  orderitem: OrderItem[];
  phone: string;
  status: string;
  totalPrice: number;
  updatedAt: string;
}

// Props for this order viewing component
const ViewOrdersData = ({
  viewMode,
  viewData,
}: {
  viewMode: boolean;
  viewData?: OrderData;
}) => {
  if (!viewMode || !viewData) return null;
  return (
    <div>
      <div className="rounded-2xl border border-gray-100 bg-white shadow-xl px-4 sm:px-6 py-6 space-y-8 overflow-y-scroll">
        {/* Top: Customer and Order Info */}
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          {/* User Avatar Placeholder */}
          <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center border border-blue-100 rounded-xl bg-gradient-to-tr from-blue-50 to-indigo-50 shadow-inner overflow-hidden">
            <span className="text-5xl text-blue-200">👤</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="mb-1 font-bold text-2xl text-indigo-900 truncate">
              {viewData.first_name} {viewData.last_name}
            </h3>
            <div className="flex flex-wrap gap-4 mt-2">
              <div className="flex items-center gap-2">
                <span className="text-gray-500 font-medium">Order ID:</span>
                <span className="font-mono text-sm text-gray-700 select-all bg-gray-50 rounded px-2 py-1">
                  <Link
                    href={`/orders/${viewData.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {viewData.id.slice(0, 10)}....
                  </Link>
                  <button
                    type="button"
                    className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-gray-500 hover:text-indigo-700 text-xs bg-gray-100 hover:bg-indigo-50 transition"
                    title="Copy Order ID"
                    onClick={() => {
                      navigator.clipboard.writeText(viewData.id ?? "");
                      if (typeof window !== "undefined") {
                        import("react-toastify").then(({ toast }) => {
                          toast.success("Order ID copied to clipboard!");
                        });
                      }
                    }}
                  >
                    Copy
                  </button>
                </span>
              </div>
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
                    ? new Date(viewData.createdAt).toLocaleString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "-"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 font-medium">Status:</span>
                <span
                  className={`inline-block px-2 py-[2px] rounded font-semibold text-xs border
                ${
                  viewData.status === "PLACED"
                    ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                    : viewData.status === "COMPLETED"
                    ? "bg-green-50 text-green-700 border-green-200"
                    : viewData.status === "CANCELLED"
                    ? "bg-red-50 text-red-700 border-red-200"
                    : "bg-gray-50 text-gray-500 border"
                }`}
                >
                  {viewData.status}
                </span>
              </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 font-medium">Payment Status:</span>
              <span
                className={`inline-block px-2 py-[2px] rounded font-semibold text-xs border
                  ${
                    viewData.paymentStatus === "PENDING"
                      ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                      : viewData.paymentStatus === "PAID"
                      ? "bg-green-50 text-green-700 border-green-200"
                      : viewData.paymentStatus === "FAILED"
                      ? "bg-red-50 text-red-700 border-red-200"
                      : "bg-gray-50 text-gray-500 border"
                  }`
                }
              >
                {viewData.paymentStatus ?? "-"}
              </span>
            </div>
       
            </div>
            <div className="flex flex-wrap gap-4 mt-2">
              <div>
                <span className="text-gray-500 font-medium">Phone: </span>
                <span className="font-mono text-sm text-gray-700 select-all">{viewData.phone}</span>
              </div>
              <div>
                <span className="text-gray-500 font-medium">Address: </span>
                <span className="font-mono text-sm text-gray-700 select-all">{viewData.address}</span>
              </div>
            </div>
          </div>
        </div>
        {/* DIVIDER */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        {/* Order Details */}
        <div>
          <span className="text-gray-500 font-medium text-lg block mb-2">
            Ordered Items ({viewData.orderitem?.length || 0})
          </span>
          <div className="space-y-6">
            {viewData.orderitem.map((item, idx) => (
              <div
                key={item.id}
                className="border rounded-lg p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-gray-50/70"
              >
                <div className="flex-1">
                  <div className="font-semibold text-indigo-800 text-[16px]">
                    {item.meal.title}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 text-[15px] mt-1">
                    <span>
                      <span className="text-gray-500">Meal ID:</span>{" "}
                      <span className="font-mono text-xs text-gray-700 select-all flex items-center gap-1">
                        <div className="space-y-1">
                        
                        <CopyableId href={item.meal.id} showShort={item.meal.id as any} id={item.meal.id} /> ,
                        </div>
                        
                      </span>
                 
                    </span>
                    <span>
                      <span className="text-gray-500">Description:</span>{" "}
                      <span className="text-gray-800">{item.meal.description || "-"}</span>
                    </span>
                    <span>
                      <span className="text-gray-500">Price:</span>{" "}
                      <span className="font-semibold text-gray-800">{item.price}</span>
                    </span>
                    <span>
                      <span className="text-gray-500">Quantity:</span>{" "}
                      <span>{item.quantity}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* DIVIDER */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        {/* Total Price and Meta */}
        <div className="flex flex-wrap gap-10 items-center justify-between text-[16px] font-medium">
          <span>
            <span className="text-gray-500">Total Price: </span>
            <span className="text-indigo-900 font-bold text-xl">৳{viewData.totalPrice}</span>
          </span>
          <span>
            <span className="text-gray-500">Customer ID: </span>
            <span className="font-mono text-sm text-gray-700 select-all">
              <Link
                href={`/profile/user/${viewData.customerId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {viewData.customerId.slice(0, 10)}....
              </Link>
              <button
                type="button"
                className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-gray-500 hover:text-indigo-700 text-xs bg-gray-100 hover:bg-indigo-50 transition"
                title="Copy Customer ID"
                onClick={() => {
                  navigator.clipboard.writeText(viewData.customerId ?? "");
                  if (typeof window !== "undefined") {
                    import("react-toastify").then(({ toast }) => {
                      toast.success("Customer ID copied to clipboard!");
                    });
                  }
                }}
              >
                Copy
              </button>
            </span>
          </span>
          <span>
            <span className="text-gray-500">Last Updated: </span>
            <span>
              {viewData.updatedAt
                ? new Date(viewData.updatedAt).toLocaleString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "-"}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ViewOrdersData;