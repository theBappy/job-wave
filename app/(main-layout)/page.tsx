import { JobFilter } from "@/components/home-ui/job-filters";
import { JobListingCard } from "@/components/home-ui/job-listing-card";
import { JobListingLoading } from "@/components/streaming-ui/job-listing-loading";
import { Suspense } from "react";

type SearchParams = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function Home({ searchParams }: SearchParams) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  return (
    <div className="grid grid-cols-3 gap-8">
      <JobFilter />
      <div className="col-span-2 flex flex-col gap-6">
        <Suspense fallback={<JobListingLoading />} key={currentPage}>
          <JobListingCard currentPage={currentPage} />
        </Suspense>
      </div>
    </div>
  );
}
