import { prisma } from "@/app/utils/db";
import { EmptyState } from "../general/empty-state";
import { JobCard } from "../general/job-card";
import { PaginationUI } from "../pagination/main-pagination";

async function getData(page: number = 1, pageSize: number = 2) {
  const skip = (page - 1) * pageSize;

  const [data, totalCount] = await Promise.all([
    await prisma.jobPost.findMany({
      where: {
        status: "ACTIVE",
      },
      take: pageSize,
      skip: skip,
      select: {
        jobTitle: true,
        id: true,
        salaryFrom: true,
        salaryTo: true,
        employmentType: true,
        location: true,
        createdAt: true,
        Company: {
          select: {
            name: true,
            logo: true,
            location: true,
            about: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.jobPost.count({
      where: {
        status: "ACTIVE",
      },
    }),
  ]);

  return {
    jobs: data,
    totalPages: Math.ceil(totalCount / pageSize),
  };
}

export async function JobListingCard({ currentPage }: { currentPage: number }) {
  const { jobs, totalPages } = await getData(currentPage);

  return (
    <>
      {jobs.length > 0 ? (
        <div className="flex flex-col gap-6">
          {jobs.map((job) => (
            <JobCard job={job} key={job.id} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No jobs found"
          description="Try searching for a different job title or location"
          buttonText="Clear all filters"
          href="/"
        />
      )}
      <div className="flex justify-center">
        <PaginationUI totalPages={totalPages} currentPage={currentPage} />
      </div>
    </>
  );
}
