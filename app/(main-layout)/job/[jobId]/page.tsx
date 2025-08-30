import arcjet, { detectBot, tokenBucket } from "@/app/utils/arcjet";
import { getFlagEmoji } from "@/app/utils/country-list";
import { prisma } from "@/app/utils/db";
import { benefits } from "@/app/utils/list-of-benefits";
import { JsonToHtml } from "@/components/general/json-to-html";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { request } from "@arcjet/next";
import { Heart } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { auth } from "@/app/utils/auth";
import Link from "next/link";
import { SavedJobButton } from "@/components/general/submit-button";
import { saveJobPost, unSaveJobPost } from "@/app/actions";

const aj = arcjet.withRule(
  detectBot({
    mode: "LIVE",
    allow: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:PREVIEW"],
  })
);

function getClient(session: boolean) {
  if (session) {
    return aj.withRule(
      tokenBucket({
        mode: "LIVE",
        capacity: 100,
        interval: 60,
        refillRate: 30,
      })
    );
  } else {
    return aj.withRule(
      tokenBucket({
        mode: "LIVE",
        capacity: 100,
        interval: 60,
        refillRate: 10,
      })
    );
  }
}

async function getJob(jobId: string, userId?: string) {
  const [jobData, savedJob] = await Promise.all([
    prisma.jobPost.findUnique({
      where: {
        status: "ACTIVE",
        id: jobId,
      },
      select: {
        jobTitle: true,
        jobDescription: true,
        location: true,
        employmentType: true,
        benefits: true,
        createdAt: true,
        listingDuration: true,
        Company: {
          select: {
            name: true,
            logo: true,
            location: true,
            about: true,
          },
        },
      },
    }),
    userId
      ? prisma.savedJobPost.findUnique({
          where: {
            userId_jobPostId: {
              userId: userId,
              jobPostId: jobId,
            },
          },
          select: {
            id: true,
          },
        })
      : null,
  ]);

  if (!jobData) {
    return notFound();
  }

  return {
    jobData,
    savedJob,
  };
}

type Params = Promise<{
  jobId: string;
}>;

export default async function JobIdPage({ params }: { params: Params }) {
  const { jobId } = await params;
  const session = await auth();

  const req = await request();
  const decision = await getClient(!!session).protect(req, { requested: 10 });

  if (decision.isDenied()) {
    throw new Error("Forbidden");
  }

  const { jobData: data, savedJob } = await getJob(jobId, session?.user?.id);
  
  const locationFlag = getFlagEmoji(data.location);

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="space-y-8 col-span-2">
        {/* header */}
        <div className="flex items-center justify-between">
          <div className="">
            <h1 className="text-2xl font-semibold">{data.jobTitle}</h1>
            <div className="flex items-center gap-2 mt-2">
              <p className="font-medium">{data.Company.name}</p>
              <span className="hidden md:inline text-muted-foreground">*</span>
              <Badge className="rounded-full" variant="secondary">
                {data.employmentType}
              </Badge>
              <span className="hidden md:inline text-muted-foreground">*</span>
              <Badge className="rounded-full">
                {locationFlag && <img src={locationFlag} className="mr-1" />}
                {data.location}
              </Badge>
            </div>
          </div>

          {session?.user ? (
            <form
              action={
                savedJob
                  ? unSaveJobPost.bind(null, savedJob.id)
                  : saveJobPost.bind(null, jobId)
              }
            >
              <SavedJobButton savedJob={!!savedJob} />
            </form>
          ) : (
            <Link
              className={buttonVariants({
                variant: "outline",
              })}
              href="/login"
            >
              <Heart className="size-4" />
              Save Job
            </Link>
          )}
        </div>

        <section>
          <JsonToHtml json={JSON.parse(data.jobDescription)} />
        </section>
        <section>
          <h3 className="font-semibold mb-4">
            Benefits{" "}
            <span className="text-sm text-muted-foreground font-normal">
              (green is offered)
            </span>
          </h3>
          <div className="flex flex-wrap gap-3">
            {benefits.map((benefit) => {
              const isOffered = data.benefits.includes(benefit.id);
              const Icon = benefit.icon;
              return (
                <Badge
                  key={benefit.id}
                  variant={isOffered ? "default" : "outline"}
                  className={cn(
                    isOffered ? "" : "opacity-75 cursor-not-allowed",
                    "text-sm p-4 py-1.5 rounded-full"
                  )}
                >
                  <Icon className="w-3 h-3" />
                  <span>{benefit.label}</span>
                </Badge>
              );
            })}
          </div>
        </section>
      </div>
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div className="">
              <h3 className="font-semibold">Apply Now</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Please let {data.Company.name} know you found this job on
                JobWave. This helps us grow.{" "}
              </p>
            </div>
            <Button className="w-full">Apply Now</Button>
          </div>
        </Card>
        {/* job details card */}
        <Card className="p-6">
          <h3 className="font-semibold">About the Job</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                Apply before
              </span>
              <span className="text-sm">
                {new Date(
                  data.createdAt.getTime() +
                    data.listingDuration * 24 * 60 * 60 * 1000
                ).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Posted on</span>
              <span className="text-sm">
                {data.createdAt.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                Employment Type
              </span>
              <span className="text-sm">{data.employmentType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Location</span>
              <span className="text-sm">
                {locationFlag && <img src={locationFlag} className="mr-1" />}
                {data.location}
              </span>
            </div>
          </div>
        </Card>
        {/* company info card */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src={data.Company.logo}
                alt={data.Company.name}
                width={48}
                height={48}
                className="rounded-full size-12"
              />
              <div className="flex flex-col">
                <h3 className="font-semibold">{data.Company.name}</h3>
                <p className="text-sm line-clamp-3 text-muted-foreground">
                  {data.Company.about}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
