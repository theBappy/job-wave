import { Button } from "@/components/ui/button";
import { Building2, UserRound } from "lucide-react";

type UserSelectionType = "company" | "jobSeeker";

interface Props {
  onSelect: (type: UserSelectionType) => void;
}

export function UserTypeSelectionForm({ onSelect }: Props) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">
          Welcome! Let&apos;s get started
        </h2>
        <p className="text-muted-foreground">
          Choose how you would like to use our platform!
        </p>
      </div>
      <div className="grid gap-4">
        <Button
        onClick={() => onSelect("company")}
          variant="outline"
          className="w-full h-auto p-6 items-center gap-4 border-2 transition-all duration-200 hover:border-primary hover:bg-primary/5"
        >
          <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Building2 className="size-6 text-primary" />
          </div>

          <div className="text-left">
            <h3 className="font-medium text-lg">Company / Organization</h3>
            <p className="">Post jobs and find exceptional talent</p>
          </div>
        </Button>
        <Button
        onClick={() => onSelect("jobSeeker")}
          variant="outline"
          className="w-full h-auto p-6 items-center gap-4 border-2 transition-all duration-200 hover:border-primary hover:bg-primary/5"
        >
          <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
            <UserRound className="size-6 text-primary" />
          </div>

          <div className="text-left">
            <h3 className="font-medium text-lg">Job Seeker</h3>
            <p className="">Find your dream opportunity</p>
          </div>
        </Button>
      </div>
    </div>
  );
}
