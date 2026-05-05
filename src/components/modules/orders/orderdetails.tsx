'use client'
import { Status, StatusIndicator, StatusLabel } from "@/components/ui/status";
import { manageCartStore } from "@/store/CartStore";
import { IGetOrderData } from "@/types/order/order.type";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function OrderDetails({ orderdetails }: { orderdetails: IGetOrderData }) {
    const order = orderdetails;
    const defaultProfile = 'https://res.cloudinary.com/drmeagmkl/image/upload/v1766941482/chatgpt_m8tmep.png'
    const orderdata = orderdetails
    if (!order) return notFound();
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl border border-gray-200">
            {/* Header */}

            <h2 className="text-[20px] md:text-[24px] lg:text-[30px] font-bold">Oder Details</h2>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <div>
                    <h2 className="text-gray-900 font-semibold">
                        name : {orderdata.first_name} {orderdata.last_name}
                    </h2>

                    <p className="text-gray-900"> <span className="font-semibold">phone :</span> {orderdata.phone}</p>
                    <p className="text-gray-900"> <span className="font-semibold">address :</span> {orderdata.address}</p>
                    <p className="text-gray-900"> <span className="font-semibold">total price :</span> ৳{orderdata.totalPrice}</p>
                </div>
                <div className="mt-2 sm:mt-0">
                    <span>
                        {orderdata.status === "CANCELLED" ? (<Status variant="error" className="bg-red-400 text-white">
                            <StatusIndicator />
                            <div className='flex items-center'>
                                <p className='text-gray-800'>{orderdata.status}</p>
                                <StatusLabel ></StatusLabel>
                            </div>

                        </Status>) : (<Status variant="success" className="bg-green-400 text-white">
                            <StatusIndicator />
                            <div className='flex items-center'>
                                <p className='text-gray-800'>{orderdata.status}</p>
                                <StatusLabel ></StatusLabel>
                            </div>
                        </Status>)}
                    </span>
                </div>
            </div>

            {/* Order Items */}
            <div className="divide-y divide-gray-200">
                {orderdata.orderitem.map((item: any, idx: any) => (
                    <div key={idx} className="flex flex-row max-[370px]:flex-col items-center max-[370px]:justify-center space-y-1 mt-2">
                        <img
                            src={item.meal.image || defaultProfile}
                            alt={item.meal.title}
                            className="w-20 h-20 rounded-lg object-cover mr-4"
                        />

                        <div className="flex-1 max-[370px]:text-justify">
                            <Link
                                href={`/meals/${item.meal.id}`}
                                className="text-blue-600 hover:underline font-medium"
                            >
                                {item.meal.id.slice(0, 8)}...
                            </Link>
                            <h3 className="font-semibold text-gray-800">{item.meal.title}</h3>
                            <p className="text-gray-500 text-sm">{item.meal.category_name}</p>
                            {item.meal.cuisine && <p className="text-gray-400 text-sm">{item.meal.cuisine}</p>}
                        </div>
                        <div className="mt-2 sm:mt-0 text-right max-[370px]:text-left mb-2">
                            <div>
                                <p className="text-gray-700 font-medium">
                                    quantity: {item.quantity}
                                </p>
                            </div>

                            <p className="text-gray-700 font-medium">
                                price : ৳ {item.price.toFixed(2)}
                            </p>
                            {/* Total Price */}
                            <div className="mt-4 flex justify-end items-center">
                                <span className="text-lg font-semibold text-gray-900">
                                    Total price: ৳ { Number(item.price)*Number(item.quantity)}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Created & Updated */}
            <div className="mt-2 text-sm text-gray-400 text-right">
                <p>Created: {new Date(orderdata.createdAt).toLocaleString()}</p>
                <p>Updated: {new Date(orderdata.updatedAt).toLocaleString()}</p>
            </div>
        </div>
    );
}