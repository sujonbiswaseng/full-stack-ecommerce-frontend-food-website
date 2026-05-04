// components/ErrorFallback.tsx
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function ErrorFallback({
  title = "Something went wrong",
  message = "Please try again later.",
}: {
  title?: string;
  message?: string;
}) {
  const router = useRouter();
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="bg-card shadow-lg rounded-2xl p-8 text-center max-w-md w-full border border-border">
        <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-destructive" />
        </div>

        <h2 className="text-xl font-semibold text-card-foreground mb-2">
          {title}
        </h2>
        <p className="text-muted-foreground text-sm mb-6">
          {message}
        </p>
        <div className="flex gap-3 justify-center">
          <Button
            onClick={() => router.refresh()}
            size="sm"
          >
            Refresh
          </Button>

          <Button
            onClick={() => router.push("/")}
            variant="outline"
            size="sm"
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}