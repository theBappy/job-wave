import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/requireUser";
import { EditJobForm } from "@/components/forms/edit-job-form";
import { notFound } from "next/navigation";

async function getData(jobId: string, userId: string) {
  const data = await prisma.jobPost.findUnique({
    where: {
      id: jobId,
      Company: {
        userId: userId,
      },
    },
    select: {
      benefits: true,
      id: true,
      jobTitle: true,
      jobDescription: true,
      salaryFrom: true,
      salaryTo: true,
      employmentType: true,
      location: true,
      listingDuration: true,
      Company: {
        select: {
          name: true,
          logo: true,
          location: true,
          about: true,
          website: true,
          xAccount: true,
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

type Params = Promise<{
  jobId: string;
}>;

export default async function EditJobPage({ params }: { params: Params }) {
  const { jobId } = await params;
  const user = await requireUser();
  const data = await getData(jobId, user.id as string);

  return <EditJobForm jobPost={data} />;
}
