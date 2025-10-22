import React from "react";
import { Button } from "../ui/button";
import { ArrowBigDownIcon, ArrowBigUpIcon } from "lucide-react";

type Props = {
  targetId: string;
  votes: number;
  className?: string;
};

function Vote({ targetId, votes, className }: Props) {
  return (
    <div className="flex sm:flex-col items-center gap-2 sm:gap-0">
      <Button size="icon" variant="ghost">
        <ArrowBigUpIcon className="size-7" />
      </Button>
      <span className="font-semibold">{votes}</span>
      <Button size="icon" variant="ghost">
        <ArrowBigDownIcon className="size-7" />
      </Button>
    </div>
  );
}

export default Vote;
