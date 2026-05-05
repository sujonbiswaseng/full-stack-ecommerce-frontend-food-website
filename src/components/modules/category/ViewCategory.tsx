import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import Image from "next/image";

interface Category {
  id: string;
  adminId: string;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  meals: any[];
  user?: any;
}

const fieldLabelClass = "text-sm text-muted-foreground font-medium";
const fieldValueClass = "block mt-0.5 text-base text-card-foreground font-semibold truncate";

const MetaField: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className="flex flex-col gap-1 min-w-0">
    <span className={fieldLabelClass}>{label}</span>
    <span className={fieldValueClass}>{value}</span>
  </div>
);

const ViewCategoryData = ({
  viewMode,
  viewData,
}: {
  viewMode: boolean;
  viewData?: Category;
}) => {
  if (!viewMode || !viewData) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full"
    >
      <Card className="rounded-2xl border border-border bg-card shadow-lg px-4 md:px-8 py-6 md:py-8 max-w-[560px] mx-auto">
        <CardContent className="flex flex-col gap-8 p-0">
          {/* Category Header */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-shrink-0 w-28 h-28 rounded-xl bg-input border border-border flex items-center justify-center overflow-hidden shadow-sm">
              {viewData.image ? (
                <Image
                  src={viewData.image}
                  alt={viewData.name || "Category"}
                  width={112}
                  height={112}
                  className="w-full h-full object-cover rounded-xl"
                  loading="lazy"
                  placeholder="empty"
                  priority={false}
                  sizes="112px"
                />
              ) : (
                <span className="w-full h-full flex items-center justify-center text-4xl text-muted-foreground">
                  <span aria-label="No Image" role="img">
                    🍕
                  </span>
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-2xl md:text-3xl text-card-foreground truncate mb-2">
                {viewData.name || <Skeleton className="h-8 w-32 rounded" />}
              </h2>
              <div className="flex flex-wrap gap-2 items-center">
                <Badge variant="secondary" className="rounded-md text-xs">
                  {viewData.id?.slice(0, 8) || <Skeleton className="h-4 w-20 rounded" />}
                </Badge>
                <span className="text-xs text-muted-foreground font-mono">
                  Meals: {Array.isArray(viewData.meals) ? viewData.meals.length : 0}
                </span>
              </div>
              <div className="flex gap-4 mt-3 flex-wrap">
                <MetaField
                  label="Created"
                  value={
                    viewData.createdAt
                      ? new Date(viewData.createdAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "-"
                  }
                />
                <MetaField
                  label="Updated"
                  value={
                    viewData.updatedAt
                      ? new Date(viewData.updatedAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "-"
                  }
                />
              </div>
            </div>
          </div>
          {/* Divider */}
          <div className="h-px w-full bg-border" />
          {/* Meta Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MetaField
              label="Category ID"
              value={
                <span className="font-mono text-sm bg-input rounded px-2 py-1 select-all border border-border">
                  {viewData.id || "-"}
                </span>
              }
            />
            <MetaField
              label="Admin ID"
              value={
                <span className="font-mono text-sm">{viewData.adminId || "-"}</span>
              }
            />
            <MetaField
              label="Admin Name"
              value={viewData.user?.name ?? "-"}
            />
            <MetaField
              label="Admin Email"
              value={viewData.user?.email ?? "-"}
            />
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
};

export default ViewCategoryData;