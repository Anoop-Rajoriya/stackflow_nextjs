"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import React, { useState } from "react";
import axios from "axios";
import Editor from "../common/Editor";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import TagInput from "../common/TagInput";
import { Alert, AlertTitle } from "../ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/lib/stores/authStore";

const FormSchema = z.object({
  title: z
    .string()
    .min(10, "Min length must be 10 characters")
    .max(100, "Max lengt must be 100 characters"),
  body: z
    .string()
    .min(30, "Min length must be 30 characters")
    .max(10000, "Max length must be 10000 characters"),
  tags: z
    .array(z.string().min(1, "Tag cannot be empty"))
    .min(1, "At least one tag is required")
    .max(10, "No more than 10 tags are allowed"),
});

type FormType = z.infer<typeof FormSchema>;

function QuestionForm() {
  const { profile } = useAuthStore();
  const router = useRouter();
  const [formState, setFormState] = useState<
    "enable" | "loading" | "succesfull"
  >("enable");
  const [error, setError] = useState<string | null>(null);
  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      body: "",
      tags: [],
    },
  });

  async function onSubmit(value: FormType) {
    try {
      setError(null);
      setFormState("loading");
      await axios.post(`/api/questions`, { ...value, userId: profile?.id });
      setFormState("succesfull");
      form.reset();
      router.push("/");
    } catch (error) {
      setFormState("enable");
      console.log(error);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.error || error.message);
      } else {
        setError("Something wrong");
      }
    }
  }
  function onReset() {
    form.reset();
  }
  return (
    <Form {...form}>
      <form
        className="max-w-4xl w-full space-y-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* Error */}
        {error && (
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}

        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormDescription>
                Be specific and imagine you're asking a question to another
                person
              </FormDescription>
              <Input
                className="w-full"
                placeholder="e.g. How to center a div in CSS?"
                {...field}
              />
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
              <FormDescription>
                Be specific and imagine you're asking a question to another
                person
              </FormDescription>
              <FormMessage />
              <Editor
                value={field.value}
                onEdit={field.onChange}
                placeholder="Describe your problem in detail. Include code snippets, error messages, and what you've tried so far..."
              />
            </FormItem>
          )}
        />
        {/* Tags */}
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormDescription>
                Add up to 5 tags to describe what your question is about
              </FormDescription>
              <FormMessage />
              <TagInput
                value={field.value}
                onChange={field.onChange}
                placeholder="e.g. javascript, react, css"
              />
            </FormItem>
          )}
        />
        <div className="flex space-x-6 justify-center">
          <Button
            disabled={formState === "loading" || formState === "succesfull"}
            type="submit"
            size="lg"
          >
            {formState === "loading"
              ? "Posting Your Question..."
              : formState === "succesfull"
              ? "Your Question Posted"
              : "Post Your Question"}
          </Button>
          <Button onClick={onReset} type="button" size="lg" variant="outline">
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default QuestionForm;
