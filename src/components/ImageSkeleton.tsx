"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";

// If image support na dile (src nai or blank or undefined), sekhane 'no image' dekabe
export default function ImageWithSkeleton({
  src,
  alt,
  className,
  blurDataURL,
  containerClassName,
  rounded = true,
}: {
  src?: string;
  alt: string;
  className?: string;
  blurDataURL?: string;
  containerClassName?: string;
  rounded?: boolean;
}) {
  const [loading, setLoading] = useState(true);

  // Image provided kina check
  const hasImage: boolean =
    !!src &&
    typeof src === "string" &&
    src.trim() !== "" &&
    src !== "undefined" &&
    src !== "null";

  return (
    <div
      className={cn(
        "relative w-full h-full bg-card overflow-hidden",
        rounded && "rounded-xl",
        containerClassName
      )}
      data-testid="image-skeleton-container"
      role="presentation"
    >
      {/* Skeleton Loader */}
      <AnimatePresence>
        {loading && hasImage && (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 4 }}
            transition={{ duration: 0.3, ease: [0.4, 0.1, 0.2, 1] }}
            className={cn(
              "absolute inset-0 z-10 w-full h-full pointer-events-none",
              "animate-pulse",
              "bg-muted"
            )}
            aria-hidden="true"
          >
            <Skeleton
              className={cn(
                "w-full h-full bg-muted",
                rounded && "rounded-xl"
              )}
              data-testid="image-skeleton"
            />
          </motion.div>
        )}
      </AnimatePresence>
      {/* If image support ache then image show korbe, na thakle "No image" */}
      {src && hasImage ? (
        <Image
          src={src}
          alt={alt || "bitebase"}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          placeholder={blurDataURL ? "blur" : undefined}
          blurDataURL={blurDataURL}
          loading="lazy"
          priority={false}
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
          className={cn(
            "object-cover object-center w-full h-full block transition-opacity duration-300",
            loading ? "opacity-0" : "opacity-100",
            rounded && "rounded-xl",
            className
          )}
          draggable={false}
          data-testid="image-loaded"
        />
      ) : (
        <div
          className={cn(
            "flex flex-col items-center justify-center w-full h-full text-muted-foreground",
            rounded && "rounded-xl"
          )}
          style={{ minHeight: 80, backgroundColor: "#f3f4f6" }}
          data-testid="no-image"
        >
          <Image
            src={"/images/default-meal.jpg"}
            alt="No image"
            fill
            className={cn(
              "object-contain object-center w-full h-full block opacity-70",
              rounded && "rounded-xl"
            )}
            draggable={false}
            style={{ filter: "grayscale(100%)", background: "#f3f4f6" }}
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)}
          />
          <span
            className="absolute inset-0 flex items-center justify-center font-medium text-xs select-none z-10"
            style={{ pointerEvents: "none" }}
          >
            No image
          </span>
        </div>
      )}
    </div>
  );
}