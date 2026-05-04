"use client";
import { TResponseMeals } from "@/types/meals.type";
import { manageCartStore } from "@/store/CartStore";
import { useRouter } from "next/navigation";
import { TResponseproviderData } from "@/types/provider.type";
import { cn } from "@/lib/utils";
import { TUser } from "@/types/user.type";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import ImageWithSkeleton from "@/components/ImageSkeleton";

type MealCardProps = {
  meal: TResponseMeals<{ provider: TResponseproviderData<{ user: TUser }> }>;
  className?: string;
};

const fadeUp = {
  initial: { opacity: 0, y: 16, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } }
};

const MealCard = ({ meal, className }: MealCardProps) => {
  const { addToCart } = manageCartStore();
  const router = useRouter();
  const fullStars = Math.floor(Number(meal.avgRating));
  const hasHalfStar = Number(meal.avgRating) % 1 >= 0.5;
  const restaurantName = meal.provider?.restaurantName || "Unknown Restaurant";
  const providerInitials = restaurantName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.article
      variants={fadeUp}
      initial="initial"
      animate="animate"
      className={cn(
        "h-full w-full rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary flex flex-col",
        className
      )}
    >
      <div className="relative aspect-[4/3] w-full bg-muted rounded-t-xl overflow-hidden">
        {meal.images ? (
          <ImageWithSkeleton
            src={meal.images[0]}
            alt={meal.meals_name}
            
            className="object-cover w-full h-full"
          />
    
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-muted text-base sm:text-lg">
            No Image
          </div>
        )}

        <Badge
          variant="secondary"
          className="absolute left-4 top-4 text-xs px-3 py-1 rounded-full capitalize border-transparent"
        >
          {meal.category_name}
        </Badge>
        <Badge
          variant={meal.isAvailable ? "default" : "secondary"}
          className={cn(
            "absolute right-4 top-4 text-xs px-3 py-1 rounded-full font-semibold",
            meal.isAvailable ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground"
          )}
        >
          {meal.isAvailable ? "Available" : "Sold Out"}
        </Badge>
      </div>

      <div className="flex flex-col flex-1 p-6 gap-4">
        <div className="flex items-start justify-between gap-4">
          <h2 className="line-clamp-1 text-lg font-bold text-card-foreground">
            {meal.meals_name}
          </h2>
          <span className="shrink-0 text-xl font-bold text-primary ">
          ৳{meal.price.toFixed(1)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 border-b border-border pb-3">
          <p className="truncate text-xs sm:text-sm text-muted-foreground">
            {meal.cuisine}
            {meal.dietaryPreference && <> • {meal.dietaryPreference}</>}
          </p>
          <div className="flex shrink-0 items-center">
            {Array.from({ length: 5 }).map((_, i) => {
              if (i < fullStars) {
                return (
                  <span
                    key={`full-${i}`}
                    className="text-xs sm:text-sm text-amber-400"
                    aria-label="Full Star"
                  >
                    ★
                  </span>
                );
              }
              if (i === fullStars && hasHalfStar) {
                return (
                  <span
                    key={`half-${i}`}
                    className="text-xs sm:text-sm text-amber-200"
                    aria-label="Half Star"
                  >
                    ★
                  </span>
                );
              }
              return (
                <span
                  key={`empty-${i}`}
                  className="text-xs sm:text-sm text-muted-foreground"
                  aria-label="Empty Star"
                >
                  ★
                </span>
              );
            })}
            <span className="ml-1 text-[10px] sm:text-xs text-muted-foreground">
              ({meal.totalReviews || 0})
            </span>
          </div>
        </div>

        <p className="line-clamp-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
          {meal.description}
        </p>

        <div className="rounded-lg border border-border bg-background p-4 flex flex-col gap-2 mt-auto">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              Provider
            </span>
            <span className="text-xs font-semibold text-primary">
              Delivery: <span className="tabular-nums">৳{Number(meal.deliverycharge ?? 0).toFixed(0)}</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            {meal.provider?.user.image ? (
              <Link href={`/providers/${meal.provider.id}`}>
                <Image
                  width={36}
                  height={36}
                  src={meal.provider.user.image as string}
                  alt={meal.provider.user.name || restaurantName}
                  className="size-9 rounded-full border border-border object-cover"
                />
              </Link>
            ) : (
              <div className="flex size-9 items-center justify-center rounded-full border border-border bg-muted text-xs font-bold text-muted-foreground">
                {providerInitials || "NA"}
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-card-foreground">
                {restaurantName}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {meal.provider?.address || "Address not available"}
              </p>
            </div>
          </div>
        </div>

        {/* BUTTONS - Redesigned for a more modern, professional and responsive look */}
        <div className="flex gap-2 pt-3 mt-2">
          <Button
            variant="outline"
            className="flex-1 px-0 sm:px-4 min-w-0 truncate font-medium border-2 border-primary transition hover:bg-primary/10 active:bg-primary/20 shadow-sm"
            onClick={() => router.push(`/meals/${meal.id}`)}
            tabIndex={0}
          >
            <span className="w-full text-center">View Details</span>
          </Button>
          <Button
            variant="default"
            className={cn(
              "flex-1 px-0 sm:px-4 min-w-0 truncate font-medium border-2 border-emerald-500 bg-emerald-500 text-white transition hover:bg-emerald-600 active:bg-emerald-700 shadow-sm",
              !meal.isAvailable && "opacity-50 cursor-not-allowed line-through"
            )}
            onClick={() =>
              addToCart({
                id: meal.id,
                mealid: meal.id,
                name: meal.meals_name,
                restaurantName: meal.provider?.restaurantName || "Unknown Restaurant",
                price: meal.price,
                deliverycharge: meal.deliverycharge ?? 0,
                image: meal.images && meal.images.length > 0 ? meal.images[0] : "",
                isAvailable: meal.isAvailable,
                quantity: 1,
              })
            }
            disabled={!meal.isAvailable}
            aria-disabled={!meal.isAvailable}
            tabIndex={0}
          >
            <span className="w-full text-center">Add to Cart</span>
          </Button>
        </div>
      </div>
    </motion.article>
  );
};

export default MealCard;
