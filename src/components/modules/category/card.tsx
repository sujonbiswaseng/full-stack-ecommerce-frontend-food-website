'use client';

import { TGetCategory, TResponseCategoryData } from "@/types/category";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import * as React from "react";
import ImageSkeleton from "@/components/ImageSkeleton";
import ImageWithSkeleton from "@/components/ImageSkeleton";
import BlogCardSkeleton from "@/components/Skeleton/CardSkeleton";
import CardSkeleton from "@/components/Skeleton/CardSkeleton";

// Skeleton loader for card grid
function CategoriesSkeleton() {
  return (
    <div
      className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        xl:grid-cols-4 
        gap-4 md:gap-6 xl:gap-8
        mt-4
      "
      data-testid="categories-skeleton"
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="rounded-lg bg-card shadow-sm flex flex-col group/loader h-full"
        >
          <Skeleton className="w-full h-[140px] rounded-t-lg bg-muted" />
          <div className="flex-1 flex flex-col justify-between p-4 gap-4">
            <Skeleton className="h-5 w-1/2 bg-muted rounded" />
            <Skeleton className="h-4 w-2/3 bg-muted rounded" />
            <Skeleton className="h-9 w-full rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function FoodCategories({
  categories,
}: { categories: TGetCategory[] }) {
  const router = useRouter();
  const [loadingIndex, setLoadingIndex] = React.useState<number | null>(null);

  const [isLoading, setIsLoading] = React.useState(true);

  const [CategoryData, setCategoryData] = React.useState<TResponseCategoryData[]>();

React.useEffect(() => {
  if(categories.length>0){
    setCategoryData(categories || []);
    setIsLoading(false)
  }else{
    setIsLoading(true)
  }
  
}, [categories]);

  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 16, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <section className="w-full bg-background py-10 sm:py-12 md:py-14 lg:py-16">
      <div className="container max-w-[1440px] mx-auto w-full px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
            Explore Our Categories
          </h2>
          <p className="text-muted-foreground mt-2 sm:mt-3 max-w-2xl mx-auto text-base md:text-lg">
            Discover the best restaurants and dishes carefully selected to satisfy your cravings.
          </p>
        </div>
        {/* Categories Grid */}

        {isLoading ? (
          <div className="w-full flex justify-center gap-6">
            {Array.from({ length: 4 }).map((_, idx) => (
              <CardSkeleton
                key={idx}
                className="w-full"
                contentLines={1}
                minHeight="h-[300px]"
                showActions={false}
                showAvatar={false}
                imageRatio="aspect-[4/2.5]"
                rounded="rounded-xl"
              />
            ))}
          </div>
    
        ) : (<AnimatePresence>
          {CategoryData && CategoryData.length > 0 ? (
            <motion.div
              className="
                grid 
                grid-cols-1 
                sm:grid-cols-2 
                md:grid-cols-3 
                xl:grid-cols-4 
                gap-4 md:gap-6 xl:gap-8
              "
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  variants={cardVariants}
                  className={`
                    group/card
                    bg-card
                    border border-border
                    rounded-xl
                    shadow
                    flex flex-col
                    cursor-pointer
                    transition-transform
                    focus-within:ring-2
                    focus-within:ring-ring
                    hover:shadow-lg
                    hover:-translate-y-1
                    min-h-[320px]
                    h-full
                  `}
                  tabIndex={0}
                  role="button"
                  aria-label={`See category ${category.name}`}
                  onClick={() => {
                    setLoadingIndex(index);
                    router.push(`/category/${category.id}`);
                  }}
                  onKeyDown={e => {
                    if (e.key === "Enter" || e.key === " ") {
                      setLoadingIndex(index);
                      router.push(`/category/${category.id}`);
                    }
                  }}
                >
                  {/* Image */}
                  <div className="relative w-full aspect-[4/2.5] rounded-t-xl overflow-hidden bg-muted">
                    <ImageWithSkeleton
                        src={category.image}
                      alt={category.name}
                      className="object-cover object-center transition-transform duration-300 group-hover/card:scale-105"
                     
                      blurDataURL="/placeholder.png"
                    />
                  </div>
                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-between p-4 gap-4">
                    <div>
                      <h3 className="font-semibold text-lg md:text-xl text-card-foreground mb-2 truncate group-hover/card:text-primary transition-colors">
                        {category.name}
                      </h3>
                  
                    </div>
                    <div className="flex items-center justify-between mt-2">
                   
                      <Button
                        size="sm"
                       
                        className="rounded font-medium"
                        tabIndex={-1}
                        aria-label={`Browse ${category.name}`}
                        onClick={e => {
                          e.stopPropagation();
                          setLoadingIndex(index);
                          router.push(`/category/${category.id}`);
                        }}
                        disabled={loadingIndex === index}
                      >
                        {loadingIndex === index ? (
                          <span className="flex items-center gap-2">
                            <span className="animate-spin rounded-full border-2 border-current border-t-transparent w-4 h-4" />
                            Loading...
                          </span>
                        ) : (
                          <>Browse</>
                        )}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <CategoriesSkeleton />
          )}
        </AnimatePresence>)}
      </div>
    </section>
  );
}