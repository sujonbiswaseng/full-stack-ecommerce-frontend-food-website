import React from "react";
import { format } from "date-fns";
import { TResponsePayment } from "@/types/payment.type";
import { IGetMealData } from "@/types/meals.type";
import { TResponseOrderData } from "@/types/order/order.type";
import { TUser } from "@/types/user.type";

interface ViewPaymentDataProps {
  viewData:TResponsePayment<{ meal:IGetMealData; order: TResponseOrderData ,user:TUser}>;
}

const ViewPaymentData: React.FC<ViewPaymentDataProps> = ({ viewData }) => {
  if (!viewData) return null;

  const { id, userId, meal, order, amount, status, } = viewData;

  return (
    <div className="space-y-4">
      {/* Payment Info */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Payment Information
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">Payment ID:</p>
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{id}</p>

          <p className="text-sm text-gray-500 dark:text-gray-400">User ID:</p>
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{userId}</p>

          <p className="text-sm text-gray-500 dark:text-gray-400">Amount:</p>
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100"> ৳ {amount}</p>

          <p className="text-sm text-gray-500 dark:text-gray-400">Status:</p>
          <p className={`text-sm font-medium ${
            status === "PAID" ? "text-green-600" : status === "UNPAID" ? "text-red-500" : "text-yellow-500"
          }`}>
            {status}
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400">Created At:</p>
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {format(new Date(viewData.createdAt), "dd/MM/yyyy HH:mm")}
          </p>
        </div>
      </div>

      {/* Event Info */}
      {meal && (
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Event Information
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">meal ID:</p>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{meal.id}</p>

            <p className="text-sm text-gray-500 dark:text-gray-400">meal Name:</p>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{viewData.meal.title}</p>

            <p className="text-sm text-gray-500 dark:text-gray-400">createdAt:</p>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {meal.createdAt ? format(new Date(meal.createdAt), "dd/MM/yyyy") : "-"}
            </p>
          </div>
        </div>
      )}

      {/* order Info */}
      {order && (
        <div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
            order Information
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">order ID:</p>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{order.id}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Name:</p>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{order.first_name + order.last_name}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewPaymentData;