"use client";
import { Star, StarHalf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import * as React from "react";

type TopProviderItem = {
  id: string;
  restaurantName: string;
  ownerName: string;
  email: string;
  address: string;
  description: string;
  image: string;
  totalReviews: number;
  avgRating: number;
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut", staggerChildren: 0.12 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

function StarRating({ avg }: { avg: number }) {
  const fullStars = Math.floor(Number(avg));
  const hasHalfStar = Number(avg) % 1 >= 0.5;
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < fullStars) {
          return (
            <Star
              key={i + "full"}
              className="w-4 h-4 text-yellow-400 fill-yellow-400"
              aria-label="Full star"
            />
          );
        }
        if (i === fullStars && hasHalfStar) {
          return (
            <StarHalf
              key={i + "half"}
              className="w-4 h-4 text-yellow-400 fill-yellow-400"
              aria-label="Half star"
            />
          );
        }
        return (
          <Star
            key={i + "empty"}
            className="w-4 h-4 text-muted-foreground"
            aria-label="Empty star"
          />
        );
      })}
    </div>
  );
}

function ProviderCard({
  item,
}: {
  item: TopProviderItem;
}) {
  const avgRating = item.avgRating ?? 0;
  const totalReviews = item.totalReviews ?? 0;

  return (
    <motion.div
      variants={cardVariants}
      className="group relative flex flex-col bg-card border border-border rounded-2xl shadow-sm hover:shadow-lg transition duration-300 w-[260px] md:w-[300px] min-h-[340px] overflow-hidden shrink-0"
    >
      <CardContent className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-4 mb-4">
          <Link
            href={`/providers/${item.id}`}
            className="relative flex-shrink-0 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring rounded-full"
            tabIndex={0}
            aria-label={`View ${item.restaurantName} profile`}
          >
            <div className="relative w-14 h-14 md:w-16 md:h-16">
              <Image
                src={item.image ?? "/placeholder-user.jpg"}
                alt={item.restaurantName ?? "Provider"}
                fill
                className="rounded-full object-cover border-2 border-primary/20 bg-muted"
                sizes="56px"
                priority={false}
              />
              <span className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-primary border-2 border-card"></span>
            </div>
          </Link>
          <div className="flex flex-col min-w-0">
            <h3 className="text-card-foreground font-semibold text-base truncate">
              {item.restaurantName}
            </h3>
            <span className="text-muted-foreground text-xs font-medium truncate max-w-[130px]">
              {item.address}
            </span>
          </div>
        </div>

        <p className="text-muted-foreground text-sm leading-snug mb-4 line-clamp-2 min-h-[40px]">
          {item.description}
        </p>

        <div className="flex items-end justify-between mt-auto">
          <div className="flex items-center gap-2">
            <StarRating avg={avgRating} />
            <span className="text-xs font-medium text-card-foreground">
              {Number(avgRating).toFixed(1)}
            </span>
            <span className="text-muted-foreground text-xs">
              ({totalReviews})
            </span>
          </div>
          <Button asChild size="sm" className="font-semibold px-4 py-2 h-8">
            <Link
              href={`/providers/${item.id}`}
              tabIndex={0}
              aria-label={`View ${item.restaurantName}`}
            >
              View
            </Link>
          </Button>
        </div>
      </CardContent>
      <span className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full bg-accent opacity-0 group-hover:opacity-10 transition duration-300 pointer-events-none" />
    </motion.div>
  );
}

// Skeleton loader for loading state (card + image + text)
function ProviderCardSkeleton() {
  return (
    <Card className="w-[260px] md:w-[300px] min-h-[340px] rounded-2xl border-border bg-card/90 flex flex-col animate-pulse overflow-hidden shrink-0">
      <CardContent className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-input rounded-full border border-border" />
          <div className="flex flex-col gap-2 flex-1">
            <div className="h-4 w-2/3 bg-input rounded" />
            <div className="h-3 w-1/2 bg-input rounded" />
          </div>
        </div>
        <div className="h-3 w-full bg-input rounded mb-1" />
        <div className="h-3 w-4/5 bg-input rounded mb-4" />
        <div className="flex items-center gap-2 mt-auto">
          <div className="h-4 w-24 bg-input rounded" />
          <div className="h-7 w-14 bg-input rounded" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function TestimonialSection({
  testomonialdata,
}: {
  testomonialdata: TopProviderItem[];
}) {
  const isLoading = React.useMemo(() => !testomonialdata?.length, [testomonialdata]);

  return (
    <section
      className="w-full border-t border-border bg-background"
      aria-labelledby="top-providers-section-heading"
      tabIndex={-1}
    >
      <div className="max-w-[1440px] mx-auto w-full px-4 md:px-8 py-8 md:py-16 flex flex-col items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={fadeUpVariants}
          className="w-full text-center mb-8 md:mb-12"
        >
          <h2
            id="top-providers-section-heading"
            className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-2"
          >
            Meet the <span className="text-primary">Top Providers</span>
          </h2>
          <p className="max-w-2xl text-center text-base md:text-lg text-muted-foreground mx-auto">
            Discover the best-rated restaurants, trusted for flavor and excellence.
          </p>
        </motion.div>
        <div className="w-full">
          <Marquee pauseOnHover gradient={false} speed={32} className="w-full">
            <div className="flex gap-4 md:gap-6 pr-4 md:pr-6">
              {isLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <ProviderCardSkeleton key={i} />
                  ))
                : testomonialdata.map((item) => (
                    <ProviderCard key={item.id} item={item} />
                  ))}
            </div>
          </Marquee>
        </div>
      </div>
    </section>
  );
}
