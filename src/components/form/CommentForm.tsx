import React, { useState } from "react";

import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema, CommentValues } from "@/lib/zodSchemas";

import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { AlertCircleIcon, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  targetId: string;
};

function CommentForm({ className, targetId }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"initial" | "loading">("initial");
  const form = useForm<CommentValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      body: "",
    },
  });
  const onSubmitComment = () => {
    form.reset();
  };
  const onCancelComment = () => {
    form.reset()
  };

  return (
    <Collapsible className="space-y-2">
      <CollapsibleTrigger asChild className="">
        <Button variant={"link"} className="px-0">Add Comment</Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitComment)}
            className="space-y-2"
            noValidate
          >
            {error && (
              <Alert>
                <AlertCircleIcon />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Write a concise, helpful comment..."
                      rows={3}
                      className="resize-none text-sm"
                      disabled={status === "loading"}
                    />
                  </FormControl>

                  <div className="flex items-start gap-2">
                    <FormMessage className="flex-1" />
                    <p className="text-xs text-muted-foreground text-right ml-auto">
                      max 50 chars
                    </p>
                  </div>
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <Button type="submit" disabled={status === "loading"}>
                {status === "loading" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>

              <Button
                type="button"
                variant="ghost"
                onClick={onCancelComment}
                disabled={status === "loading"}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CollapsibleContent>
    </Collapsible>

    //  <Card>
    //    <CardContent>
    //      <Form {...form}>
    //        <form
    //          onSubmit={form.handleSubmit(onSubmitComment)}
    //          className="space-y-2"
    //          noValidate
    //        >
    //          {error && (
    //            <Alert>
    //              <AlertCircleIcon />
    //              <AlertDescription>{error}</AlertDescription>
    //            </Alert>
    //          )}

    //          <FormField
    //            control={form.control}
    //            name="body"
    //            render={({ field }) => (
    //              <FormItem>
    // //               <div className="flex items-center justify-between">
    // //                 <FormLabel className="text-sm">Add a comment</FormLabel>
    // //                 <div className="text-xs text-muted-foreground">
    // //                   max 50 chars
    // //                 </div>
    // //               </div>

    // //               <FormControl>
    // //                 <Textarea
    // //                   {...field}
    // //                   placeholder="Write a concise, helpful comment..."
    // //                   rows={3}
    // //                   className="resize-none text-sm"
    // //                   disabled={status === "loading"}
    // //                 />
    // //               </FormControl>

    // //               <FormMessage />
    // //             </FormItem>
    // //           )}
    // //         />

    // //         <div className="flex gap-2">
    // //           <Button type="submit" disabled={status === "loading"}>
    // //             {status === "loading" ? (
    // //               <>
    // //                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
    // //                 Submitting...
    // //               </>
    // //             ) : (
    // //               "Submit"
    // //             )}
    // //           </Button>

    // //           <Button
    // //             type="button"
    // //             variant="ghost"
    // //             onClick={onCancelComment}
    // //             disabled={status === "loading"}
    // //           >
    // //             Cancel
    // //           </Button>
    // //         </div>
    // //       </form>
    // //     </Form>
    // //   </CardContent>
    // // </Card>
  );
}

export default CommentForm;
