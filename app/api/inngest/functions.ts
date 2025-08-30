import { prisma } from "@/app/utils/db";
import { inngest } from "@/app/utils/inngest/client";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const handleJobExpiration = inngest.createFunction(
  { id: "job-expiration" },
  { event: "job/created" },
  async ({ event, step }) => {
    const { jobId, expirationDays } = event.data;

    await step.sleep("wait-for-expiration", `${expirationDays}d`);

    await step.run("update-job-status", async () => {
      await prisma.jobPost.update({
        where: {
          id: jobId,
        },
        data: {
          status: "EXPIRED",
        },
      });
    });

    return { jobId, message: "Job marked as expired" };
  }
);

export const sendPeriodicJobListings = inngest.createFunction(
  { id: "send-job-listings" },
  { event: "jobseeker/created" },
  async ({ event, step }) => {
    const { userId, email } = event.data;
    const totalDays = 30;
    const intervalDays = 2;
    let currentDay = 0;

    while (currentDay < totalDays) {
      await step.sleep("wait-interval", `${intervalDays}d`);
      currentDay += intervalDays;

      const recentJobs = await step.run("fetch-recent-jobs", async () => {
        return await prisma.jobPost.findMany({
          where: {
            status: "ACTIVE",
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
          include: {
            Company: {
              select: {
                name: true,
                logo: true,
              },
            },
          },
        });
      });

      if (recentJobs.length > 0) {
        await step.run("send-email", async () => {
          const jobListingsHtml = recentJobs
            .map(
              (job) => `
              <div style="padding: 20px; border-bottom: 1px solid #eee; display: flex; align-items: center; gap: 15px;">
                <div style="flex-shrink:0;">
                  ${
                    job.Company.logo
                      ? `
                      <img 
                      src="${job.Company.logo}" 
                      alt="${job.Company.name}" 
                      style="width:40px; height:40px; object-fit:contain; border-radius:6px; border:1px solid #ddd; margin-right:12px;" 
                    />
                      `
                      : `<div style="width:50px; height:50px; background:#f3f4f6; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:14px; color:#555;">${job.Company.name
                          .charAt(0)
                          .toUpperCase()}</div>`
                  }
                </div>
                <div style="flex:1;">
                  <h3 style="margin:0; font-size:16px; color:#111;">${
                    job.jobTitle
                  }</h3>
                  <p style="margin:4px 0; font-size:14px; color:#555;">
                    ${job.Company.name} • ${job.location}
                  </p>
                  <p style="margin:0; font-size:14px; color:#007bff; font-weight:bold;">
                    $${job.salaryFrom.toLocaleString()} – $${job.salaryTo.toLocaleString()}
                  </p>
                </div>
              </div>
            `
            )
            .join("");

          await resend.emails.send({
            from: "Job-Wave <onboarding@resend.dev>",
            to: [email],
            subject: "🚀 Latest Job Opportunities Just for You",
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 640px; margin:0 auto; background:#fff; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.05);">
                
                <!-- Header -->
                <div style="background:#007bff; padding:20px; text-align:center; color:white;">
                  <h1 style="margin:0; font-size:22px;">Your Latest Job Matches</h1>
                  <p style="margin:5px 0 0; font-size:14px; opacity:0.9;">Handpicked fresh opportunities for you</p>
                </div>
                
                <!-- Job Listings -->
                <div style="padding:20px;">
                  ${jobListingsHtml}
                </div>
                
                <!-- CTA -->
                <div style="text-align:center; padding:30px 20px;">
                  <a href="${process.env.NEXT_PUBLIC_URL}" 
                    style="background-color:#007bff; color:white; padding:12px 24px; text-decoration:none; border-radius:6px; font-weight:600; display:inline-block;">
                    🔍 View More Jobs
                  </a>
                </div>
                
                <!-- Footer -->
                <div style="background:#f9fafb; padding:15px; text-align:center; font-size:12px; color:#777;">
                  You are receiving this email because you signed up for Job-Wave updates.<br/>
                  If you wish to unsubscribe, <a href="${process.env.NEXT_PUBLIC_URL}/unsubscribe" style="color:#007bff; text-decoration:none;">click here</a>.
                </div>
              </div>
            `,
          });
        });
      }
    }

    return { userId, message: "Completed 30 day job listing notifications" };
  }
);
