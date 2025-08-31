import { prisma } from "@/app/utils/db";
import { EmptyState } from "../general/empty-state";
import { JobCard } from "../general/job-card";

async function getData() {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const data = await prisma.jobPost.findMany({
    where: {
      status: "ACTIVE",
    },
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
  });

  return data;
}

export async function JobListingCard() {
  const data = await getData();

  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col gap-6">
          {data.map((job) => (
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
    </>
  );
}
