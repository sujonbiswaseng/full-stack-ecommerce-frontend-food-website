"use client";

import React from "react";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  percentage: number;
  amount?: number;
  total?: number;
}

const chartGradientId = "dashboard-pie-gradient";

const PieChart: React.FC<PieChartProps> = ({ percentage, amount, total }) => {
  const safeAmount = typeof amount === "number" ? amount : undefined;
  const safeTotal = typeof total === "number" ? total : undefined;

  // Colors via tokens
  const data = {
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: [
          `url(#${chartGradientId})`,
          "var(--muted, theme('colors.muted.DEFAULT'))"
        ],
        borderColor: [
          "var(--accent, theme('colors.accent.DEFAULT'))",
          "var(--border, theme('colors.border'))"
        ],
        borderWidth: 2,
        cutout: "72%",
        rotation: -135,
        circumference: 270,
        hoverOffset: 4
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    cutout: "72%",
    layout: {
      padding: { top: 0, bottom: 0, left: 0, right: 0 }
    },
    animation: {
      animateRotate: true,
      duration: 300,
      easing: "easeOutCubic"
    }
  };

  return (
    <Card
      className="
        relative flex flex-col items-center justify-center bg-card rounded-2xl
        w-full max-w-[380px] min-h-[186px] 
        md:max-w-[310px] md:min-h-[200px] 
        xl:max-w-[356px] xl:min-h-[224px]
        ring-1 ring-border
        transition-shadow focus-visible:ring-2 focus-visible:ring-ring
        overflow-visible mx-auto
      "
    >
      {/* SVG gradient for Chart */}
      <svg width="0" height="0">
        <defs>
          <linearGradient id={chartGradientId} x1="0%" y1="0%" x2="100%" y2="90%">
            <stop offset="0%" stopColor="var(--primary, #06b6d4)" stopOpacity="0.26" />
            <stop offset="65%" stopColor="var(--accent, #14b8a6)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--secondary, #0ea5e9)" stopOpacity="0.48" />
          </linearGradient>
        </defs>
      </svg>

      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 22 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative w-full flex items-center justify-center"
        style={{ minHeight: "158px", maxHeight: "230px" }}
      >
        <Doughnut
          data={data as any}
          options={options as any}
          style={{ width: "100%", height: "100%" }}
        />
        <div
          className="
            absolute inset-0 flex flex-col items-center justify-center pointer-events-none
            z-10
          "
        >
          <span
            className="
              text-[8vw] sm:text-[32px] md:text-[38px] xl:text-[44px]
              font-black 
              bg-gradient-to-br 
              from-primary via-accent to-secondary
              text-transparent bg-clip-text
              tracking-tight
              leading-tight
            "
          >
            {percentage}%
          </span>
          <span
            className="
              flex items-end gap-2 text-xs md:text-sm font-medium uppercase
              text-muted-foreground tracking-wider mt-1
              transition-colors
            "
          >
            {safeAmount !== undefined && safeTotal !== undefined ? (
              <>
                <span
                  className="font-semibold text-primary bg-primary/5 px-2 py-[2px] rounded-lg ring-1 ring-border"
                >
                  ৳&nbsp;{safeAmount.toLocaleString()}
                </span>
                <span className="text-muted-foreground font-medium">of</span>
                <span
                  className="font-semibold text-accent bg-accent/10 px-2 py-[2px] rounded-lg ring-1 ring-border"
                >
                  ৳&nbsp;{safeTotal.toLocaleString()}
                </span>
              </>
            ) : (
              <span
                className="font-semibold text-secondary px-2 py-[2px] rounded-lg bg-secondary/10 ring-1 ring-border"
              >
                Progress
              </span>
            )}
          </span>
        </div>
      </motion.div>

      {/* Decorative Glow - strictly with tokens */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 z-0 rounded-full pointer-events-none
        "
        style={{
          boxShadow:
            "0 0 30px 0 var(--accent, theme('colors.accent.DEFAULT') / 0.08)"
        }}
      />

      {/* Dotted Accent Ring */}
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full z-0"
        aria-hidden="true"
      >
        <circle
          cx="50%"
          cy="54%"
          r="48%"
          fill="none"
          stroke={`url(#${chartGradientId})`}
          strokeWidth="3.5"
          strokeDasharray="7, 8"
          opacity="0.16"
        />
      </svg>
    </Card>
  );
};

export default PieChart;