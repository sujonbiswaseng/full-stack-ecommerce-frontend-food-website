export default function MealCardSkeleton() {
  return (
    <div className="animate-pulse rounded-3xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 shadow-xl overflow-hidden flex flex-col">
      {/* Image/cover section */}
      <div className="relative h-48 sm:h-56 w-full bg-gradient-to-tr from-indigo-100 via-blue-100 to-transparent dark:from-blue-950/40 dark:via-slate-950/40 dark:to-gray-900/30">
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 rounded-t-3xl" />
        <div className="absolute right-4 top-4 h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded-full shadow-sm" />
      </div>
      {/* Content */}
      <div className="flex-1 flex flex-col gap-4 p-6">
        {/* Title */}
        <div className="h-6 w-1/2 bg-gray-200 dark:bg-gray-800 rounded" />
        {/* Description */}
        <div className="h-4 w-4/5 bg-gray-200 dark:bg-gray-800 rounded" />
        <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-800 rounded" />

        {/* Tags */}
        <div className="flex gap-2 mt-2">
          <div className="h-6 w-20 bg-gray-200 dark:bg-gray-800 rounded-full" />
          <div className="h-6 w-14 bg-gray-200 dark:bg-gray-800 rounded-full" />
        </div>

        {/* Call to action (e.g. button) */}
        <div className="mt-4">
          <div className="h-10 w-full bg-gradient-to-r from-blue-200 via-blue-100 to-blue-50 dark:from-blue-900 dark:via-gray-900 dark:to-blue-950 rounded-xl" />
        </div>
      </div>
    </div>
  );
}