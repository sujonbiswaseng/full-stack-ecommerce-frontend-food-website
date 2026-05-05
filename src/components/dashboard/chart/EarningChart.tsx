"use client";

import { MonthlyRevenue } from "@/types/stats.type";
import React from "react";
import PieChart from "./PieChart";
import Curve from "./Curve";

/**
 * CurveChart displays the monthly earnings line chart in an enterprise SaaS card using only design tokens, 
 * highly responsive, accessible, and with a modern professional feel.
 */
const CurveChart = ({ stats }: { stats: MonthlyRevenue[] }) => {
  return (
    <section
      className={`
        h-full w-full p-6 rounded-2xl bg-card border border-border
        shadow-lg relative overflow-hidden flex flex-col
        min-h-[280px] md:min-h-[340px]
        transition-colors
        focus-visible:ring-2 focus-visible:ring-ring
      `}
      aria-label="Earnings Insights Monthly Chart"
      tabIndex={0}
    >
      <div className="absolute left-6 right-6 top-4 h-2 bg-accent/40 blur-md rounded-full z-10 pointer-events-none" />
      <div className="mb-4 flex items-center gap-2 z-20">
        <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
        <h2 className="font-semibold text-lg md:text-xl text-card-foreground tracking-tight">
          Earnings Insights
        </h2>
      </div>
      <div className="flex-1 w-full relative z-20 flex items-center px-2 md:px-4">
        <Curve stats={stats as MonthlyRevenue[]} />
      </div>
      <span className="absolute -inset-1 rounded-2xl pointer-events-none bg-accent/10 blur-sm" />
      <span className="absolute bottom-2 left-10 w-20 h-6 bg-accent/10 blur-xl rounded-full" />
    </section>
  );
};
export { CurveChart };

interface EarningRateProps {
  earningRate: number;
  earningRateLastMonth: number;
}

const EarningRate: React.FC<EarningRateProps> = ({
  earningRate,
  earningRateLastMonth,
}) => {
  const percentageChange =
    earningRateLastMonth === 0
      ? 0
      : ((earningRate - earningRateLastMonth) / Math.abs(earningRateLastMonth)) * 100;

  const isProfitUp = percentageChange >= 0;
  const formattedChange = Math.abs(percentageChange).toFixed(2);

  return (
    <section
      className={`
        h-full w-full p-6 flex flex-col justify-between gap-4
        rounded-2xl bg-card border-2 ${isProfitUp ? "border-primary/40" : "border-secondary/40"}
        shadow-lg relative overflow-hidden transition-all
        focus-visible:ring-2 focus-visible:ring-ring
      `}
      aria-label="Earnings Rate Overview"
      tabIndex={0}
    >
      <div className="absolute right-7 top-2 w-20 h-6 bg-accent/30 blur-lg rounded-full pointer-events-none" />
      <div className="relative py-2">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-card-foreground flex items-end gap-1">
          {earningRate.toLocaleString()}
          <span className="text-base font-normal text-muted-foreground mb-1">
            taka
          </span>
        </h2>
        <span
          className={`
            inline-flex items-center gap-1 text-sm font-medium my-2
            px-3 py-1 rounded-full
            ${isProfitUp
              ? "bg-primary/10 text-primary"
              : "bg-secondary/20 text-secondary"}
            shadow-sm md:text-base
          `}
        >
          <svg
            className={`w-5 h-5 ${isProfitUp ? "" : "rotate-180"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isProfitUp
                  ? "M5 10l7-7m0 0l7 7m-7-7v18"
                  : "M19 14l-7 7m0 0l-7-7m7 7V3"
              }
            />
          </svg>
          {isProfitUp ? "Higher" : "Lower"} by {formattedChange}% than last month
        </span>
        <p className="text-xs md:text-sm text-muted-foreground">
          Compared to last month’s earnings:{" "}
          <strong className="text-foreground">
            {earningRateLastMonth.toLocaleString()} taka
          </strong>
        </p>
      </div>
      <div className="mt-4 flex items-center justify-center w-full relative">
        <PieChart
          percentage={Math.min(
            Math.max(
              Number(
                ((earningRate / (earningRateLastMonth || 1)) * 100).toFixed(0)
              ),
              0
            ),
            100
          )}
        />
        <span className="absolute left-2 top-0 w-3 h-3 bg-accent/40 rounded-full blur-sm" />
      </div>
      <span className="absolute bottom-0 left-0 h-7 w-full bg-gradient-to-t from-accent/20 to-transparent" />
    </section>
  );
};

const Earnings = ({
  earningRate,
  stats,
}: {
  earningRate: number;
  stats: MonthlyRevenue[];
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-[1440px] mx-auto">
      <div className="min-w-0 w-full flex">
        <EarningRate
          earningRate={earningRate}
          earningRateLastMonth={stats[11]?.revenue ?? 0}
        />
      </div>
      <div className="min-w-0 w-full lg:col-span-2 flex">
        <CurveChart stats={stats as MonthlyRevenue[]} />
      </div>
    </div>
  );
};

export default Earnings;