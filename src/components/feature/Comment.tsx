import React, { useState } from "react";
import { nanoid } from "nanoid";

import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { CommentSchema, CommentValues } from "@/lib/FormsSchema";
import { zodResolver } from "@hookform/resolvers/zod";

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
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

type Comment = {
  id: string;
  author: string;
  body: string;
  createdAt: string;
};

type Props = {
  className?: string;
  comments: Comment[];
  targetId: string;
  isCollapsible: boolean;
};

function CommentBlock({ className, comments, targetId, isCollapsible }: Props) {
  if (isCollapsible) {
    return (
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <MessageSquareIcon className="h-4 w-4" />
            <span>{comments.length} Comments</span>
            <ChevronDownIcon className="h-4 w-4 data-[state=open]:hidden" />
            <ChevronUpIcon className="h-4 w-4 hidden data-[state=open]:block" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 pt-2">
          <CommentList comments={comments} />
          <CommentForm targetId={targetId} />
        </CollapsibleContent>
      </Collapsible>
    );
  } else {
    return (
      <div className="space-y-2">
        <CommentList comments={comments} />
        <CommentForm targetId={targetId} />
      </div>
    );
  }
}

type CommentFormProps = {
  className?: string;
  targetId: string;
};

function CommentForm({ className, targetId }: CommentFormProps) {
  const [state, setState] = useState<"initial" | "loading" | "success">(
    "initial"
  );
  const [error, setError] = useState<null | string>(null);
  const form = useForm<CommentValues>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      body: "",
    },
  });
  async function onComment<CommentValues>() {}

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
                <Input placeholder="Add a comment..." {...field} />
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
    </Form>
  );
}

type CommentListProps = {
  className?: string;
  comments: Comment[];
};

function CommentList({ className, comments }: CommentListProps) {
  if (comments.length) {
    return (
      <div className={cn("", className)}>
        {comments.map((comment) => (
          <div
            key={nanoid()}
            className="text-sm border-b pb-1 text-muted-foreground"
          >
            <span className="font-medium text-foreground">
              {comment.author}:
            </span>{" "}
            {comment.body}
          </div>
        ))}
      </div>
    );
  } else {
    return <p>No Comment</p>;
  }
}

export default CommentBlock;
