import { OnboardingForm } from "@/components/forms/onboarding/onboarding-form";
import { prisma } from "../utils/db";
import { redirect } from "next/navigation";
import { requireUser } from "../utils/requireUser";

async function checkInUserHasFinishedOnboarding(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      onBoardingCompleted: true,
    },
  });
  if (user?.onBoardingCompleted === true) {
    return redirect("/");
  }

  return user;
}

export default async function OnboardingPage() {
  const session = await requireUser();
  await checkInUserHasFinishedOnboarding(session.id as string);
  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center py-10">
      <OnboardingForm />
    </div>
  );
}
