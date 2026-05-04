"use client";

import * as React from "react";
import { motion } from "framer-motion";

export interface CardSkeletonProps {
  className?: string;
  imageRatio?: string;
  showAvatar?: boolean;
  contentLines: number;
  showActions?: boolean;
  minHeight?: string;
  width?: string;
  rounded?: string;
}

const CardSkeleton: React.FC<CardSkeletonProps> = ({
  className,
  imageRatio,
  showAvatar,
  contentLines,
  showActions,
  minHeight,
  width,
  rounded,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.99 }}
      transition={{ duration: 0.3, ease: [0.4, 0.1, 0.2, 1] }}
      aria-hidden="true"
      className={[
        "bg-card",
        "text-card-foreground",
        "border",
        "border-border",
        "shadow-sm",
        "flex",
        "flex-col",
        "overflow-hidden",
        width,
        minHeight,
        rounded,
        "group",
        "animate-pulse",
        className,
      ].join(" ")}
    >
      {/* Skeleton Image */}
      <div
        className={[
          "relative",
          "w-full",
          imageRatio,
          "bg-muted",
          "overflow-hidden",
          rounded,
        ].join(" ")}
      >
        <div className="absolute inset-0 w-full h-full bg-muted" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-muted to-transparent" />
      </div>

      <div className="flex flex-col gap-6 p-6 flex-1">
        
        {/* Avatar/Meta skeleton */}
        {showAvatar && (
          <div className="flex items-center gap-4">
            <div
              className={[
                "w-10",
                "h-10",
                "bg-muted",
                "border",
                "border-border",
                "flex-shrink-0",
                "animate-pulse",
                "mr-2",
                "rounded-full",
              ].join(" ")}
            />
            <div className="flex flex-col flex-1 gap-2">
              <div className="h-5 w-2/3 bg-muted rounded" />
              <div className="flex gap-2">
                <div className="h-3 w-16 bg-muted rounded" />
                <div className="h-3 w-10 bg-muted rounded" />
              </div>
            </div>
          </div>
        )}

        {/* Content lines for description, adjustable */}
        <div className="flex flex-col gap-2 mt-3">
          {Array.from({ length: Math.max(contentLines, 1) }).map((_, idx) => (
            <div
              key={idx}
              className={[
                "h-4",
                idx === contentLines - 1 ? "w-4/5" : "w-full",
                "bg-muted",
                "rounded",
              ].join(" ")}
            />
          ))}
        </div>

        {/* CTA/Footer Actions */}
        {showActions && (
          <div className="flex items-center justify-between gap-4 mt-auto pt-4">
            <div className="h-3 w-14 bg-muted rounded animate-pulse" />
            <div className="h-10 w-28 rounded-lg bg-muted animate-pulse" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CardSkeleton;
