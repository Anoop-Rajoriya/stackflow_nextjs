"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowBigDownIcon, ArrowBigUpIcon } from "lucide-react";
import { Spinner } from "../ui/spinner";
import useStore from "@/store";
import api from "@/lib/axios";

type Props = {
  targetId: string;
  targetType: "answer" | "question";
  className?: string;
};

function Vote({ targetId, targetType, className }: Props) {
  const [votes, setVotes] = useState<number | null>(null);
  const [vote, setVote] = useState<"upVote" | "downVote" | null>(null);
  const [upVoteLoading, setUpVoteLoading] = useState(false);
  const [downVoteLoading, setDownVoteLoading] = useState(false);
  const { isAuthenticated, getValidJWT } = useStore();
  const fetchVotes = async () => {
    try {
      const res = await api.get(`/vote?targetId=${targetId}`);
      const { totalVotes } = res.data;
      setVotes(totalVotes);
    } catch (error) {
      console.log(error);
      setVotes(0);
    }
  };
  const onVote = async (voteType: "upVote" | "downVote") => {
    if (voteType === "upVote") {
      setUpVoteLoading(true);
    } else {
      setDownVoteLoading(true);
    }
    try {
      const token = await getValidJWT();
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const res = await api.post(
        `/vote`,
        { voteType, targetType, targetId },
        { headers }
      );
      const { totalVotes } = res.data;
      setVotes(totalVotes);
    } catch (error) {
      console.log(error);
    } finally {
      if (voteType === "upVote") {
        setUpVoteLoading(false);
      } else {
        setDownVoteLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchVotes();
  });

  return (
    <div className="flex sm:flex-col items-center gap-2 sm:gap-0">
      <Button
        disabled={!isAuthenticated}
        onClick={() => onVote("upVote")}
        size="icon"
        variant="ghost"
      >
        {upVoteLoading ? (
          <Spinner className="size-7" />
        ) : (
          <ArrowBigUpIcon className="size-7" />
        )}
      </Button>
      <span className="font-semibold">{votes === null ? " " : votes}</span>
      <Button
        disabled={!isAuthenticated}
        onClick={() => onVote("downVote")}
        size="icon"
        variant="ghost"
      >
        {downVoteLoading ? (
          <Spinner className="size-7" />
        ) : (
          <ArrowBigDownIcon className="size-7" />
        )}
      </Button>
    </div>
  );
}

export default Vote;
