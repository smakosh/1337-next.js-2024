"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SubmitButton({
  title,
  pendingMessage,
  className,
}: {
  title: string;
  pendingMessage: string;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className={cn(className)} aria-disabled={pending}>
      {pending ? pendingMessage : title}
    </Button>
  );
}
