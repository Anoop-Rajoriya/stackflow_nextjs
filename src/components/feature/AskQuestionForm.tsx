"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AskQuestionSchema, AskQuestionValues } from "@/lib/FormsSchema";

import { Input } from "@/components/ui/input";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { AlertCircleIcon, CheckIcon, PlusIcon, XIcon } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { redirect } from "next/navigation";

type AskQuestionFormProps = {
  defaultValues?: Partial<AskQuestionValues>;
  mode?: "create" | "edit";
  onSubmit: (values: AskQuestionValues) => Promise<void>;
};

function AskQuestionForm({
  defaultValues,
  mode = "create",
  onSubmit,
}: AskQuestionFormProps) {
  const form = useForm<AskQuestionValues>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: defaultValues?.title || "",
      body: defaultValues?.body || "",
      tags: defaultValues?.tags || [],
    },
  });

  const [state, setState] = useState<"initial" | "loading" | "success">(
    "initial"
  );
  const [error, setError] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState("");

  async function handleSubmit(values: AskQuestionValues) {
    try {
      setError(null);
      setState("loading");
      await onSubmit(values);
      setState("success");
    } catch (err: any) {
      setError(err.message || "Something went wrong while submitting.");
      setState("initial");
    }
  }

  function addTag() {
    const tag = tagInput.trim();
    if (!tag) return;
    const current = form.getValues("tags");
    if (current.length >= 5) {
      form.setError("tags", { message: "You can add up to 5 tags only" });
      return;
    }
    if (current.includes(tag)) {
      form.setError("tags", { message: "Tag already added" });
      return;
    }
    form.setValue("tags", [...current, tag]);
    setTagInput("");
    form.clearErrors("tags");
  }

  function removeTag(tag: string) {
    const updated = form.getValues("tags").filter((t) => t !== tag);
    form.setValue("tags", updated);
  }

  return (
    <div className="space-y-4 px-2">
      {error && (
        <Alert variant="destructive">
          <AlertCircleIcon className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. How to implement debouncing in React?"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Body */}
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Body</FormLabel>
                <FormControl>
                  <MDEditor
                    value={field.value}
                    onChange={field.onChange}
                    className="min-h-[200px]"
                    textareaProps={{
                      placeholder:
                        "Explain your problem in detail. Include what you tried, expected behavior, and actual behavior.",
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tags */}
          <FormField
            control={form.control}
            name="tags"
            render={() => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Add a tag and press Enter or click +"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    onClick={addTag}
                  >
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>

                {/* Tag Chips */}
                <div className="mt-2 flex flex-wrap gap-2">
                  {form.watch("tags").map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <XIcon className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              type="submit"
              disabled={state === "loading" || state === "success"}
            >
              {state === "loading" ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" />
                  Submitting...
                </>
              ) : state === "success" ? (
                <>
                  <CheckIcon className="mr-2 h-4 w-4" />
                  Saved
                </>
              ) : mode === "edit" ? (
                "Update Question"
              ) : (
                "Post Question"
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => {
                form.reset(defaultValues || { title: "", body: "", tags: [] });
                setTagInput("");
                setState("initial");
                setError(null);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default AskQuestionForm;
