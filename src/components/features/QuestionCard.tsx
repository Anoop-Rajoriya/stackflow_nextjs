"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Props = {
  className?: string;
  id: string;
  title: string;
  body: string;
  tags: string[];
  votes: number;
  answers: number;
  comments: number;
  authorName: string;
  authorReputation: number;
  askedAt: string;
};

export default function QuestionCard({
  id,
  title,
  body,
  tags,
  votes,
  answers,
  comments,
  authorName,
  authorReputation,
  askedAt,
  className,
}: Props) {
  return (
    <Card>
      <CardContent className={cn("flex flex-col md:flex-row gap-4", className)}>
        <div
          id="stats"
          className="flex flex-row md:flex-col gap-2 md:items-end text-sm text-muted-foreground min-w-[90px]"
        >
          <p className="space-x-2">
            {votes} <span>votes</span>
          </p>
          <p className="space-x-2">
            {answers} <span>answers</span>
          </p>
          <p className="space-x-2">
            {comments} <span>comments</span>
          </p>
        </div>
        <div id="content" className="flex-1 space-y-2">
          <Link
            href={`/questions/${id}`}
            id="title"
            className="text-lg font-semibold text-primary hover:underline"
          >
            {title}
          </Link>
          <p
            id="body"
            className="text-sm text-muted-foreground line-clamp-2 my-2"
          >
            {body}
          </p>
          <div id="meta" className="flex flex-wrap gap-2">
            <div id="tags" className="flex gap-2">
              {tags.map((tag, index) => (
                <Badge variant={"secondary"} key={tag + index}>
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="ml-auto flex flex-wrap gap-2 text-sm">
              <p>
                {authorName}
                <span className="ml-1">{authorReputation}</span>
              </p>
              <p className="text-muted-foreground">asked at {askedAt}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
