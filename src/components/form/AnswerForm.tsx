"use client";

import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { answerSchema, answerValues } from "@/lib/zodSchemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "../ui/alert";
import { AlertCircleIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

function AnswerForm() {
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState<"initial" | "loading" | "success">(
    "initial"
  );

  const form = useForm<answerValues>({
    resolver: zodResolver(answerSchema),
    defaultValues: {
      body: "",
    },
  });

  const onSubmit = async (values: answerValues) => {
    setError(null);
    setState("loading");
    try {
      // 👇 Replace this with your actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Answer submitted:", values);
      setState("success");
      form.reset();
    } catch (err: any) {
      setError(err.message || "Something went wrong while submitting.");
    } finally {
      setState("initial");
    }
  };

  const onCancel = () => {
    form.reset();
    setError(null);
  };

  const bodyValue = form.watch("body");

  return (
    <Card className="mt-6">
      <CardContent className="pt-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            // data-color-mode="light"
          >
            {error && (
              <Alert variant="destructive">
                <AlertCircleIcon className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    Post Your Answer
                  </FormLabel>
                  <FormControl>
                    <div className="rounded-md border">
                      <MDEditor
                        value={field.value}
                        onChange={field.onChange}
                        height={200}
                        preview="edit"
                      />
                    </div>
                  </FormControl>
                  <div className="flex items-start mt-1">
                    <FormMessage />
                    <p className="text-sm text-muted-foreground ml-auto">
                      {bodyValue?.length || 0}/1000
                    </p>
                  </div>
                </FormItem>
              )}
            />

            <div className="flex items-center gap-3">
              <Button
                type="submit"
                disabled={state === "loading"}
                className={cn(state === "loading" && "opacity-90")}
              >
                {state === "loading" && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Submit Answer
              </Button>
              <Button type="button" variant="secondary" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default AnswerForm;
