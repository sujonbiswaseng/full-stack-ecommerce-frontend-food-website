import { getAllBlogsAction } from "@/actions/blog.actions";
import BlogCard from "@/components/modules/blog/BlogCard";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import ErrorFallback from "@/components/shared/ErrorFallback";
import { TResponseBlog } from "@/types/blog.type";
import { TResponseMeals } from "@/types/meals.type";
import { Ipagination } from "@/types/pagination.type";
import { TResponseUserData } from "@/types/user.type";


const BlogsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  let blogsResponse;
  try {
    const search = await searchParams;
    blogsResponse = await getAllBlogsAction(search);
  } catch (err) {
    console.error("Blogs fetch error:", err);
    blogsResponse = {
      data: [],
      pagination: { total: 0, page: 1, limit: 10, totalpage: 1 },
      success: false,
    };
  }
  return (
    <ErrorBoundary
      fallback={
        <ErrorFallback
          title="Blogs Error"
          message="Something went wrong while loading the blogs page."
        />
      }
    >
      <div>
        {/* Blogs content goes here */}
        {!blogsResponse || !blogsResponse.data || !blogsResponse.success ? (
          <ErrorFallback
            title="No Blogs Found"
            message="We couldn't find any blogs to display."
          />
        ) : (
          <div className="mt-6 sm:mt-10 md:mt-14 lg:mt-20">
            <BlogCard
              blogs={blogsResponse.data as TResponseBlog<{ author: TResponseUserData; meal: TResponseMeals }>[]}
              pagination={blogsResponse.pagination as Ipagination}
            />
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default BlogsPage;
