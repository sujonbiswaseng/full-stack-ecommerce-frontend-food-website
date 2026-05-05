export type Month = 
  | "Jan" | "Feb" | "Mar" | "Apr" | "May" | "Jun" 
  | "Jul" | "Aug" | "Sep" | "Oct" | "Nov" | "Dec";

export interface ICounts {
    mealsCount: number;
    orderCount: number;
    reviewCount: number;
    userCount:number;
    paymentCount:number
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
}
export interface IOrderStatus {
    cancelledorder: number;
    deliveredorder: number;
    placedorder: number;
    preparingorder: number;
    readyorder: number;
}


export type PublicStats = {
  totalmeals: number;
  totalUsers: number;
  totalCustomer: number;
  totalprovider: number;
  totalAdmins: number;
  totalorders: number;
  totalcategory: number;
  totalReviews: number;
  totalNewsletters: number;
};

export interface IMealsStatus {
    approvedmeals: number;
    pendingmeals: number;
    rejectedmeals: number;
}

export interface DashboardData {
  counts: ICounts;
  mealStatus:IMealsStatus;
  totalRevenue: number;
  monthlyRevenue: MonthlyRevenue[];
  order:IMealsStatus
}