import React from "react";
import { getSingleBlogAction } from "@/actions/blog.actions";
import Notfounddata from "@/components/Notfounddata";
import { getSession } from "@/services/auth.service";
import { BlogDetailsCard } from "@/components/modules/blog/BlogDetailsCard";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

// Enterprise-grade ErrorBoundary with tokens, scalable, accessible, modern
function ErrorBoundary({ error }: { error: Error }) {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-8">
      <section className="w-full max-w-[420px] mx-auto">
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
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 8l8 8M16 8l-8 8" stroke="currentColor" strokeWidth="2" />
              </svg>
            </span>
            <CardTitle className="text-xl font-semibold text-card-foreground text-center">
              Unable to load blog
            </CardTitle>
            <CardDescription className="text-muted-foreground text-center">
              Sorry, an error occurred while loading this blog post. It may not exist or is temporarily unavailable.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground text-center py-2 break-words">
              {error.message}
            </div>
            <Button
              variant="default"
              className="w-full mt-4"
              onClick={() => (window.location.reload())}
              aria-label="Retry loading blog"
            >
              🔄 Try Again
            </Button>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

const BlogDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  try {
    const { id } = await params;
    if (!id || typeof id !== "string") {
      throw new Error("Invalid blog id.");
    }

    const blogRes = await getSingleBlogAction(id);

    if (!blogRes || !blogRes.data) {
      return (
        <section className="max-w-[1440px] mx-auto w-full flex flex-col items-center py-16 px-4">
          <Notfounddata content="Sorry, this blog post could not be found or does not exist." />
        </section>
      );
    }
    await getSession();
    const blog = blogRes.data;

    return (
      <section className="max-w-[820px] mx-auto w-full px-4 py-8 md:py-12 animate-in fade-in motion-reduce:animate-none">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            exit={{ opacity: 0, y: 32, scale: 0.97 }}
          >
            <BlogDetailsCard blog={blog} />
          </motion.div>
        </AnimatePresence>
      </section>
    );
  } catch (error: any) {
    return <ErrorBoundary error={error} />;
  }
};

export default BlogDetailsPage;