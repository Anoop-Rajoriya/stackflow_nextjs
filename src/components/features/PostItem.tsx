"use client";

import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { cn } from "@/lib/utils";

import { Author, CommentType } from "@/lib/type";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import Avatar from "../shared/Avatar";
import VotingButtons from "./VotingButtons";
import { ArrowUpDownIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import CommentForm from "../form/CommentForm";

type Props = {
  className?: string;
  type: "question" | "answer";
  targetId: string;
  votes: number;
  body: string;
  tags?: string[];
  author: Author;
  comments: CommentType[];
};

function PostItem({
  className,
  type,
  targetId,
  votes,
  body,
  tags,
  author,
  comments,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("space-y-4", className)}>
      {/* --- Top section: Author + Voting --- */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Avatar
            className="w-8 h-8"
            src={author.avatar || ""}
            fallback={author.name.slice(0, 2)}
          />
          <div className="flex flex-col text-sm text-muted-foreground">
            <span>{author.name}</span>
            <span>{author.reputation}</span>
          </div>
        </div>
        <VotingButtons targetVotes={votes} targetId={targetId} />
      </div>

      {/* --- Body Content --- */}
      <MDEditor.Markdown source={body} className="p-2 rounded-md" />

      {/* --- Tags (for questions) --- */}
      {type === "question" && tags?.length ? (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      ) : null}

      {type === "question" && <Separator />}

      {/* --- Comments Section --- */}
      {type === "question" ? (
        <div className="space-y-2">
          <p className="font-bold text-sm">{comments.length} Comments</p>
          <div className="space-y-2">
            {comments.map((comment) => (
              <div className="text-sm" key={comment.id}>
                {comment.body}
                <div className="text-muted-foreground inline-flex ml-1">
                  <span className="font-bold mr-1">{comment.author.name}</span>
                  {comment.author.reputation}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full">
          <Collapsible open={open} onOpenChange={setOpen}>
            <CollapsibleTrigger asChild>
              <div className="flex items-center justify-between cursor-pointer">
                <span className="font-bold text-sm">
                  {comments.length} Comments
                </span>
                <Button size="icon" variant="ghost">
                  <ArrowUpDownIcon className="h-4 w-4" />
                </Button>
              </div>
            </CollapsibleTrigger>

            <div className="mt-2 space-y-2">
              {comments.length > 0 && (
                <div className="text-sm" key={comments[0].id}>
                  {comments[0].body}
                  <div className="text-muted-foreground inline-flex ml-1">
                    <span className="font-bold mr-1">
                      {comments[0].author.name}
                    </span>
                    {comments[0].author.reputation}
                  </div>
                </div>
              )}

              <CollapsibleContent className="space-y-2">
                {comments.slice(1).map((comment) => (
                  <div className="text-sm" key={comment.id}>
                    {comment.body}
                    <div className="text-muted-foreground inline-flex ml-1">
                      <span className="font-bold mr-1">
                        {comment.author.name}
                      </span>
                      {comment.author.reputation}
                    </div>
                  </div>
                ))}
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      )}

      {/* --- Comment Form --- */}
      <CommentForm targetId={targetId} />
    </div>
  );
}

export default PostItem;
