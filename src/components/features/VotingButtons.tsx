"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

type Props = {
  className?: string;
  targetVotes: number;
  targetId: string;
};

function VotingButtons({ className, targetVotes, targetId }: Props) {
  const [vote, setVote] = useState(targetVotes);
  const onUpvote = () => {};
  const onDownvote = () => {};

  return (
    <div className="flex gap-2">
      <Button
        size={"icon"}
        variant={"secondary"}
        className="rounded"
        onClick={onUpvote}
      >
        <ArrowUpIcon />
      </Button>
      <Badge variant={"outline"}>{vote}</Badge>
      <Button
        size={"icon"}
        variant={"secondary"}
        className="rounded"
        onClick={onDownvote}
      >
        <ArrowDownIcon />
      </Button>
    </div>
  );
}

export default VotingButtons;
