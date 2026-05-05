import React from "react";
import { getSingleBlogAction } from "@/actions/blog.actions";
import Notfounddata from "@/components/Notfounddata";
import { getSession } from "@/services/auth.service";
import { BlogDetailsCard } from "@/components/modules/blog/BlogDetailsCard";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import ErrorFallback from "@/components/shared/ErrorFallback";


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
      <section className="max-w-[1440px] mx-auto w-full px-4 py-8 md:py-12 animate-in fade-in motion-reduce:animate-none">
        <>
          <div
          >
            <BlogDetailsCard blog={blog} />
          </div>
        </>
      </section>
    );
  } catch (error: any) {
    return (
      <ErrorBoundary
        fallback={
          <ErrorFallback
            message="An error occurred while loading the blog details."
            title="Blog Loading Error"
          />
        }
      >
        error
      </ErrorBoundary>
    );
  }
};

export default BlogDetailsPage;