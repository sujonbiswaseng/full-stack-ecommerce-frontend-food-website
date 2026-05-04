import React from "react";

const LoadingContent = ({ data }: { data: string }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 backdrop-blur-[3px]">
      <div
        role="status"
        className="flex flex-col items-center justify-center p-8 rounded-2xl shadow-2xl bg-white/95 border border-blue-100"
        aria-live="polite"
        aria-busy="true"
      >
        {/* Advanced professional spinner */}
        <span className="relative flex h-24 w-24 mb-8">
          <span
            className="
              absolute 
              inset-0 
              z-10 
              animate-spin 
              rounded-full 
              border-[5px] 
              border-t-blue-500 
              border-b-blue-400 
              border-l-transparent 
              border-r-transparent 
              shadow-lg
              bg-gradient-to-tr from-blue-100 via-white to-blue-200
            "
            style={{ borderRightColor: "transparent", borderLeftColor: "transparent" }}
          />
          <svg
            className="absolute inset-0 w-full h-full z-0"
            viewBox="0 0 96 96"
            fill="none"
          >
            <defs>
              <radialGradient id="spinnerRadial" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0.10" />
              </radialGradient>
              <linearGradient
                id="spinnerLinear"
                x1="12" y1="12" x2="84" y2="84" gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#60A5FA" />
                <stop offset="1" stopColor="#3B82F6" />
              </linearGradient>
            </defs>
            <circle
              cx="48"
              cy="48"
              r="36"
              stroke="url(#spinnerLinear)"
              strokeWidth="6"
              opacity="0.15"
              fill="url(#spinnerRadial)"
            />
            <circle
              cx="48"
              cy="48"
              r="30"
              stroke="#dbeafe"
              strokeWidth="2"
              opacity="0.35"
              fill="none"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <span className="w-5 h-5 bg-blue-500 rounded-full opacity-80 shadow-lg animate-pulse" />
          </span>
        </span>
        <span className="mt-2 text-xl sm:text-2xl font-bold text-blue-900 text-center tracking-tight drop-shadow-sm">
          One moment please...
        </span>
        <span className="mt-2 text-base sm:text-lg font-medium text-gray-600 text-center max-w-sm">
          We&apos;re carefully preparing your <span className="text-blue-600">{data}</span>.
        </span>
      </div>
    </div>
  );
};

export default LoadingContent;