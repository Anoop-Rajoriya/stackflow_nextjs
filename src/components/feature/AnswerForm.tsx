"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AnswerSchema, AnswerValues } from "@/lib/FormsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { AlertCircleIcon, CheckIcon } from "lucide-react";
import { Spinner } from "../ui/spinner";
import { Alert, AlertDescription } from "../ui/alert";
import api from "@/lib/axios";
import useStore from "@/store";
import MDEditor from "@uiw/react-md-editor";

type Props = {
  targetId: string;
  className?: string;
  reFetch?: () => Promise<void>;
};

function AnswerForm({ targetId, reFetch }: Props) {
  const [state, setState] = useState<"initial" | "loading" | "success">(
    "initial"
  );
  const [error, setError] = useState<null | string>(null);
  const form = useForm<AnswerValues>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      body: "",
    },
  });
  const { getValidJWT } = useStore();

  async function onAnswer(values: AnswerValues) {
    try {
      setState("loading");
      setError(null);
      const token = await getValidJWT();
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await api.post(
        `/question/${targetId}/answer`,
        { ...values },
        { headers }
      );
      setState("success");
      reFetch?.();
    } catch (error) {
      setState("initial");
      setError(
        error instanceof Error
          ? error.message
          : "Something want wrong, while answering"
      );
    }
  }
  return (
    <Form {...form}>
      {error && (
        <Alert variant={"destructive"}>
          <AlertCircleIcon />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <form
        onSubmit={form.handleSubmit(onAnswer)}
        onReset={() => form.reset()}
        className="space-y-2"
      >
        <FormField
          name="body"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <MDEditor
                  value={field.value}
                  onChange={field.onChange}
                  className="min-h-[150px]"
                  textareaProps={{
                    placeholder: "Write your answer in Markdown...",
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-4">
          <Button
            type="submit"
            disabled={state === "loading" || state === "success"}
          >
            {state === "success" ? (
              <>
                <CheckIcon className="size-4 mr-1" /> Answer Posted
              </>
            ) : state === "loading" ? (
              <>
                <Spinner className="size-4 mr-1" /> Posting Answer
              </>
            ) : (
              <>Post Your Answer</>
            )}
          </Button>
          <Button type="reset">Cancel</Button>
        </div>
      </form>
    </Form>
  );
}

export default AnswerForm;
