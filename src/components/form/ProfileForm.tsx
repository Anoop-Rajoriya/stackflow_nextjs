"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, ProfileValues } from "@/lib/zodSchemas";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, CheckCircle2 } from "lucide-react";

import dynamic from "next/dynamic";
import { AvatarInput } from "../shared/AvatarInput";

// ⬇️ Dynamically import MDEditor to avoid SSR issues in Next.js
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

function ProfileForm() {
  const [status, setStatus] = useState<"initial" | "loading" | "success">(
    "initial"
  );
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      bio: "",
      theme: "light",
    },
  });

  const onSubmit = async (values: ProfileValues) => {};

  return (
    <Card className="max-w-2xl w-full">
      <CardHeader>
        <CardTitle>Update Profile</CardTitle>
        <CardDescription>
          Manage your public profile information.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {status === "success" && (
          <Alert className="border-green-500">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle className="font-semibold text-green-700">
              Profile Updated
            </AlertTitle>
            <AlertDescription>Your changes have been saved.</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Avatar URL */}
            <FormField
              control={form.control}
              name="avatarUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar URL</FormLabel>
                  <FormControl>
                    <AvatarInput
                      name={field.name}
                      value={field.value || null}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <FormControl>
                    <Input id="name" placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 📝 Bio with Markdown Editor */}
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="bio">Bio</FormLabel>
                  <FormControl>
                    <MDEditor
                      id="bio"
                      value={field.value}
                      onChange={(val) => field.onChange(val ?? "")}
                      height={200}
                      preview="edit" // "edit" | "preview" | "live"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Theme */}
            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Theme</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default ProfileForm;
