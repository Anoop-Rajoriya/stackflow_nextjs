import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AnswerSchema, AnswerValues } from "@/lib/FormsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { AlertCircleIcon, CheckIcon } from "lucide-react";
import { Spinner } from "../ui/spinner";
import { Alert, AlertDescription } from "../ui/alert";

function AnswerForm() {
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
  async function onComment(values: AnswerValues) {}
  return (
    <Form {...form}>
      {error && (
        <Alert>
          <AlertCircleIcon />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <form
        onSubmit={form.handleSubmit(onComment)}
        onReset={() => form.reset()}
        className="space-y-2"
      >
        <FormField
          name="body"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Write your answer in Markdown..."
                  className="min-h-[150px]"
                  {...field}
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
