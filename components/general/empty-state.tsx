import { Ban, PlusCircle } from "lucide-react";
import { buttonVariants } from "../ui/button";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

export function EmptyState({ title, description, buttonText, href }: Props) {
  return (
    <div className="flex flex-col flex-1 h-full items-center justify-center rounded-md border border-dashed p-8 text-center">
      {/* Icon */}
      <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
        <Ban className="size-10 text-primary" />
      </div>

      {/* Title */}
      <h2 className="mt-6 text-xl font-semibold">{title}</h2>

      {/* Description */}
      <p className="text-muted-foreground mb-6 mt-2 max-w-sm text-sm leading-tight">
        {description}
      </p>

      {/* Button */}
      <Link className={buttonVariants({ size: "lg" })} href={href}>
        <PlusCircle className="mr-2 h-4 w-4" />
        {buttonText}
      </Link>
    </div>
  );
}
