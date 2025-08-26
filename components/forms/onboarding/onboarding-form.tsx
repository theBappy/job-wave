"use client";

import Image from "next/image";
import Logo from "@/public/logo.svg";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { useState } from "react";
import { UserTypeSelectionForm } from "./user-type-form";
import { CompanyForm } from "./company-form";

type UserSelectionType = "company" | "jobSeeker" | null;

export function OnboardingForm() {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<UserSelectionType>(null);

  function handleUserTypeSelection(type: UserSelectionType) {
    setUserType(type);
    setStep(2);
  }

  function renderStep() {
    switch (step) {
      case 1:
        return <UserTypeSelectionForm onSelect={handleUserTypeSelection} />;
      case 2:
        return userType === "company" ? (
          <CompanyForm />
        ) : (
          <p>User is a job-seeker</p>
        );
      default:
        return null;
    }
  }

  return (
    <>
      <div className="flex items-center gap-3 mb-10">
        <Image src={Logo} alt="logo" width={40} height={40} />
        <h1 className="text-3xl font-semibold">
          Job
          <span className="text-primary">Wave</span>
        </h1>
      </div>

      <Card className="max-w-lg w-full">
        <CardContent className="p-6">
            {renderStep()}
        </CardContent>
      </Card>
    </>
  );
}
