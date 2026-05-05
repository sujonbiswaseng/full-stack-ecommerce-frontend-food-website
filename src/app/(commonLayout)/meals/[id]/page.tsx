import { mealsService } from "@/services/meals.service";
import { getSession } from "@/services/auth.service";
import { TResponseMeals } from "@/types/meals.type";
import { TUser } from "@/types/user.type";
import SignleMealByid from "@/components/modules/meals/singleMeal";
import { TGetCategory } from "@/types/category";
import { IProviderInfo } from "@/types/provider.type";
import { IgetReviewData } from "@/types/reviews.type";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import ErrorFallback from "@/components/shared/ErrorFallback";

export default async function SingleMealPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await mealsService.getmealsbyid(id);
  const userinfo = await getSession();

  return (
    <>
      <title>Meal Details</title>
      <ErrorBoundary
        fallback={
          <ErrorFallback
            title="Meal Error"
            message="Sorry, we couldn't load this meal right now. It might not exist or something went wrong on our end."
          />
        }
      >
        {(!res.success || res.error || !res.result?.data) ? (
          <ErrorFallback
            title="Meal Not Found"
            message="We couldn't find the meal you were looking for, or there was a problem fetching its details."
          />
        ) : (
          <div className="p-4 max-w-[1440px] mx-auto">
            <SignleMealByid
              meal={
                res.result.data as TResponseMeals<{
                  category: TGetCategory;
                  provider: IProviderInfo;
                  reviews: IgetReviewData[];
                  providerRating: any;
                }>
              }
              userinfo={userinfo?.data as TUser}
            />
          </div>
        )}
      </ErrorBoundary>
    </>
  );
}