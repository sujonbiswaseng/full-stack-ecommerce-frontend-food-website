"use client";

import { getIconComponent } from "@/lib/IconMapper";
import React from "react";

export type StatCardProps = {
  title: string;
  value: string | number;
  percentage?: string;
  trend?: "up" | "down";
  iconName?: string;
  bgGradient?: string;
};

export const StatsCard: React.FC<StatCardProps> = ({
  title,
  value,
  percentage,
  trend = "up",
  iconName,
  bgGradient,
}) => {
  const trendColor =
    trend === "up"
      ? "text-success dark:text-success"
      : "text-destructive dark:text-destructive";

  const IconComponent = iconName ? getIconComponent(iconName) : null;
  const TrendIcon =
    trend === "up"
      ? getIconComponent("ArrowUpRight")
      : getIconComponent("ArrowDownRight");

  return (
    <div
      className={`
        group relative flex flex-col min-h-[170px] h-full w-full max-w-full
        rounded-2xl border border-border
        bg-card
        shadow-lg
        transition-all duration-300
        hover:shadow-accent/40 hover:-translate-y-1
        overflow-hidden
        p-6
        sm:min-w-[240px]
      `}
    >
      <span className="absolute inset-0 pointer-events-none z-0 rounded-2xl ring-2 ring-accent/15 ring-offset-2 opacity-0 group-hover:opacity-70 transition duration-300" aria-hidden="true" />
      <div className="absolute -inset-1 z-0 pointer-events-none opacity-0 group-hover:opacity-30 blur-lg bg-accent transition-all duration-300" />
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-card-foreground tracking-tight">
            {title}
          </h3>
          {IconComponent && (
            <span className="inline-flex items-center justify-center rounded-full bg-secondary w-10 h-10 border border-border shadow-sm">
              {React.createElement(IconComponent, {
                className: "w-6 h-6 text-accent",
              })}
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
          <span className="text-4xl font-extrabold tracking-tighter text-primary">
            {value}
          </span>
          {percentage && (
            <span
              className={`flex items-center gap-1 text-base font-semibold ${trendColor} transition-colors`}
            >
              {TrendIcon && React.createElement(TrendIcon, { className: "w-5 h-5" })}
              <span>{percentage}%</span>
            </span>
          )}
        </div>
        {title !== "Users" && (
          <div className="relative w-full h-4 rounded-full bg-input shadow-inner overflow-hidden border border-border">
            <div
              className="absolute top-0 left-0 h-full rounded-full bg-accent transition-all duration-300"
              style={{
                width: percentage
                  ? `${Math.min(100, Math.max(0, parseFloat(percentage)))}%`
                  : "50%",
                minWidth: "0.5rem",
                maxWidth: "100%",
              }}
            />
            <span className="absolute left-2 top-1 w-2 h-2 rounded-full bg-secondary blur-[2px] animate-pulse" />
            <span className="absolute left-8 top-2 w-1.5 h-1.5 rounded-full bg-accent/60 blur-[1.5px] animate-pulse" />
            <span className="absolute left-16 top-1.5 w-2 h-2 rounded-full bg-primary/50 blur-[2px]" />
            <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
              <span className="text-xs font-bold text-muted-foreground bg-accent px-2 py-0.5 rounded-full border border-border">
                {percentage || "--"}%
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};