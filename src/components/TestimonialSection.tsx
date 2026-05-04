"use client";
import { Star, StarHalf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";

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

export default function TestimonialSection({
  testomonialdata,
}: {
  testomonialdata: TopProviderItem[];
}) {
  const renderStars = (avg: number) => {
    const fullStars = Math.floor(Number(avg));
    const hasHalfStar = Number(avg) % 1 >= 0.5;
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => {
          if (i < fullStars) {
            return (
              <Star key={i + "full"} className="w-4 h-4 text-yellow-400 fill-yellow-400" aria-label="Full star" />
            );
          }
          if (i === fullStars && hasHalfStar) {
            return (
              <StarHalf key={i + "half"} className="w-4 h-4 text-yellow-400 fill-yellow-400" aria-label="Half star" />
            );
          }
          return (
            <Star key={i + "empty"} className="w-4 h-4 text-muted-foreground" aria-label="Empty star" />
          );
        })}
      </div>
    );
  };

  return (
    <section className="w-full py-14 md:py-20 px-2 sm:px-4 md:px-10 xl:px-0 bg-muted/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <h2 className="text-2xl md:text-4xl xl:text-5xl font-bold mb-4 text-foreground">
            Meet the <span className="text-primary">Top Providers</span>
          </h2>
          <p className="text-muted-foreground mb-0 text-base md:text-lg max-w-2xl mx-auto">
            Discover the best-rated restaurants, trusted for flavor and excellence.
          </p>
        </motion.div>
        <Marquee pauseOnHover gradient={false} speed={40}>
          <div className="flex gap-4 md:gap-6 pr-4 md:pr-6">
            {testomonialdata.map((item) => {
              const avgRating = item.avgRating ?? 0;
              const totalReviews = item.totalReviews ?? 0;
              return (
                <div
                  key={item.id}
                  className="relative bg-card rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col min-h-[280px] w-[240px] md:w-[290px] overflow-hidden shrink-0"
                >
                  {/* Profile & Header */}
                  <div className="flex items-center gap-3 mb-2 px-5 pt-5">
                    <div className="relative w-12 h-12 md:w-14 md:h-14 shrink-0">
                      <Link href={`/providers/${item.id}`}>
                        <Image
                          src={item.image ?? "/placeholder-user.jpg"}
                          alt={item.restaurantName ?? "Provider"}
                          fill
                          className="rounded-full object-cover border-2 border-primary/20 shadow-md"
                          sizes="56px"
                        />
                      </Link>
                      <span className="absolute bottom-0 right-0 bg-primary w-3 h-3 rounded-full border-2 border-card"></span>
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="font-semibold text-sm md:text-base text-card-foreground">{item.restaurantName}</h3>
                      <span className="text-muted-foreground text-xs font-medium">{item.address}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="flex-1 flex flex-col justify-start px-5 pb-4">
                    <p className="text-muted-foreground text-xs leading-relaxed mb-3 line-clamp-2">{item.description}</p>
                    <div className="flex-grow" />
                    {/* Ratings and View Button */}
                    <div className="flex items-center justify-between mt-2 gap-2">
                      <div className="flex items-center gap-1 flex-wrap">
                        {renderStars(avgRating)}
                        <span className="text-card-foreground font-semibold text-xs pl-1">{Number(avgRating).toFixed(1)}</span>
                        <span className="text-muted-foreground text-xs">({totalReviews})</span>
                      </div>
                      <Link
                        href={`/providers/${item.id}`}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs px-3 py-1.5 rounded-lg shadow-sm transition-all duration-150 hover:-translate-y-0.5 outline-none focus:ring-2 focus:ring-ring shrink-0"
                      >
                        View
                      </Link>
                    </div>
                  </div>

                  {/* Decorative accent */}
                  <div className="absolute -right-6 -bottom-6 opacity-0 group-hover:opacity-10 pointer-events-none transition-all duration-500">
                    <div className="w-20 h-20 rounded-full bg-primary" />
                  </div>
                </div>
              );
            })}
          </div>
        </Marquee>
      </div>
    </section>
  );
}
