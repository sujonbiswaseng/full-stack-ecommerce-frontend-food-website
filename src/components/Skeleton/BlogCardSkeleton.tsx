import React from "react";

const BlogCardSkeleton = () => (
  <div
    className="
      group relative flex flex-col bg-card border border-border rounded-2xl shadow transition-shadow
      overflow-hidden max-w-[420px] min-w-[320px] w-full mx-auto animate-pulse
    "
    aria-hidden="true"
  >
    {/* Image Skeleton */}
    <div className="aspect-[16/9] w-full bg-muted border-b border-border overflow-hidden relative">
      <div className="w-full h-full bg-muted animate-pulse rounded-t-2xl" />
      <span className="absolute top-0 left-0 w-full h-[3px] bg-accent block z-10 opacity-60" />
    </div>
    {/* Card Content Skeleton */}
    <div className="flex flex-col flex-1 px-6 py-6 gap-4 bg-card">
      {/* Title Skeleton */}
      <div className="h-6 md:h-7 bg-muted rounded w-2/3 mb-3" />
      {/* Excerpt Skeleton */}
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded w-full" />
        <div className="h-4 bg-muted rounded w-5/6" />
        <div className="h-4 bg-muted rounded w-3/4" />
      </div>
      {/* Author, Meta, Event Skeleton */}
      <div className="flex items-center justify-between gap-2 mt-2">
        {/* Author */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center shadow-sm" />
          <div className="h-4 w-16 bg-muted rounded" />
        </div>
        {/* Meta */}
        <div className="flex flex-col items-end gap-1">
          <div className="h-3 w-14 bg-muted rounded mb-1" />
          <div className="h-4 w-20 bg-secondary rounded" />
        </div>
      </div>
      {/* CTA Button Skeleton */}
      <div className="mt-6 flex">
        <div className="h-10 w-32 bg-primary/40 rounded-lg" />
      </div>
    </div>
    {/* Card outline/focus effect */}
    <span className="pointer-events-none absolute inset-0 ring-0 rounded-2xl" />
  </div>
);

export default BlogCardSkeleton;