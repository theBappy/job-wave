import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import google from "@/public/5.svg";
import netflix from "@/public/7.svg";
import instagram from "@/public/6.svg";
import microsoft from "@/public/1.svg";
import apple from "@/public/2.svg";
import tiktok from "@/public/3.svg";
import Image from "next/image";
import { CreateJobForm } from "@/components/forms/create-job-form";
import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/requireUser";
import { redirect } from "next/navigation";

const companies = [
  {
    id: 0,
    name: "Google",
    logo: google,
  },
  {
    id: 1,
    name: "Netflix",
    logo: netflix,
  },
  {
    id: 2,
    name: "Instagram",
    logo: instagram,
  },
  {
    id: 3,
    name: "Microsoft",
    logo: microsoft,
  },
  {
    id: 4,
    name: "Apple",
    logo: apple,
  },
  {
    id: 5,
    name: "Tiktok",
    logo: tiktok,
  },
];

const testimonials = [
  {
    quote:
      "This platform made hiring so much faster and easier. We found the perfect candidate in just three days!",
    author: "Sarah Mitchell",
    company: "TechNova Solutions",
  },
  {
    quote:
      "As a growing startup, we needed talented people quickly. This job platform delivered beyond expectations.",
    author: "James Carter",
    company: "BrightPath Labs",
  },
  {
    quote:
      "The quality of applicants has been outstanding. We’ve filled multiple roles with top talent.",
    author: "Emily Rodriguez",
    company: "NextGen Finance",
  },
  {
    quote:
      "User-friendly and efficient—this platform has completely transformed how we hire.",
    author: "Michael Lee",
    company: "InnovateX",
  },
  {
    quote:
      "We saved so much time on recruitment thanks to the smart matching system.",
    author: "Priya Sharma",
    company: "GlobalEdge Consulting",
  },
];

const stats = [
  { id: 0, value: "10K+", label: "Monthly active job seekers" },
  { id: 1, value: "48h", label: "Average time to hire" },
  { id: 2, value: "95%", label: "Employer satisfaction rate" },
  { id: 3, value: "675+", label: "Companies hiring remotely" },
];

async function getCompany(userId: string) {
  const data = await prisma.company.findUnique({
    where: {
      userId: userId,
    },
    select: {
      name: true,
      location: true,
      about: true,
      logo: true,
      xAccount: true,
      website: true,
    },
  });

  if (!data) {
    return redirect("/");
  }
  return data;
}

export default async function PostJobPage() {
  const session = await requireUser();
  const data = await getCompany(session.id as string);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
      <CreateJobForm
        companyAbout={data.about}
        companyLocation={data.location}
        companyLogo={data.logo}
        companyName={data.name}
        companyWebsite={data.website}
        companyXAccount={data.xAccount}
      />
      <div className="col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              Trusted by Industry Leaders
            </CardTitle>
            <CardDescription>
              Join thousands of companies hiring top talent
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* company logos */}
            <div className="grid grid-cols-3 gap-4">
              {companies.map((company) => (
                <div key={company.id} className="">
                  <Image
                    src={company.logo}
                    alt={company.name}
                    className="rounded-lg opacity-75 transition-opacity hover:opacity-100"
                    width={80}
                    height={80}
                  />
                </div>
              ))}
            </div>
            <div className="space-y-4">
              {testimonials.map((testimonial, index) => (
                <blockquote
                  key={index}
                  className="border-l-2 border-primary pl-4"
                >
                  <p className="text-sm text-muted-foreground italic">
                    "{testimonial.quote}"
                  </p>
                  <footer className="mt-2 text-sm font-medium">
                    - {testimonial.author},{testimonial.company}
                  </footer>
                </blockquote>
              ))}
            </div>
            {/* we will render stats here */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.id} className="rounded-lg bg-muted p-4">
                  <h4 className="text-2xl font-bold">{stat.value}</h4>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
