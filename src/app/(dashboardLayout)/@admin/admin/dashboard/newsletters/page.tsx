
import { getAllNewslettersAction } from '@/actions/newsletter.actions';
import NewsletterTable from '@/components/modules/newsletters/newsletterTable';
import ErrorBoundary from '@/components/shared/ErrorBoundary';
import ErrorFallback from '@/components/shared/ErrorFallback';
import { getSession } from '@/services/auth.service';
import { Ipagination } from '@/types/pagination.type';

const NewsletterPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  console.log('slkdjflkasjfkljsadfjsdajfjsadf')
  const userinfo = await getSession();
  if(!userinfo || !userinfo.success){
  return (
    <ErrorFallback
      title="Not Found"
      message="You must be logged in to view newsletters."
    />
  );
  }
 
  let newsletterResponse;
  try {
    const search = await searchParams;
    newsletterResponse = await getAllNewslettersAction(search);
  } catch (err) {
    console.error("Newsletters fetch error:", err);
    newsletterResponse = {
      data: [],
      pagination: { total: 0, page: 1, limit: 10, totalpage: 1 },
      success: false,
    };
  }
  console.log(newsletterResponse,'news')

  return (
    <ErrorBoundary
      fallback={
        <ErrorFallback
          title="Newsletters Error"
          message="Something went wrong while loading the newsletters page."
        />
      }
    >
      <div>
        {(!newsletterResponse ||
          !newsletterResponse.data ||
          !newsletterResponse.success) ? (
          <ErrorFallback
            title="No Newsletters Found"
            message="We couldn't find any newsletters to display."
          />
        ) : (
          <div>
            <NewsletterTable
              newsletters={newsletterResponse.data as any[]}
              pagination={newsletterResponse.pagination as Ipagination}
              role={userinfo.data?.role as string}
            />
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default NewsletterPage;