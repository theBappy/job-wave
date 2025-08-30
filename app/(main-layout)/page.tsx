import { JobFilter } from "@/components/home-ui/job-filters";
import { JobListingCard } from "@/components/home-ui/job-listing-card";

export default function Home() {
  return (
    <div className="grid grid-cols-3 gap-8">
      <JobFilter />
      <div className="col-span-2 flex flex-col gap-6">
        <JobListingCard />
      </div>
    </div>
  );
}
