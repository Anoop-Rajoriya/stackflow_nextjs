import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

function AskQuestionButton({ className }: Props) {
  return (
    <Button asChild className={cn("font-medium", className)}>
      <Link href="/questions/ask">Ask Question</Link>
    </Button>
  );
}

export default AskQuestionButton;
