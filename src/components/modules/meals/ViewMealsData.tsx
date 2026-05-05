import { TGetCategory } from '@/types/category';
import { TResponseMeals } from '@/types/meals.type';
import { IProviderInfo } from '@/types/provider.type';
import { IgetReviewData } from '@/types/reviews.type';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import * as React from 'react';

const statusMap: Record<string, { text: string; variant: "secondary" | "destructive" | "outline" | "default" | "success" | "warning" }> = {
  PENDING:    { text: "Pending",    variant: "warning" },
  APPROVED:   { text: "Approved",   variant: "success" },
  REJECTED:   { text: "Rejected",   variant: "destructive" },
  BANNED:     { text: "Banned",     variant: "outline" },
};

const ViewMealsData = ({
  viewMode,
  viewData,
}: {
  viewMode: boolean;
  viewData?: TResponseMeals<{
    category: TGetCategory;
    provider: IProviderInfo;
    reviews: IgetReviewData;
  }>;
}) => {
  if (!viewMode || !viewData) return null;

  // Animation setup
  const fadeVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const handleCopy = (label: string, value: string) => {
    navigator.clipboard.writeText(value ?? '');
    if (typeof window !== 'undefined') {
      import('react-toastify').then(({ toast }) => {
        toast.success(`${label} copied to clipboard!`);
      });
    }
  };

  return (
    <AnimatePresence>
      <motion.section
        key="meal-detail-card"
        variants={fadeVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="max-w-[540px] sm:max-w-[700px] mx-auto w-full"
      >
        <Card className="bg-card shadow-lg border-border rounded-2xl overflow-hidden p-6">
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="relative w-28 h-28 bg-accent/30 rounded-xl border border-border flex items-center justify-center overflow-hidden">
                  {viewData.images && viewData.images[0] ? (
                    <Image
                      src={viewData.images[0]}
                      alt={viewData.title ?? 'Meal'}
                      fill
                      className="object-cover rounded-xl"
                      sizes="112px"
                      priority
                      placeholder="blur"
                      blurDataURL="/placeholder.svg"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span
                        aria-label="Meal placeholder"
                        className="text-4xl text-accent"
                      >
                        🍽️
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1 w-full min-w-0">
                <h2 className="text-2xl font-bold text-card-foreground truncate">
                  {viewData.title}
                </h2>
                <div className="flex flex-wrap items-center gap-4 mt-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CalendarIcon className="w-5 h-5" />
                    <span>
                      {viewData.createdAt
                        ? new Date(viewData.createdAt).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })
                        : '-'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <FolderIcon className="w-5 h-5" />
                    <span>{viewData.category_name || '-'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-border my-6" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-base">
              <ReadOnlyField label="Meal ID">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/meals/${viewData.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-primary font-mono"
                  >
                    {viewData.id.slice(0, 10)}...
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-primary transition"
                    aria-label="Copy Meal ID"
                    onClick={() => handleCopy('Meal ID', viewData.id)}
                  >
                    <CopyIcon className="w-4 h-4" />
                  </Button>
                </div>
              </ReadOnlyField>
              <ReadOnlyField label="Status">
                <Badge
                  className="text-xs font-medium"
                >
                  {statusMap[viewData.status]?.text ?? viewData.status}
                </Badge>
              </ReadOnlyField>
              <ReadOnlyField label="Description">
                <span className="text-card-foreground">
                  {viewData.description?.slice(0, 24) || '-'}
                  {viewData.description && viewData.description.length > 24 && '...'}
                </span>
              </ReadOnlyField>
              <ReadOnlyField label="Price">
                <span className="font-medium text-card-foreground">৳{viewData.price}</span>
              </ReadOnlyField>
              <ReadOnlyField label="Delivery Charge">
                <span className="text-card-foreground">{viewData.deliverycharge}</span>
              </ReadOnlyField>
              <ReadOnlyField label="Available">
                <span className="text-card-foreground">
                  {viewData.isAvailable ? 'Yes' : 'No'}
                </span>
              </ReadOnlyField>
              <ReadOnlyField label="Dietary Preference">
                <span className="text-card-foreground">{viewData.dietaryPreference || '-'}</span>
              </ReadOnlyField>
              <ReadOnlyField label="Cuisine">
                <span className="text-card-foreground">{viewData.cuisine || '-'}</span>
              </ReadOnlyField>
              <ReadOnlyField label="Provider ID">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/providers/${viewData.providerId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-primary font-mono"
                  >
                    {viewData.providerId.slice(0, 10)}...
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-primary transition"
                    aria-label="Copy Provider ID"
                    onClick={() => handleCopy('Provider ID', viewData.providerId)}
                  >
                    <CopyIcon className="w-4 h-4" />
                  </Button>
                </div>
              </ReadOnlyField>
              {typeof viewData.avgRating !== 'undefined' && (
                <ReadOnlyField label="Average Rating">
                  <span className="text-card-foreground">{viewData.avgRating ?? '-'}</span>
                </ReadOnlyField>
              )}
              {typeof viewData.totalReviews !== 'undefined' && (
                <ReadOnlyField label="Total Reviews">
                  <span className="text-card-foreground">{viewData.totalReviews ?? '-'}</span>
                </ReadOnlyField>
              )}
              <ReadOnlyField label="Created At" className="col-span-1 sm:col-span-2">
                <span>
                  {viewData.createdAt
                    ? new Date(viewData.createdAt).toLocaleString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : '-'}
                </span>
              </ReadOnlyField>
              <ReadOnlyField label="Last Updated" className="col-span-1 sm:col-span-2">
                <span>
                  {viewData.updatedAt
                    ? new Date(viewData.updatedAt).toLocaleString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : '-'}
                </span>
              </ReadOnlyField>
            </div>
          </CardContent>
        </Card>
      </motion.section>
    </AnimatePresence>
  );
};

export default ViewMealsData;

// Helper, enterprise-friendly reusable field for label-value display
type FieldProps = {
  label: string;
  children: React.ReactNode;
  className?: string;
};
function ReadOnlyField({ label, children, className }: FieldProps) {
  return (
    <div className={`flex flex-col gap-2 ${className || ''}`}>
      <span className="text-muted-foreground text-sm font-medium">{label}</span>
      <div className="rounded bg-input px-2 py-1 font-normal text-[15px] leading-tight overflow-x-auto">{children}</div>
    </div>
  );
}

// Icon components
function CalendarIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect x="3" y="6" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 2v4M8 2v4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function FolderIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M3 7a2 2 0 012-2h2l2 3h10a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function CopyIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width={18}
      height={18}
      aria-hidden="true"
      fill="none"
      viewBox="0 0 20 20"
    >
      <rect x="7" y="7" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" opacity=".6" />
    </svg>
  );
}