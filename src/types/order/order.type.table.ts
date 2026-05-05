export type OrderStatus =
  | "PLACED"
  | "PREPARING"
  | "READY"
  | "DELIVERED"
  | "CANCELLED";
export type MealType = {
  id: string;
  title: string;
  category_name: string;
  price: number;
  image: string;
};

export type OrderItemType = {
  id: string;
  mealId: string;
  orderId: string;
  quantity: number;
  price: number;
  meal: MealType;
};

export type OrderType = {
  id: string;
  providerId: string;
  customerId: string;
  address: string;
  status: OrderStatus;
  totalPrice: number;
  createdAt: string; // API থেকে string আসবে
  updatedAt: string;
  order: OrderItemType[];
};