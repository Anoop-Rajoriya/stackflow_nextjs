"use client";

import React from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Key } from "lucide-react";

const updatePasswordFormSchema = z.object({
  newPassword: z
    .string()
    .min(8, "min new password length 8")
    .max(12, "max new password length 12"),
  currentPassword: z
    .string()
    .min(8, "invalid current password")
    .max(12, "your password only 12 character long"),
});

type updatePasswordFormType = z.infer<typeof updatePasswordFormSchema>;

function ChangePasswordDialog({ passwordUpdate }: { passwordUpdate: string }) {
  const form = useForm<updatePasswordFormType>({
    resolver: zodResolver(updatePasswordFormSchema),
    defaultValues: {
      newPassword: "",
      currentPassword: "",
    },
  });
  const onPasswordChange = (value: updatePasswordFormType) => {};
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Key className="h-4 w-4 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium">Password</p>
          {passwordUpdate && (
            <p className="text-sm text-muted-foreground">
              Last updated at {passwordUpdate}
            </p>
          )}
        </div>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Change password</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>Enter your password to update</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(onPasswordChange)}
            >
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <Input placeholder="Enter new password" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <Input placeholder="Enter current password" {...field} />
                    <FormMessage />
                    <FormDescription>
                      Enter your current password
                    </FormDescription>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Change</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ChangePasswordDialog;
