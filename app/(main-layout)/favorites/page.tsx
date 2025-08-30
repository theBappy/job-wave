import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/requireUser";
import { EmptyState } from "@/components/general/empty-state";
import { JobCard } from "@/components/general/job-card";

async function getFavorites(userId: string) {
  const data = await prisma.savedJobPost.findMany({
    where: {
      userId: userId,
    },
    select: {
      JobPost: {
        select: {
          id: true,
          jobTitle: true,
          salaryFrom: true,
          salaryTo: true,
          location: true,
          employmentType: true,
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
      },
    },
  });

  return data;
}

export default async function FavoritesPage() {
  const session = await requireUser();
  const data = await getFavorites(session?.id as string);

  if (data.length === 0) {
    return (
      <EmptyState
        title="No Favorites found"
        description="You don't have any favorite job yet"
        buttonText="Find a job"
        href="/"
      />
    );
  }

  return <div className="grid grid-cols-1 mt-5 gap-4">
    {data.map((favorite) => (
        <JobCard key={favorite.JobPost.id} job={favorite.JobPost} />
    ))}
  </div>;
}
