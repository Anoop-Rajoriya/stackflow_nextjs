"use client";

import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import api from "@/lib/axios";

import { CommentSchema, CommentValues } from "@/lib/FormsSchema";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MessageSquareIcon,
  AlertCircleIcon,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Alert, AlertDescription } from "../ui/alert";

type Comment = {
  $id: string;
  author: string;
  body: string;
  $createdAt: string;
};

type Props = {
  className?: string;
  targetId: string;
  targetType: "question" | "answer";
  isCollapsible: boolean;
};

function CommentBlock({
  className,
  targetId,
  targetType,
  isCollapsible,
}: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(
        targetType === "question"
          ? `/questions/${targetId}/comments`
          : `/answers/${targetId}/comments`
      );
      // sort by date (newest first)
      const sorted = (res.data.comments || []).sort(
        (a: Comment, b: Comment) =>
          new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime()
      );
      setComments(sorted);
    } catch (err) {
      console.error("Error fetching comments:", err);
      setError("Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [targetId]);

  const content = (
    <div className={cn("space-y-2", className)}>
      {loading ? (
        <div className="flex justify-center py-4">
          <Spinner className="size-5" />
        </div>
      ) : error ? (
        <Alert variant="destructive">
          <AlertCircleIcon className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        <>
          <CommentList comments={comments} />
          <CommentForm
            targetId={targetId}
            targetType={targetType}
            reFetch={fetchComments}
          />
        </>
      )}
    </div>
  );

  if (isCollapsible) {
    return (
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 text-muted-foreground"
          >
            <MessageSquareIcon className="h-4 w-4" />
            <span>{comments.length} Comments</span>
            <ChevronDownIcon className="h-4 w-4 data-[state=open]:hidden" />
            <ChevronUpIcon className="h-4 w-4 hidden data-[state=open]:block" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2">{content}</CollapsibleContent>
      </Collapsible>
    );
  }

  return content;
}

type CommentFormProps = {
  className?: string;
  targetId: string;
  targetType: "question" | "answer";
  reFetch?: () => Promise<void>;
};

function CommentForm({
  className,
  targetId,
  targetType,
  reFetch,
}: CommentFormProps) {
  const [state, setState] = useState<"initial" | "loading" | "success">(
    "initial"
  );
  const [error, setError] = useState<string | null>(null);

  const form = useForm<CommentValues>({
    resolver: zodResolver(CommentSchema),
    defaultValues: { body: "" },
  });

  async function onComment(values: CommentValues) {
    setState("loading");
    setError(null);

    try {
      const res = await api.post(
        targetType === "question"
          ? `/questions/${targetId}/comments`
          : `/answers/${targetId}/comments`,
        {
          body: values.body,
        }
      );
      reFetch?.();
      form.reset();
      setState("success");
      setTimeout(() => setState("initial"), 1500);
    } catch (err) {
      console.error("Comment post error:", err);
      setError("Failed to post comment");
      setState("initial");
    }
  }

  return (
    <Form {...form}>
      <form
        className={cn("flex items-start gap-2", className)}
        onSubmit={form.handleSubmit(onComment)}
      >
        <FormField
          name="body"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  placeholder="Add a comment..."
                  {...field}
                  disabled={state === "loading"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={state === "loading"}>
          {state === "success" ? (
            <>
              <CheckIcon className="size-4 mr-1" />
              Posted
            </>
          ) : state === "loading" ? (
            <>
              <Spinner className="size-4 mr-1" />
              Posting
            </>
          ) : (
            "Post"
          )}
        </Button>
      </form>

      {error && (
        <p className="text-sm text-destructive mt-1 font-medium">{error}</p>
      )}
    </Form>
  );
}

type CommentListProps = {
  className?: string;
  comments: Comment[];
};

function CommentList({ className, comments }: CommentListProps) {
  if (!comments.length) {
    return (
      <p className="text-sm text-muted-foreground italic px-1">
        No comments yet.
      </p>
    );
  }

  return (
    <div className={cn("space-y-1", className)}>
      {comments.map((comment) => (
        <div
          key={comment.$id || nanoid()}
          className="text-sm border-b border-border/40 pb-1 text-muted-foreground"
        >
          <span className="font-medium text-foreground">{comment.author}:</span>{" "}
          {comment.body}
        </div>
      ))}
    </div>
  );
}

export default CommentBlock;
