import { deleteJobPost } from "@/app/actions";
import { requireUser } from "@/app/utils/requireUser";
import { GeneralSubmitButton } from "@/components/general/submit-button";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { ArrowLeft, TrashIcon } from "lucide-react";
import Link from "next/link";

type Params = Promise<{
  jobId: string;
}>;

export default async function DeleteJobPage({ params }: { params: Params }) {
  const { jobId } = await params;
  await requireUser();
  return (
    <div className="">
      <Card className="mx-auto max-w-lg mt-40">
        <CardHeader>
          <CardTitle> Are you absolutely sure?</CardTitle>
          <CardDescription>
            This action cannot be undone. This will permanently delete this job
            and remove all data from our servers.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex items-center justify-between">
          <Link
            href="/my-jobs"
            className={buttonVariants({
              variant: "secondary",
            })}
          >
            <ArrowLeft />
          </Link>
          <form
            action={async () => {
              "use server";
              await deleteJobPost(jobId);
            }}
          >
            <GeneralSubmitButton
              text="Delete Job"
              variant="destructive"
              icon={<TrashIcon />}
            />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
