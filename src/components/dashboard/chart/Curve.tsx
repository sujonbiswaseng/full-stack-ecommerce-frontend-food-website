"use client";
import { MonthlyRevenue } from "@/types/stats.type";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

const MonthlyLineChart = ({ stats }: { stats: MonthlyRevenue[] }) => {
  const chartRef = useRef(null);
  const [gradient, setGradient] = useState<CanvasGradient | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current as unknown as {
        ctx: CanvasRenderingContext2D;
      } | null;
      if (ctx) {
        const grad = ctx.ctx.createLinearGradient(0, 0, 0, 340);
        grad.addColorStop(0, "rgba(34,211,238,0.59)");         // cyan-400
        grad.addColorStop(0.33, "rgba(16,185,129,0.33)");      // emerald-500
        grad.addColorStop(0.67, "rgba(110,231,183,0.19)");     // teal-200
        grad.addColorStop(1, "rgba(236,254,255,0.01)");        // sky-50
        setGradient(grad);
      }
    }
  }, []);

  const data = {
    labels: stats.map((item: MonthlyRevenue) => item.month),
    datasets: [
      {
        data: stats.map((item: MonthlyRevenue) => item.revenue),
        borderColor: "rgba(16,185,129,0.97)",
        backgroundColor: gradient || "rgba(16,185,129,0.19)",
        fill: true,
        tension: 0.48,
        borderWidth: 4,
        pointRadius: 4.5,
        pointBorderWidth: 3,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#06b6d4",
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "#14b8a6",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 3,
        cubicInterpolationMode: "monotone",
        shadowOffsetX: 2,
        shadowOffsetY: 2,
        shadowBlur: 5,
        shadowColor: "rgba(34,211,238,0.08)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: { top: 20, left: 8, right: 18, bottom: 14 },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: "#081f1fef",
        titleFont: { size: 17, weight: "bold", family: "Inter, sans-serif" },
        bodyFont: { size: 14, weight: 500, family: "Inter, sans-serif" },
        padding: 12,
        borderColor: "#22d3ee",
        borderWidth: 1.4,
        cornerRadius: 10,
        caretPadding: 6,
        caretSize: 7,
        boxPadding: 5,
        shadowColor: "#0891b2aa",
        boxShadow: "0 2px 15px 0 #22d3ee33"
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(45,212,191,0.10)",
          lineWidth: 1.2,
          borderDash: [2, 2],
          drawTicks: false,
        },
        ticks: {
          color: "#083344",
          font: { size: 13, weight: "600", family: "Inter, sans-serif" },
          padding: 8,
        },
        title: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "rgba(110,231,183,0.13)",
          borderDash: [3, 3],
          tickColor: "#2dd4bf55",
          lineWidth: 1,
        },
        min: 0,
        max: Math.max(
          320,
          ...stats.map((item: MonthlyRevenue) =>
            typeof item.revenue === "number" ? item.revenue : 0
          )
        ),
        ticks: {
          color: "#065f46b9",
          font: { size: 12, weight: "bold", family: "Inter, sans-serif" },
          padding: 10,
          callback: (value: any) => value === 0 ? "0" : value,
        },
      },
    },
    elements: {
      line: {
        borderCapStyle: "round",
        borderJoinStyle: "round",
      },
      point: {
        hoverRadius: 8,
        radius: 4.5,
      },
    },
    animation: {
      duration: 1200,
      easing: "easeInOutBack"
    },
  };

  return (
    <div
      className="w-full h-[320px] rounded-2xl bg-card ring-1 ring-border shadow-lg hover:ring-2 hover:ring-accent/60 transition-all overflow-hidden p-6 relative"
    >
      <div className="absolute left-6 right-6 top-3 h-2 bg-gradient-to-r from-accent/20 via-primary/20 to-secondary/20 blur-md rounded-full z-10 pointer-events-none" />
      <div className="relative z-20 h-full">
        <Line
          ref={chartRef}
          data={data as import('chart.js').ChartData<'line', number[], string>}
          options={options as import('chart.js').ChartOptions<'line'>}
          height={300}
        />
      </div>
    </div>
  );
};

export default MonthlyLineChart;