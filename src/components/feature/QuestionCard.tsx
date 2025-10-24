import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ArrowBigUpIcon, // votes
  ArrowBigDownIcon, // votes
  CheckSquareIcon, // answered
  MessageSquareIcon, // comments
  EyeIcon, // views
  ClockIcon, // createdAt
} from "lucide-react";
import { AvatarImage } from "@radix-ui/react-avatar";

type QuestionCardProps = {
  id: string;
  title: string;
  body: string;
  tags: string[];
  votes: number;
  answers: number;
  views: string[];
  comments?: number;
  createdAt: string | Date;
  author: { name: string; reputation?: number; avatarUrl?: string };
  className?: string;
};

function formatDate(d: string | Date) {
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function excerpt(text: string, max = 180) {
  const plain = text.replace(/[#>*`~\[\]\(\)\n]/g, " ").trim();
  if (plain.length <= max) return plain;
  return plain.slice(0, max).trim() + "...";
}

export default function QuestionCard({
  id,
  title,
  body,
  tags,
  votes,
  answers,
  views,
  comments = 0,
  author,
  createdAt,
  className,
}: QuestionCardProps) {
  return (
    <Card className={cn("group transition-shadow hover:shadow-lg", className)}>
      <CardContent className="flex flex-col md:flex-row md:items-start gap-4">
        {/* Stats */}
        <div className="flex w-full md:max-w-20 md:flex-col md:items-start justify-end md:justify-start gap-2 text-sm text-center md:text-left">
          <Badge variant="outline" className="px-2 py-1">
            {votes < 0 ? (
              <ArrowBigDownIcon className="mr-1 h-4 w-4" />
            ) : (
              <ArrowBigUpIcon className="mr-1 h-4 w-4" />
            )}
            <span className="text-sm">{votes}</span>
          </Badge>
          <Badge
            variant={answers > 0 ? "secondary" : "outline"}
            className="px-2 py-1"
          >
            <CheckSquareIcon className="mr-1 h-4 w-4" />
            <span className="text-sm">{answers}</span>
          </Badge>
          <Badge variant={"outline"} className="px-2 py-1">
            <EyeIcon className="mr-1 h-4 w-4" />
            <span className="text-sm">{views.length}</span>
          </Badge>
        </div>
        {/* Content */}
        <div className="flex-1 space-y-2">
          <Link
            href={`/questions/${id}`}
            className="hover:underline md:text-lg"
          >
            {title}
          </Link>
          <p className="text-sm text-muted-foreground">{excerpt(body)}</p>
          {tags.length && (
            <div className="flex items-center flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge
                  className="min-w-12"
                  key={Math.random() * 100000}
                  variant={"secondary"}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Avatar className="size-6">
                <AvatarImage src={author.avatarUrl} />
                <AvatarFallback className="text-sm">
                  {author.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">
                {author.name} - {author.reputation}
              </span>
            </div>
            <div className="text-xs flex text-muted-foreground gap-2">
              <div className="flex">
                <MessageSquareIcon className="w-4 h-4 mr-1" />
                {comments}
              </div>
              <div className="flex">
                <ClockIcon className="w-4 h-4 mr-1" />
                {formatDate(createdAt)}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
