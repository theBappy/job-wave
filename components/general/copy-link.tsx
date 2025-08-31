"use client";

import { Link2 } from "lucide-react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { toast } from "sonner";

export function CopyLinkJob({ jobUrl }: { jobUrl: string }) {
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(jobUrl);
      toast.success("URL copied to clipboard")
    } catch (error) {
      console.log(error);
      toast.error("Failed to copy URL")
    }
  }

  return (
    <DropdownMenuItem onSelect={handleCopy}>
      <Link2 className="size-4" />
      <span className="">Copy Job URL</span>
    </DropdownMenuItem>
  );
}
