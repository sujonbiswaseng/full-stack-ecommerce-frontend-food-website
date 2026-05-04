import { getCategory } from "@/actions/category";
import FoodCategories from "@/components/modules/category/card";
import HeroSlider from "@/components/heroslider";
import MealCard from "@/components/modules/meals/MealCard";
import Notfounddata from "@/components/Notfounddata";
import TestimonialSection from "@/components/TestimonialSection";
import {  TResponseCategoryData } from "@/types/category";
import {  TResponseMeals } from "@/types/meals.type";
import {  TResponseproviderData } from "@/types/provider.type";
import Link from "next/link";
import { getAllMeals } from "@/actions/meals.action";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import { getTopProviderUser } from "@/actions/provider.actions";
import { TUser } from "@/types/user.type";
import FeaturesSection from "@/components/modules/home/features-section";
import StatsSection from "@/components/modules/home/stats-section";
import FAQSection from "@/components/modules/home/faq-section";
import NewsletterSection from "@/components/modules/home/newsletter-section";
import CTASection from "@/components/modules/home/cta-section";
import Footer from "@/components/shared/footer";

export default async function HomePage() {
  const mealdata = await getAllMeals();
  const categories = await getCategory();
  const providerinfo = await getTopProviderUser();

  if (!providerinfo?.success || !providerinfo.data) {
    return (
      <Notfounddata
        content="Provider information not found"
        emoji="⚠️"
      />
    );
  }

  return (
    <div className="min-h-screen">
      <HeroSlider />

      <ErrorBoundary
        fallback={
          <Notfounddata
            content="Something went wrong loading categories"
            emoji="⚠️"
          />
        }
      >
        {!categories?.success || !categories.data ? (
          <Notfounddata content="categories data not found" />
        ) : (
          <FoodCategories
            categories={categories?.data as TResponseCategoryData[]}
          />
        )}
      </ErrorBoundary>

      <FeaturesSection />

      <div className="space-y-8 py-8 px-4 max-w-[1440px] mx-auto">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Popular Meals
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Discover delicious dishes from top-rated restaurants in your area
          </p>
          <div className="flex justify-center mb-8">
            <Link
              href="/meals"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              View All Meals
            </Link>
          </div>
        </div>

        <ErrorBoundary
          fallback={
            <Notfounddata
              content="Something went wrong loading meals"
              emoji="⚠️"
            />
          }
        >
          {!mealdata.data || !mealdata.success ? (
            <Notfounddata content="no meal found" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mealdata.data.slice(0, 8).map((meal) => (
                <MealCard
                  key={meal.id}
                  meal={
                    meal as TResponseMeals<{
                      provider: TResponseproviderData<{user:TUser}>;
                    }>
                  }
                />
              ))}
            </div>
          )}
        </ErrorBoundary>
      </div>

      <StatsSection />

      <ErrorBoundary
        fallback={
          <Notfounddata
            content="Something went wrong loading testimonials"
            emoji="⚠️"
          />
        }
      >
        {!providerinfo.data.data.topProviders ? (
          <Notfounddata content="provider data not found" />
        ) : (
          <TestimonialSection
            testomonialdata={
              providerinfo.data.data.topProviders as any
            }
          />
        )}
      </ErrorBoundary>

      <FAQSection />

      <NewsletterSection />

      <CTASection />
    </div>
  );
}
