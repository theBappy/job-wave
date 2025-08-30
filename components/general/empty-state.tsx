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
    <div className="flex flex-col flex-1 h-full items-center justify-center rounded-md border border-dashed p-8">
      <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
        <Ban className="size-10 text-primary" />
        <h2 className="mt-6 text-xl font-semibold">{title}</h2>
        <p className="text-muted-foreground mb-8 mt-2 text-center text-sm leading-tight text-balance max-w-sm">
          {description}
        </p>
        <Link className={buttonVariants()} href={href}>
          <PlusCircle />
          {buttonText}
        </Link>
      </div>
    </div>
  );
}
