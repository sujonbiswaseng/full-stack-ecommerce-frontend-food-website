"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  errorKey: number;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorKey: 0 };
  }

  static getDerivedStateFromError() {
    return { hasError: true, errorKey: 0 };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // Optionally log errorInfo for monitoring tools
  }

  handleReset = () => {
    try {
      window.location.href = window.location.href;
    } catch {
      this.setState(prev => ({
        hasError: false,
        errorKey: prev.errorKey + 1,
      }));
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="w-full min-h-[60vh] flex items-center justify-center bg-background px-4">
            <div className="max-w-[400px] w-full">
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 24, scale: 0.98 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <Card className="w-full rounded-2xl border border-border bg-card shadow-lg">
                    <CardHeader className="flex flex-col items-center gap-4">
                      <span
                        className="h-12 w-12 flex items-center justify-center rounded-full bg-secondary text-secondary-foreground"
                        aria-hidden="true"
                      >
                        <svg
                          width={32}
                          height={32}
                          fill="none"
                          stroke="currentColor"
                          className="text-primary"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 8l8 8M16 8l-8 8" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      </span>
                      <CardTitle className="text-xl font-semibold text-card-foreground text-center">
                        Something went wrong
                      </CardTitle>
                      <CardDescription className="text-muted-foreground text-center">
                        We couldn’t load this content. Please try again.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        className="w-full mt-4"
                        variant="default"
                        onClick={this.handleReset}
                        aria-label="Retry loading content"
                      >
                        🔄 Try Again
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )
      );
    }

    return (
      <React.Fragment key={this.state.errorKey}>
        {this.props.children}
      </React.Fragment>
    );
  }
}