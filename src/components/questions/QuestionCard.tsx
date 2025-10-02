import React from "react";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { CheckCircle2, Eye } from "lucide-react";
import { Badge } from "../ui/badge";
import Link from "next/link";

export type Question = {
  id: number;
  title: string;
  body: string;
  tags: string[];
  status: string;
  authorId: string;
  authorName: string;
  authorRepputation: number;
  createdAt: string;
  updatedAt: string;
};

type Props = {
  data: Question;
  className?: string;
};

function QuestionCard({ data, className }: Props) {
  const {
    id,
    title,
    body,
    tags,
    status,
    authorName,
    authorRepputation,
    createdAt,
  } = data;
  const [votes, hasAcceptedAnswer, answers, views, bounty] = [
    50,
    false,
    30,
    44,
    5,
  ];

  return (
    <Card>
      <CardContent className={cn("flex space-x-4", className)}>
        {/* Stats Column */}
        <div className="flex flex-col gap-2 items-end text-sm min-w-[100px]">
          <div className="flex items-center gap-1">
            <span
              className={`font-semibold ${
                votes > 50 ? "text-green-500" : "text-muted-foreground"
              }`}
            >
              {votes}
            </span>
            <span className="text-muted-foreground">votes</span>
          </div>
          <div
            className={`flex items-center gap-1 ${
              hasAcceptedAnswer
                ? "text-green-500"
                : answers > 0
                ? "text-muted-foreground"
                : "text-muted-foreground/80"
            }`}
          >
            {hasAcceptedAnswer && <CheckCircle2 className="h-4 w-4" />}
            <span className="font-semibold">{answers}</span>
            <span className="text-muted-foreground">answers</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Eye className="h-4 w-4" />
            <span>{views.toLocaleString()}</span>
          </div>
        </div>
        {/* Content Column */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-start gap-2 mb-2">
            <Link
              href={`questions/${id}`}
              className="text-lg font-semibold cursor-pointer flex-1 text-card-foreground hover:underline"
            >
              {title}
            </Link>
            {bounty && <Badge variant="default">+{bounty}</Badge>}
          </div>

          <p className="text-sm mb-3 line-clamp-2 text-muted-foreground flex-1">
            {body}
          </p>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs pt-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="font-medium">{authorName}</span>
              <span className="">•</span>
              <span className="font-semibold">{authorRepputation}</span>
            </div>
            <span className="text-muted-foreground">asked {createdAt}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default QuestionCard;
