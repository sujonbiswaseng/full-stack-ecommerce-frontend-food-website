"use client";

import React, { useState } from "react";
import { Search, Filter, RotateCcw } from "lucide-react";
import { TFilterField } from "@/types/filter.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const FilterPanel = ({
  fields,
  onReset,
  onApply,
  isPending,
  className,
  classRoot,
  buttonClassName
}: {
  fields: TFilterField[];
  onReset?: () => void;
  onApply?: () => void;
  isPending?: boolean;
  className?: string
  classRoot?: string
  buttonClassName?: string
}) => {
  const [isApplySpinning, setIsApplySpinning] = useState(false);
  const [isResetSpinning, setIsResetSpinning] = useState(false);


  const handleApplyClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!onApply) return;
    setIsApplySpinning(true);
    try {
      await Promise.resolve(onApply());
    } finally {
      setIsApplySpinning(false);
    }
  };

  const handleResetClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!onReset) return;
    setIsResetSpinning(true);
    try {
      await Promise.resolve(onReset());
    } finally {
      setIsResetSpinning(false);
    }
  };

  return (
    <section className={cn("relative isolate w-full overflow-hidden p-4 sm:p-6 md:p-8 rounded-[28px] border border-border bg-card shadow-lg transition-all duration-300", classRoot)}>
      <form
        className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6", className)}
        style={{ position: "relative", zIndex: 1 }}
        autoComplete="off"
        onSubmit={(e) => { e.preventDefault(); onApply?.(); }}
      >
        {fields.map((field) => {
          // Common class for input-like elements
          const base =
            "w-full rounded-lg px-4 py-2 text-base outline-none border bg-background border-input shadow-sm transition focus:ring-2 focus:ring-ring focus:border-ring text-foreground";
          // Field card container
          const card =
            "group flex flex-col gap-2 p-4 rounded-2xl bg-muted/20 border border-border shadow hover:shadow-md transition-all";

          // 🔹 TEXT-LIKE
          if (
            field.type === "text" ||
            field.type === "email" ||
            field.type === "password" ||
            field.type === "search" ||
            field.type === "url" ||
            field.type === "tel"
          ) {
            return (
              <div key={field.name} className={card}>
                <label className="text-sm font-semibold text-foreground mb-1 tracking-wide">
                  {field.label ?? field.name}
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition" />
                  <input
                    type={field.type}
                    value={field.value}
                    placeholder={field.placeholder || "Search..."}
                    onChange={(e) => field.onChange(e.target.value)}
                    className={`${base} pl-11`}
                  />
                </div>
              </div>
            );
          }

          // 🔹 NUMBER
          if (field.type === "number") {
            return (
              <div key={field.name} className={card}>
                <label className="text-sm font-semibold text-foreground mb-1 tracking-wide">
                  {field.label}
                </label>

                <input
                  type="number"
                  value={field.value ?? ""}
                  onChange={(e) => {
                    const newValue = Number(e.target.value);
                    if (newValue <= 5000000) {
                      field.onChange(newValue);
                    }
                  }}
                  className={base}
                />


              </div>
            );
          }

          // 🔹 DATE/TIME
          if (
            field.type === "date" ||
            field.type === "time" ||
            field.type === "datetime-local" ||
            field.type === "month" ||
            field.type === "week"
          ) {
            return (
              <div key={field.name} className={card}>
                <label className="text-sm font-semibold text-foreground mb-1 tracking-wide">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  className={base}
                />
              </div>
            );
          }

          // 🔹 CHECKBOX
          if (field.type === "checkbox") {
            return (
              <div key={field.name} className={`flex items-center gap-4 ${card}`}>
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  className="w-5 h-5 rounded accent-primary border-input focus:ring-2 focus:ring-ring transition-all checked:scale-110"
                  id={field.name}
                  style={{ minWidth: 10, minHeight: 10 }}
                />
                <label htmlFor={field.name} className="text-base font-medium text-foreground select-none">
                  {field.label}
                </label>
              </div>
            );
          }

          // 🔹 SELECT
          if (field.type === "select") {
            const selectedValue = field.value ? String(field.value) : "__all__";
            return (
              <div key={field.name} className={card}>
                <label className="text-sm font-semibold text-foreground mb-1 tracking-wide">
                  {field.label}
                </label>
                <Select
                  value={selectedValue}
                  onValueChange={(value) =>
                    field.onChange(value === "__all__" ? "" : value)
                  }
                >
                  <SelectTrigger className={`${base} cursor-pointer bg-background`}>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[320px] bg-popover text-popover-foreground rounded-lg shadow-lg border border-border ring-1 ring-border">
                    <SelectItem value="__all__" className="font-normal py-2 hover:bg-accent hover:text-accent-foreground rounded">
                      All
                    </SelectItem>
                    {field.options
                      .filter((opt) => String(opt.value) !== "")
                      .map((opt) => (
                        <SelectItem
                          key={String(opt.value)}
                          value={String(opt.value)}
                          className="font-normal py-2 hover:bg-accent hover:text-accent-foreground rounded"
                        >
                          {opt.label}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            );
          }

          // 🔹 RANGE
          if (field.type === "range") {
            return (
              <div key={field.name} className={card + " gap-3"}>
                <label className="text-sm font-semibold text-foreground tracking-wide">
                  {field.label}
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={field.min}
                    max={field.max}
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className="w-full accent-primary h-2 rounded transition"
                  />
                  <span className="ml-2 text-base font-bold text-primary">
                    ৳{field.value}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground px-1">
                  <span>৳{field.min}</span>
                  <span>৳{field.max}</span>
                </div>
              </div>
            );
          }

          return null;
        })}
      </form>
      <div className={cn("mt-10 flex flex-wrap justify-center gap-4")}>
        <Button
          onClick={handleApplyClick}
          disabled={isPending}
          className={cn("px-10 py-6 text-base shadow-lg", buttonClassName)}
        >
          {isApplySpinning && isPending && onApply
            ? (
              <div className="mr-2 h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              <Filter className="mr-2 w-5 h-5" />
            )}
          Apply Filters
        </Button>
        <Button
          onClick={handleResetClick}
          disabled={isPending}
          variant="outline"
          className={cn("px-10 py-6 text-base shadow-sm border-border bg-card hover:bg-accent hover:text-accent-foreground", buttonClassName)}
        >
          {isResetSpinning && isPending && onReset
            ? (
              <div className="mr-2 h-5 w-5 border-2 border-muted-foreground/30 border-t-foreground rounded-full animate-spin" />
            ) : (
              <RotateCcw className="mr-2 w-5 h-5" />
            )}
          Reset
        </Button>
      </div>
    </section>
  );
};