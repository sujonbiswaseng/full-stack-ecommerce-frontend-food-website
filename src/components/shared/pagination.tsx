'use client'
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Ipagination } from '@/types/pagination.type';

const PaginationPage = ({ pagination }: { pagination: Ipagination }) => {
  const { page = 1, totalpage = 1 } = pagination;

  const searchParams = useSearchParams();
  const router = useRouter();

  // Ensures stable URLSearchParams usage for deterministic server/client renders
  const navigateToPage = React.useCallback((targetPage: number) => {
    if (targetPage < 1 || targetPage > totalpage) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", targetPage.toString());
    router.push(`?${params.toString()}`);
  }, [searchParams, router, totalpage]);

  const pageWindow = 4;

  const getPageNumbers = React.useCallback(() => {
    const windowIndex = Math.floor((Number(page) - 1) / pageWindow);
    const start = windowIndex * pageWindow + 1;
    const end = Math.min(start + pageWindow - 1, totalpage);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [page, totalpage, pageWindow]);

  return (
    <div className="flex justify-center items-center my-8">
      <Pagination>
        <PaginationContent className="flex flex-row items-center gap-2 flex-wrap px-2 py-3 bg-card rounded-lg border border-border shadow-sm">
          {/* Previous Button */}
          <PaginationItem>
            <Button
              variant="outline"
              size="sm"
              disabled={Number(page) === 1}
              onClick={() => navigateToPage(Number(page) - 1)}
              className={`min-w-[40px] font-semibold rounded transition ${
                Number(page) === 1
                  ? 'border-border text-muted-foreground bg-muted cursor-not-allowed opacity-50'
                  : 'border-primary text-primary hover:bg-primary/10'
              }`}
              aria-label="Previous page"
            >
              Prev
            </Button>
          </PaginationItem>

          {/* Page Number Buttons */}
          {getPageNumbers().map((currentpage) => (
            <PaginationItem key={currentpage}>
              <Button
                variant={Number(currentpage) === Number(page) ? "default" : "outline"}
                size="sm"
                onClick={() => navigateToPage(currentpage)}
                className={[
                  'min-w-[36px] px-3 py-1 mx-1 font-semibold rounded border text-sm transition',
                  Number(currentpage) === Number(page)
                    ? 'bg-primary text-primary-foreground border-primary shadow-md'
                    : 'bg-card text-card-foreground border-border hover:bg-accent hover:text-accent-foreground'
                ].join(' ')}
                aria-current={Number(currentpage) === Number(page) ? "page" : undefined}
              >
                {currentpage}
              </Button>
            </PaginationItem>
          ))}

          {/* Next Button */}
          <PaginationItem>
            <Button
              variant="outline"
              size="sm"
              disabled={Number(page) === Number(totalpage)}
              onClick={() => navigateToPage(Number(page) + 1)}
              className={`min-w-[40px] font-semibold rounded transition ${
                Number(page) === Number(totalpage)
                  ? 'border-border text-muted-foreground bg-muted cursor-not-allowed opacity-50'
                  : 'border-primary text-primary hover:bg-primary/10'
              }`}
              aria-label="Next page"
            >
              Next
            </Button>
          </PaginationItem>

          <span className="ml-6 text-sm text-muted-foreground font-semibold whitespace-nowrap">
            Page <span className="text-primary font-bold">{page}</span> of{' '}
            <span className="text-primary font-bold">{totalpage}</span>
          </span>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationPage;